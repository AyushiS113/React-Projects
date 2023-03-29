import React, { useMemo, useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { FaTrash, FaPen, FaEye } from 'react-icons/fa'
import { Button, Drawer, Modal, Select, Space } from 'antd'
import AddUser from './AddUser'
import UserView from './UserView'
import { observer } from 'mobx-react'
import useStore from '../stores/CommonStore'
import { PlusOutlined } from '@ant-design/icons'
import { FaRandom } from 'react-icons/fa'
import Data2 from '../Data.json'

const UserTable = observer((props: any) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false)
    const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [initialValues, setInitialValues] = useState(false)
    const [userDelete, setUserDelete] = useState<number>()
    const userStore = useStore()
    const users: any = userStore.UserStore.user_data
    const perPage: any = userStore.UserStore.users_page

    const addUser = () => {
        setInitialValues(false)
        showAddDrawer()
    }

    const updateUser = (data: object) => {
        setInitialValues(true)
        showUpdateDrawer()
        userStore.UserStore.setUpdate(data)
    }

    const showUser = (id: number) => {
        localStorage.setItem('user', JSON.stringify(id))
        userStore.UserStore.showUser(id)
        showDrawer()
    }

    const deleteUser = (id: number) => {
        setIsDeleteModalOpen(true)
        setUserDelete(id)
    }
    const confirm = (id: any) => {
        userStore.UserStore.deleteUser(id)
        setIsDeleteModalOpen(false)
    }
    const cancelUser = (e: any) => {
        console.log(e)
        setIsDeleteModalOpen(false)
    }
    const customComparator = (valueA: string, valueB: string) => {
        return valueA.toLowerCase().localeCompare(valueB.toLowerCase())
    }
    const data: any = {
        columnDef: [
            {
                headerName: 'Avatar',
                resizable: 'true',
                width: 90,
                cellRendererFramework: (params: any) => {
                    const img = params.data.avatar
                    return (
                        <img
                            src={img}
                            alt=" "
                            style={{ width: '30px', height: '30px' }}
                        />
                    )
                },
            },
            {
                headerName: 'Id',
                field: 'id',
                sortable: true,
                filter: 'agNumberColumnFilter',
                resizable: 'true',
                width: 90,
            },
            {
                headerName: 'FirstName',
                field: 'fname',
                sortable: true,
                filter: 'agTextColumnFilter',
                resizable: 'true',
                comparator: customComparator,
            },
            {
                headerName: 'LastName',
                field: 'lname',
                sortable: true,
                filter: 'agTextColumnFilter',
                comparator: customComparator,
            },
            {
                headerName: 'Username',
                field: 'username',
                sortable: true,
                filter: 'agTextColumnFilter',
                resizable: 'true',
                comparator: customComparator,
            },
            {
                headerName: 'Action',
                field: 'action',
                cellRendererFramework: (params: any) => (
                    <div>
                        <Button
                            style={{ color: 'red' }}
                            onClick={() => deleteUser(params.data.id)}
                        >
                            <FaTrash />
                        </Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button onClick={() => updateUser(params.data)}>
                            <FaPen />
                        </Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button onClick={() => showUser(params.data.id)}>
                            <FaEye />
                        </Button>
                    </div>
                ),
            },
        ],
        rowData: users,
    }

    const showDrawer = () => {
        setIsDrawerOpen(true)
    }
    const onClose = () => {
        setIsDrawerOpen(false)
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
    const handleChange = (val: number) => {
        userStore.UserStore.pagination(val)
    }

    const rowClassRules: any = useMemo(() => {
        return {
            latitude: (params: any) => {
                var id = params.data.id
                return id >= 5 && id <= 6
            },
            lati: 'data.id >= 8 && data.id<=10',
        }
    }, [])

    const addRandom = () => {
        const len = users.length
        const random = Math.floor(Math.random() * len)
        const res = Data2[random]
        const finalData = {
            ...res,
        }
        userStore.UserStore.addUser(finalData)
    }

    return (
        <div>
            <div>
                <h2 style={{ marginTop: '20px' }}>Users</h2>
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={addUser}
                    style={{ marginLeft: '700px' }}
                >
                    <PlusOutlined />
                    Create
                </Button>
                &nbsp;&nbsp;
                <Button type="primary" htmlType="submit" onClick={addRandom}>
                    <FaRandom />
                    Add Random User
                </Button>
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
                            value: users.length,
                            label: 'All',
                        },
                    ]}
                />{' '}
                entries&nbsp;&nbsp;
                <br />
                <Drawer
                    title="User Information"
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
                    <UserView />
                </Drawer>
                <Drawer
                    title="Add User"
                    open={isAddDrawerOpen}
                    onClose={onClose}
                    extra={
                        <Space>
                            <Button onClick={onAddClose}>Cancel</Button>
                            <Button type="primary" onClick={onAddClose}>
                                OK
                            </Button>
                        </Space>
                    }
                >
                    <AddUser pass={onAddClose} />
                </Drawer>
                <Drawer
                    title="Update User"
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
                    <AddUser pass={onUpdateClose} init={initialValues} />
                </Drawer>
                <Modal
                    open={isDeleteModalOpen}
                    onOk={() => confirm(userDelete)}
                    onCancel={cancelUser}
                    okText="Yes"
                    cancelText="No"
                    title="Are you sure to delete this user ??"
                ></Modal>
            </div>
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
                                rowData={data.rowData}
                                pagination={true}
                                paginationPageSize={perPage}
                                rowClassRules={rowClassRules}
                            ></AgGridReact>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})
export default UserTable
