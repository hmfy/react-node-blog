import {Empty} from "antd";
import React from "react";
import { getDisplay } from "tools/tools"

type ShowBoolean = { show: boolean }

function FEmpty ({ show }: ShowBoolean) {
	return (<Empty
		image={Empty.PRESENTED_IMAGE_SIMPLE}
		style={{
			display: ((!show && "none") || undefined)
		}}/>)
}

export default FEmpty
