import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Card, Empty, Spin} from "antd";
import {HistoryOutlined, ReadOutlined} from '@ant-design/icons';

function getArticleList() {
	return axios.get('https://www.fastmock.site/mock/5a9f84630f3ede0293cf99c7f56c0644/blog/articleList')
}

function Blog({blog}) {
	const hoverColor = {color: "rgba(0, 0, 0, 0.45)"}
	const buttonSpace = {marginRight: "5px"}
	const {Meta} = Card
	const {title, content, createTime} = blog
	return (<Card
		style={{
			width: '100%',
			marginBottom: '16px',
			cursor: "pointer"
		}}
		className={ 'card-box-shadow'  }
		actions={[
			<span style={hoverColor}>
				<HistoryOutlined style={buttonSpace}/>
				{createTime}
			</span>,
			<span>
				<ReadOutlined style={buttonSpace}/>
				阅读全文
			</span>
		]}>
		<p style={{ fontWeight: "bold", fontSize: "16px" }}>
			{ title }
		</p>
		<div className={'overflow-dot'}>
			{ content }
		</div>
	</Card>)
}

function BlogList() {
	const [dataList, setDataList] = useState([])
	const [show, setShow] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		getArticleList()
			.then(({data}) => {
				setDataList(data.list)
				if (data.list.length === 0) {
					setShow(true)
				}
				setLoading(false)
			})
	}, [])

	return (
		<div style={{
			position: "relative",
			minHeight: "500px"
		}}>
			<Spin
				size={'large'}
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					display: !loading && "none"
				}}/>
			{
				dataList.map(blog => <Blog key={blog.id} blog={blog}/>)
			}
			<Empty
				image={Empty.PRESENTED_IMAGE_SIMPLE}
				style={{
					display: !show && "none"
				}}/>
		</div>
	)
}

export default BlogList
