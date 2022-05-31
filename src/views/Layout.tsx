import {getDisplay} from "tools/tools"
import React, {CSSProperties} from "react";
import {Layout} from "antd";
import Menu from "views/Menu";
import {Route, Routes, useLocation, Navigate, Outlet} from "react-router-dom";

const {Header, Content} = Layout;

function AppLayout() {
    return (
        <Layout>
            <Header>
                <Menu/>
            </Header>
            <Content style={{
                width: "100%"
            }}>
                <Outlet />
            </Content>
        </Layout>
    )
}

export default AppLayout
