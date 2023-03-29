import React, { useState } from 'react'
import useStore from '../stores/CommonStore'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { FaTrash, FaPen, FaEye, FaRandom } from 'react-icons/fa'
import { Button, Select, Modal, Drawer, Space } from 'antd'
import AttractionAdd from './AttractionAdd'
import ShowAttract from './ShowAttract'
import { observer } from 'mobx-react'
import 'ag-grid-community'
import 'ag-grid-enterprise'
import ServerGridConfig from './ServerGridConfig'
import { PlusOutlined } from '@ant-design/icons'
import Attract from '../Attract.json'

const Attractions = observer(() => {
    const attract = useStore()
    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false)
    const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [initialValues, setInitialValues] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [attractionDelete, setAttractionDelete] = useState<number>()

    const customComparator = (valueA: string, valueB: string) => {
        return valueA.toLowerCase().localeCompare(valueB.toLowerCase())
    }

    const showDrawer = () => {
        setIsDrawerOpen(true)
    }

    const showAddDrawer = () => {
        setIsAddDrawerOpen(true)
    }
    const onAddClose = () => {
        setIsAddDrawerOpen(false)
    }

    const showUpdateDrawer = () => {
        setIsUpdateDrawerOpen(true)
    }
    const onUpdateClose = () => {
        setIsUpdateDrawerOpen(false)
    }
    const confirm = (id: number) => {
        attract.Attract.DeleteAttraction(id)
        setIsDeleteModalOpen(false)
    }

    const onClose = () => {
        setIsDrawerOpen(false)
    }
    const handleChange = (val: number) => {
        attract.Attract.setPageSize(val)
    }

    const addAttraction = () => {
        setInitialValues(false)
        showAddDrawer()
    }

    const showAttraction = (id: number) => {
        localStorage.setItem('user', JSON.stringify(id))
        attract.Attract.showAttraction(id)
        showDrawer()
    }

    const deleteAttraction = (id: number) => {
        setIsDeleteModalOpen(true)
        setAttractionDelete(id)
    }

    const cancelAttraction = (e: object) => {
        console.log(e)
        setIsDeleteModalOpen(false)
    }
    const updateAttraction = (data: object) => {
        setInitialValues(true)
        showUpdateDrawer()
        attract.Attract.setUpdateAttact(data)
    }

    const addRandom = () => {
        const len = Attract.length
        const random = Math.floor(Math.random() * len)
        const res = Attract[random]
        const finalData = {
            ...res,
        }
        attract.Attract.addAttraction(finalData)
    }

    const user = attract.Attract.total_data
    console.log('user', user)
    const data: any = {
        columnDef: [
            {
                headerName: 'CoverImage',
                field: 'coverimage',
                width: 110,
                maxWidth: 120,
                cellRendererFramework: (params: any) => {
                    const img = params.data.coverimage
                    return (
                        <img
                            src={img}
                            alt=" "
                            style={{
                                height: '30px',
                                width: '30px',
                                borderRadius: '3px',
                            }}
                        />
                    )
                },
            },
            {
                headerName: 'Id',
                field: 'id',
                sortable: true,
            },
            {
                headerName: 'Name',
                field: 'name',
                filter: 'agTextColumnFilter',
                sortable: true,
                comparator: customComparator,
            },
            {
                headerName: 'Latitude',
                field: 'latitude',
                filter: 'agTextColumnFilter',
                sortable: true,
            },
            {
                headerName: 'Longitude',
                field: 'longitude',
                filter: 'agTextColumnFilter',
                sortable: true,
            },
            {
                headerName: 'Action',
                field: 'action',
                cellRendererFramework: (params: any) => (
                    <div>
                        <Button
                            style={{ color: 'red' }}
                            onClick={() => deleteAttraction(params.data.id)}
                        >
                            <FaTrash />
                        </Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button onClick={() => updateAttraction(params.data)}>
                            <FaPen />
                        </Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button onClick={() => showAttraction(params.data.id)}>
                            <FaEye />
                        </Button>
                    </div>
                ),
            },
        ],
    }

    return (
        <div>
            <div>
                <h2 style={{ marginTop: '20px' }}>Atractions/Places</h2>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginLeft: '700px' }}
                    onClick={addAttraction}
                >
                    <PlusOutlined />
                    Create
                </Button>
                &nbsp;&nbsp;
                <Button type="primary" htmlType="submit" onClick={addRandom}>
                    <FaRandom />
                    Add Random Attraction
                </Button>
                &nbsp;&nbsp;
                <br />
                Show{' '}
                <Select
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        {
                            value: 5,
                            label: 5,
                        },
                        {
                            value: 10,
                            label: 10,
                        },
                        {
                            value: 20,
                            label: 20,
                        },
                        {
                            value: user ? user : 10,
                            label: 'All',
                        },
                    ]}
                />{' '}
                entries &nbsp;&nbsp;
                <Modal
                    open={isDeleteModalOpen}
                    onOk={() => confirm(attractionDelete!)}
                    onCancel={cancelAttraction}
                    okText="Yes"
                    cancelText="No"
                    title="Are you sure to delete this attraction/places ??"
                ></Modal>
            </div>
            <Drawer
                title="Add Attraction/Places"
                open={isAddDrawerOpen}
                onClose={onAddClose}
                extra={
                    <Space>
                        <Button onClick={onAddClose}>Cancel</Button>
                        <Button type="primary" onClick={onAddClose}>
                            OK
                        </Button>
                    </Space>
                }
            >
                <AttractionAdd pass={onAddClose} />
            </Drawer>
            <Drawer
                title="Update Attraction"
                open={isUpdateDrawerOpen}
                onClose={onUpdateClose}
                extra={
                    <Space>
                        <Button onClick={onUpdateClose}>Cancel</Button>
                        <Button type="primary" onClick={onUpdateClose}>
                            OK
                        </Button>
                    </Space>
                }
            >
                <AttractionAdd pass={onUpdateClose} init={initialValues} />
            </Drawer>

            <Drawer
                title="Attraction Information"
                open={isDrawerOpen}
                onClose={onClose}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" onClick={onClose}>
                            OK
                        </Button>
                    </Space>
                }
            >
                <ShowAttract />
            </Drawer>
            <div>
                <div className="col-md-5">
                    <div
                        className="card"
                        style={{ height: '600px', width: '1100px' }}
                    >
                        <br />
                        <div
                            className="ag-theme-alpine"
                            style={{
                                height: '550px',
                                width: '1000px',
                                marginLeft: '50px',
                            }}
                        >
                            <AgGridReact
                                columnDefs={data.columnDef}
                                pagination={true}
                                paginationPageSize={
                                    ServerGridConfig.options.paginationPageSize
                                }
                                rowModelType="serverSide"
                                onGridReady={attract.Attract.onGridReady}
                                defaultColDef={ServerGridConfig.defaultColDef}
                            ></AgGridReact>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})
export default Attractions
