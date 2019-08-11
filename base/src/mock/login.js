import { getParams } from '@/libs/util'


export const login = req => {
  console.log('mock '+req.url)
  req = JSON.parse(req.body)
  return { token: '123' }
}

export const getUserInfo = req => {
  const params = getParams(req.url)
  return {}
}

export const logout = req => {
  console.log('mock '+req.url)
  const params = getParams(req.url)
  let token = params.token
  console.log("mock logout token " + token)
  return {}
}
