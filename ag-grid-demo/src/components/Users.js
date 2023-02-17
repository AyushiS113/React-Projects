import React, { useMemo, useRef, useState, useEffect } from 'react';
import axios from "axios";
import { Button, Modal, Form, Input, message } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../styles.css';
import { useNavigate } from "react-router-dom";

const Users = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [rowData, setRowData] = useState();
    const [formData, setformData] = useState({});
    const gridRef = useRef();
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [values, setValues] = useState({});
    const usenavigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('accessToken') === null) {
            usenavigate('/')
        }
    }, []);
    useEffect(() => {
        getUsers()
    }, [])

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

    const onFinish = (values) => {

        axios.post('https://www.melivecode.com/api/users/create', {
            fname: values.fname,
            lname: values.lname,
            username: values.email,
            password: values.password,
            email: values.email,
            avatar: "https://www.melivecode.com/users/cat.png"
        }).
            then((response) => {
                console.log(response)
                if (response.status == 200) {
                    console.log(response.data)
                    message.success("Successfully user added");
                    handleCancel()
                    getUsers()

                }
                else {
                    message.error("something went wrong");
                }

            }).catch((err) => {
                console.log(err);
            });
    };

    const onUpdate = (values) => {
        console.log(values)
        axios.put('https://www.melivecode.com/api/users/update', {
            id: values.id,
            fname: values.fname,
            lname: values.lname,
            username: values.email,
            avatar: "https://www.melivecode.com/users/cat.png"
        }).
            then((response) => {
                if (response.data.status != 'error') {
                    message.success("Successfully user updated");
                    handleUpdateCancel()
                    getUsers()
                }
                else {
                    message.error(response.data.message);
                }

            }).catch((err) => {
                console.log(err);
            });
    };

    const handleUpdate = (data) => {

        const user = {
            avatar: 'https://www.melivecode.com/users/cat.png',
            fname: data.fname,
            id: data.id,
            lname: data.lname,
            username: data.username
        };
        showUpdateModal()
        localStorage.setItem("update_user", JSON.stringify(user));

    }

    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure, you want to delete this row", id)
        if (confirm) {
            axios.delete('https://www.melivecode.com/api/users/delete', {
                data: { id: id }
            }).
                then((response) => {
                    console.log(response)
                    if (response.data.status != 'error') {
                        message.success("Successfully user deleted");
                        getUsers()
                    }
                    else {
                        message.error(response.data.message);
                    }

                }).catch((err) => {
                    console.log(err);
                });

        }
    }
    const [columnDefs, setColumnDefs] = useState([
        { headerName: 'No', field: 'id', filter: 'agNumberColumnFilter', },
        { headerName: 'FirstName', field: 'fname', minWidth: 180, filter: 'agTextColumnFilter', },
        { headerName: 'LastName', field: 'lname', minWidth: 180, filter: 'agTextColumnFilter', },
        { headerName: 'Email', field: 'username', filter: 'agTextColumnFilter', },
        {
            headerName: "Actions", field: "id", cellRendererFramework: (params) => <div>
                <Button variant="outlined" color="primary" onClick={() => {
                    setformData(params.data)
                    handleUpdate(params.data)
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
            minWidth: 100,
            sortable: true,
            filter: true,
        };
    }, []);


    //fetching user data from server
    const getUsers = () => {
        axios(`https://www.melivecode.com/api/users`, {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
        }).then((response) => {
            setRowData(response.data)
        });
    }
    const getRowId = useMemo(() => {
        return (params) => params.data.id;
    }, []);
    return (
        <>
            <Button type="primary" onClick={showModal} >
                Add User
            </Button>
            <Modal destroyOnClose={true}
                title="Add User" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                        label="First Name"
                        name="fname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your first name!',
                            },
                        ]}
                        onChange={e => setValues({ ...values, fname: e.target.value })}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="lname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                            },
                        ]}
                        onChange={e => setValues({ ...values, lname: e.target.value })}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                        onChange={e => setValues({ ...values, email: e.target.value })}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        onChange={e => setValues({ ...values, password: e.target.value })}
                    >
                        <Input.Password />
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
                        fname: formData.fname,
                        lname: formData.lname,
                        email: formData.username,
                        id: formData.id
                    }}
                    onFinish={onUpdate}
                >
                    <Form.Item
                        label="First Name"
                        name="fname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your first name!',
                            },
                        ]}
                        onChange={e => setformData({ ...formData, fname: e.target.value })}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="lname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                            },
                        ]}
                        onChange={e => setformData({ ...formData, lname: e.target.value })}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                        onChange={e => setformData({ ...formData, email: e.target.value })}
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

            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    getRowId={getRowId}
                    pagination={true}
                    paginationPageSize={8}
                ></AgGridReact>
            </div>
        </>
            
    );
}

export default Users;