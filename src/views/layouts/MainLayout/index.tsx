import React, { useEffect, useState } from "react";
import { Layout } from "antd";
// import useStore from "../../../store";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarView from "./SidebarView";
import FooterView from "./FooterView";
import HeaderView from "./HeaderView";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/app";

const MainLayout: React.FC = () => {
  const [collapsed, SetCollapsed] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Auth = useSelector((state: RootState) => state.AUTH);

  useEffect(() => {
    if (!Auth.token) {
      navigate("/login");
    }
  }, [Auth.token, navigate, dispatch]);

  return (
    <Layout className={`main__page__wrapper has__appsidebar`}>
      <SidebarView collapsed={collapsed} />
      <Layout className="site-layout">
        <HeaderView collapsed={collapsed} SetCollapsed={SetCollapsed} />
        <Layout.Content className="main__app__content">
          <Outlet />
        </Layout.Content>
        <FooterView />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
