import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

export const errorLogUrl = {
  errorLogUrl: '/api-vant/log/errorLog'
}

export const apiUrl = {
  // 搜索商品
  searchGoodsUrl: '/search-api/es/searchGoods'
}
