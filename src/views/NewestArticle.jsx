import React from "react";
import SelfList from 'comps/SelfList'

function NewestArticle () {
	const data = [
		'Racing car sprays burning fuel into crowd.',
		'Japanese princess to wed commoner.',
		'Australian walks 100km after outback crash.',
		'Man charged over missing wedding girl.',
		'Los Angeles battles huge wildfires.',
	];

	return (
		<SelfList data={data} title='最近' style={{
			marginBottom: "10px"
		}} />
	)
}
export default NewestArticle
