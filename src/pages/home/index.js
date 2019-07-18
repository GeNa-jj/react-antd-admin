import React from 'react'
import ReactEcharts from 'echarts-for-react'
import {Row, Col} from 'antd'


class Home extends React.Component {
	getOption = () => {
		return {
			title:{
				text:'用户骑行订单'
			},
			tooltip:{
				trigger:'axis'
			},
			xAxis:{
				data:['周一','周二','周三','周四','周五','周六','周日']
			},
			yAxis:{
				type:'value'
			},
			series:[
				{
					name:'订单量',
					type:'line',
					data:[100,200,150,300,200,120,80]
				}
			]
		}
	}

	onChartClick = (param, echarts) => {
		console.log(param, echarts)
	}
	onChartLegendselectchanged = (param, echarts) => {
		console.log(param, echarts)
	}
	render() {
		let onEvents={
			'click': this.onChartClick.bind(this),
			'legendselectchanged': this.onChartLegendselectchanged.bind(this)
		}
		return (
				<Row gutter={12}>
					{[1, 1, 1, 1].map((item, index) => (
							<Col xl={6} md={12} sm={24} key={index} style={{marginBottom: 12}}>
								<div style={{background: '#fff'}}>
									<ReactEcharts
											option={this.getOption()}
											notMerge={true}
											lazyUpdate={true}
											onEvents={onEvents}
											style={{width: '100%', height: 200}}
									/>
								</div>
							</Col>
					))}
				</Row>
		)
	}
}

export default Home
