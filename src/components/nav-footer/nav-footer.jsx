/* 
    底部导航栏UI组件
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

const Item = TabBar.Item

class NavFooter extends Component {

    static propTypes = {
        navList: PropTypes.array.isRequired,
        unReadCount: PropTypes.number.isRequired
    }

    render() {
        let { navList, unReadCount } = this.props
        //过滤掉招聘者/应聘者之一
        navList = navList.filter(nav => !nav.hide)
        //使用路由组件api
        const path = this.props.location.pathname

        return (
            <TabBar>
                {
                    navList.map((nav) => (
                        <Item key={nav.path}
                            badge={nav.path === '/message' ? unReadCount : 0}
                            title={nav.text}
                            icon={{ uri: require(`./images/${nav.icon}.png`) }}
                            selectedIcon={{ uri: require(`./images/${nav.icon}-selected.png`) }}
                            selected={path === nav.path}
                            onPress={() => this.props.history.replace(nav.path)}  //多路由之间切换
                        />
                    ))
                }
            </TabBar>
        )
    }
}

export default withRouter(NavFooter)//在非路由组件中使用路由组件api

