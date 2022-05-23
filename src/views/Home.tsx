import React from "react";
import BlogList from "./BlogList";
import NewArticle from "./NewArticle";
import { Layout, Col, Row } from "antd";

function Home () {
	const { Sider } = Layout

	return (
		<Layout>
			<Row gutter={ 16 } style={{
				width: "100%"
			}}>
				<Col xs={{ span: 0 }} lg={{ span: 2 }} xxl={{ span: 5 }} />
				<Col xs={{ span: 22, offset: 1 }} lg={{ span: 12, offset: -2 }} xxl={{ span: 12 }} >
					<BlogList />
				</Col>
				<Col xs={{ span: 0 }} lg={{ span: 6 }} xxl={{ span: 5 }} >
					<Sider style={{
						position: "sticky",
						top: 66,
						zIndex: 1
					}}>
						<NewArticle />
						<div style={{
							marginTop: 20
						}}>
							<a rel="noreferrer" href={'http://beian.miit.gov.cn/'} target={'_blank'} style={{ color: "var(--tips-light)" }}>
								鄂ICP备19010491号
							</a>
						</div>
						<div>
							<a rel="noreferrer" href={'http://beian.miit.gov.cn/'} target={'_blank'} style={{ color: "var(--tips-light)" }}>
								鄂公网安备 42112302000086号
							</a>
						</div>
					</Sider>
				</Col>
			</Row>
		</Layout>
	)
}

export default Home
