import React, {CSSProperties, useRef } from 'react'
import {Card} from "antd";
import {HistoryOutlined, ReadOutlined} from '@ant-design/icons';
import FEmpty from "comps/FEmpty";
import FLoading from "comps/FLoading";
import InfiniteScroll from "react-infinite-scroll-component";
import useScrollLoad from "hooks/useScrollLoad";
import {useNavigate} from "react-router-dom";
import IsBackTop from "comps/IsBackTop";
import moment from "moment";
import {parseHTML} from "tools/tools";

type ListItem = {
    id: number
    title: string,
    content: string,
    createTime: string
}
type List = Array<ListItem>

function Blog({title, content, createTime, id}: ListItem) {
    const buttonSpace: CSSProperties = {marginRight: "5px"}
    const cardStyle: CSSProperties = {width: '100%', cursor: "pointer", border: "none", borderBottom: "2px solid #f0f0f0" }
    const titleStyle: CSSProperties = {fontWeight: "bold", fontSize: "16px"}
    const navigate = useNavigate()
    return (<Card style={cardStyle}>
        <div style={titleStyle}>
            {title}
        </div>
        <div>
            <div className={'overflow-dot'}>
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

const titleStyle: CSSProperties = {position: "relative", minHeight: "500px"}

function BlogList() {
    const {
        list, empty, loading, bodyHeight, fetchData, hasMore
    } = useScrollLoad<List>({
        data: {
            path: "article.list",
            pageNo: 1
        }
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
