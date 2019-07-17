import React from 'react'
import {Layout, Icon, Menu, Dropdown, Popover} from 'antd'
import {connectAlita} from 'redux-alita'
import {withRouter} from 'react-router-dom'
import './index.less'
import {$cookie} from "../../utils/cookie"
import MenuCustom from '../Menu'
import ChangePwdModal from '../common/changePwdModal'

const {Header} = Layout

class HeaderCustom extends React.Component {
	state = {
		showChangePwdDodal: false,
		showMenu: false
	}

	showModal = () => {
		this.setState({
			showChangePwdDodal: true
		})
	}

	closeModal = () => {
		this.setState({
			showChangePwdDodal: false
		})
	}

	menuClick = e => {
		switch (e.key) {
			case '1':
				this.showModal()
				break
			case '2':
				this.logout()
				break
			default:
				return null
		}
	}

	changePwd = data => {
		console.log('changePwd', data)
		this.closeModal()
	}

	logout = () => {
		const {setAlitaState, history} = this.props
		setAlitaState({
			funcName: 'logout',
			params: {
				token: $cookie.get('token')
			}
		}).then(({data}) => {
			if (data && data.header === '000') {
				$cookie.remove('token')
				$cookie.remove('menu')
				history.push('/login')
			}
		})
	}

	menu = () => (
			<Menu onClick={this.menuClick}>
				<Menu.Item key="1">修改密码</Menu.Item>
				<Menu.Item key="2">退出</Menu.Item>
			</Menu>
	)

	popoverHide = () => {
		this.setState({
			showMenu: false
		})
	}

	handleVisibleChange = showMenu => {
		this.setState({ showMenu })
	}

	render() {
		const {responsive = {data: {}}} = this.props
		return (
				<Header className="header-custom">
					{
						responsive.data.isMobile ? (
								<Popover content={<MenuCustom popoverHide={this.popoverHide} />} trigger="click" placement="bottomLeft" visible={this.state.showMenu} onVisibleChange={this.handleVisibleChange}>
									<Icon type="bars" />
								</Popover>
								) : (
								<Icon
										type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
										onClick={this.props.toggle}
								/>
						)
					}

					<Dropdown overlay={this.menu} trigger={['click']}>
						<span className="ant-dropdown-link">
							 用户中心 <Icon type="down"/>
						</span>
					</Dropdown>
					<ChangePwdModal close={this.closeModal} ensure={this.changePwd} visible={this.state.showChangePwdDodal}/>
				</Header>
		)
	}
}

export default withRouter(connectAlita(['responsive'])(HeaderCustom))
