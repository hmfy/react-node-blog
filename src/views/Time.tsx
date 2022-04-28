import React, {ReactElement} from "react";
import axios from "axios";
import FLoading from "comps/FLoading";
import FEmpty from "comps/FEmpty";
import useRequest from "hooks/useRequest";
import { Card, Col, Row, Timeline } from "antd";

function getArticleList() {
	return axios.get('https://www.fastmock.site/mock/5a9f84630f3ede0293cf99c7f56c0644/blog/articleList')
}
type ItemProps = {
	id: number
	title?: string,
	content: string,
	createTime: string
}
function ItemCard({title, content}:ItemProps):ReactElement {
	return (<Card style={{width: "100%", display: "inline-block", borderRadius: 3, textAlign: "left"}}
				  bodyStyle={{padding: 15}}
				  className={'card-box-shadow'}>
		<p style={{
			fontWeight: "bold",
			fontSize: "16px",
			whiteSpace: "nowrap",
			overflow: "hidden",
			textOverflow: "ellipsis",
			marginBottom: 5
		}}>
			{title}
		</p>
		<div className={'overflow-dot'}>
			{content}
		</div>
	</Card>)
}

function Time() {
	const {empty, loading, dataList} = useRequest(getArticleList)

	return (
		<Row style={{ paddingTop: 10, minHeight: 300, width: "100%" }}>
			<Col xs={{ span: 1 }} lg={{ span: 2 }} xxl={{ span: 6 }} />
			<Col xs={{ span: 22 }} lg={{ span: 20 }} xxl={{ span: 12 }} >
				<Timeline mode="alternate">
					<FLoading show={loading}/>
					{
						dataList.map(timeItem => (
							<Timeline.Item label={timeItem['createTime']}>
								<ItemCard {...timeItem} />
							</Timeline.Item>
						))
					}
					<FEmpty show={empty}/>
				</Timeline>
			</Col>
			<Col xs={{ span: 1 }} lg={{ span: 2 }} xxl={{ span: 6 }} />
		</Row>
	)
}

export default Time
