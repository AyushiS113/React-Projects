import React, { useEffect, useState } from 'react'
import { FaPowerOff } from 'react-icons/fa'
import { useNavigate, Outlet, Link } from 'react-router-dom'
import '../../App.css'
import {
    Modal,
    Row,
    Col,
    Layout,
    Button,
    Switch,
    message,
    Drawer,
    Popover,
} from 'antd'
import '../../App.css'
import { MenuOutlined } from '@ant-design/icons'
import Data from '../stores/UserStore'
const { Header, Content } = Layout

export default function CommonContent() {
    const navigate = useNavigate()
    const [isLogout, setIsLogout] = useState(false)
    const [currentState, setCurrentState] = useState(true)
    const [open, setOpen] = useState(false)
    const userStore = new Data()
    userStore.setInterceptor()

    const showDrawer = () => {
        setOpen(true)
    }

    /** for logout start **/
    const onClose = () => {
        setOpen(false)
    }
    const confirm = (e: object) => {
        console.log(e)
        message.success('User logout successfully')
        localStorage.removeItem('accessToken')
        navigate('/')
        setIsLogout(false)
    }
    const cancel = (e: object) => {
        console.log(e)
        message.success('Cancel......')
        setIsLogout(false)
    }
    /**  for logout end **/
    const content = (
        <>
            <h4 style={{ marginTop: '10px' }}>
                <Link to="/profile">Profile</Link>
            </h4>
            <Button
                type="primary"
                onClick={() => setIsLogout(true)}
                style={{ marginTop: '-4px' }}
            >
                <FaPowerOff />
                &nbsp;<b>Logout</b>
            </Button>
        </>
    )
    const handleChange = (checked: boolean) => {
        setCurrentState(checked)
    }
    useEffect(() => {
        if (localStorage.getItem('accessToken') === null) {
            navigate('/')
        }
    })
    return (
        <div>
            {currentState === false ? (
                <Layout>
                    <Header>
                        <Row
                            gutter={{
                                xs: 8,
                                sm: 16,
                                md: 24,
                                lg: 32,
                            }}
                        >
                            <Col className="gutter-row" span={2}>
                                <Button type="primary" onClick={showDrawer}>
                                    <MenuOutlined />
                                </Button>
                                <Drawer
                                    title="Menu"
                                    placement="left"
                                    onClose={onClose}
                                    open={open}
                                >
                                    <h4 style={{ marginTop: '10px' }}>
                                        <Link to="/profile" onClick={onClose}>
                                            Profile
                                        </Link>
                                    </h4>
                                    <h4 style={{ marginTop: '20px' }}>
                                        <Link to="/dashboard" onClick={onClose}>
                                            Dashboard
                                        </Link>
                                    </h4>
                                    <h4 style={{ marginTop: '10px' }}>
                                        <Link to="/users" onClick={onClose}>
                                            Users
                                        </Link>
                                    </h4>
                                    <h4 style={{ marginTop: '10px' }}>
                                        <Link
                                            to="/attractions"
                                            onClick={onClose}
                                        >
                                            Atractions/Places
                                        </Link>
                                    </h4>
                                </Drawer>
                            </Col>
                            <Col className="gutter-row" span={14}></Col>
                            <Col className="gutter-row" span={2}>
                                <Switch
                                    defaultChecked
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col
                                className="gutter-row "
                                span={3}
                                style={{ color: 'white' }}
                            >
                                <Button
                                    type="primary"
                                    onClick={() => setIsLogout(true)}
                                    style={{ marginTop: '-4px' }}
                                >
                                    <FaPowerOff />
                                    &nbsp;<b>Logout</b>
                                </Button>
                            </Col>
                            <Modal
                                open={isLogout}
                                onOk={confirm}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                                title="Are you sure to logout from this window ??"
                            />
                        </Row>
                        <br />
                    </Header>
                    <Layout>
                        <Content>
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            ) : (
                <Layout>
                    <Header style={{ background: '#9f9fa1' }}>
                        <Row
                            gutter={{
                                xs: 8,
                                sm: 16,
                                md: 24,
                                lg: 32,
                            }}
                        >
                            <Col className="gutter-row" span={2}>
                                <Popover content={content} title="">
                                    <Button type="primary">
                                        <MenuOutlined />
                                    </Button>
                                </Popover>
                            </Col>
                            <Col className="gutter-row" span={12}></Col>
                            <Col className="gutter-row" span={2}>
                                <Switch
                                    defaultChecked
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col className="gutter-row" span={2}>
                                <Link to="/dashboard">Dashboard</Link>
                            </Col>
                            <Col
                                className="gutter-row "
                                span={2}
                                style={{ color: 'white' }}
                            >
                                <Link to="/users">Users</Link>
                            </Col>
                            <Col
                                className="gutter-row "
                                span={2}
                                style={{ color: 'white' }}
                            >
                                <Link to="/attractions">Atractions/Places</Link>
                            </Col>
                            <Modal
                                open={isLogout}
                                onOk={confirm}
                                onCancel={cancel}
                                title="Are you sure to logout from this window ??"
                            />
                        </Row>
                        <br />
                    </Header>
                    <Content>
                        <Outlet />
                    </Content>
                </Layout>
            )}
        </div>
    )
}
