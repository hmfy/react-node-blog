import React, { useRef, useState} from 'react';
import {Comment, Form, Input, Button, List, Col, Row } from 'antd';
import moment from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import FLoading from "comps/FLoading";
import IsBackTop from "comps/IsBackTop";
import useRequest, {request} from "hooks/useRequest";
import {getAddress, getUserInfo} from "tools/tools";
import FEmpty from "comps/FEmpty";
const {TextArea} = Input
moment.extend(relativeTime)

type Event = {
    target: {
        value: React.SetStateAction<string>
    }
}

type ListItem = {
    id: number
    author: string
    content: string
    address: string
    createTime: number
}

// eslint-disable-next-line
type List = Array<ListItem>

type AddComment = (obj:ListItem) => void

type EditAreaProps = {
    handleChange: (e:Event) => void
    handleSubmit: () => void
    btnLoading: boolean
    commentVal: string
    commentLength: number
}

// 包裹
const Box = ({ data }:{data?: string}) => <span>{ data }</span>

// 留言
const Item = ({itemData}: { itemData: ListItem }) => {
    const { author, content, createTime, address } = itemData
    return (
        <Comment
            author={
                <div style={{ color: "var(--tips)" }} >
                    {(author || address + '网友')}
                </div>
            }
            content={<Box data={content} />}
            datetime={
                <div style={{ color: "var(--tips-light)" }}>
                    { moment(createTime).fromNow() }
                </div>
            }
        />
    )
}

// 留言列表
const MyList = ({ data }:{data: List}) => {
    return (<List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={itemData => (
            <li>
                <Item itemData={itemData}/>
            </li>
        )}

    >
        <FEmpty show={ !data.length } />
    </List>)
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
    const handleChange = (e: Event) => setCommentVal(e.target.value)
    const handleSubmit = async () => {
        if (!commentVal) return
        setBtnLoading(true)
        const { data: { list }  } = await request<Array<{ ID: number }>>({
            url: '/execute2',
            data: {
                path: 'comment.add',
                content: commentVal,
                createTime: Date.now(),
                address: null
            }
        })

        commentRefresh({
            author: getUserInfo()['name'] || '',
            content: commentVal,
            id: list[0].ID,
            address: getAddress() || '',
            createTime: Date.now(),
        })
        setBtnLoading(false)
        setCommentVal('')
    }
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
                zIndex: 9
            }}
            content={ <EditorArea { ...areaProps } /> }
        />
    </>)
}

// 主入口
function IsComment() {
    const [ params ] = useState({
        data: {
            path: 'comment.list'
        }
    })
    const { resData, loading } = useRequest(params)
    const list:List = resData.list
    const reactElem = useRef(null)
    const [comment, setComment] = useState(list);
    const submitComment = (obj:ListItem) => setComment([obj, ...comment])
    return (
        <Row style={{ marginTop: -16 }}>
            <Col xs={{ span: 1 }} lg={{ span: 2 }} xxl={{ span: 6 }} />
            <Col xs={{ span: 22 }} lg={{ span: 20 }} xxl={{ span: 12 }} >
                <Editor commentRefresh={submitComment} commentLength={list.length + comment.length} />
                <FLoading show={loading} />
                <MyList data={ comment.concat(list) } />
                <IsBackTop elem={ reactElem.current } domType={ 'reactElem' } />
            </Col>
            <Col xs={{ span: 1 }} lg={{ span: 2 }} xxl={{ span: 6 }} />
        </Row>
    )
}

export default IsComment
