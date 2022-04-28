import {Spin} from "antd";
import React from "react";
import { getDisplay } from "tools/tools"

type ShowBoolean = { show: boolean }

function FLoading({show}: ShowBoolean) {
    return (<div style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: !getDisplay(show) ? 999999 : -1,
        background: "white"
    }}>
        <Spin
            size={'large'}
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                display: getDisplay(show)
            }}/>
    </div>)
}

export default FLoading
