import axios from 'axios'
axios.defaults.timeout = 8000
// code状态码200判断
axios.interceptors.response.use((res) => {
	console.log(res);
  if (res.status === 654) { // 
    window.console.log('请求超时！')
  }
  // if (!res.data.results) {
  //   window.console.log('数据返回有误')
  //   return Promise.reject(res)
  // }
  return res
}, (error) => {
  console.log('promise error:' + error)
  return Promise.reject(error)
})
export default axios