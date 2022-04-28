import React, {CSSProperties} from "react";
import {List} from "antd"
import FLoading from "comps/FLoading";
import FEmpty from "comps/FEmpty";
import useRequest from "hooks/useRequest";

type BlogProps = {
    id: number
    title?: string,
    content: string,
    createTime: string
}
type Response = {
    data: {
        list: Array<BlogProps>
    }
}

type listParams = {
    request: () => Promise<Response>
    title: string
    style?: CSSProperties
}

function ListItem({content}:{ content?: string }) {
    return (<List.Item style={{
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        display: "block",
        cursor: "pointer",
    }}>
        {content}
    </List.Item>)
}

function FList({request, title, style}: listParams) {
    const {empty, loading, dataList} = useRequest(request)
    return (
        <div style={{
            position: "relative",
            minHeight: "200px"
        }}>
            <FLoading show={loading}/>
            {
                <List
                    className={"card-box-shadow"}
                    style={style}
                    header={
                        <div style={{
                            fontSize: "16px",
                            fontWeight: "bold"
                        }}>{title}</div>
                    }
                    bordered
                    dataSource={dataList}
                    renderItem={item => <ListItem {...item} />}
                />
            }
            {/*<FEmpty show={empty}/>*/}
        </div>
    )
}

export default FList
