import React, {useState} from "react";
import {Button, Col, message, Radio, Row, Spin} from "antd";
import Tiptap from "comps/Tiptap";
import { request, Params } from "hooks/useRequest";
import moment from "moment";
import {Editor} from "@tiptap/react";

function WriteArticle() {
    const [ spinning, setSpinning ] = useState(false)
    const [ articleType, setArticleType ] = useState(1)
    const [editor, setEditor] = useState<Editor | null>(null)
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
            setSpinning(true)
            let { data } = await request({
                data: {
                    path: 'article.add',
                    content: content,
                    title: '标题',
                    createTime: Date.now(),
                    address: null,
                    type: articleType
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
                content: '发布成功！',
                style: {
                    marginTop: '20vh',
                },
            })
            return editor?.commands.clearContent()
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
                <Spin style={{ position: "absolute", top: "20%", left: "50%" }} spinning={ spinning } />
                <Tiptap setEditor={setEditor}/>
                <div style={{textAlign: "right", marginTop: 10 }}>
                    <Button style={{ marginRight: 20 }} type="primary" onClick={submitArticle}>发布为</Button>
                    <Radio.Group value={ articleType } onChange={ e => setArticleType(e.target.value) }>
                        <Radio value={1}>文章</Radio>
                        <Radio value={2}>日志</Radio>
                    </Radio.Group>
                </div>
            </Col>
            <Col xs={{span: 0}} lg={{span: 2}} xxl={{span: 6}}/>
        </Row>)
}

export default WriteArticle
