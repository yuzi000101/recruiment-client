/* 
    入口js
*/

/* 第三方 */
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

/* 自定义 */
//路由组件
import Main from './containers/main/main'
import Register from './containers/register/register'
import Login from './containers/login/login'
// 状态管理
import store from './redux/store'

import './assets/css/index.css'

// import './test/socketio_test'

ReactDOM.render(
    (
        <Provider store={store}>
            <HashRouter>
                <Switch>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route component={Main}></Route>
                </Switch>
            </HashRouter>
        </Provider>
    ), document.getElementById('root'))