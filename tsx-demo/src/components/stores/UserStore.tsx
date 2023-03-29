import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import { message } from 'antd'

class Data {
    user_data = {}
    update_data = {}
    users_page = 10
    setUpdate_data = {}
    url = 'https://www.melivecode.com/api'
    constructor() {
        makeAutoObservable(this)
        this.showAllUsers()
    }
    setInterceptor = () => {
        axios.interceptors.response.use(
            (res) => {
                return res
            },
            (error) => {
                if (error.response) {
                    if (error.response.status === 201) {
                        console.log('No content found')
                    } else if (error.response.status === 404) {
                        console.log('User not found')
                    } else if (error.response.status === 400) {
                        console.log('Missing fields....')
                    }
                }
                return Promise.reject(error)
            }
        )
    }
    //setter function to set the all users
    setAllUserData(value: object) {
        return (this.user_data = value)
    }
    //call api for show all users
    showAllUsers = async () => {
        await axios
            .get(`${this.url}/users`)
            .then((res) => {
                localStorage.setItem('users', JSON.stringify(res.data))

                this.setAllUserData(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    //call api for add user
    addUser = async (value: object) => {
        this.setInterceptor()
        await axios
            .post(`${this.url}/users/create`, {
                ...value,
                avatar: 'https://www.melivecode.com/users/cat.png',
            })
            .then((res) => {
                // console.log(res.data);
                message.success(res.data.message)
                this.showAllUsers()
            })
            .catch((error) => {
                console.log(error)
            })
    }
    setUserData(value: object) {
        return (this.update_data = value)
    }
    //call api for show specific user
    showUser = async (id: number) => {
        await axios
            .get(`${this.url}/users/${id}`)
            .then((res) => {
                this.setUserData(res.data.user)
                this.showAllUsers()
            })
            .catch((error) => {
                console.log(error)
            })
    }
    //call api for delete/remove user
    deleteUser = async (userId: number) => {
        await axios
            .delete(`${this.url}/users/delete`, { data: { id: userId } })
            .then((res) => {
                message.success(res.data.message)
                this.showAllUsers()
            })
            .catch((error) => {
                console.log(error)
            })
    }
    //call api for update user
    update_user = async (value: object) => {
        await axios
            .put(`${this.url}/users/update`, value)
            .then((res) => {
                this.showAllUsers()
                message.success(res.data.message)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    setUpdate(val: object) {
        return (this.setUpdate_data = val)
    }
    setPerPageUser(user: number) {
        return (this.users_page = user)
    }
    //call api for pagination
    pagination = async (users: number) => {
        await axios
            .get(`${this.url}/users?page=1&per_page=${users}`)
            .then((res) => {
                this.setPerPageUser(res.data.per_page)
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
export default Data
