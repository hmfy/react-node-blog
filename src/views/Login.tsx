import {Form, Input, Button, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import React, {CSSProperties, useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {request} from "hooks/useRequest";
import { setEncrypt } from "tools/tools"
import { RootState } from "../store"
import {useDispatch, useSelector} from "react-redux";
import { login } from "../store/reducer/loginSlice";
import { setInfo } from "../store/reducer/userSlice";

function Login() {
    const navigate = useNavigate()
    const { search } = useLocation()
    const loginState = useSelector((state:RootState) => state.isLogin.value)
    const dispatch = useDispatch()

    useEffect(() => {
        if (loginState) {
            message.success('已是登录状态，请勿重复登录！', 1).then(res => {
                navigate('/', { replace: false })
            })
        }
    }, [])

    const onFinish = async ({ username, password }: any) => {
        const { data: { userInfo } } = await request({
            url: '/user/login',
            data: {
                username: setEncrypt(username),
                password: setEncrypt(password),
            }
        })
        if (userInfo) {
            const { expires } = userInfo
            const expiresTime = Date.now() + expires  * 1000
            localStorage.setItem('userInfo', JSON.stringify({
                ...userInfo,
                expires: expiresTime
            }))
            dispatch(setInfo({
                ...userInfo,
                expires: expiresTime
            }))
            await message.success('登陆成功！', 1)
            navigate(search.split('?')[1] || '/')
            dispatch(login())
        }
    };

    const wrapperStyle:CSSProperties = {
        position: 'fixed',
        inset: 0,
        backgroundImage: `url("https://fyang.fun/files/desktopbg.png")`,
        backgroundColor: "#ddd"
    }

    const formStyle = {
        width: 300,
        marginTop: "30vh",
        marginLeft: "50%",
        transform: "translateX(-50%)"
    }

    return (
        <div style={ wrapperStyle }>
            <Form
                style={ formStyle }
                name="normal_login"
                initialValues={{remember: true}}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{required: true, message: '账号不能为空！'}]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: '请输入密码！'}]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item style={{ textAlign: "center" }}>
                    <Button type="primary" htmlType="submit" block={true} style={{ background: "#5b423a", borderColor: "#5b423a" }}>
                        点击登陆
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login
