import React from 'react'
import Routes from './router'
import {Layout} from 'antd'
import {connectAlita} from 'redux-alita'
import MenuCustom from './components/Menu'
import HeaderCustom from './components/Header'
import {$cookie} from './utils/cookie'

const {Content} = Layout

class App extends React.Component {
	state = {
		collapsed: false
	}

	componentWillMount() {
		this.checkLogin()
		this.getMenu()

		this.getClientWidth()
		window.onresize = () => {
			this.getClientWidth()
		}
	}

	// 获取当前浏览器宽度并设置responsive管理响应式
	getClientWidth = () => {
		const {setAlitaState} = this.props
		const clientWidth = window.innerWidth
		setAlitaState({stateName: 'responsive', data: {isMobile: clientWidth <= 992}})
	}

	// 检查是否已登陆
	checkLogin = () => {
		if (!$cookie.isKey('token')) this.props.history.replace('/login')
	}

	// 获取菜单栏
	getMenu = () => {
		const {setAlitaState} = this.props
		// return JSON.parse($cookie.get('menu') || '[]')
		let menus = [
			{
				"title": "首页",
				"icon": 'rocket',
				"path": "/app/index",
				"children": []
			},
			{
				"title": "权限测试",
				"icon": 'lock',
				"path": '/app/text',
				"children": [
					{
						"title": "有权限",
						"icon": null,
						"path": "/app/text/can",
						"children": []
					},
					{
						"title": "路由拦截",
						"icon": null,
						"path": "/app/text/cannot",
						"children": []
					}
				]
			},
			{
				"title": "错误页面",
				"icon": 'user',
				"path": '/app/errorPage',
				"children": [
					{
						"title": "404",
						"icon": null,
						"path": "/app/errorPage/404",
						"children": []
					}
				]
			}
		]
		setAlitaState({stateName: 'menus', data: menus})

	}

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed
		})
	}

	render() {
		const {responsive = {data: {}}} = this.props
		return (
				<Layout style={{height: '100vh'}}>
					{!responsive.data.isMobile && <MenuCustom collapsed={this.state.collapsed}/>}
					<Layout style={{flexDirection: 'column'}}>
						<HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed}/>
						<Content style={{padding: 12, overflow: 'initial', WebkitOverflowScrolling: 'touch', flex: 1}}>
							<Routes/>
						</Content>
					</Layout>
				</Layout>
		)
	}
}

export default connectAlita(['responsive'])(App)
