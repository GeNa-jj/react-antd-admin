import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { AlitaProvider, setConfig } from 'redux-alita'
import App from "./App"
import Login from "./pages/login"
import NotFound from "./pages/404"
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom"
import * as apis from './api'
import './assets/style/common.less'
import './assets/style/animate.css'

// 全局函数
setConfig(apis)

ReactDOM.render(
		<AlitaProvider>
			<Router>
				<Switch>
					<Route exact path="/" render={() => <Redirect to="/app/index" />} />
					<Route path="/app" component={App} />
					<Route path="/404" component={NotFound} />
					<Route path="/login" component={Login} />
					<Route render={() => <Redirect to="/404" />} />
				</Switch>
			</Router>
		</AlitaProvider>
		,
		document.getElementById('app')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
