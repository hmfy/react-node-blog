import React, {useEffect, useRef, useState} from 'react';
import {Comment, Form, Input, Button, List, Col, Row, BackTop} from 'antd';
import moment from 'moment';
import useScrollLoad from "hooks/useScrollLoad";
import axios from "axios";
import FLoading from "comps/FLoading";
import FEmpty from "comps/FEmpty";
import InfiniteScroll from "react-infinite-scroll-component";
import AppLayout from "views/Layout";
import IsBackTop from "comps/IsBackTop";
const {TextArea} = Input

type Event = {
    target: {
        value: React.SetStateAction<string>
    }
}

type ListItem = {
    id: number
    author: string
    content: string
    createTime: string
}

type List = Array<ListItem>

type AddComment = (obj:ListItem) => void

type EditAreaProps = {
    handleChange: (e:Event) => void
    handleSubmit: () => void
    btnLoading: boolean
    commentVal: string
    commentLength: number
}

function addComment() {
    return axios.post('https://www.fastmock.site/mock/5a9f84630f3ede0293cf99c7f56c0644/blog/addComment')
}
function getAddress () {
    return {
        then (func: Function):void {
            func('')
        }
    }
}

// 包裹
const Box = ({ data }:{data?: string}) => <span>{ data }</span>

// 留言
const Item = ({itemData}: { itemData: ListItem }) => {
    const { author, content, createTime } = itemData
    return (
        <Comment
            author={<Box data={author + '网友'} />}
            content={<Box data={content} />}
            datetime={<Box data={moment(createTime).fromNow()} />}
        />
    )
}

// 留言列表
const MyList = ({data}:{data: List}) => {
    return (<List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={itemData => (
            <li>
                <Item itemData={itemData}/>
            </li>
        )}

    />)
}

// 留言区
const EditorArea = ( props:EditAreaProps ) => {
    const { handleChange, handleSubmit, commentVal, commentLength, btnLoading } = props
    return (<>
        <Form.Item>
            <TextArea rows={4} onChange={handleChange} value={commentVal}/>
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
            <div style={{
                justifyContent: "space-between",
                display: "flex"
            }}>
                <div>{`共 ${commentLength} 条留言`}</div>
                <Button htmlType="submit" loading={btnLoading} onClick={handleSubmit} type="primary">
                    发表留言
                </Button>
            </div>
        </Form.Item>
    </>)
}

// 提交留言
const Editor = ({commentRefresh, commentLength}: { commentRefresh: AddComment, commentLength: number }) => {
    const [btnLoading, setBtnLoading] = useState(false)
    const [commentVal, setCommentVal] = useState('')
    const [name, setName] = useState('')
    const handleChange = (e: Event) => setCommentVal(e.target.value)
    const handleSubmit = async () => {
        if (!commentVal) return
        setBtnLoading(true)
        const { data: { id } } = await addComment()
        commentRefresh({
            author: name + '网友',
            content: commentVal,
            id: id,
            createTime: String(new Date()),
        })
        setBtnLoading(false)
        setCommentVal('')
    }
    useEffect(() => {
        getAddress().then((res:string) => setName(res))
    }, [])
    const areaProps = {
        commentVal,
        handleChange,
        handleSubmit,
        btnLoading,
        commentLength
    }
    return (<>
        <Comment
            style={{
                position: "sticky",
                top: 50, // 导航栏的高度
                backgroundColor: "white",
                zIndex: 9
            }}
            content={ <EditorArea { ...areaProps } /> }
        />
    </>)
}

// 主入口
function IsComment() {
    const {
        list, empty, loading, bodyHeight, fetchData, hasMore
    } = useScrollLoad<List>({
        url: '/getComment',
        data: { pageNo: 1 }
    })
    const reactElem = useRef(null)
    const [comment, setComment] = useState(list);
    const submitComment = (obj:ListItem) => setComment([obj, ...comment])
    return (
        <Row style={{ marginTop: -16 }}>
            <Col xs={{ span: 1 }} lg={{ span: 2 }} xxl={{ span: 6 }} />
            <Col xs={{ span: 22 }} lg={{ span: 20 }} xxl={{ span: 12 }} >
                <Editor commentRefresh={submitComment} commentLength={list.length + comment.length} />
                <FLoading show={loading} />
                <InfiniteScroll
                    ref={reactElem}
                    style={{ padding: "10px", boxSizing: "border-box" }}
                    height={ bodyHeight }
                    dataLength={ list.length }
                    next={ fetchData }
                    hasMore={ hasMore }
                    loader={<span> </span>}
                >
                    <MyList data={ comment.concat(list) } />
                </InfiniteScroll>
                <FEmpty show={empty}/>
                <IsBackTop elem={ reactElem.current } domType={ 'reactElem' } />
            </Col>
            <Col xs={{ span: 1 }} lg={{ span: 2 }} xxl={{ span: 6 }} />
        </Row>
    )
}

export default IsComment
