import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message, Typography } from 'antd';
import axios from "axios";
const { Title } = Typography;


const Login = () => {
    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const usenavigate = useNavigate();

    useEffect(() => {

        if (localStorage.getItem('accessToken')) {
            usenavigate('/dashboard')
        }else{
            usenavigate('/')
        }
    }, []);

    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();
        if (validate()) {

            axios.post("https://www.melivecode.com/api/login", {
                "username": username,
                "password": password,
                "expiresIn": '60000000'
            }).then((resp) => {
                if (resp.data.status === 'ok') {
                    message.success(resp.data.message);
                    localStorage.setItem('accessToken', resp.data.accessToken);
                    usenavigate('/dashboard')
                } else {
                    message.error('Login failed, invalid credentials');
                }
            }).catch((err) => {
                message.error('Login Failed due to :' + err.message);
            });
        }
    }
    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            message.error('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            message.error('Please Enter Password');
        }
        return result;
    }
    return (<>
        <Title style={{ textAlign: "center" }} level={2}>Login</Title>
        <Form
            name="basic"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 8,
            }}
            initialValues={{
                remember: true,
            }}
        >
            <Form.Item
                label="Username"
                name="username"
                onChange={e => usernameupdate(e.target.value)}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                onChange={e => passwordupdate(e.target.value)}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 4,
                    span: 8,
                }}
            >
                <Button type="primary" onClick={ProceedLoginusingAPI} htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </>

    );
}

export default Login;     