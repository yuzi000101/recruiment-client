/* 
    主界面路由组件
*/

import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { NavBar, Result } from 'antd-mobile'

import BossInfo from '../boss-info/boss-info'
import ApplicantInfo from '../applicant-info/applicant-info'
import Boss from '../boss/boss'
import Applicant from '../applicant/applicant'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'

import { getRedirectTo } from '../../utils/index'
import { getUser } from '../../redux/actions'

class Main extends Component {

    // 给组件对象添加属性，包含所有导航组件相关数据 
    navList = [
        {
            path: '/boss', // 路由路径
            component: Boss, //组件
            title: '应 聘 者', //顶部标题
            icon: 'applicant', //导航栏图标
            text: '应聘者',  //导航栏文字
        },
        {
            path: '/applicant',
            component: Applicant,
            title: '招 聘 者',
            icon: 'boss',
            text: '招聘者',
        },
        {
            path: '/message', 
            component: Message,
            title: '消 息',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', 
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]

    componentDidMount() {
        // cookie中存在userId，但redux管理的user中没有_id，发送ajax请求
        const userId = Cookies.get('userId')
        const { _id } = this.props.user
        if (userId && !_id) {
            this.props.getUser()
        }

    }

    render() {
        /* 处理自动登录 */
        // 读取cookie中的userId，如果没有重定向到登录界面
        const userId = Cookies.get('userId')
        if (!userId) {
            return <Redirect to='/login' />
        }
        //读取redux中的user状态
        const { user, unReadCount } = this.props
        // 无则返回null，不做任何显示
        if (!user._id) {
            return null
        } else {  //有则显示，如果请求的是根路径则根据type和header计算并重定向到指定路径
            let path = this.props.location.pathname
            if (path === '/') {
                path = getRedirectTo(user.type, user.header)
                return <Redirect to={path} />
            }
        }

        /* 处理主界面路由切换 */
        const { navList } = this
        const path = this.props.location.pathname
        const currentNav = navList.find(nav => nav.path === path)

        if(currentNav){
            if(user.type === 'boss'){
                navList[1].hide = true
            }else{
                navList[0].hide = true
            }
        }

        return (
            <div>
                {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
                <Switch>
                    {
                        navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component} />)
                    }
                    <Route path='/bossinfo' component={BossInfo} />
                    <Route path='/applicantinfo' component={ApplicantInfo} />
                    <Route path='/chat/:userid' component={Chat} />
                    <Route component={NotFound} />
                </Switch>
                {currentNav ? <NavFooter navList={navList} unReadCount={unReadCount} /> : null}
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user, unReadCount: state.chat.unReadCount }),
    { getUser }
)(Main)