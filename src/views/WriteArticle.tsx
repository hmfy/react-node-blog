import React, {CSSProperties, SetStateAction, useEffect, useState} from "react";
import {Button, Col, Dropdown, Input, Menu, MenuProps, message, Modal, Radio, Row, Select} from "antd";
import Tiptap from "comps/Tiptap";
import DatePicker from "comps/DatePicker";
import useRequest, {request} from "hooks/useRequest";
import {Editor} from "@tiptap/react";
import TiptapBtn from "comps/TiptapBtn";
import {useLocation, useNavigate} from "react-router-dom";
import moment from "dayjs";
import FLoading from "comps/FLoading";
import {dataURLtoFile, uploadFile} from "tools/tools";

type TagList = Array<{ tag: string }>
function ChooseTips({setTags, list}: { setTags: SetStateAction<any>, list: TagList }) {
    const options = list.map(({tag}) => ({label: tag, value: tag}))
    const handleChange = (value: []) => setTags(value)
    return (<Select mode="tags" maxTagCount={1} maxTagTextLength={7}
                    style={{width: 120, marginLeft: 20, textAlign: "left"}}
                    options={options}
                    placeholder="选择一个标签" onChange={handleChange}>
    </Select>)
}

type Data = {
    title: string,
    content: string,
    createTime: number,
    type: number,
    tag: string
}

function MoreMenu({ articleID }:{ articleID: number|null }) {
    const navigate = useNavigate()
    const delArticle = async (id:number|null) => {
        await request({
            url: "/execute",
            data: {
                path: 'article.delArticle',
                articleID: id
            }
        })
        await message.success('删除成功！即将返回主页')
        navigate('/')
    }
    const [menuList, setMenuList] = useState([
        {
            label: '返回主页',
            key: '1',
        }
    ])
    useEffect(() => {
        if (articleID) {
            setMenuList([
                {
                    label: '返回主页',
                    key: '1',
                },
                {
                    label: '删除本文',
                    key: '2',
                }
            ])
        }
    }, [ articleID ])
    const handleClick:MenuProps['onClick'] = ({ key }) => {
        switch (key) {
            case '1':
                // 返回
                return navigate('/')
            case '2':
                // 删除
                return Modal.warning({
                    keyboard: false,
                    okText: "确定",
                    closable: true,
                    centered: true,
                    content: '确认删除吗？不可撤回哦！',
                    onOk () {
                        delArticle(articleID).then()
                    },
                    onCancel () {}
                })
        }
    }
    const menu = (
        <Menu
            onClick={handleClick}
            items={menuList}
        />
    );

    return (<Dropdown overlay={menu} arrow={{pointAtCenter: true}}
                      trigger={['click']} placement="bottom">
                <Button onClick={e => e.preventDefault()}>更多</Button>
            </Dropdown>)
}
// 替换文章中的图片base64为服务器地址
const replaceSrc = async (wrapperDom: HTMLElement) => {
    const waitUploadImgList = wrapperDom.getElementsByClassName('tip-img')
    const fileList: File[] = []
    const domList: any = []
    Array.from(waitUploadImgList).forEach((ele: any) => {
        if (!ele.src.includes('http://') || !ele.src.includes('https://')) {
            // 上传
            const file = dataURLtoFile(ele.src, 'pic.jpg')
            fileList.push(file)
            domList.push(ele)
        }
    })
    if (fileList.length === 0) {
        return
    }

    try {
        const res = await uploadFile(fileList)
        res.data.list.forEach((file: { path: string }, index) => {
            const location = window.location
            const curDom = domList[index]
            curDom['src'] = location.origin.replace(location.port || 'no port do not replace', '80') + file.path
        })
    } catch (e) {
        console.log(e)
    }
}
function WriteArticle() {
    const navigate = useNavigate()

    // 获取编辑器实例
    const [editor, setEditor] = useState<Editor | null>(null)

    // 编辑模式
    const {state} = useLocation()
    const [ articleID, setArticleID ] = useState(0)
    const [reqComplete, setReqComplete] = useState(false)
    useEffect(() => {
        if (!state) return
        const _state = state as { articleID: number }
        if (_state.articleID) {
            setArticleID(_state.articleID)
        }
    }, [state])
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
                const {title, content, createTime, type} = res.data.list[0]
                setTitle(title)
                editor?.commands.setContent(content)
                setTime(createTime)
                setArticleType(type)
            }
        })
    }, [editor, articleID, reqComplete])

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

    const [params] = useState({
        url: '/execute',
        data: {
            path: 'article.getTag'
        }
    })
    const {resData} = useRequest(params)
    const tagList:TagList = resData.list

    // 表单
    const [isModalVisible, setIsModalVisible] = useState(false)
    const handleCancel = () => {
        setIsModalVisible(false)
        setSpinning(false)
    }
    const [parseDom, setParseDom] = useState(document.body)
    const handleOk = async () => {
        setIsModalVisible(false)
        setSpinning(true)

        // 上传图片
        await replaceSrc(parseDom)

        let {data} = await request({
            url: "execute",
            data: {
                path: 'article.add',
                content: parseDom.innerHTML,
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

        setSpinning(false)

        await message.success({
            duration: 1,
            content: '发布成功！',
            style: {
                marginTop: '20vh',
            },
        })

        if (articleID) navigate('/')

        editor?.commands.clearContent()
        return setTitle('')
    }

    // 发布
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
        if (!content) {
            return message.info({
                content: '内容为空！',
                style: {
                    marginTop: '20vh',
                },
            })
        }
        if (!title && (articleType === 1)) {
            return message.info({
                content: '标题为空！',
                style: {
                    marginTop: '20vh',
                },
            })
        }

        // 弹窗
        setIsModalVisible(true)

        // 保存内容
        setParseDom(wrapper)
    }

    return (
        <Row style={{
            padding: "0 10px",
            height: "100vh",
            background: "white",
            overflowY: "auto",
            paddingBottom: "20px"
        }}>
            <Col xs={{span: 0}} lg={{span: 2}} xxl={{span: 6}}/>
            <Col xs={{span: 24}} lg={{span: 20}} xxl={{span: 12}} style={{minHeight: "70vh", position: "relative"}}>
                <FLoading show={spinning}/>
                <div style={headerStyle}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Input style={{flex: 1, fontSize: "26px", fontWeight: "bold"}} placeholder="请输入标题"
                               value={title}
                               maxLength={100}
                               onChange={e => setTitle(e.target.value)}
                               bordered={false}/>
                        <div>
                            <div style={{textAlign: "right", marginTop: 10}}>
                                <MoreMenu articleID={articleID} />
                                <Button type="primary" onClick={submitArticle} style={{marginLeft: 20}}>发布</Button>
                            </div>
                        </div>
                    </div>
                    <TiptapBtn editor={editor}/>
                </div>
                <Tiptap setEditor={setEditor}/>
                <Modal title="确定发布吗？" okText='发布' cancelText='先不了' visible={isModalVisible} onOk={handleOk}
                       onCancel={handleCancel}>
                    <div style={{textAlign: "left", marginTop: 10, borderTop: "1px solid #F5F5F5", paddingTop: 10}}>
                        <Radio.Group value={articleType} onChange={e => setArticleType(e.target.value)}>
                            <Radio.Button value={1}>文章</Radio.Button>
                            <Radio.Button value={2}>日志</Radio.Button>
                        </Radio.Group>
                        <DatePicker onChange={changeTime} value={moment(time)}
                                    style={{marginLeft: 20, marginBottom: 20}}/>
                        <ChooseTips setTags={setTags} list={tagList}/>
                    </div>
                </Modal>
            </Col>
            <Col xs={{span: 0}} lg={{span: 2}} xxl={{span: 6}}/>
        </Row>)
}

export default WriteArticle
