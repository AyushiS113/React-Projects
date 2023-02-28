import { observable, makeAutoObservable } from 'mobx';
import { message } from 'antd';
import axios from 'axios';
import ToastMessage from '../message/ToastMessage';

class Login {
    auth_user = observable({});
    app_loading = observable({});
    url = 'https://www.melivecode.com/api';

    constructor() {
        makeAutoObservable(this)
    }
    setAppLoading = (value) => {
        this.app_loading = value
    }
    setInterceptor = () => {
        axios.interceptors.response.use(
            (res) => {
                return res
            },
            (error) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        ToastMessage('Unauthorized User', 'warning')
                    } else if (error.response.status === 201) {
                        ToastMessage('No content found')
                    } else if (error.response.status === 404) {
                        ToastMessage('Authorized user not found')
                    } else if (error.response.status === 400) {
                        ToastMessage('Missing fields.......')
                    }
                }
                return Promise.reject(error)
            }
        )
    }

    //setter fuction for set the authorized user
    setAuthUser(value) {
        return (this.auth_user = value)
    }
    AuthUser = () => {
        const Token = localStorage.getItem('accessToken')
        const AuthToken = `Bearer ${Token}`
        axios.defaults.headers = {
            Authorization: AuthToken,
        }
        axios
            .get(`${this.url}/auth/user`)
            .then((res) => {
                this.setAuthUser(res.data.user)
            })
            .catch((error) => {})
    }
    loginUser = (values) => {
        this.setInterceptor()
        axios
            .post('https://www.melivecode.com/api/login', {
                username: values.username,
                password: values.password,
                expiresIn: '60000000',
            })
            .then((resp) => {
                if (resp.data.status === 'ok') {
                    message.success(resp.data.message)
                    localStorage.setItem('accessToken', resp.data.accessToken)
                    window.location.href='/dash'
                } else {
                    message.error('Login failed, invalid credentials')
                }
            })
            .catch((err) => {
                message.error('Login Failed due to :' + err.message)
            })
            .finally(() => this.setAppLoading(false))
    }
}
export default Login;
