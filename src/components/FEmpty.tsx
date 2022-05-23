import {Empty} from "antd";
import React from "react";
import {getDisplay} from "tools/tools"
import { LoadingProps } from "./FLoading"

function FEmpty({show}: LoadingProps) {
    return (<Empty
        imageStyle={{
            display: "none"
        }}
        description='Data Not Found'
        style={{
            color: "#ccc",
            textAlign: "center",
            display: getDisplay(show)
        }} />)
}

export default FEmpty
