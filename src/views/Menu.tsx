import React, {CSSProperties, useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {Col, Row, Input} from 'antd'

type Item = {
	name: string
	path: string
}

type ItemProps = {
	item: Item
}
function MenuItem({ item }:ItemProps) {
	const { name, path } = item
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const goto = (path:string) => () => {
		navigate(path)
	}
	const chooseItem = () => path === pathname
	const chooseTheme = 'black' // 选中菜单主题色
	const curMenuItemStyle = chooseItem() ? ( // 被选中的菜单颜色
		{
			color: chooseTheme,
			fontWeight: "bold"
		}
	) : {}
	const menuItemStyle = {
		marginLeft: '25px',
		cursor: 'pointer',
		fontSize: "14px",
		color: '#868686'
	}

	return (
		<div className={ 'hover-black' }
			 style={{...menuItemStyle, ...curMenuItemStyle }} onClick={goto(path)}>
			<span style={{
				borderBottom: `2px solid ${chooseTheme}`,
				borderBottomColor: chooseItem() ? chooseTheme : 'transparent'
			}}>
				{name}
			</span>
		</div>
	)
}

function MenuList({menuList = []}:{
	menuList: Array<Item>
}) {
	const sty:CSSProperties = {
		flexBasis: "500px",
		flexGrow: 1,
		display: "flex",
		justifyContent: "end"
	}

	return (
		<div style={ sty }>
			{
				menuList.map(
					(item, index) => <MenuItem key={index} item={item}/>
				)
			}
		</div>
	)
}

function Menu() {
	const [menuList] = useState([
		{name: '主页', path: '/'},
		{name: '目录', path: '/list'},
		// {name: '随笔', path: '/sticky'},
		{name: '日志', path: '/time'},
		{name: '留言', path: '/comment'},
		{name: '写作', path: '/write'},
	])

	const menuStyle = {
		display: 'flex',
		justifyContent: "space-between"
	}

	const wrapperStyle = {
		height: '50px',
		lineHeight: '50px'
	}

	const inputStyle:CSSProperties = {
		width: 300,
		height: '30px',
		transform: 'translateY(10px)',
		borderBottom: '1px solid #ccc',
		borderRadius: '0'
	}

	return (
		<div style={wrapperStyle}>
			<Row>
				<Col xs={{ span: 1 }} lg={{ span: 3 }} xxl={{ span: 6 }} />
				<Col xs={{ span: 22 }} lg={{ span: 18 }} xxl={{ span: 12 }}>
					<div style={menuStyle}>
						<Input placeholder="search your keywords" style={ inputStyle }  bordered={false} />
						<MenuList menuList={menuList}/>
					</div>
				</Col>
				<Col xs={{ span: 1 }} lg={{ span: 3 }} xxl={{ span: 6 }} />
			</Row>
		</div>
	)
}

export default Menu
