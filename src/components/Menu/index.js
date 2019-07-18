import React from 'react'
import {Layout, Menu, Icon} from 'antd'
import {Link, withRouter} from 'react-router-dom'
import {connectAlita} from "redux-alita"
import './index.less'

class MenuCustom extends React.Component {

	static getDerivedStateFromProps(props, state) {
		const {pathname} = props.location
		const openKey = !props.collapsed ? pathname.substr(0, pathname.lastIndexOf('/')) : ''
		return {
			openKey: state.clickMenu ? state.openKey : openKey,
			selectedKey: pathname,
			clickMenu: false
		}
	}

	state = {
		mode: 'inline',
		openKey: '',
		selectedKey: '',
		clickMenu: false
	}

	menuClick = e => {
		this.setState({
			selectedKey: (e.path || e.key)
		})

		const { drawerHide } = this.props // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
		drawerHide && drawerHide()
	}

	openMenu = v => {
		this.setState({
			openKey: v[v.length - 1],
			clickMenu: true
		})
	}

	renderMenuItem = item => (
			<Menu.Item key={(item.path || item.key)}>
				<Link to={(item.path || item.key) + (item.query || '')}>
					{item.icon && <Icon type={item.icon}/>}
					<span className="nav-text">{item.title}</span>
				</Link>
			</Menu.Item>
	)

	renderSubMenu = item => (
			<Menu.SubMenu
					key={(item.path || item.key)}
					title={
						<span>
							{item.icon && <Icon type={item.icon}/>}
							<span className="nav-text">{item.title}</span>
					</span>
					}
			>
				{item.children.map(item => this.renderMenuItem(item))}
			</Menu.SubMenu>
	)

	render() {
		const {selectedKey, openKey} = this.state
		const {menus = {data: []}, collapsed} = this.props
		return (
				<Layout.Sider
						trigger={null}
						collapsed={collapsed}
						className="nav"
						width={256}
				>
					<div className="logo">{collapsed ? 'logo' : '后台管理'}</div>
					<Menu
							onClick={this.menuClick}
							mode="inline"
							theme="dark"
							selectedKeys={[selectedKey]}
							openKeys={[openKey]}
							onOpenChange={this.openMenu}
					>
						{
							menus.data.map(item => {
								return item.children.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
							})
						}
					</Menu>
				</Layout.Sider>
		)
	}
}

export default withRouter(connectAlita(['menus', 'responsive'])(MenuCustom))
