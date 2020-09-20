/* 
    发送ajax请求的函数模块并返回promise对象
*/

import axios from 'axios'

export default function ajax(url, data = {}, type = 'GET') {
    if (type === 'GET') {
        // 拼接param参数
        let paramStr = ''
        Object.keys(data).forEach(key => {
            paramStr += key + '=' + data[key] + '&'
        })
        if (paramStr) {
            paramStr = paramStr.substring(0, paramStr.length - 1)
        }
        // 使用axios发送ajax请求
        return axios.get(url + '?' + paramStr)
    } else {  // 发送post请求
        return axios.post(url, data)
    }
}