/* 
    包含n个reducer函数，根据旧的state和指定的action返回一个新的state
*/

import { combineReducers } from 'redux'

import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ
} from './action-types'
//导入工具模块
import { getRedirectTo } from '../utils/index'
import { func } from 'prop-types'

const initUser = {
    username: '',   //用户名
    type: '',       //用户类型
    msg: '',         //错误提示信息
    redirectTo: '' //需要自动重定向路由路径
}
//产生user状态的reducer
function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const { type, header } = action.data
            return { ...action.data, redirectTo: getRedirectTo(type, header) } //用action中的值替换原state中的值
        case ERROR_MSG:
            return { ...state, msg: action.data }
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return { ...initUser, msg: action.data }  //将登录成功后state中的_id清除，重新返回到登录界面
        default:
            return state
    }
}


const initUserList = []
// 产生userlist状态的reducer
function userList(state = initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data
        default:
            return state
    }
}

const initChat = {
    users: {},   //所有用户信息的对象  属性名为userID 属性值为{username， header}
    chatMsgs: [],  //当前用户所有msg的数组
    unReadCount: 0  //总的未读数量
}
// 产生聊天状态的reducer
function chat(state = initChat, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST:
            const { users, chatMsgs, userid } = action.data
            return {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal + (!msg.read && msg.to === userid ? 1 : 0), 0)
            }
        case RECEIVE_MSG:
            const chatMsg = action.data
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],  //纯函数，不可改变原来状态的内容，只能重新产生一个chatMsgs
                unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === action.data.userid ? 1 : 0)
            }
        case MSG_READ:
            const { count, from, to } = action.data
            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map(msg => {
                    if (msg.from === from && msg.to === to && !msg.read) {   //需要更新
                        return { ...msg, read: true }  //使用三点运算符修改已读状态，保证不会修改原有的read状态（纯函数原则）
                    } else {  //不需要更新
                        return msg
                    }
                }),
                unReadCount: state.unReadCount - count
            }
        default:
            return state
    }
}


// 合并状态管理
export default combineReducers({
    user,
    userList,
    chat
})

