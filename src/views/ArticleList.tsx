import React, {CSSProperties, useState} from "react";
import useRequest from "hooks/useRequest";
import FLoading from "comps/FLoading";
import FEmpty from "comps/FEmpty";
import {Col, Pagination, Row} from "antd";
import {DeleteOutlined, EditOutlined, ReadOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";

type ListItem = { content: string, id: number }

type List = Array<ListItem>

const ArticleItem = ({content, id}: ListItem) => {
    const wrapperStyle: CSSProperties = {
        display: "flex",
        justifyContent: "space-between",
        lineHeight: '50px',
        height: 50
    }

    const contentStyle: CSSProperties = {
        width: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    }

    const toolbarStyle: CSSProperties = {
        width: 150,
        marginLeft: 10,
        textAlign: "right",
        cursor: "pointer",
        fontSize: "16px"
    }

    const navigate = useNavigate()
    return (<div className='hover-blue fxs-height-30'
                 style={wrapperStyle}>
        <div style={contentStyle}>
            {content}
        </div>
        <div style={toolbarStyle}>
            <ReadOutlined onClick={() => {
                navigate('/detail', { state: { articleID: id }, replace: false })
            }} />
            <EditOutlined style={{marginLeft: 20}}/>
            <DeleteOutlined style={{marginLeft: 20}}/>
        </div>
    </div>)
}

function ArticleList() {
    const [ currentPage, setCurrentPage ] = useState(1)
    const pageSize = 10
    const [ params, setParams ] = useState({
        url: '/articleList',
        data: {
            pageSize: pageSize,
            pageNo: currentPage
        }
    })
    let {empty, loading, resData, setLoading} = useRequest(params)
    const list: List = resData.list
    const handleChange = (page:number, pageSize:number) => {
        setLoading(true)
        setCurrentPage(page)
        setParams({
            ...params,
            data: {
                pageSize: pageSize,
                pageNo: page
            }
        })
    }

    return (
        <Row>
            <Col xs={{span: 1}} lg={{span: 2}} xxl={{span: 6}}/>
            <Col xs={{span: 22}} lg={{span: 20}} xxl={{span: 12}}>
                <div style={{minHeight: 500}} className='fxs-min-height-300'>
                    <FLoading show={loading}/>
                    {
                        list.map(ele => <ArticleItem {...ele} />)
                    }
                    <FEmpty show={empty}/>
                </div>
                <Pagination
                    defaultCurrent={ currentPage }
                    defaultPageSize={ pageSize }
                    current={ currentPage }
                    onChange={ handleChange }
                    style={{ marginTop: 60, textAlign: "center" }}
                    total={resData.total}
                    showSizeChanger
                    pageSizeOptions={[ 10, 20, 30, 40, 50 ]}
                    showQuickJumper
                />
            </Col>
            <Col xs={{span: 1}} lg={{span: 2}} xxl={{span: 6}}/>
        </Row>
    )
}

export default ArticleList
