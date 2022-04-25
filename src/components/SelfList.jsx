import React from "react";
import { List } from "antd"

function SelfList ({ data = [], title, style }) {
	return (
		<List
			style={{
				borderColor: "transparent",
				boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
				...style
			}}
			header={
				<div style={{
					fontSize: "16px",
					fontWeight: "bold"
				}}>{ title }</div>
			}
			bordered
			dataSource={ data }
			renderItem={item => (
				<List.Item style={{
					whiteSpace: "nowrap",
					textOverflow: "ellipsis",
					overflow: "hidden",
					display: "block",
					cursor: "pointer",
				}}>
					{item}
				</List.Item>
			)}
		/>
	)
}
export default SelfList
