import React, {CSSProperties, ReactElement, useState} from "react";
import FLoading from "comps/FLoading";
import FEmpty from "comps/FEmpty";
import useRequest from "hooks/useRequest";
import {Card, Col, Row, Timeline} from "antd";
import IsBackTop from "comps/IsBackTop";
import moment from "moment";
import {parseHTML} from "tools/tools";

type ListItem = {
    id: number
    title: string
    content: string
    createTime: string

}
type List = Array<ListItem>

function ItemCard({title, content}: ListItem): ReactElement {
    const cardStyle: CSSProperties = {
        width: "100%",
        display: "inline-block",
        borderRadius: 3,
        textAlign: "left"
    }
    const titleStyle: CSSProperties = {
        fontWeight: "bold",
        fontSize: "16px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        marginBottom: 5
    }
    return (<Card style={cardStyle}
                  bodyStyle={{padding: 15}}
                  className={'card-box-shadow'}>
        <p style={titleStyle}>
            {title}
        </p>
        <div className={'overflow-dot'}>
            { parseHTML(content) }
        </div>
    </Card>)
}

function Time() {
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
                            <Timeline.Item key={index} label={ moment(timeItem.createTime).fromNow() }>
                                <ItemCard {...timeItem} />
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
