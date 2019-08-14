import {apiUrl} from './apiUrl'
import axios from '@/libs/api.request'

export const searchGoodsApi = (data) => {
    return axios.request({
        url: apiUrl.searchGoodsUrl,
        params:data,
        method:'get'
    })
}

export const getSkuByIdApi = (skuId) => {
    return axios.request({
        url: apiUrl.getSkuByIdUrl,
        params:{skuId},
        method:'get'
    })
}


