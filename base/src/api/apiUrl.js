import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

export const errorLogUrl = {
  errorLogUrl: '/api-vant/log/errorLog'
}

export const apiUrl = {
  //登录
  loginUrl: '/auth-api/member/login',
  //注册
  registerUrl: '/auth-api/member/register',
  //获取注册验证码
  getRegisterSmsCode:'/auth-api/member/getRegisterSmsCode',

  // 搜索商品
  searchGoodsUrl: '/search-api/es/searchGoods',
  // SKU商品详情
  getSkuByIdUrl: '/search-api/es/getSkuById'

}
