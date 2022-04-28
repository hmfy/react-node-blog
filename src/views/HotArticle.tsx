import React from "react";
import FList from "comps/FList"
import axios from "axios";

function getHotArticle () {
	return axios.get('https://www.fastmock.site/mock/5a9f84630f3ede0293cf99c7f56c0644/blog/hotArticle')
}

function HotArticle () {
	return (
		<FList title='热门' request={getHotArticle}/>
	)
}
export default HotArticle
