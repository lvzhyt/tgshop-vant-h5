import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

export const userUrl = {
  // 登录
  loginUrl: '/api-auth/member/login',
  userInfoUrl: '/api-auth/member/userInfo',
  logoutUrl: '/api-auth/member/logout'
}
