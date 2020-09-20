/* 
    包含n个action creator
    同步action
    异步action
*/
// 导入ajax接口模块
import io from 'socket.io-client'

import { reqLogin, reqRegister, reqUpdateUser, reqUser, reqUserList, reqChatMsgList, reqReadMsg } from '../api'
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST, RECEIVE_MSG, MSG_READ } from './action-types'

/* 建立客户端与服务器之间的连接（单例） */
function initIO(dispatch, userid) {
    if (!io.socket) {
        //连接服务器，得到连接对象
        io.socket = io('ws://localhost:4000')
        //监听连接
        io.socket.on('receiveMsg', function (chatMsg) {
            console.log('接收服务器发送的消息', chatMsg)
            // 只有当chatMsg是与当前用户有关的聊天消息时，采取分发同步action
            if (userid === chatMsg.from || userid === chatMsg.to) {
                dispatch(receiveMsg(chatMsg, userid))
            }
        })
    }

}

// 异步获取消息列表数据
async function getMsgList(dispatch, userid) {
    // 建立连接
    initIO(dispatch, userid)

    // 获取消息列表
    const response = await reqChatMsgList()
    const result = response.data
    if (result.code === 0) {
        const { users, chatMsgs } = result.data
        dispatch(receiveMsgList({ users, chatMsgs, userid }))
    }
}


//授权成功的同步action
const authSuccess = user => ({ type: AUTH_SUCCESS, data: user })
//错误提示信息的同步action
const errorMsg = msg => ({ type: ERROR_MSG, data: msg })
//接受用户同步action
const receiveUser = user => ({ type: RECEIVE_USER, data: user })
//重置用户同步action
export const resetUser = msg => ({ type: RESET_USER, data: msg })
//接收用户列表的同步action
const receiveUserList = users => ({ type: RECEIVE_USER_LIST, data: users })
// 接收消息列表同步action
const receiveMsgList = ({ users, chatMsgs, userid }) => ({ type: RECEIVE_MSG_LIST, data: { users, chatMsgs, userid } })
// 接收消息的同步action
const receiveMsg = ({ chatMsg, userid }) => ({ type: RECEIVE_MSG, data: { chatMsg, userid } })
// 读取某个聊天消息的同步action
const msgRead = ({ count, from, to }) => ({ type: MSG_READ, data: { count, from, to } })



// 注册异步action
export const register = (user) => {
    const { username, password, password2, type } = user
    //表单前台验证，不通过，返回errorMsg的同步action
    if (!username) {
        return errorMsg('请输入用户名！')
    } else if (password !== password2) {
        return errorMsg('两次密码不一致！')
    }
    //表单数据合法，返回ajax请求的异步action
    return async dispatch => {
        const response = await reqRegister({ username, password, type })
        const result = response.data
        if (result.code === 0) {  //成功

            getMsgList(dispatch, result.data._id)   //异步获取消息列表

            dispatch(authSuccess(result.data))
        } else {  //失败
            dispatch(errorMsg(result.msg))
        }
    }
}

// 登录异步action
export const login = (user) => {
    const { username, password, password2, type } = user
    //表单前台验证，不通过，返回errorMsg的同步action
    if (!username) {
        return errorMsg('请输入用户名！')
    } else if (!password) {
        return errorMsg('请输入密码')
    }
    return async dispatch => {
        const response = await reqLogin(user)
        const result = response.data
        if (result.code === 0) {  //成功

            getMsgList(dispatch, result.data._id)   //异步获取消息列表

            dispatch(authSuccess(result.data))
        } else {  //失败
            dispatch(errorMsg(result.msg))
        }
    }
}

// 更新异步action
export const updateUser = (user) => {

    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data
        if (result.code === 0) {  //更新成功data
            dispatch(receiveUser(result.data))
        } else {  //更新失败
            dispatch(resetUser(result.msg))
        }
    }
}

//获取用户信息异步action(自动登录)
export const getUser = () => {
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if (result.code === 0) {

            getMsgList(dispatch, result.data._id)   //异步获取消息列表

            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

//获取用户列表异步action
export const getUserList = (type) => {
    return async dispatch => {
        const response = await reqUserList(type)
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveUserList(result.data))
        }
    }
}

//发送消息异步action(socket.io)
export const sendMsg = ({ from, to, content }) => {
    return dispatch => {
        console.log('发消息', { from, to, content })

        io.socket.emit('sendMsg', { from, to, content })
    }
}

// 读取消息的异步action
export const readMsg = (from, to) => {
    return async dispatch => {
        const response = await reqReadMsg(from)
        const result = response.data
        if (result.data === 0) {
            const count = result.data
            console.log(count, from, to)
            dispatch(msgRead({ count, from, to }))
        }
    }
}