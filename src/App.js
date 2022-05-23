import 'assets/App.css';
import 'assets/media.scss';
import React from "react"
import AppLayout from 'views/Layout'
import 'dayjs/locale/zh-cn'
import moment from "dayjs";
import {setAddress} from "tools/tools";
import ConfigProvider from "antd/es/config-provider";
import {BrowserRouter as Router} from "react-router-dom";
moment.locale('zh-cn')

setAddress()

function App() {
	return <ConfigProvider renderEmpty={() => <span/>}>
		<Router>
			<AppLayout />
		</Router>
	</ConfigProvider>
}

export default App;
