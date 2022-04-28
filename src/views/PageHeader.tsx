import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {Col, Row, Input} from 'antd'

const wrapperStyle = {
	height: '50px',
	lineHeight: '50px'
}

const menuStyle = {
	display: 'flex',
	justifyContent: "space-between"
}

const menuItemStyle = {
	marginLeft: '25px',
	cursor: 'pointer',
	fontSize: "14px",
	color: '#868686'
}

type Item = {
	name: string
	path: string
}

type ItemProps = {
	item: Item
}
function MenuItem({ item }:ItemProps) {
	const { name, path } = item
	const [hover, setHover] = useState(true)
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const goto = (path:string) => () => {
		navigate(path)
	}
	const curRouter = path === pathname
	const controlHover = (val:boolean) => () => setHover(val || curRouter)
	const chooseItem = () => hover && curRouter
	const chooseTheme = 'white'
	const curMenuItemStyle = chooseItem() ? (
		{
			color: chooseTheme
		}
	) : {}

	return (
		<div onMouseEnter={controlHover(true)} onMouseLeave={controlHover(false)}
			 style={{...menuItemStyle, ...curMenuItemStyle }} onClick={goto(path)}>
			<span style={{
				borderBottom: `1px solid ${chooseTheme}`,
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
	return (
		<div style={{
			flexBasis: "500px",
			flexGrow: 1,
			display: "flex",
			justifyContent: "end"
		}}>
			{
				menuList.map(
					(item, index) => <MenuItem key={index} item={item}/>
				)
			}
		</div>
	)
}

function PageHeader() {
	const [menuList] = useState([
		{name: '主页', path: '/'},
		{name: '日志', path: '/time'},
		{name: '留言', path: '/sticky'},
		{name: '目录', path: '/article'},
	])

	return (
		<div style={wrapperStyle}>
			<Row>
				<Col xs={{ span: 1 }} lg={{ span: 3 }} xxl={{ span: 6 }} />
				<Col xs={{ span: 22 }} lg={{ span: 18 }} xxl={{ span: 12 }}>
					<div style={menuStyle}>
						<Input placeholder="search your keywords" style={{
							color: "#ccc",
							width: 300,
							height: '30px',
							transform: 'translateY(10px)',
							borderBottom: '1px solid #ccc',
							borderRadius: '0'
						}}  bordered={false} />
						<MenuList menuList={menuList}/>
					</div>
				</Col>
				<Col xs={{ span: 1 }} lg={{ span: 3 }} xxl={{ span: 6 }} />
			</Row>
		</div>
	)
}

export default PageHeader