import React, {CSSProperties, ReactNode, useEffect, useState} from 'react'
import {useNavigate, useLocation, Link} from 'react-router-dom'
import {Col, Row, Input, Modal, message, Menu as AtdMenu, Dropdown} from 'antd'
import {UserOutlined} from "@ant-design/icons";

import {RootState} from "../store/";
import {useDispatch, useSelector} from "react-redux";
import {quit} from "../store/reducer/loginSlice";

type Item = {
    name: ReactNode | string
    path: string
}

function MenuList({menuList = []}: {
    menuList: Array<Item>
}) {
    const sty: CSSProperties = {
        flexBasis: "500px",
        flexGrow: 1,
        display: "flex",
        justifyContent: "end"
    }

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const quitUser = () => {
		Modal.warning({
			keyboard: false,
			okText: "确定",
			closable: true,
			centered: true,
			content: '确认退出登录吗？',
			onOk() {
				message.success('已退出登录', 1).then(res => {
					dispatch(quit())
					navigate('/')
				})
			},
			onCancel() {
			}
		})
	}

    const isLogin = useSelector((state:RootState) => state.isLogin.value)
    const { name, ID } = useSelector((state:RootState) => state.userInfo.value)
    const [ dropDownItem, setDropDownItem ] = useState<Array<{ key:string, label: ReactNode, danger?: boolean }>>([{
		key: '1',
		label: (
			<Link to='/login'>去登录</Link>
		),
	}])
    const menu = <AtdMenu items={dropDownItem}/>
	useEffect(() => {
		if (isLogin) {
			setDropDownItem([
				{
					key: '1',
					label: (
						<Link to='/personal'>个人中心</Link>
					),
				},
				{
					key: '2',
					label: (
						<Link to='/write'>发布文章</Link>
					),
				},
				{
					key: '3',
					label: (
						<Link to='/list'>文章列表</Link>
					),
				},
				{
					key: '4',
					danger: true,
					label: <div onClick={() => quitUser()}>退出登录</div>,
				},
			])
		} else {
			setDropDownItem([
				{
					key: '1',
					label: (
						<Link to='/login'>去登录</Link>
					),
				}
			])
		}
	}, [ isLogin ])

	const [ curMenu, setCurMenu ] = useState('/')
    const changeMenu = (path:string) => {
		setCurMenu(path)
		navigate(path)
	}
	const menuItemStyle = {
		marginLeft: '25px',
		cursor: 'pointer',
		fontSize: "18px"
	}
	const loginState = useSelector((state: RootState) => state.isLogin.value)
	const goto = () => {
		if (loginState) return navigate('/personal')
		navigate('/login')
	}

    return (
        <div style={sty} className='fxs-space-between'>
            {
                menuList.map((item, index) => {
                    if (item.path === '/login') {
                        return <Dropdown key={index} overlay={menu} placement="bottomRight">
							<div style={{ ...menuItemStyle, textDecoration: "underline", fontSize: "14px" }}>
								{ item.name }
							</div>
                        </Dropdown>
                    } else {
                        return <div className={`hover-black ${ curMenu === item.path ? 'selected' : '' }`}  key={index}
									style={{...menuItemStyle}} onClick={() => changeMenu(item.path)}>
							{ item.name }
						</div>
                    }
                })
            }
        </div>
    )
}

function Menu() {
    const loginState = useSelector((state: RootState) => state.isLogin.value)
	const { ID, name } = useSelector((state:RootState) => state.userInfo.value)

    const [menuList, setMenuList] = useState([
        {name: "主页", path: '/'},
        {name: "日志", path: '/time'},
        {name: "留言", path: '/comment'},
        // {name: '随笔', path: '/sticky'},
        // {name: '写作', path: '/write'},
    ])

    const headImg = (<img style={{
        width: "30px",
        height: "30px",
        display: "inline-block",
        borderRadius: "50%",
        objectFit: "cover"
    }} src='https://fyang.fun/files/coll.png' alt=''/>)

    useEffect(() => {
        if (loginState) {
            setMenuList([...menuList.slice(0, 3), {name: name, path: '/login'}])
        } else {
            setMenuList([...menuList.slice(0, 3), {name: '登录', path: '/login'}])
        }
    }, [loginState])

    const wrapperStyle = {
        height: '5vh',
        lineHeight: '5vh'
    }

    const inputStyle: CSSProperties = {
        width: 300,
        height: '30px',
        borderBottom: '1px solid var(--tips)',
        borderRadius: '0'
    }

    return (
        <div style={wrapperStyle}>
            <Row>
                <Col xs={{span: 0}} lg={{span: 3}} xxl={{span: 6}}/>
                <Col xs={{span: 0}} lg={{span: 9}} xxl={{span: 6}}>
                    <Input placeholder="search your keywords" style={inputStyle} bordered={false}/>
                </Col>
                <Col xs={{span: 22}} lg={{span: 9}} xxl={{span: 6}}>
                    <MenuList menuList={menuList}/>
                </Col>
                <Col xs={{span: 0}} lg={{span: 3}} xxl={{span: 6}}/>
            </Row>
        </div>
    )
}

export default Menu
