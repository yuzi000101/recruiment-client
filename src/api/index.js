/* 
    包含n个接口请求的函数模块并返回promise对象
*/

import ajax from "./ajax";

//注册请求
export const reqRegister = user => ajax('/register', user, 'POST')
// 登录请求
export const reqLogin = ({ username, password }) => ajax('/login', { username, password }, 'POST')

//更新用户信息请求
export const reqUpdateUser = user => ajax('/update', user, 'POST')

//获取用户信息
export const reqUser = () => ajax('/user')

//获取用户列表
export const reqUserList = (type) => ajax('/userlist', { type })

//获取当前用户聊天消息列表
export const reqChatMsgList = () => ajax('msglist')
// 修改指定消息为已读
export const reqReadMsg = (from) => ajax('readmsg', { from }, 'POST')

