import React from 'react'
import axios from 'axios'
import {Card} from "antd";
import {HistoryOutlined, ReadOutlined} from '@ant-design/icons';
import FEmpty from "comps/FEmpty";
import FLoading from "comps/FLoading";
import useRequest from "hooks/useRequest";

function getArticleList() {
	return axios.get('https://www.fastmock.site/mock/5a9f84630f3ede0293cf99c7f56c0644/blog/articleList')
}

type BlogProps = {
	id: number
	title?: string,
	content: string,
	createTime: string
}
function Blog({title, content, createTime}:BlogProps) {
	const hoverColor:object = {color: "rgba(0, 0, 0, 0.45)"}
	const buttonSpace:object = {marginRight: "5px"}
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
	const { empty, loading, dataList } = useRequest(getArticleList)

	return (
		<div style={{
			position: "relative",
			minHeight: "500px"
		}}>
			<FLoading show={ loading } />
			{
				dataList.map(blog => <Blog key={blog['id']} {...blog}/>)
			}
			<FEmpty show={empty} />
		</div>
	)
}

export default BlogList
