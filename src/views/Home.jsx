import React from "react";
import BlogList from "./BlogList";
import NewestArticle from "./NewestArticle";
import HotArticle from "./HotArticle";
import { Layout } from "antd";

function Home () {
	const { Sider } = Layout

	return (
		<Layout style={{
			paddingTop: "10px",
			width: "50vw"
		}}>
			<BlogList />
			<Sider>
				<NewestArticle />
				<HotArticle />
			</Sider>
		</Layout>
	)
}

export default Home
