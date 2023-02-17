import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Modal, Form, Input, message} from 'antd';
import React, { useCallback, useMemo, useState,useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useNavigate } from "react-router-dom";
import 'ag-grid-enterprise';
import axios from "axios";
import ServerGridConfig from './ServerGridConfig';
const { TextArea } = Input;

const Attraction = () => {
    const [attractions, setAttractions] = useState('');
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [paramsData, setParamsData] = useState({});
    const usenavigate = useNavigate();
    const [formData, setformData] = useState({});
    let accessToken = localStorage.getItem('accessToken')
    const AuthToken = `Bearer ${accessToken}`;
    useEffect(() => {
        if (localStorage.getItem('accessToken') === null) {
            usenavigate('/')
        }
    }, []);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const showUpdateModal = () => {
        setIsModalUpdate(true);
    };
    const handleUpdateOk = () => {
        setIsModalUpdate(false);
    };
    const handleUpdateCancel = () => {
        setIsModalUpdate(false);
    };
    async function getList(payload){
        return axios
          .get(`https://www.melivecode.com/api/attractions`, { params: payload })
          .then((res) => {
            setformData(res.data)
            return res;
          })
          .catch((error) => {});
    }
    const [columnDefs, setColumnDefs] = useState([
        // this row just shows the row index, doesn't use any data from the row
        {
            headerName: 'No',
            field: 'id',
            filter: 'agNumberColumnFilter'
        },
        {
            headerName: 'Name',
            field: 'name',
            filter: 'agTextColumnFilter'
        },
        {
            headerName: 'Detail',
            field: 'detail',
            filter: 'agTextColumnFilter'
        },
        {
            headerName: 'Latitude',
            field: 'latitude',
            filter: 'agNumberColumnFilter'
        },
        {
            headerName: 'Longitude',
            field: 'longitude',
            filter: 'agNumberColumnFilter'
        },
        {
            headerName: "Actions", field: "id", cellRendererFramework: (params) => <div>
                <Button variant="outlined" color="primary" onClick={() => {
                    setformData(params.data)
                    showUpdateModal()
                }
                }>Update</Button>
                <Button variant="outlined" color="primary" onClick={() => {
                    handleDelete(params.data.id)
                }
                }>Delete</Button>
            </div>
        }

    ]);
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 150,
            sortable: true,
            resizable: true,
            filter: true
        };
    }, []);
    const generateSortPayload = (payload) => {
        let actPayload = payload[0];
        if(actPayload){
          return ({sort_column: actPayload.colId, sort_order: actPayload.sort})
        }else{
          return ({sort_column: "", sort_order: ""})
        }
      }
    const generateFilterPayload=(payload)=>{
        let actFilter=payload["name"]
        if(actFilter){
          return ({search:actFilter.filter})
        }else{
          return ({search:""})
        }
      }
   const createServerSideDatasource = (gridOptions) => {
        return {
          gridOptions,
          getRows: (params) => {
            let sort = generateSortPayload(params.request.sortModel);
            let filter= generateFilterPayload(params.request.filterModel)
            var payload = {
              search:filter.search,
              sort_column: sort.sort_column,
              sort_order: sort.sort_order,
              per_page: params.request.endRow - params.request.startRow,
              page: Math.ceil(
                (params.request.startRow + 1) /
                  (params.request.endRow - params.request.startRow)
              ),
            };
            getList(payload).then((res) => {
            //   if (res.data.total_pages === 0) {
            //     this.ag_grid.api.showNoRowsOverlay();
            //   } else {
            //     this.ag_grid.api.hideOverlay();
            //   }
            if (res.data.total_pages === 0) {
               params.api.showNoRowsOverlay();
            } else {
               params.api.hideOverlay();
            }
              params.successCallback(res.data.data, res.data.total);
            });
          },
        };
      };
    // const onFilterChanged = useCallback((e) => {
    //     console.log(e)
    //     // axios(`https://www.melivecode.com/api/attractions?search=${search}`, {
    //     //     method: 'GET',
    //     //     headers: { 'content-type': 'application/json' },
    //     // })
    //     //     .then((response) => {
    //     //         setAttractions(response.data);

    //     //     }).catch(error => {
    //     //         return (error);
    //     //     });
    // }, [])
    const onFinish = (values) => {

        axios.defaults.headers = {
            Authorization: AuthToken,
        };
        axios.post('https://www.melivecode.com/api/auth/attractions/create', {
            name: values.name,
            detail: values.detail,
            coverimage: 'https://www.melivecode.com/attractions/rsu.png',
            latitude: values.latitude,
            longitude: values.longitude
        }).
            then((response) => {
                console.log(response)
                if (response.data.status === 'ok') {
                    message.success("Successfully attraction added");
                    handleCancel()
                    onGridReady(paramsData)

                }
                else {
                    message.error(response.data.error);
                }

            }).catch((err) => {
                console.log(err);
            });
    };
    const onUpdate = (values) => {
        axios.defaults.headers = {
            Authorization: AuthToken,
        };
        axios.put('https://www.melivecode.com/api/auth/attractions/update', {
            id: values.id,
            name: values.name,
            detail: values.detail,
            coverimage: 'https://www.melivecode.com/attractions/rsu.png',
            latitude: values.latitude,
            longitude: values.longitude,
        }).
            then((response) => {
                if (response.data.status != 'error') {
                    message.success("Successfully attraction updated");
                    handleUpdateCancel()
                    onGridReady(paramsData)
                }
                else {
                    message.error(response.data.message);
                }

            }).catch((err) => {
                console.log(err);
            });
    };

    const handleDelete = (values) => {
    console.log("paramsData",paramsData)

        const confirm = window.confirm("Are you sure, you want to delete this row", values)
        if (confirm) {
            axios.defaults.headers = {
                Authorization: AuthToken,
            };
            axios.delete('https://www.melivecode.com/api/auth/attractions/delete', {
                data: { id: values }
            }).
                then((response) => {
                    onGridReady(paramsData)

                }).catch((err) => {
                    console.log(err);
                });

        }
    }
    // const ShowAttractions = ()=> {
    //     axios
    //      .get(`https://www.melivecode.com/api/attractions`)
    //      .then((res) => {
    //        this.setformData(res.data);
    //        this.onGridReady(paramsData)
    //        return res;
    //      })
    //      .catch((error) => {});
    //  }
    const onGridReady = (params) => {
        setParamsData(params)
        const { api } = params;

        const datasource = createServerSideDatasource(ServerGridConfig.options);
        // register the datasource with the grid
        api.setServerSideDatasource(datasource);


    };


    return (
      
        <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">
                <Button type="primary" onClick={showModal} >
                    Add Attraction
                </Button>
                <Modal destroyOnClose={true}
                    title="Add Attraction" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input name!',
                                },
                            ]}
                            onChange={e => setAttractions({ ...attractions, name: e.target.value })}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Detail"
                            name="detail"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input detail!',
                                },
                            ]}
                            onChange={e => setAttractions({ ...attractions, detail: e.target.value })}>
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item
                            label="Latitude"
                            name="latitude"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input latitude!',
                                },
                            ]}
                            onChange={e => setAttractions({ ...attractions, latitude: e.target.value })}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Longitude"
                            name="longitude"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please inputlongitude!',
                                },
                            ]}
                            onChange={e => setAttractions({ ...attractions, longitude: e.target.value })}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal destroyOnClose={true} title="Update User" open={isModalUpdate} onOk={handleUpdateOk} onCancel={handleUpdateCancel}>

                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            name: formData.name,
                            detail: formData.detail,
                            coverimage: 'https://www.melivecode.com/attractions/rsu.png',
                            latitude: formData.latitude,
                            longitude: formData.longitude,
                            id: formData.id
                        }}
                        onFinish={onUpdate}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input name!',
                                },
                            ]}
                            onChange={e => setformData({ ...formData, name: e.target.value })}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Detail"
                            name="detail"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input detail!',
                                },
                            ]}
                            onChange={e => setformData({ ...formData, detail: e.target.value })}>
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item
                            label="Latitude"
                            name="latitude"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input latitude!',
                                },
                            ]}
                            onChange={e => setformData({ ...formData, latitude: e.target.value })}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Longitude"
                            name="longitude"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please inputlongitude!',
                                },
                            ]}
                            onChange={e => setformData({ ...formData, longitude: e.target.value })}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="id"
                            hidden={true}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <AgGridReact
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={ServerGridConfig.options.paginationPageSize}
                    defaultColDef={ServerGridConfig.defaultColDef}
                    onGridReady={onGridReady}
                    rowModelType={'serverSide'}
                ></AgGridReact>
            </div>
        </div>
                
    );
};

export default Attraction