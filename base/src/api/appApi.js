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


