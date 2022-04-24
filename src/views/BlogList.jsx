import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Card, Empty } from "antd";
import { HistoryOutlined, EnvironmentOutlined, ReadOutlined } from '@ant-design/icons';

function getArticleList () {
	return axios.get('https://www.fastmock.site/mock/5a9f84630f3ede0293cf99c7f56c0644/blog/articleList')
}

function Blog ({ blog }) {
	const hoverColor = { color: "rgba(0, 0, 0, 0.45)" }
	const buttonSpace = { marginRight: "10px" }
	const { Meta } = Card
	const { title, content, address, createTime } = blog
	return (<Card
		hoverable
		style={{ width: '100%', marginBottom: '20px' }}
		actions={[
			<span style={hoverColor}>
				<HistoryOutlined style={buttonSpace} />
				{ createTime }
			</span>,
			<span style={hoverColor}>
				<EnvironmentOutlined style={buttonSpace} />
				{ address }
			</span>,
			<span/>,
			<span>
				<ReadOutlined style={{
					marginRight: "10px"
				}} />
				阅读全文
			</span>
		]}>
		<Meta
			style={{
				height: 80,
				overflow: 'hidden',
				textOverflow: "ellipsis",
				display: "-webkit-box",
				"-webkit-line-clamp": 2,
				"-webkit-box-orient": "vertical"
			}}
			title={ title }
			description={ content }/>
	</Card>)
}

function BlogList () {
	const [ blogList, setBlogList ] = useState([])
	const [ show, setShow ] = useState(false)

	useEffect(() => {
		getArticleList()
			.then(({ data }) => {
				setBlogList(data.list)
				if (data.list.length === 0) {
					setShow(true)
				}
			})
	}, [])

	return (
		<div style={{
			width: "40vw",
			marginRight: "10px"
		}}>
			{
				blogList.map(blog => <Blog key={blog.id} blog={blog} />)
			}
			<Empty blogList style={{
				display: !show && "none"
			}} />
		</div>
	)
}
export default BlogList
