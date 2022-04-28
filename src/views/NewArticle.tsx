import React from "react";
import FList from 'comps/FList'
import axios from "axios";

function getNewestArticle () {
	return axios.get('https://www.fastmock.site/mock/5a9f84630f3ede0293cf99c7f56c0644/blog/newArticle')
}
function NewArticle () {
	return (
		<FList title='最近' style={{ marginBottom: 16 }}  request={getNewestArticle} />
	)
}
export default NewArticle
