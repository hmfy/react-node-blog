import React from "react";
import { Layout } from "antd";
import PageFooter from "./PageFooter";
import PageHeader from "./PageHeader";
import {Route, Routes, useLocation} from "react-router-dom";
import Home from "./Home";
import ImgZip from "./ImgZip";
import Article from "./Article";
import Sticky from "./Sticky";
import Time from "./Time";
const { Header, Footer, Content } = Layout;

function AppLayout () {
	const contentStyle = {
		margin: "0 auto"
	}

	const { pathname } = useLocation()

	return (
		<Layout>
			<Header style={{
				display: pathname === '/zip' && "none"
			}}>
				<PageHeader />
				<div style={{
					height: 150,
					position: "relative"
				}}>
					<img src={'https://fyang.fun/files/ocean.jpg'} style={{
						width: '100%',
						height: 150,
						objectFit: "cover",
						// objectPosition: "top"
					}} alt=""/>
					<div style={{
						position: "absolute",
						top: "30%",
						color: "#ccc",
						fontSize: "24px",
						left: "50%",
						transform: "translateX(-50%)"
					}}>
						{/*welcome to my home*/}
					</div>
				</div>
			</Header>
			<Content style={contentStyle}>
				<Routes>
					<Route path="/" element={
						<Home/>
					}/>
					<Route path="/article" element={
						<Article />
					} />
					<Route path="/sticky" element={
						<Sticky />
					} />
					<Route path="/time" element={
						<Time />
					} />
					<Route path="/zip" element={
						<ImgZip />
					} />
				</Routes>
			</Content>
			<Footer>
				<PageFooter />
			</Footer>
		</Layout>
	)
}

export default AppLayout
