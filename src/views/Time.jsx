import React, {useEffect, useState} from "react";
import Timeline from "antd/es/timeline";
import Card from "antd/es/card";
import axios from "axios";

function getArticleList() {
	return axios.get('https://www.fastmock.site/mock/5a9f84630f3ede0293cf99c7f56c0644/blog/articleList')
}

function Time() {
	const [timeList, setTimeList] = useState([])
	const [show, setShow] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		getArticleList()
			.then(({data}) => {
				setTimeList(data.list)
				if (data.list.length === 0) {
					setShow(true)
				}
				setLoading(false)
			})
	}, [])

	return (
		<div style={{
			paddingTop: "10px"
		}}>
			<Timeline mode="alternate">
				{
					timeList.map(({ title, content, createTime }) => (
						<Timeline.Item label={ createTime }>
							<Card style={{width: 300, display: "inline-block", borderRadius: 3 }}
								  bodyStyle={{ padding: 15 }}
								  className={ 'card-box-shadow' }>
								<p style={{ fontWeight: "bold", fontSize: "16px" }}>
									{ title }
								</p>
								<div className={'overflow-dot'}>
									{ content }
								</div>
							</Card>
						</Timeline.Item>
					))
				}
			</Timeline>
		</div>
	)
}

export default Time
