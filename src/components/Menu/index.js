import React from 'react'
import {Layout, Menu, Icon} from 'antd'
import {Link, withRouter} from 'react-router-dom'
import {connectAlita} from "redux-alita"
import './index.less'

const {Sider} = Layout

class MenuCustom extends React.Component {
	static getDerivedStateFromProps(props, state) {
		if (props.collapsed !== state.collapsed) {
			const state1 = MenuCustom.setMenuOpen(props)
			const state2 = MenuCustom.onCollapse(props.collapsed)
			return {
				...state1,
				...state2,
				firstHide: state.collapsed !== props.collapsed && props.collapsed, // 两个不等时赋值props属性值否则为false
				openKey: state.openKey || (!props.collapsed && state1.openKey)
			}
		}
		return null
	}

	static setMenuOpen = props => {
		const {pathname} = props.location
		return {
			openKey: pathname.substr(0, pathname.lastIndexOf('/')),
			selectedKey: pathname
		}
	}
	static onCollapse = (collapsed) => {
		return {
			collapsed,
			mode: collapsed ? 'vertical' : 'inline'
		}
	}

	state = {
		mode: 'inline',
		openKey: '',
		selectedKey: '',
		firstHide: true  // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
	}

	componentDidMount() {
		const state = MenuCustom.setMenuOpen(this.props)
		this.setState(state)
	}

	menuClick = e => {
		this.setState({
			selectedKey: (e.path || e.key)
		})

		const { popoverHide } = this.props // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
		popoverHide && popoverHide()
	}
	openMenu = v => {
		this.setState({
			openKey: v[v.length - 1],
			firstHide: false
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
		const {selectedKey, openKey, firstHide, collapsed} = this.state
		const {menus = {data: []}, responsive = {data: {}}} = this.props
		return (
				<Sider
						trigger={null}
						collapsed={collapsed}
						className={`nav ${responsive.data.isMobile && 'popoverNav'}`}
				>
					<div className="logo">{collapsed ? 'logo' : '后台管理'}</div>
					<Menu
							onClick={this.menuClick}
							mode="inline"
							theme="dark"
							selectedKeys={[selectedKey]}
							openKeys={firstHide && !responsive.data.isMobile ? null : [openKey]}
							onOpenChange={this.openMenu}
					>
						{
							menus.data.map(item => {
								return item.children.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
							})
						}
					</Menu>
				</Sider>
		)
	}
}

export default withRouter(connectAlita(['menus', 'responsive'])(MenuCustom))
