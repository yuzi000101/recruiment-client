/*
    对话聊天的路由组件
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, List, InputItem, Grid, Icon } from 'antd-mobile'
import { sendMsg, readMsg } from '../../redux/actions'
import QueueAnim from 'rc-queue-anim'

const Item = List.Item

class Chat extends Component {

    state = {
        content: '',
        isShow: false   //表情是否显示
    }

    // 点击发送触发
    handleSend = () => {
        const from = this.props.user._id    //当前用户id
        const to = this.props.match.params.userid   //目标用户id
        const content = this.state.content.trim()
        if (content) {
            this.props.sendMsg({ from, to, content })
            this.setState({ content: '', isShow: false })
        }
    }

    //切换显示表情
    toggleShow = () => {
        const isShow = !this.state.isShow
        this.setState({ isShow })
        if (isShow) {
            // 异步手动派发 resize 事件,解决表情列表显示的 bug
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    }

    // 第一次render之前加载表情
    componentWillMount() {
        const emojis = ['😀', '😃', '😄', '😁', '😆',
            '😀', '😃', '😄', '😁', '😆',
            '😀', '😃', '😄', '😁', '😆',
            '😀', '😃', '😄', '😁', '😆',
            '😀', '😃', '😄', '😁', '😆',
            '😀', '😃', '😄', '😁', '😆',
            '😀', '😃', '😄', '😁', '😆',
            '😀', '😃', '😄', '😁', '😆',
            '😀', '😃', '😄', '😁', '😆']
        this.emojis = emojis.map(emojs => ({ text: emojs }))
    }

    componentDidMount() {
        // 初始显示列表
        window.scrollTo(0, document.body.scrollHeight)  //进入，自动滚动到底部

    }

    componentDidUpdate() {
        // 更新显示列表
        window.scrollTo(0, document.body.scrollHeight)  //内容过多出现滚动时，自动滚动到底部显示最新消息
    }

    componentWillUnmount() {  //退出之前
        // 发送请求更新消息的未读数量
        const from = this.props.match.params.userid   //目标用户id
        const to = this.props.user._id    //当前用户id
        this.props.readMsg(from, to)
    }

    render() {
        const { user } = this.props
        const { users, chatMsgs } = this.props.chat

        // 计算当前聊天的chatId
        const meId = user._id
        if (!users[meId]) {  //如果还没有获取到数据，不做任何显示
            return null
        }
        const targetId = this.props.match.params.userid
        const chatId = [meId, targetId].sort().join('_')
        // 对chatMsgs进行过滤(只保留与当前对象的聊天记录)
        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)

        // 等到目标用户的header
        const targetHeader = users[targetId].header
        const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.png`) : null

        return (
            <div id='chat-page'>
                <NavBar
                    icon={<Icon type='left' />}
                    onClick={() => this.props.history.goBack()}
                    className='sticky-header'>{users[targetId].username}
                </NavBar>
                <List style={{ marginTop: 50, marginBottom: 50 }}>

                    <QueueAnim type='top'>
                        {
                            msgs.map(msg => {
                                if (targetId === msg.from) {  //对方发给我
                                    return <Item key={msg._id} thumb={targetIcon}>{msg.content}</Item>
                                } else {  //我发给对方
                                    return <Item key={msg._id} className='chat-me' extra='我'>{msg.content}</Item>
                                }
                            })
                        }
                    </QueueAnim>

                </List>

                <div className='am-tab-bar'>
                    <InputItem
                        placeholder="请输入"
                        value={this.state.content}
                        onChange={(val) => this.setState({ content: val })}
                        onFocus={() => this.setState({ isShow: false })}
                        extra={
                            <span>
                                <span role='img' onClick={this.toggleShow}>😀</span>
                                <span onClick={this.handleSend}>发送</span>
                            </span>
                        }
                    />
                </div>

                {
                    this.state.isShow ? (
                        <Grid
                            className='emojis'
                            data={this.emojis}
                            columnNum={8}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={(item) => {
                                this.setState({ content: this.state.content + item.text })  //更新输入框中的内容
                            }}
                        />
                    ) : null
                }

            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user, chat: state.chat }),
    { sendMsg, readMsg }
)(Chat)