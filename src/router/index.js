import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import {MenusConfig} from './config'
import queryString from 'query-string'
import {connectAlita} from "redux-alita"

class CRouter extends React.Component {
	render() {
		const {menus = {data: []}} = this.props
		const allMenus = {
			menus: menus.data,
			others: [] // 非菜单相关路由
		}
		return (
				<Switch>
					{
						Object.keys(allMenus).map(key =>
								allMenus[key].map(r => {
									const route = r => {
										let Component = null
										MenusConfig.forEach(item => {
											if (item.path === r.path) Component = item.component
										})
										return (
												<Route
														key={r.path}
														exact
														path={r.path}
														render={props => {
															const reg = /\?\S*/g
															// 匹配?及其以后字符串
															const queryParams = props.location.search.match(reg)
															// 去除?的参数
															const {params} = props.match
															Object.keys(params).forEach(key => {
																params[key] = params[key] && params[key].replace(reg, '')
															})
															props.match.params = {...params}
															const merge = {...props, query: queryParams ? queryString.parse(queryParams[0]) : {}}
															// 重新包装组件
															return Component ? (
																	<DocumentTitle title={r.title}>
																		<Component {...merge} />
																	</DocumentTitle>
															) : (<Redirect to="/404" />)
														}}
												/>
										)
									}
									return (r.children && r.children.length === 0) ? route(r) : r.children.map(r => route(r))
								})
						)
					}
					<Route render={() => <Redirect to="/404" />}/>
				</Switch>
		)
	}
}

export default connectAlita(['menus'])(CRouter)
