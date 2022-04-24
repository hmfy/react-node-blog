import React from "react";
import { List } from "antd"

function SelfList ({ data = [], title, style }) {
	return (
		<List
			style={{
				...style
			}}
			header={
				<div>{ title }</div>
			}
			bordered
			dataSource={ data }
			renderItem={item => (
				<List.Item style={{
					whiteSpace: "nowrap",
					textOverflow: "ellipsis",
					overflow: "hidden",
					display: "block"
				}}>
					{item}
				</List.Item>
			)}
		/>
	)
}
export default SelfList
