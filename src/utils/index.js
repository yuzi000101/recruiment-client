/*
    包含n个工具函数模块
*/

//动态指定路由路径
export function getRedirectTo(type, header) {
    let path = ''
    // 判断用户类型
    if (type === 'boss') {
        path = '/boss'
    } else {
        path = '/applicant'
    }
    // 判断用户是否完善信息
    if (!header) {
        path += 'info'
    }
    return path
}