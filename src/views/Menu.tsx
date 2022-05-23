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

	return (
		<div className={ 'hover-black title-font' }
			 style={{...menuItemStyle, ...curMenuItemStyle }} onClick={goto(path)}>
			<span>
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
		<div style={ sty } className='fxs-space-between'>
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
		{name: '日志', path: '/time'},
		{name: '留言', path: '/comment'},
		// {name: '随笔', path: '/sticky'},
		// {name: '写作', path: '/write'},
	])

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
					<MenuList menuList={menuList}/>
				</Col>
				<Col xs={{ span: 0 }} lg={{ span: 3 }} xxl={{ span: 6 }} />
			</Row>
		</div>
	)
}

export default Menu
