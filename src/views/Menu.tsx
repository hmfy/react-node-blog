import React, {CSSProperties, Dispatch, ReactNode, SetStateAction, useEffect, useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {Col, Row, Input, Modal, message} from 'antd'
import {getLogin, getUserInfo} from "tools/tools";
import { UserOutlined } from "@ant-design/icons";

type Item = {
	name: ReactNode | string
	path: string
}

type ItemProps = {
	item: Item
	setLogin: Dispatch<SetStateAction<boolean>>
}
function MenuItem({ item }:ItemProps) {
	const { name, path } = item
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const chooseItem = () => path === pathname
	const curMenuItemStyle = chooseItem() ? ( // 被选中的菜单颜色
		{
			color: "#000",
			fontWeight: "bold",
			fontSize: "20px"
		}
	) : {}
	const menuItemStyle = {
		marginLeft: '25px',
		cursor: 'pointer',
		fontSize: "18px"
	}

	const loginOrQuit = () => {
		if (path !== '/login') return navigate(path)
		if (getLogin()) {
			const { ID, name } = getUserInfo()
			console.log(name)
			return navigate('/personal', {
				replace: false,
				state: { ID, name }
			})
		} else {
			navigate('/login', { replace: false })
		}
	}

	return (
		<div className={ 'hover-black' }
			 style={{...menuItemStyle, ...curMenuItemStyle }} onClick={ () => loginOrQuit() }>
			{name}
		</div>
	)
}

function MenuList({menuList = [], setLogin}:{
	menuList: Array<Item>
	setLogin:Dispatch<SetStateAction<boolean>>
}) {
	const sty:CSSProperties = {
		flexBasis: "500px",
		flexGrow: 1,
		display: "flex",
		justifyContent: "end"
	}

	return (
		<div style={ sty } className='fxs-space-between'>
			{
				menuList.map(
					(item, index) => <MenuItem key={index} item={item} setLogin={setLogin}/>
				)
			}
		</div>
	)
}

function Menu() {
	const [isLogin, setLogin] = useState(getLogin())
	const [menuList, setMenuList] = useState([
		{name: <span>主页</span>, path: '/'},
		{name: <span>目录</span>, path: '/list'},
		{name: <span>日志</span>, path: '/time'},
		{name: <span>留言</span>, path: '/comment'},
		// {name: '随笔', path: '/sticky'},
		// {name: '写作', path: '/write'},
	])

	const headImg = (<img style={{
		width: "30px",
		height: "30px",
		display: "inline-block",
		borderRadius: "50%",
		objectFit: "cover"
	}} src='https://fyang.fun/files/coll.png'  alt=''/>)

	useEffect(() => {
		if (isLogin) {
			setMenuList([ ...menuList.slice(0, 4), {name: headImg, path: '/login'} ])
		} else {
			setMenuList([ ...menuList.slice(0, 4), {name: <UserOutlined />, path: '/login'} ])
		}
	}, [isLogin])

	const wrapperStyle = {
		height: '50px',
		lineHeight: '50px'
	}

	const inputStyle:CSSProperties = {
		width: 300,
		height: '30px',
		borderBottom: '1px solid var(--tips)',
		borderRadius: '0'
	}

	return (
		<div style={wrapperStyle}>
			<Row>
				<Col xs={{ span: 0 }} lg={{ span: 3 }} xxl={{ span: 6 }} />
				<Col xs={{ span: 0 }} lg={{ span: 9 }} xxl={{ span: 6 }}>
					<Input placeholder="search your keywords" style={ inputStyle }  bordered={false} />
				</Col>
				<Col xs={{ span: 22 }} lg={{ span: 9 }} xxl={{ span: 6 }}>
					<MenuList menuList={menuList} setLogin={setLogin}/>
				</Col>
				<Col xs={{ span: 0 }} lg={{ span: 3 }} xxl={{ span: 6 }} />
			</Row>
		</div>
	)
}

export default Menu
