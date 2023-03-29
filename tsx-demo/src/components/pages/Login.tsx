import React, { useEffect, useState } from 'react'
import { Input, Button, Form, Layout, Tabs } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import '../../App.css'
import { useNavigate } from 'react-router-dom'
import useStore from '../stores/CommonStore'

const { Header, Content, Footer } = Layout

export default function Login() {
    const navigate = useNavigate()
    const LoginStore = useStore()
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [isLogin, loginSet] = useState(true)
    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            navigate('/dashboard')
        } else {
            navigate('/')
        }
    }, [navigate])

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },
    }

    const onValuesChange = (changedValues:string, allValues:{username:string,password:string}) => {
        if (allValues.username !== undefined && allValues.password !== undefined) {
          setBtnDisabled(false);
        } else {
          setBtnDisabled(true);
        }
    };
    const onSignUpValuesChange = (changedValues:string, allValues:{ fname:string, lname:string, username: string; password: string}) => {
        if (allValues.username !== undefined  && allValues.password !== undefined && allValues.fname !== undefined && allValues.lname !== undefined) {
          setBtnDisabled(false);
        } else {
          setBtnDisabled(true);
        }
    };
    const onSubmit = (values: { username: string; password: string }) => {
        LoginStore.LoginStore.loginUser(values)
    }

    const onSignUp = ( values:{ fname:string, lname:string, username: string; password: string}) => {
        LoginStore.LoginStore.signUpUser(values)
    }

    return (
        <Layout>
            <Header className="header">
                <button onClick={() => loginSet(true)}>Login</button>
                <button onClick={() => loginSet(false)}>Signup</button>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                {isLogin && (
                    <>
                        <div
                            style={{
                                height: '280px',
                                width: '500px',
                                background: 'rgb(238, 236, 232)',
                                borderRadius: '5px',
                                marginLeft: '400px',
                                marginTop: '100px',
                            }}
                        >
                            <h2>Login</h2>
                            <UserOutlined style={{ fontSize: '40px' }} />
                            <br />
                            <br />
                            <Form
                                {...formItemLayout}
                                onFinish={onSubmit}
                                onValuesChange={onValuesChange}
                            >
                                <Form.Item
                                    name={['username']}
                                    label="Enter Email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Username is required !',
                                            type: 'email',
                                        },
                                        {
                                            pattern:
                                                /[a-z0-9]+@[a-z]+.[a-z]{2,3}/,
                                            message: 'Username is not valid !',
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="example@melivecode.com"
                                        suffix={<UserOutlined />}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name={['password']}
                                    label="Enter Password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Password is required !',
                                        },
                                        {
                                            min: 8,
                                            message:
                                                'Minimum length is 8 character',
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="xxxxxxxx" />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        disabled={btnDisabled}
                                        style={{ marginLeft: '190px' }}
                                    >
                                        Login
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </>
                )}
                {!isLogin && (
                    <>
                        <div
                            style={{
                                height: '280px',
                                width: '500px',
                                background: 'rgb(238, 236, 232)',
                                borderRadius: '5px',
                                marginLeft: '400px',
                                marginTop: '100px',
                            }}
                        >
                            <h2>Signup</h2>
                            <UserOutlined style={{ fontSize: '40px' }} />
                            <br />
                            <br />
                            <Form
                                {...formItemLayout}
                                onValuesChange={onSignUpValuesChange}
                                onFinish={onSignUp}
                            >
                                <Form.Item
                                    name="fname"
                                    label="Enter FirstName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'FirstName is required !',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="lname"
                                    label="Enter LastName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'LastName is required !',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="username"
                                    label="Enter Email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Email is required !',
                                            type: 'email',
                                        },
                                        {
                                            pattern:
                                                /[a-z0-9]+@[a-z]+.[a-z]{2,3}/,
                                            message: 'Username is not valid !',
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="example@melivecode.com"
                                        suffix={<UserOutlined />}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    label="Enter Password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Password is required !',
                                        },
                                        {
                                            min: 8,
                                            message:
                                                'Minimum length is 8 character',
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="xxxxxxxx" />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        disabled={btnDisabled}
                                        style={{ marginLeft: '190px' }}
                                    >
                                        Signup
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </>
                )}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2023 Created by Ant UED
            </Footer>
        </Layout>
    )
}
