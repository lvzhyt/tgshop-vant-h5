import { getParams } from '@/libs/util'
import {searchGoodsData} from "../data/search_goods";
import {skuDetail} from "../data/sku_detail";


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
  return skuDetail
}
