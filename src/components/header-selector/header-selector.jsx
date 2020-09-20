/* 
    用户头像选择UI组件
*/
import React, { Component } from 'react'
import { List, Grid } from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component {

    static propsTypes = {
        setHeader: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        //头像处理
        this.headerList = []
        for (let i = 0; i < 20; i++) {
            this.headerList.push({ text: '头像' + (i + 1), icon: require(`../../assets/images/头像${i + 1}.png`) })
        }
    }

    state = {
        icon: null //图片对象，根据icon状态更新列表头部信息 
    }

    handleClick = ({ text, icon }) => {
        // 更新当前组件状态
        this.setState({ icon })
        // 更新父组件状态
        this.props.setHeader(text)
    }

    render() {
        //头部界面
        const { icon } = this.state
        const listHeader = !icon ? '请选择头像' : (
            <div>
                已选择头像：<img src={icon} alt="头像" />
            </div>
        )

        return (
            <List renderHeader={() => listHeader}>
                <Grid data={this.headerList} columnNum={5} onClick={this.handleClick}></Grid>
            </List>
        )
    }
}