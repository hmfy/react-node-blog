import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Input } from 'antd'

const wrapperStyle = {
	height: '50px',
	lineHeight: '50px',
	borderBottom: "2px solid #e7e6e6"
}

const menuStyle = {
	width: '40vw',
	margin: '0 auto',
	display: 'flex',
	justifyContent: "end"
}

const menuItemStyle = {
	marginLeft: '35px',
	cursor: 'pointer',
	fontSize: "16px",
	color: '#b1b1b1'
}

function MenuItem({ item }) {
	const { name, path } = item
	const [hover, setHover] = useState(true)
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const goto = path => () => {
		navigate(path)
	}
	const curRouter = path === pathname
	const controlHover = val => () => setHover(val || curRouter)
	const chooseItem = () => hover && curRouter
	const chooseTheme = 'black'
	const curMenuItemStyle = chooseItem() ? (
		{
			color: 'black',
			fontWeight: 'bold'
		}
	) : {}

	return (
		<div onMouseEnter={controlHover(true)} onMouseLeave={controlHover(false)}
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

function MenuList({menuList = []}) {
	return (
		menuList.map(
			(item, index) => <MenuItem key={index} item={item}/>
		)
	)
}

function PageHeader() {
	const [menuList] = useState([
		{name: '主页', path: '/'},
		{name: '目录', path: '/article'},
		{name: '随笔', path: '/sticky'},
		{name: '时间线', path: '/time'}
	])

	return (
		<div style={wrapperStyle}>
			<div style={menuStyle}>
				<Input placeholder="search your keywords" style={{
					width: 300,
					height: '30px',
					transform: 'translateY(10px)',
					borderBottom: '1px solid #cccccc',
					borderRadius: '0'
				}}  string='' bordered={false} />
				<MenuList menuList={menuList}/>
			</div>
		</div>
	)
}

export default PageHeader
