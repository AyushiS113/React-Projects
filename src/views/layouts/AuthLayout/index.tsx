import React, { useEffect } from "react";
import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/app";

const AuthLayout: React.FC = () => {
  const navigate = useNavigate();
  const Auth = useSelector((state: RootState) => state.AUTH);

  useEffect(() => {
    
  if(Auth.token){
    navigate("/");
  }
  }, [Auth.token, navigate]);

  return (
    <Layout className={`main__page__wrapper has__header`}>
      <Layout.Content className="main__page__content">
        <Outlet />
      </Layout.Content>
    </Layout>
  );
}

export default AuthLayout;
