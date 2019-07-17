import React from 'react'
import {Button} from 'antd'
import img from '../../assets/images/404.png'
import './index.less'

class NotFound extends React.Component {
	state = {
		animated: ''
	}

	enter = () => {
		this.setState({animated: 'hinge'})
	}

	render() {
		return (
				<div className="notFound">
					<img src={img} className={`animated swing ${this.state.animated}`} onMouseEnter={this.enter} alt=""/>
					<Button type="dashed" shape="round" style={{marginTop: 60}} href="/">
						Back to home
					</Button>
				</div>
		)
	}
}

export default NotFound
