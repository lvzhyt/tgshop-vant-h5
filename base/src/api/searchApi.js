import {apiUrl} from './apiUrl'
import axios from '@/libs/api.request'

export const searchGoodsApi = (search,pageNum,pageSize) => {
    return axios.request({
        url: apiUrl.searchGoodsUrl,
        params:{
            search,
            pageNum,
            pageSize
        },
        method:'get'
    })
}
