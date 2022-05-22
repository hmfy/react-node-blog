import {Empty} from "antd";
import React from "react";
import {getDisplay} from "tools/tools"
import { LoadingProps } from "./FLoading"

function FEmpty({show}: LoadingProps) {
    return (<div
        // image={Empty.PRESENTED_IMAGE_SIMPLE}
        // description={ <span>没有更多数据了</span> }
        style={{
            textAlign: "center",
            display: getDisplay(show)
        }}>没有更多数据了</div>)
}

export default FEmpty
