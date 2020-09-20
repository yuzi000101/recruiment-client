/* 
    redux最核心管理对象模块
*/

import { createStore, applyMiddleware } from 'redux'
//导入异步中间件
import thunk from 'redux-thunk'
//导入工具调试
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from './reducers'

// 向外暴露store对象
export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))