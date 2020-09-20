/* 
    注册界面
    */
import Logo from '../../components/logo/logo'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'
import { connect } from 'react-redux'

import { register } from '../../redux/actions'

const ListItem = List.Item

class Register extends Component {

    state = {
        username: '',
        password: '',
        password2: '',
        type: 'boss'
    }
    // 点击注册触发
    register = () => {
        // console.log(this.state)
        this.props.register(this.state)
    }

    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }

    toLogin = () => {
        this.props.history.replace('/login')
    }

    render() {
        const { msg, redirectTo } = this.props.user
        // 重定向路由到mian界面
        if (redirectTo) {
            return <Redirect to={redirectTo}/>
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
                    <InputItem placeholder="请输入确认密码" type="password" onChange={val => { this.handleChange('password2', val) }}>确认密码：</InputItem>
                    <WhiteSpace />
                    <ListItem>
                        <span>用户类型：</span>&nbsp;&nbsp;&nbsp;
                        <Radio checked={this.state.type === 'applicant'} onChange={() => { this.handleChange('type', 'applicant') }}>应聘者</Radio>&nbsp;&nbsp;&nbsp;
                        <Radio checked={this.state.type === 'boss'} onChange={() => { this.handleChange('type', 'boss') }}>招聘者</Radio>&nbsp;&nbsp;&nbsp;
                    </ListItem>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
                    <WhiteSpace />
                    <Button onClick={this.toLogin}>已有账号</Button>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    { register }
)(Register)