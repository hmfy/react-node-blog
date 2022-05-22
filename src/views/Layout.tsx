import {getDisplay} from "tools/tools"
import React, {CSSProperties} from "react";
import {Layout} from "antd";
import Menu from "views/Menu";
import {Route, Routes, useLocation, Navigate} from "react-router-dom";
import Home from "views/Home";
import ImgZip from "views/ImgZip";
import ArticleList from "views/ArticleList";
import Time from "views/Time";
import WriteArticle from "views/WriteArticle";
import IsComment from "views/IsComment";
import ArticleDetail from "views/ArticleDetail";
import Login from "views/Login";

const {Header, Content} = Layout;

function AppLayout() {

    const {pathname} = useLocation()
    const notNeedHeader = ['/zip', '/write', '/login']

    const sty: CSSProperties = {
        display: getDisplay(!notNeedHeader.includes(pathname))
    }

    return (
        <Layout>
            <Header style={sty}>
                <Menu/>
            </Header>
            <Content style={{
                width: "100%"
            }}>
                <Routes>
                    <Route path="*" element={<Navigate to="/" />} />
                    <Route path="/" element={
                        <Home/>
                    }/>
                    <Route path="/list" element={
                        <ArticleList/>
                    }/>
                    <Route path="/comment" element={
                        <IsComment/>
                    }/>
                    <Route path="/time" element={
                        <Time/>
                    }/>
                    <Route path="/zip" element={
                        <ImgZip/>
                    }/>
                    <Route path="/write" element={
                        <WriteArticle/>
                    }/>
                    <Route path="/login" element={
                        <Login />
                    }/>
                    <Route path="/detail" element={
                        <ArticleDetail/>
                    }/>
                </Routes>
            </Content>
        </Layout>
    )
}

export default AppLayout
