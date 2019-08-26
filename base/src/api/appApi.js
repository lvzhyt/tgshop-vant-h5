import {apiUrl} from './apiUrl'
import axios from '@/libs/api.request'

export const searchGoodsApi = (data) => {
    return axios.request({
        url: apiUrl.searchGoodsUrl,
        params:data,
        method:'get'
    })
}

export const getSkuEsByIdApi = (skuId) => {
    return axios.request({
        url: apiUrl.getSkuEsByIdUrl,
        params:{skuId},
        method:'get'
    })
}

export const getSkuDetailByIdApi = (skuId) => {
    return axios.request({
        url: apiUrl.getSkuDetailByIdUrl,
        params:{skuId},
        method:'get'
    })
}

/**
 * 选择商品规格sku
 * @param skuId
 * @returns {*}
 */
export const getChooseSkuApi = (skuId) => {
    return axios.request({
        url: apiUrl.getChooseSkuUrl,
        params:{skuId},
        method:'get'
    })
}


