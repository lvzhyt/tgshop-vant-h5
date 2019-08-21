import { getParams } from '@/libs/util'
import {searchGoodsData} from "../data/search_goods";
import {skuDetails} from "../data/sku_detail";

/* eslint-disable */
export const searchGoods = req => {
  console.log('mock '+req.url)
  console.log('mock '+req)
  console.log('mock '+req.body)
  const params = getParams(req.url)
  console.log('mock params '+ params)
  let reqBody = JSON.parse(req.body)
  return searchGoodsData
}

export const getSkuById = req => {
  console.log('mock '+req.url)
  const params = getParams(req.url)
  let skuId = params.skuId
  let data = skuDetails[skuId]
  console.log(data)
  return data
}
