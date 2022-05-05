import React from "react";
import {Button, Col, Row} from "antd";
import Tiptap from "comps/Tiptap";

function WriteArticle () {
    return (
        <Row>
            <Col xs={{ span: 0 }} lg={{ span: 2 }} xxl={{ span: 6 }} />
            <Col xs={{ span: 24 }} lg={{ span: 20 }} xxl={{ span: 12 }} style={{ minHeight: "70vh" }}>
                <Tiptap />
                <div style={{ textAlign: "right", marginTop: 10 }}>
                    <Button type="primary">发布文章</Button>
                </div>
            </Col>
            <Col xs={{ span: 0 }} lg={{ span: 2 }} xxl={{ span: 6 }} />
        </Row>)
}

export default WriteArticle
