import React from 'react'
import BreadcrumbCustom from '../../components/Breadcrumb'

class Text extends React.Component {
	render() {
		return (
				<div className="container">
					<BreadcrumbCustom first="权限测试" second="有权限" />
					<div>123</div>
				</div>
		)
	}
}

export default Text
