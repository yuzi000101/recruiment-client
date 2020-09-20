/* 
    个人中心主界面路由组件
*/

import React, { Component } from 'react'
import { Result, List, Button, WhiteSpace, WingBlank, Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'

import { resetUser } from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief

class Personal extends Component {

    //登出
    logout = () => {
        Modal.alert('退出', '确定退出登录吗？', [
            { text: '取消' },
            {
                text: '确定',
                onPress: () => {
                    Cookies.remove('userId')  //清除cookie
                    this.props.resetUser()  //重置user
                }
            }
        ])
    }

    render() {

        const { username, type, header, company, post, info, salary } = this.props.user

        return (
            <div style={{ marginBottom: 50, marginTop: 50 }}>
                <Result
                    img={<img src={require(`../../assets/images/${header}.png`)} />}
                    title={username}
                    message={company}
                />

                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>
                        <Brief>职位：{post}</Brief>
                        <Brief>简介：{info}</Brief>
                        {salary ? <Brief>薪资：{salary}</Brief> : null}
                    </Item>
                </List>

                <WhiteSpace />
                <List>
                    <WingBlank>
                        <Button type='warning' onClick={this.logout}>退出登录</Button>
                    </WingBlank>
                </List>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    { resetUser }
)(Personal)