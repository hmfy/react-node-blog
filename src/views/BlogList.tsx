import React, {CSSProperties, useRef } from 'react'
import {Card} from "antd";
import {HistoryOutlined, ReadOutlined} from '@ant-design/icons';
import FEmpty from "comps/FEmpty";
import FLoading from "comps/FLoading";
import InfiniteScroll from "react-infinite-scroll-component";
import useScrollLoad from "hooks/useScrollLoad";
import {useNavigate} from "react-router-dom";
import IsBackTop from "comps/IsBackTop";
import moment from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import {parseHTML} from "tools/tools";
moment.extend(relativeTime)

type ListItem = {
    id: number
    title: string,
    content: string,
    createTime: string
}
type List = Array<ListItem>

function Blog({title, content, createTime, id}: ListItem) {
    const buttonSpace: CSSProperties = {marginRight: "5px"}
    const cardStyle: CSSProperties = {
        width: '100%',
        cursor: "pointer",
        border: "none",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        marginBottom: 20,
        borderRadius: "6px",
        boxShadow: "rgb(0 0 0 / 12%) 0px 0px 4px, rgb(0 0 0 / 8%) 0px 2px 2px"
    }
    const titleStyle: CSSProperties = {fontWeight: "bold", fontSize: "16px", marginBottom: 10}
    const navigate = useNavigate()
    const readArticle = () => navigate('/detail', { state: { articleID: id }, replace: false })
    return (<Card style={cardStyle}>
        <h1 className="title-font" style={titleStyle} onClick={() => readArticle()}>
            {title}
        </h1>
        <div>
            <div className={'overflow-dot'} onClick={() => readArticle()}>
                { parseHTML(content) }
            </div>
            <div style={{ textAlign: "right", color: "rgba(0, 0, 0, 0.45)", marginTop: "10px" }}>
                <span>
                    <HistoryOutlined style={buttonSpace}/>
                        { moment(createTime).fromNow() }
                </span>
                <span style={{ marginLeft: "30px" }} className="hover-blue" onClick={() => {
                    navigate('/detail', { state: { articleID: id }, replace: false })
                }}>
                    <ReadOutlined style={buttonSpace} />
                    阅读全文
                </span>
            </div>
        </div>
    </Card>)
}

const titleStyle: CSSProperties = {position: "relative"}

function BlogList() {
    const {
        list, empty, loading, bodyHeight, fetchData
    } = useScrollLoad<List>({
        data: {
            path: "article.list"
        }
    })
    const reactElem = useRef(null)

    return (
        <div style={titleStyle}>
            <FLoading show={loading}/>
            <InfiniteScroll
                ref={reactElem}
                style={{padding: "15px 5px", boxSizing: "border-box"}}
                height={bodyHeight}
                dataLength={list.length}
                next={fetchData}
                hasMore={true}
                loader={<span> </span>}
            >
                {
                    list.map((blog, index) => <Blog key={index} {...blog}/>)
                }
                <FEmpty show={empty}/>
            </InfiniteScroll>
            <IsBackTop elem={reactElem.current} domType={'reactElem'} />
        </div>
    )
}

export default BlogList
