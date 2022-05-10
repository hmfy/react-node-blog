import 'assets/App.css';
import 'assets/media.scss';
import React from "react"
import AppLayout from 'views/Layout'
import 'dayjs/locale/zh-cn'
import moment from "dayjs";
import {setAddress} from "tools/tools";
moment.locale('zh-cn')

setAddress()

function App() {
	return <AppLayout />
}

export default App;
