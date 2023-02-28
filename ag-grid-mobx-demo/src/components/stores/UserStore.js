import { observable, makeAutoObservable } from 'mobx'
import axios from 'axios'
import ToastMessage from "../message/ToastMessage";

class Data {
    user_data = observable({})
    update_data = observable({})
    users_page = 10
    setupdate_data = observable({})
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
    setAllUserdata(value) {
        return (this.user_data = value);
    }
    //call api for show all users
    showAllUsers() {
        axios
        .get(`${this.url}/users`)
        .then((res) => {
            localStorage.setItem("users", JSON.stringify(res.data));
            this.setAllUserdata(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }
      //call api for add user
  addUser(value) {
    this.setInterceptor()
    axios
      .post(`${this.url}/users/create`, {
        ...value,
        avatar: "https://www.melivecode.com/users/cat.png",
      })
      .then((res) => {
        console.log(res.data);
        ToastMessage(res.data.message, "success");
        this.showAllUsers()
      })
      .catch((error) => {
        console.log(error);
      });
  } setUserData(value) {
    return (this.update_data = value);
  }
  //call api for show specific user
  showUser(id) {
    axios
      .get(`${this.url}/users/${id}`)
      .then((res) => {
        this.setUserData(res.data.user);
        this.showAllUsers();
        console.log(this.update_data)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //call api for delete/remove user
  deleteUser(userid) {
    axios
      .delete(`${this.url}/users/delete`, { data: { id: userid } })
      .then((res) => {
        console.log(res.data);
        ToastMessage(res.data.message, "success");
        this.showAllUsers()
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //call api for update user
  update_user(value) {
    axios
      .put(`${this.url}/users/update`, value)
      .then((res) => {
        console.log(res.data);
        this.showAllUsers();
        ToastMessage(res.data.message, "success");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  setupdate(val){
    return (this.setupdate_data=val)
  }
  setPerPageUser(user) {
    return (this.users_page = user);
  }
  //call api for pagination
  pagination(users) {
    axios
      .get(`${this.url}/users?page=1&per_page=${users}`)
      .then((res) => {
        console.log(res.data.per_page);
        this.setPerPageUser(res.data.per_page);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
export default Data;

