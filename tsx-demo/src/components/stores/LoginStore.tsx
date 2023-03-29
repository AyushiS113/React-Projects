import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import { message } from 'antd'

class LoginStore {
    app_loading = true
    auth_user = {}
    url = 'https://www.melivecode.com/api'

    constructor() {
        makeAutoObservable(this)
    }

    setAppLoading = (value: boolean) => {
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
                        message.warning('Unauthorized User')
                    } else if (error.response.status === 201) {
                        message.error('No content found')
                    } else if (error.response.status === 404) {
                        message.error('Authorized user not found')
                    } else if (error.response.status === 400) {
                        message.error('Missing fields.......')
                    }
                }
                return Promise.reject(error)
            }
        )
    }

    authUser = async () => {
        await axios
            .get(`${this.url}/auth/user`)
            .then((res) => {
                this.auth_user = res.data.user
            })
            .catch((error) => {})
    }
    //call api for login
    loginUser = async (value: { username: string; password: string }) => {
        this.setInterceptor()
        await axios
            .post(`${this.url}/login`, {
                username: value.username,
                password: value.password,
                expiresIn: 600000,
            })
            .then((res) => {
                localStorage.setItem('accessToken', res.data.accessToken)
                window.location.href = '/dashboard'
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => this.setAppLoading(false))
    }

    signUpUser = (values: {
        fname: string
        lname: string
        username: string
        password: string
    }) => {
        axios
            .post(`${this.url}/users/create`, {
                fname: values.fname,
                lname: values.lname,
                username: values.username,
                password: values.password,
                email: values.username,
                avatar: 'https://www.melivecode.com/users/cat.png',
            })
            .then((response) => {
                if (response.status == 200) {
                    window.location.href = '/'
                    message.success('Successfully user added')
                } else {
                    message.error('something went wrong')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export default LoginStore
