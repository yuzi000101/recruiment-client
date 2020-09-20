import io from 'socket.io-client'

//连接服务器，得到连接对象
const socket = io('ws://localhost:4000')

// 向服务器发送消息
socket.emit('sendMsg', { name: 'abc' })
console.log('向服务器发送消息', { name: 'abc' })

socket.on('receiveMsg', function (data) {
    console.log('接收服务器发送的消息', data)
})

