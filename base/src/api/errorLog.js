import axios from '@/libs/api.request'
import {errorLogUrl} from '@/api/apiUrl.js'


export const saveErrorLogger = info => {
  return axios.request({
    url: errorLogUrl.errorLogUrl,
    data: info,
    method: 'post'
  })
}
