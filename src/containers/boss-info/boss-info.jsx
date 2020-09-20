/* 
    招聘者信息完善容器组件
*/

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, InputItem, TextareaItem, Button, WingBlank } from 'antd-mobile'
import { Redirect } from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/header-selector'
import { updateUser } from '../../redux/actions'

class BossInfo extends Component {

    state = {
        header: '', //头像
        post: '',  //职位
        info: '',  //职位要求
        company: '',  //公司
        salary: ''  //薪资
    }

    //更新header状态
    setHeader = (header) => {
        this.setState({ header })
    }

    handleChange = (name, val) => {
        this.setState({ [name]: val })
    }

    save = () => {
        this.props.updateUser(this.state)
    }

    render() {
        //判断用户是否完善信息，如果已完善则跳转至boss详情页(存在优化空间)
        const { type, header } = this.props.user
        if (header) {
            let path = type === 'boss' ? '/boss' : '/applicant'
            return <Redirect to={path}/>
        }

        return (
            <div>
                <NavBar>招聘者信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader} />
                <InputItem placeholder='请输入招聘职位' onChange={val => { this.handleChange('post', val) }}>招聘职位：</InputItem>
                <InputItem placeholder='请输入工资名称' onChange={val => { this.handleChange('company', val) }}>工资名称：</InputItem>
                <InputItem placeholder='请输入职位薪资' onChange={val => { this.handleChange('salary', val) }}>职位薪资：</InputItem>
                <TextareaItem title='职位要求' rows={3} onChange={val => { this.handleChange('info', val) }} />
                <WingBlank>
                    <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    { updateUser }
)(BossInfo)