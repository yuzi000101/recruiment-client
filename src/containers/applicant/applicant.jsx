/* 
    应聘者主界面路由组件
*/

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getUserList } from '../../redux/actions'
import UserList from '../../components/user-list/user-list'

class Applicant extends Component {

    componentDidMount() {
        this.props.getUserList('boss')
    }

    render() {

        return (
            <UserList userList={this.props.userList} />
        )
    }
}

export default connect(
    state => ({ userList: state.userList }),
    { getUserList }
)(Applicant)