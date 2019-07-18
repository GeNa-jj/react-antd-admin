import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { AlitaProvider, setConfig } from 'redux-alita' // redux
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom"
import App from "./App"
import Login from "./pages/login"
import NotFound from "./pages/404"

import * as apis from './api'
import './assets/style/common.less'
import './assets/style/animate.css'

// 多语言
import {LocaleProvider} from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

// 全局函数
setConfig(apis)

ReactDOM.render(
		<AlitaProvider>
			<LocaleProvider locale={zhCN}>
				<Router>
					<Switch>
						<Route exact path="/" render={() => <Redirect to="/app/index" />} />
						<Route path="/app" component={App} />
						<Route path="/404" component={NotFound} />
						<Route path="/login" component={Login} />
						<Route render={() => <Redirect to="/404" />} />
					</Switch>
				</Router>
			</LocaleProvider>
		</AlitaProvider>
		,
		document.getElementById('app')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
