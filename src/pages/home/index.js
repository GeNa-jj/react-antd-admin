import React from 'react'
import ReactEcharts from 'echarts-for-react'
import {Row, Col, Card, Icon, Tooltip, Statistic, Tabs, DatePicker} from 'antd'
import {connectAlita} from 'redux-alita'
import './index.less'
import {toThousandFilter} from '../../utils'
import moment from 'moment'
class Home extends React.Component {
	state = {
		echartsLoading: false,
		dateKey: [
			{
				name: '今日',
				value: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
				active: true
			},
			{
				name: '本周',
				value: [moment().week(moment().week()).startOf('week').format('YYYY-MM-DD'), moment().week(moment().week()).endOf('week').format('YYYY-MM-DD')],
				active: false
			},
			{
				name: '本月',
				value: [moment().month(moment().month()).startOf('month').format('YYYY-MM-DD'), moment().month(moment().month()).endOf('month').format('YYYY-MM-DD')],
				active: false
			},
			{
				name: '全年',
				value: [moment().year(moment().year()).startOf('year').format('YYYY-MM-DD'), moment().year(moment().year()).endOf('year').format('YYYY-MM-DD')],
				active: false
			}
		],
		defaultValue: [moment(), moment()]
	}

	getOption = () => {
		return {
			tooltip: {
				trigger: 'axis'
			},
			xAxis: {
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
				boundaryGap: false,
				show: false,
				axisPointer: {
					type: 'none'
				}
			},
			yAxis: {
				type: 'value',
				minInterval: 1,
				show: false
			},
			grid: {
				left: 6,
				right: 6,
				top: 10,
				bottom: 0
			},
			series: [
				{
					name: '访问量',
					type: 'line',
					smooth: true,
					itemStyle: {
						normal: {
							areaStyle: {type: 'default'},
							color: '#5AADF1'
						}
					},
					data: [100, 200, 150, 300, 200, 120, 80]
				}
			]
		}
	}

	getOption1 = () => {
		return {
			tooltip: {
				trigger: 'axis'
			},
			xAxis: {
				data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
				axisPointer: {
					type: 'none'
				}
			},
			yAxis: {
				type: 'value',
				minInterval: 1
			},
			grid: {
				left: 40,
				right: 0,
				top: 20,
				bottom: 50
			},
			series: [
				{
					name: '数量',
					type: 'bar',
					itemStyle: {
						normal: {
							color: '#5AADF1'
						}
					},
					data: [1000, 2000, 150, 3000, 200, 1200, 800, 1000, 200, 1500, 300, 200]
				}
			]
		}
	}

	getOption2 = () => {
		return {
			tooltip : {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				orient: 'vertical',
				x: 'right',
				y: 'cenetr',
				data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
			},
			grid: {
				left: 40,
				right: 0,
				top: 20,
				bottom: 50
			},
			series: [
				{
					name:'访问来源',
					type:'pie',
					center: ['40%', '45%'],
					radius: ['50%', '70%'],
					label: {
						normal: {
							show: false,
							position: 'center'
						},
						emphasis: {
							show: true,
							textStyle: {
								fontSize: '18',
								fontWeight: 'bold'
							}
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data:[
						{value:335, name:'直接访问'},
						{value:310, name:'邮件营销'},
						{value:234, name:'联盟广告'},
						{value:135, name:'视频广告'},
						{value:1548, name:'搜索引擎'}
					]
				}
			]
		}
	}

	getRangeDate = (date, dateString) => {
		const {dateKey} = this.state
		dateKey.forEach(item => {
			item.active = false
			if (item.value[0] === dateString[0] && item.value[1] === dateString[1]) item.active = true
		})
		this.setState({dateKey})
	}

	selDate = defaultValue => {
		const {dateKey} = this.state
		dateKey.forEach(item => {
			item.active = false
			if (item.value[0] === defaultValue[0] && item.value[1] === defaultValue[1]) item.active = true
		})
		this.setState({
			dateKey,
			defaultValue: [moment(defaultValue[0], 'YYYY-MM-DD'), moment(defaultValue[1], 'YYYY-MM-DD')]
		})
	}

	render() {
		const {responsive = {data: {}}} = this.props
		return (
				<div className="home">
					<Row gutter={24} className="chartTop">
						{[...Array(4).keys()].map((item, index) => (
								<Col xl={6} lg={12} md={12} sm={12} xs={24} key={index} style={{marginBottom: 24}}>
									<Card loading={this.state.echartsLoading} bordered={false} bodyStyle={{padding: '20px 24px 8px'}}>
										<div className="contain">
											<div className="t">
												<Statistic title={(
														<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
															<span>访问量</span>
															<Tooltip placement="top" title="指标说明">
																<Icon type="info-circle"/>
															</Tooltip>
														</div>
												)} value={8818} />
											</div>
											<div className="c">
												<ReactEcharts
														option={this.getOption()}
														notMerge={true}
														lazyUpdate={true}
														style={{width: '100%', height: '100%'}}
												/>
											</div>
											<div className="b">
												<span>日访问量</span>
												<span>{toThousandFilter(1234)}</span>
											</div>
										</div>

									</Card>
								</Col>
						))}
					</Row>
					<Card bodyStyle={{padding: 0}} className="chartCenter">
						<Tabs size="large" defaultActiveKey="0" tabBarStyle={{paddingLeft: 16}} tabBarExtraContent={
							responsive.data.clientWidth > 576 && (
								<div>
									{
										responsive.data.clientWidth > 768 && (
												<ul>
													{this.state.dateKey.map((item, index) => (
															<li key={index}><span className={item.active ? 'active' : ''} onClick={() => {
																this.selDate(item.value)
															}}>{item.name}</span></li>
													))}
												</ul>
										)
									}
									<DatePicker.RangePicker style={{width: 256}} onChange={this.getRangeDate} value={this.state.defaultValue} format="YYYY-MM-DD"/>
								</div>
							)
						}>
							{['销售额', '访问量'].map((item, index) => (
									<Tabs.TabPane tab={item} key={index}>
										<Row>
											<Col xl={16} lg={12} md={12} sm={24} xs={24} style={{height: 254, padding: '0 32px 32px'}}>
												<h4>{item}趋势</h4>
												<ReactEcharts
														option={this.getOption1()}
														notMerge={true}
														lazyUpdate={true}
														style={{width: '100%', height: '100%'}}
												/>
											</Col>
											<Col xl={8} lg={12} md={12} sm={24} xs={24} style={{height: 254, padding: '0 32px 32px'}}>
												<h4>{item}</h4>
												<ReactEcharts
														option={this.getOption2()}
														notMerge={true}
														lazyUpdate={true}
														style={{width: '100%', height: '100%'}}
												/>
											</Col>
										</Row>
									</Tabs.TabPane>
							))}
						</Tabs>
					</Card>
				</div>

		)
	}
}

export default connectAlita(['responsive'])(Home)
