import React from "react";
import { Layout } from "antd";
import PageFooter from "views/PageFooter";
import PageHeader from "views/PageHeader";
import {Route, Routes, useLocation} from "react-router-dom";
import Home from "views/Home";
import ImgZip from "views/ImgZip";
import Article from "views/Article";
import Sticky from "views/Sticky";
import Time from "views/Time";
const { Header, Footer, Content } = Layout;

function AppLayout () {

	const { pathname } = useLocation()

	return (
		<Layout>
			<Header style={{
				display: pathname === '/zip' && "none",
				// backgroundColor: "black",
				color: "white"
			}}>
				<PageHeader />
				<div style={{
					height: 150,
					position: "relative",
					display: window.navigator.userAgent.includes('Mobile') && 'none',
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
			<Content style={{
				width: "100%",
				marginBottom: "50px"
			}}>
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
