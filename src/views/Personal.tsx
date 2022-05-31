import React from "react";
import {useNavigate} from "react-router-dom";
import {Col,Row} from "antd";
import {useSelector} from "react-redux";
import { RootState } from "../store"

function Personal () {
    const navigate = useNavigate()
    const { ID, name } = useSelector((state:RootState) => state.userInfo.value)

    if (!ID) {
        navigate('/')
        return null
    }

    return (<Row style={{ marginTop: 15 }}>
        <Col xs={{span: 0}} lg={{span: 3}} xxl={{span: 6}}/>
        <Col xs={{span: 24}} lg={{span: 18}} xxl={{span: 12}}>
            { name } 的个人中心
        </Col>
        <Col xs={{span: 0}} lg={{span: 3}} xxl={{span: 6}}/>
    </Row>)
}

export default Personal