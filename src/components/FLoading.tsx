import {Spin} from "antd";
import React, {CSSProperties} from "react";
import {getDisplay} from "tools/tools"

export type LoadingProps = { show: boolean, style?: CSSProperties }

function FLoading({show, style = {}}: LoadingProps) {
    const wrapperStyle: CSSProperties = {
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 1,
        backgroundColor: "rgba(255, 255, 255, .8)",
        userSelect: "none",
        display: getDisplay(show)
    }
    const spinStyle: CSSProperties = {
        position: "absolute",
        top: "300px",
        left: "50%"
    }

    return (<div style={{
        ...wrapperStyle,
        ...style
    }}>
        <div style={{
            position: "fixed",
            inset: 0,
            display: getDisplay(show)
        }} />
        <Spin
            size={'large'}
            style={spinStyle}/>
    </div>)
}

export default FLoading
