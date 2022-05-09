import {Empty} from "antd";
import React from "react";
import {getDisplay} from "tools/tools"
import { LoadingProps } from "./FLoading"

function FEmpty({show}: LoadingProps) {
    return (<Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={ <span>没有更多数据了</span> }
        style={{
            display: getDisplay(show)
        }}/>)
}

export default FEmpty
