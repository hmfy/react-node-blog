import React, {CSSProperties, SetStateAction, useEffect, useState} from "react";
import {Button, Col, Input, message, Radio, Row, Select, Spin} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import Tiptap from "comps/Tiptap";
import DatePicker from "comps/DatePicker";
import useRequest, {request} from "hooks/useRequest";
import {Editor} from "@tiptap/react";
import TiptapBtn from "comps/TiptapBtn";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import moment from "dayjs";

function ChooseTips({setTags}: { setTags: SetStateAction<any> }) {
    const [params] = useState({
        url: '/execute',
        data: {
            path: 'article.getTag'
        }
    })
    const {resData: {list}} = useRequest(params)
    const options = (list as Array<{ tag: string }>).map(({tag}) => ({label: tag, value: tag}))
    const handleChange = (value: []) => setTags(value)
    return (<Select mode="tags" maxTagCount={1} maxTagTextLength={7}
                    style={{width: 120, marginLeft: 20, textAlign: "left"}}
                    options={options}
                    placeholder="选择一个标签" onChange={handleChange}>
    </Select>)
}

type Data = {
    title:string,
    content:string,
    createTime:number,
    type: number,
    tag: string
}

function WriteArticle() {
    const navigate = useNavigate()

    // 获取编辑器实例
    const [editor, setEditor] = useState<Editor | null>(null)

    // 编辑模式
    const {state} = useLocation()
    let articleID = 0
    const [ reqComplete, setReqComplete ] = useState(false)
    if (state) ( {articleID} = (state as { articleID: number }) )
    useEffect(() => {
        if (!articleID) return
        if (!editor) return
        if (reqComplete) return
        setSpinning(true)
        request<Array<Data>>({
            url: '/execute',
            data: {
                path: "article.detail",
                ID: articleID
            }
        }).then(res => {
            if (res.data.list.length) {
                setReqComplete(true)
                setSpinning(false)
                const { title, content, createTime, type, tag } = res.data.list[0]
                setTitle(title)
                editor?.commands.setContent(content)
                setTime(createTime)
                setArticleType(type)
            }
        })
    }, [editor])

    const [spinning, setSpinning] = useState(false)
    const [tags, setTags] = useState([])
    const [articleType, setArticleType] = useState(1)
    const [title, setTitle] = useState('')
    const [time, setTime] = useState(Date.now())
    const changeTime = (date: any, dateString: any) => setTime(new Date(dateString).getTime())
    const headerStyle: CSSProperties = {
        position: "sticky",
        top: 0,
        zIndex: 1,
        background: "white"
    }
    const submitArticle = async () => {
        let content = editor?.getHTML()
        const wrapper = document.createElement("div");
        if (content) {
            // 是否只有第一层元素
            wrapper.innerHTML = content
            const text = editor?.getText().trim() as string
            if (text.length === 0 && wrapper.children[0].children.length === 0) {
                content = ''
            }
        }
        if (content) {
            if (!title && ( articleType === 1 )) {
                return message.info({
                    content: '标题为空！',
                    style: {
                        marginTop: '20vh',
                    },
                })
            }

            setSpinning(true)
            let {data} = await request({
                url: "execute",
                data: {
                    path: 'article.add',
                    content: content,
                    title: title,
                    createTime: time,
                    address: null,
                    tags: tags.join(','),
                    type: articleType,
                    articleID: articleID
                }
            })
            if (data.err) {
                return message.error({
                    content: '提交失败！',
                    style: {
                        marginTop: '20vh',
                    },
                })
            }
            await message.success({
                duration: 1,
                content: '发布成功！',
                style: {
                    marginTop: '20vh',
                },
            })
            setSpinning(false)

            if (articleID) navigate('/')

            editor?.commands.clearContent()
            return setTitle('')
        }
        return message.info({
            content: '内容为空！',
            style: {
                marginTop: '20vh',
            },
        })
    }

    return (
        <Row style={{padding: "0 10px"}}>
            <Col xs={{span: 0}} lg={{span: 2}} xxl={{span: 6}}/>
            <Col xs={{span: 24}} lg={{span: 20}} xxl={{span: 12}} style={{minHeight: "70vh", position: "relative"}}>
                <Spin style={{position: "absolute", top: "20vh", left: "50%"}} spinning={spinning}/>
                <div style={headerStyle}>
                    <div style={{display: "flex", justifyContent: "space-between" }}>
                        <Input style={{flex: 1, fontSize: "26px", fontWeight: "bold"}} placeholder="请输入标题"
                               value={title}
                               onChange={e => setTitle(e.target.value)}
                               bordered={false}/>
                        <div>
                            <div style={{textAlign: "right", marginTop: 10}}>
                                <Button type="primary" onClick={submitArticle}>发布</Button>
                            </div>
                        </div>
                    </div>
                    <TiptapBtn editor={editor}/>
                </div>
                <Tiptap setEditor={setEditor}/>
                <div style={{textAlign: "right", marginTop: 10, borderTop: "1px solid #F5F5F5", paddingTop: 10 }}>
                    <Radio.Group value={articleType} onChange={e => setArticleType(e.target.value)}>
                        <Radio.Button value={1} >文章</Radio.Button>
                        <Radio.Button value={2}>日志</Radio.Button>
                    </Radio.Group>
                    <DatePicker onChange={ changeTime } value={ moment(time) } style={{marginLeft: 20}} />
                    <ChooseTips setTags={setTags}/>
                    <HomeOutlined className='hover-blue' style={{marginLeft: 20, fontSize: 20}}
                                  onClick={() => navigate('/')}/>
                </div>
            </Col>
            <Col xs={{span: 0}} lg={{span: 2}} xxl={{span: 6}}/>
        </Row>)
}

export default WriteArticle
