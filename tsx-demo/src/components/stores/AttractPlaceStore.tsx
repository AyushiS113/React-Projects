import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import ServerGridConfig from '../pages/ServerGridConfig'
import { message } from 'antd'
import { AttractionInterface } from '../pages/AttractionInterface'

type agGrid = {
    [key: string]: any
}

class Attract {
    user_data: any = {}
    user = {}
    lang = {}
    ag_grid: agGrid = {}
    Update_Attract = {}
    current_page = 1
    total = 0
    allColumnIds = []
    total_data = {}
    per_page = ServerGridConfig.options.paginationPageSize
    url = 'https://www.melivecode.com/api/attractions'
    authUrl = 'https://www.melivecode.com/api/auth/attractions'
    constructor() {
        makeAutoObservable(this)
    }

    setAttract(val: object) {
        return (this.user_data = val)
    }

    setPageData(user: number) {
        return (this.total_data = user)
    }

    onGridChanged = (params: any) => {
        params.columnApi.getColumnState()
    }

    //show all attraction
    getAttraction = async (payload: any) => {
        return await axios
            .get(`https://www.melivecode.com/api/attractions`, {
                params: payload,
            })
            .then((res) => {
                this.setAttract(res.data.data)
                this.user_data = res.data.data ? res.data.data : null
                this.total = res.data.total_pages
                this.current_page = res.data.page
                return res
            })
            .catch((error) => {})
    }

    generateSortPayload = (payload: any) => {
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

    generateFilterPayload = (payload: any) => {
        let actFilter = payload['name']
        if (actFilter) {
            return { search: actFilter.filter }
        } else {
            return { search: '' }
        }
    }

    createServerSideDatasource = (gridOptions: any) => {
        return {
            gridOptions,
            getRows: (params: any) => {
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
                this.getAttraction(payload).then((res: any) => {
                    //this.setPageData(res.data.total)
                    params.success({
                        rowData: res.data.data,
                        rowCount: res.data.total,
                    })
                })
            },
        }
    }

    onGridReady = (params: any) => {
        this.ag_grid = params
        const { api } = params
        let datasource = this.createServerSideDatasource(
            ServerGridConfig.options
        )
        api.setServerSideDatasource(datasource)
    }

    setPageSize = (page = this.per_page) => {
        this.per_page = page
        if (this.ag_grid) {
            this.ag_grid.api.paginationSetPageSize(parseInt(page))
        }
    }

    //call api for add attraction
    addAttraction = async (value: AttractionInterface) => {
        await axios
            .post(`${this.authUrl}/create`, value)
            .then((res) => {
                message.success('success')
                this.onGridReady(this.ag_grid)
            })
            .catch((error) => {
                message.error(error.response.data.message)
                if (error.response.status === 403) {
                    message.error('Invalid Token')
                    localStorage.removeItem('accessToken')
                    window.location.href = '/'
                }
            })
    }

    //call api for update attraction
    UpdateAttraction = async (val: AttractionInterface) => {
        await axios
            .put(`${this.authUrl}/update`, val)
            .then((res) => {
                message.success(res.data.message)
                this.onGridReady(this.ag_grid)
            })
            .catch((error) => {
                message.error(error.response.data.message)
                if (error.response.status === 403) {
                    localStorage.removeItem('accessToken')
                    window.location.href = '/'
                }
            })
    }

    setUpdateAttact(val: object) {
        return (this.Update_Attract = val)
    }

    //call api for delete attraction
    DeleteAttraction = async (userid: number) => {
        await axios
            .delete(`${this.authUrl}/delete`, {
                data: { id: userid },
            })
            .then((res) => {
                message.success(res.data.message)
                this.onGridReady(this.ag_grid)
            })
            .catch((error) => {
                message.error(error.response.data.message)
                if (error.response.status === 403) {
                    localStorage.removeItem('accessToken')
                    window.location.href = '/'
                }
            })
    }

    //call api for display specific attraction
    showAttraction = async (id: number) => {
        await axios
            .get(`${this.url}/${id}`)
            .then((res) => {
                this.setAttract(res.data.attraction)
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
export default Attract
