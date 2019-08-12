import { getParams } from '@/libs/util'


export const searchGoods = req => {
  console.log('mock '+req.url)
  console.log('mock '+req)
  console.log('mock '+req.body)
  const params = getParams(req.url)
  console.log('mock params '+ params)
  let reqBody = JSON.parse(req.body)
  return {  }
}
