import React from 'react'
import BreadcrumbCustom from '../../components/Breadcrumb'
import {Table, Divider, Tag} from 'antd'
import Pagination from '../../components/Pagination'

const data = [
	{
		key: '1',
		firstName: 'John',
		lastName: 'Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		tags: ['nice', 'developer'],
	},
	{
		key: '2',
		firstName: 'Jim',
		lastName: 'Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		tags: ['loser'],
	},
	{
		key: '3',
		firstName: 'Joe',
		lastName: 'Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	}
]

for (let i = 4; i < 10; i++) {
	data.push({
		key: i,
		firstName: 'Joe',
		lastName: 'Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	})
}

class Text extends React.Component {
	state = {
		total: 13,
		pageNum: 1,
		pageSize: 10
	}
	pageChange = (pageNum, pageSize) => {
		this.setState({
			pageNum,
			pageSize
		}, () => {
			// TODO something
			console.log(this.state)
		})
	}

	render() {
		return (
				<div className="container">
					<BreadcrumbCustom first="权限测试" second="table" />
					<Table dataSource={data} pagination={false} bordered>
						<Table.Column title="First Name" dataIndex="firstName" key="firstName"/>
						<Table.Column title="Last Name" dataIndex="lastName" key="lastName"/>
						<Table.Column title="Age" dataIndex="age" key="age"/>
						<Table.Column title="Address" dataIndex="address" key="address"/>
						<Table.Column
								title="Tags"
								dataIndex="tags"
								key="tags"
								render={tags => (
										<span>
          						{tags.map(tag => (
													<Tag color="blue" key={tag}>
														{tag}
													</Tag>
											))}
        						</span>
								)}
						/>
						<Table.Column
								title="Action"
								key="action"
								render={(text, record) => (
										<span>
											<span>Invite {record.lastName}</span>
											<Divider type="vertical"/>
											<span>Delete</span>
										</span>
								)}
						/>
					</Table>
					<Pagination total={this.state.total} pageChange={this.pageChange} />
				</div>
		)
	}
}

export default Text
