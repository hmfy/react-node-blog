import React, {CSSProperties, ReactElement, useState} from "react";
import FLoading from "comps/FLoading";
import FEmpty from "comps/FEmpty";
import useRequest from "hooks/useRequest";
import {Col, Row, Timeline} from "antd";
import IsBackTop from "comps/IsBackTop";
import moment from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import {parseHTML} from "tools/tools";
import {useNavigate} from "react-router-dom";
import { SmileOutlined } from '@ant-design/icons';
moment.extend(relativeTime)

type ListItem = {
    id: number
    title: string
    content: string
    createTime: string

}
type List = Array<ListItem>

function Time() {
    const navigate = useNavigate()
    const [ params ] = useState({
        data: { path: "article.log" }
    })
    let {empty, loading, resData} = useRequest(params)
    const list: List = resData.list
    const wrapperStyle: CSSProperties = {paddingTop: 10, minHeight: 300, width: "100%"}

    return (
        <Row style={wrapperStyle}>
            <Col xs={{span: 1}} lg={{span: 2}} xxl={{span: 6}}/>
            <Col xs={{span: 22}} lg={{span: 20}} xxl={{span: 12}}>
                <Timeline mode="alternate">
                    <FLoading show={loading}/>
                    {
                        list.map((timeItem, index) => (
                            <Timeline.Item key={index} dot={
                                <div style={{
                                    backgroundColor: "#d9d6d6",
                                    width: 8,
                                    height: 8,
                                    // border: "2px solid #8e8e8e",
                                    // background: "rgb(161 179 196)",
                                    borderRadius: "50%"
                                }}/>
                            }>
                                <div style={{
                                    cursor: 'pointer',
                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                    padding: "14px",
                                    borderRadius: "6px",
                                    boxShadow: "0 0 4px rgb(0 0 0 / 12%), 0 2px 2px rgb(0 0 0 / 8%)"
                                }} onClick={ () => {
                                    navigate('/write', { state: { articleID: timeItem.id }, replace: false })
                                } } >
                                    <div>
                                        { moment(timeItem.createTime).format("YYYY-MM-DD") }
                                    </div>
                                    <div style={{ textAlign: "left" }}>
                                        { parseHTML(timeItem.content) }
                                    </div>
                                </div>
                            </Timeline.Item>
                        ))
                    }
                    <FEmpty show={empty}/>
                </Timeline>
                <IsBackTop />
            </Col>
            <Col xs={{span: 1}} lg={{span: 2}} xxl={{span: 6}}/>
        </Row>
    )
}

export default Time
