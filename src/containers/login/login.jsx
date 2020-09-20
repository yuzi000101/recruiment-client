/* 
    注册界面
*/
import Logo from '../../components/logo/logo'
import { Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button,
    Toast
} from 'antd-mobile'
import { connect } from 'react-redux'

import { login } from '../../redux/actions'

const ListItem = List.Item

class Register extends Component {

    state = {
        username: '',
        password: '',
    }

    login = () => {
        // console.log(this.state)
            this.props.login(this.state)
     
    }

    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }

    toRegister = () => {
        this.props.history.replace('/register')
    }

    render() {
        const { msg, redirectTo } = this.props.user
        // 重定向路由到mian界面
        if (redirectTo) {
            return <Redirect to={redirectTo} />
        }

        return (
            <div>
                <NavBar>保&nbsp;院&nbsp;招&nbsp;聘</NavBar>
                <WhiteSpace />
                <Logo />
                <WingBlank>

                    {msg ? <div className="error-msg">{msg}</div> : null}

                    <InputItem placeholder="请输入用户名" onChange={val => { this.handleChange('username', val) }}>用户名：</InputItem>
                    <WhiteSpace />
                    <InputItem placeholder="请输入密码" type="password" onChange={val => { this.handleChange('password', val) }}>密&nbsp;&nbsp;&nbsp;码</InputItem>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
                    <WhiteSpace />
                    <Button onClick={this.toRegister}>还没有账号</Button>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    { login }
)(Register)