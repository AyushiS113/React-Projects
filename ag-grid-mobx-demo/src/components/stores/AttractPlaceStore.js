import { observable, makeAutoObservable } from 'mobx'
import axios from 'axios'
import ToastMessage from '../message/ToastMessage'
import ServerGridConfig from '../pages/ServerGridConfig'

class AttractPlaceStore {
    user_data = observable({})
    user = observable({})
    lang = observable({})
    ag_grid = observable({})
    Update_Attract = observable({})
    current_page = 1
    total = 0
    allColumnIds = []
    total_data = observable()
    per_page = ServerGridConfig.options.paginationPageSize
    url = 'https://www.melivecode.com/api/attractions'
    authUrl = 'https://www.melivecode.com/api/auth/attractions'

    constructor() {
        makeAutoObservable(this)
    }

    setAttract(val) {
        return (this.user_data = val)
    }

    setPageSize = (page = this.per_page) => {
        this.per_page = page
        if (this.ag_grid) {
            this.ag_grid.api.paginationSetPageSize(parseInt(page))
        }
    }

    setPageData(user) {
        return (this.total_data = user)
    }

    //show all attraction
    async getUserList(payload) {
        return axios
            .get(`https://www.melivecode.com/api/attractions`, {
                params: payload,
            })
            .then((res) => {
                this.setAttract(res.data.data)
                this.user_data = res.data ? res.data.data : null
                this.total = res.data.total_pages
                this.current_page = res.data.page
                return res
            })
            .catch((error) => {})
    }

    generateSortPayload = (payload) => {
        let actPayload = payload[0]
        if (actPayload) {
            return {
                sort_column: actPayload.colId,
                sort_order: actPayload.sort,
            }
        } else {
            return { sort_column: '', sort_order: '' }
        }
    }

    generateFilterPayload = (payload) => {
        let actFilter = payload['name']
        if (actFilter) {
            return { search: actFilter.filter }
        } else {
            return { search: '' }
        }
    }

    createServerSideDatasource = (gridOptions) => {
        return {
            gridOptions,
            getRows: (params) => {
                let sort = this.generateSortPayload(params.request.sortModel)
                let filter = this.generateFilterPayload(
                    params.request.filterModel
                )
                var payload = {
                    search: filter.search,
                    sort_column: sort.sort_column,
                    sort_order: sort.sort_order,
                    per_page: params.request.endRow - params.request.startRow,
                    page: Math.ceil(
                        (params.request.startRow + 1) /
                            (params.request.endRow - params.request.startRow)
                    ),
                }
                this.getUserList(payload).then((res) => {
                    this.setPageData(res.data.total)
                    if (res.data.total_pages === 0) {
                        this.ag_grid.api.showNoRowsOverlay()
                    } else {
                        this.ag_grid.api.hideOverlay()
                    }
                    params.successCallback(res.data.data, res.data.total)
                })
            },
        }
    }

    onGridReady = (params) => {
        this.ag_grid = params
        const { api } = params
        let datasource = this.createServerSideDatasource(
            ServerGridConfig.options
        )
        api.setServerSideDatasource(datasource)
    }

    //call api for add attraction
    addAttraction(value) {
        const Token = localStorage.getItem('accessToken')
        const AuthToken = `Bearer ${Token}`
        axios.defaults.headers = {
            Authorization: AuthToken,
        }
        axios
            .post(`${this.authUrl}/create`, value)
            .then((res) => {
                ToastMessage(res.data.message, 'success')
                this.onGridReady(this.ag_grid)
            })
            .catch((error) => {
                ToastMessage(error.response.data.message, 'error')
                console.log(error.response.status)
                if (error.response.status === 403) {
                    ToastMessage('Invalid Token', 'error')
                    localStorage.removeItem('accessToken')
                    window.location.href = '/'
                }
            })
    }

    setuser(val) {
        return (this.user = val)
    }
    //call api for display specific attraction
    showUser(id) {
        axios
            .get(`${this.url}/${id}`)
            .then((res) => {
                this.setuser(res.data.attraction)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    //call api for delete attraction
    DeleteUser(userid) {
        const Token = localStorage.getItem('accessToken')
        const AuthToken = `Bearer ${Token}`
        axios.defaults.headers = {
            Authorization: AuthToken,
        }
        axios
            .delete(`${this.authUrl}/delete`, {
                data: { id: userid },
            })
            .then((res) => {
                ToastMessage(res.data.message, 'success')
                this.onGridReady(this.ag_grid)
            })
            .catch((error) => {
                ToastMessage(error.response.data.message, 'error')
                if (error.response.status === 403) {
                    localStorage.removeItem('accessToken')
                    window.location.href = '/'
                }
            })
    }
    //call api for update attraction
    Update(val) {
        const Token = localStorage.getItem('accessToken')
        const AuthToken = `Bearer ${Token}`
        axios.defaults.headers = {
            Authorization: AuthToken,
        }
        axios
            .put(`${this.authUrl}/update`, val)
            .then((res) => {
                ToastMessage(res.data.message, 'success')
                this.onGridReady(this.ag_grid)
            })
            .catch((error) => {
                ToastMessage(error.response.data.message, 'error')
                if (error.response.status === 403) {
                    localStorage.removeItem('accessToken')
                    window.location.href = '/'
                }
            })
    }
    setUpdateAttact(val) {
        return (this.Update_Attract = val)
    }
}
export default AttractPlaceStore
