import 'assets/App.css';
import 'assets/media.scss';
import React from "react"
import AppLayout from 'views/Layout'
import 'dayjs/locale/zh-cn'
import moment from "dayjs";
import {setAddress} from "tools/tools";
import ConfigProvider from "antd/es/config-provider";
import {BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from "./store/index"
import Home from "views/Home";
import IsComment from "views/IsComment";
import Time from "views/Time";
import ImgZip from "views/ImgZip";
import Login from "views/Login";
import ArticleDetail from "views/ArticleDetail";
import Personal from "views/Personal";
import ArticleList from "views/ArticleList";
import WriteArticle from "views/WriteArticle";
moment.locale('zh-cn')

setAddress()

function App() {
	return <ConfigProvider renderEmpty={() => <span/>}>
		<Provider store={store}>
			<Router>
				<Routes>
					{/*<Route path="*" element={<Navigate to="/" />} />*/}
					<Route path="/" element={
						<AppLayout />
					}>
						<Route index element={
							<Home/>
						}/>
						<Route path="comment" element={
							<IsComment/>
						}/>
						<Route path="time" element={
							<Time/>
						}/>
						<Route path="detail" element={
							<ArticleDetail/>
						}/>
						<Route path="personal" element={ <Personal/> }>
							<Route index element={ <ArticleList /> } />
							<Route path='article' element={ <ArticleList /> } />
						</Route>
						<Route path='list' element={ <ArticleList /> } />
					</Route>
					<Route path="zip" element={
						<ImgZip/>
					}/>
					<Route path="login" element={
						<Login />
					}/>
					<Route path="write" element={
						<WriteArticle/>
					}/>
				</Routes>
			</Router>
		</Provider>
	</ConfigProvider>
}

export default App;
