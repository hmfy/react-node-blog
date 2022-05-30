import React from "react";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {Button, message, Modal} from "antd";

function IsLogin() {
    const {state} = useLocation()

    if (state) {
        const { ID, name } = state as { ID: number, name: string }
        return <Personal userID={ID} name={name} />
    } else {
        return <Navigate to='/'/>
    }
}

function Personal ({ userID, name }:{ userID: number, name:string }) {
    const navigate = useNavigate()
    const quit = () => {
        Modal.warning({
            keyboard: false,
            okText: "确定",
            closable: true,
            centered: true,
            content: '确认退出登录吗？',
            onOk () {
                localStorage.clear()
                message.success('已退出登录', 1).then(res => {
                    navigate('/', { replace: false })
                })
            },
            onCancel () {}
        })
    }

    return (<div>
        <p>用户 { userID }</p>
        <p>{ name }的个人主页</p>
        <Button type='primary' onClick={() => quit()}>
            退出登录
        </Button>
    </div>)
}

export default IsLogin