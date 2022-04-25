import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Card, Empty } from "antd";
import { HistoryOutlined, ReadOutlined } from '@ant-design/icons';

function getArticleList () {
	return axios.get('https://www.fastmock.site/mock/5a9f84630f3ede0293cf99c7f56c0644/blog/articleList')
}

function Blog ({ blog }) {
	const hoverColor = { color: "rgba(0, 0, 0, 0.45)" }
	const buttonSpace = { marginRight: "5px" }
	const { Meta } = Card
	const { title, content, createTime } = blog
	return (<Card
		style={{
			width: '100%',
			marginBottom: '16px',
			borderColor: "transparent",
			cursor: "pointer",
			boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)"
		}}
		actions={[
			<span style={hoverColor}>
				<HistoryOutlined style={buttonSpace} />
				{ createTime }
			</span>,
			<span>
				<ReadOutlined style={buttonSpace} />
				阅读全文
			</span>
		]}>
		<Meta
			style={{
				textAlign: "tight",
				height: 80,
				overflow: 'hidden',
				textOverflow: "ellipsis",
				display: "-webkit-box",
				WebkitLineClamp: 2,
				WebkitBoxOrient: "vertical"
			}}
			title={ title }
			description={ content }/>
	</Card>)
}

function BlogList () {
	const [ dataList, setDataList ] = useState([])
	const [ show, setShow ] = useState(false)

	useEffect(() => {
		getArticleList()
			.then(({ data }) => {
				setDataList(data.list)
				if (data.list.length === 0) {
					setShow(true)
				}
			})
	}, [])

	return (
		<div>
			{
				dataList.map(blog => <Blog key={blog.id} blog={blog} />)
			}
			<Empty
				image={Empty.PRESENTED_IMAGE_SIMPLE}
				style={{
				display: !show && "none"
			}} />
		</div>
	)
}
export default BlogList
