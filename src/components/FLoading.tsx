import {Spin} from "antd";
import React, {CSSProperties} from "react";

export type LoadingProps = { show: boolean, style?: CSSProperties }

function FLoading({show}: LoadingProps) {
    const spinStyle: CSSProperties = {
        position: "absolute",
        top: "30vh",
        left: "50%"
    }

    return (
        <Spin
            spinning={show}
            size={'large'}
            style={spinStyle}/>
    )
}

export default FLoading
