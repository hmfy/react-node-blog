import React, {CSSProperties, useEffect, useRef, useState} from 'react'
import {Card} from "antd";
import {HistoryOutlined, ReadOutlined} from '@ant-design/icons';
import FEmpty from "comps/FEmpty";
import FLoading from "comps/FLoading";
import InfiniteScroll from "react-infinite-scroll-component";
import useScrollLoad from "hooks/useScrollLoad";
import {useNavigate} from "react-router-dom";
import IsBackTop from "comps/IsBackTop";

type ListItem = {
    id: number
    title: string,
    content: string,
    createTime: string
}
type List = Array<ListItem>

function Blog({title, content, createTime, id}: ListItem) {
    const hoverColor: CSSProperties = {color: "rgba(0, 0, 0, 0.45)"}
    const buttonSpace: CSSProperties = {marginRight: "5px"}
    const cardStyle: CSSProperties = {width: '100%', marginBottom: '16px', cursor: "pointer"}
    const titleStyle: CSSProperties = {fontWeight: "bold", fontSize: "16px"}
    const navigate = useNavigate()
    const actions = [
        <span style={hoverColor}>
			<HistoryOutlined style={buttonSpace}/>
            {createTime}
		</span>,
        <span onClick={() => {
            navigate('/detail', { state: { articleID: id }, replace: false })
        }}>
			<ReadOutlined style={buttonSpace} />
			阅读全文
        </span>
    ]
    return (<Card
        style={cardStyle}
        className={'card-box-shadow'}
        actions={actions}>
        <p style={titleStyle}>
            {title}
        </p>
        <div className={'overflow-dot'}>
            {content}
        </div>
    </Card>)
}

const titleStyle: CSSProperties = {position: "relative", minHeight: "500px"}

function BlogList() {
    const {
        list, empty, loading, bodyHeight, fetchData, hasMore
    } = useScrollLoad<List>({
        url: '/articleList',
        data: {pageNo: 1}
    })
    const reactElem = useRef(null)

    return (
        <div style={titleStyle}>
            <FLoading show={loading}/>
            <InfiniteScroll
                ref={reactElem}
                style={{padding: "10px", boxSizing: "border-box"}}
                height={bodyHeight}
                dataLength={list.length}
                next={fetchData}
                hasMore={hasMore}
                loader={<span> </span>}
            >
                {
                    list.map(blog => <Blog key={blog.id} {...blog}/>)
                }
            </InfiniteScroll>
            <FEmpty show={empty}/>
            <IsBackTop elem={reactElem.current} domType={'reactElem'} />
        </div>
    )
}

export default BlogList
