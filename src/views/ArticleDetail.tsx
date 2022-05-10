import React, {useEffect, useState} from "react";
import {Navigate, useLocation} from "react-router-dom";
import useRequest from "hooks/useRequest";
import {Col, message, Row} from "antd";
import FLoading from "comps/FLoading";
import FEmpty from "comps/FEmpty";
import moment from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import { FieldTimeOutlined, EnvironmentOutlined, ReadOutlined } from '@ant-design/icons';
import {scrollAnimation, setAddress} from "tools/tools";
import IsBackTop from "comps/IsBackTop";
import Tiptap from "comps/Tiptap";
moment.extend(relativeTime)

function ArticleDetail() {
    const {state} = useLocation()
    let articleID = 0

    if (state) ({articleID} = state as { articleID: number })

    return (articleID ? <Detail articleID={articleID}/> : <Navigate to='/'/>)
}

type Article = Array<{
    id: number
    content: string
    title: string
    createTime: string
    address: string
    good: number
    see: number
    prevTitle: string
    nextTitle: string
    prevID: number
    nextID: number
}>

function Detail(props: { articleID: number }) {
    useEffect(() => {
        setAddress(props.articleID)
    }, [])
    const [params, setParams] = useState({
        data: {
            path: "article.detail",
            ID: props.articleID
        }
    })
    const {resData, empty, loading, setLoading} = useRequest(params)
    const changePage = async (ID:number) => {
        if (ID < 0) {
            return message.info((ID === -1) ? '已经是第一篇了' : '已经是最后一篇了')
        }
        const dom = document.getElementById('root')
        scrollAnimation(dom, () => {
            setParams({
                ...params,
                data: {
                    ...params.data,
                    ID: ID
                }
            })
        })
        setTimeout(() => setLoading(true))
    }
    const [{
        content = '',
        title = '',
        createTime = '',
        see = 0,
        address = '',
        prevTitle = '',
        nextTitle = '',
        prevID = 0,
        nextID = 0,
    } = {}] = resData.list as Article

    const titleStyle = {
        fontWeight: "bold",
        fontSize: "30px",
        height: "30px",
        lineHeight: "30px",
        marginBottom: 60
    }
    const footerStyle = {
        marginTop: 90,
        color: "#8a8f8d"
    }
    const tipsStyle = {
        display: "flex",
        justifyContent: "space-between",
        marginTop: 5
    }
    return (<Row style={{minHeight: 500}}>
        <Col xs={{span: 1}} lg={{span: 2}} xxl={{span: 6}}/>
        <Col xs={{span: 22}} lg={{span: 20}} xxl={{span: 12}}>
            <FLoading show={loading}/>
            <div style={{ fontSize: "16px" }}>
                <div style={titleStyle}>{title}</div>
                <Tiptap initialValue={content} editable={ false } />
                <div style={footerStyle}>
                    <ReadOutlined /> { see }
                    <span style={{ marginLeft: 30 }}>
                            <EnvironmentOutlined /> { address }
                        </span>
                    <span style={{ marginLeft: 30 }}>
                             <FieldTimeOutlined /> { moment(createTime).fromNow() }
                        </span>
                </div>
                <div style={footerStyle}>
                    <div style={ tipsStyle }  className='hover-blue'>
                        <span onClick={() => changePage(prevID || -1)}>上一篇</span>
                        <span onClick={() => changePage(nextID || -2)}>下一篇</span>
                    </div>
                    <div style={{
                        ...tipsStyle,
                        color: "black"
                    }}>
                            <span>
                                { prevTitle || '没有了' }
                            </span>
                        <span>
                                { nextTitle || '没有了' }
                            </span>
                    </div>
                </div>
            </div>
            <FEmpty show={empty}/>
            <IsBackTop />
        </Col>
        <Col xs={{span: 1}} lg={{span: 2}} xxl={{span: 6}}/>
    </Row>)
}

export default ArticleDetail
