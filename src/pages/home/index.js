import React from 'react'
import { Button } from 'antd'
import BreadcrumbCustom from '../../components/Breadcrumb'

class Home extends React.Component {
	render() {
		return (
				<div className="container">
					<BreadcrumbCustom />
					<div><Button type="primary">Button</Button></div>
				</div>
		)
	}
}

export default Home
