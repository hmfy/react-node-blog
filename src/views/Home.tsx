import React from "react";
import BlogList from "./BlogList";
import NewArticle from "./NewArticle";
import HotArticle from "./HotArticle";
import { Layout, Col, Row } from "antd";

function Home () {
	const { Sider } = Layout

	return (
		<Layout style={{
			paddingTop: "10px"
		}}>
			<Row gutter={ 16 } style={{
				width: "100%"
			}}>
				<Col xs={{ span: 0 }} lg={{ span: 2 }} xxl={{ span: 5 }} />
				<Col xs={{ span: 22, offset: 1 }} lg={{ span: 12, offset: -2 }} xxl={{ span: 12 }} >
					<BlogList />
				</Col>
				<Col xs={{ span: 0 }} lg={{ span: 6 }} xxl={{ span: 5 }} >
					<Sider>
						<NewArticle />
						<HotArticle />
					</Sider>
				</Col>
			</Row>
		</Layout>
	)
}

export default Home
