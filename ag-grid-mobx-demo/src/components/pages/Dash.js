import React, { useEffect, useState } from "react";
import { FaPowerOff, FaReact } from "react-icons/fa";
import { useNavigate, Outlet, Link } from "react-router-dom";
import "../../App.css";
import { Modal, Row, Col, Layout, Button, Switch } from "antd";
import ToastMessage from "../message/ToastMessage";
import { ToastContainer } from "react-toastify";
import "../../App.css";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import useStore from "../stores/CommonStore"

export default function Dash() {
  const navigate = useNavigate();
  const [isLogout, setIsLogout] = useState(false);
  const [currentState, setCurrentState] = useState(false);
  const store = useStore();

  store.userStore.setInterceptor()

  const confirm = (e) => {
    console.log(e);
    ToastMessage("User logout successfully", "success");
    localStorage.removeItem("accessToken");
    navigate("/");
    setIsLogout(false);
  };
  const cancel = (e) => {
    console.log(e);
    ToastMessage("Cancel......", "success");
    setIsLogout(false);
  };
  const handlechange = (checked) => {
    setCurrentState(checked);
  };
  useEffect(()=>{
    if(localStorage.getItem('accessToken')===null){
      navigate('/')
    }
  })
  return (
    <div>
      {currentState === false ? (
        <Layout>
          <Header>
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col className="gutter-row" span={4}>
                <FaReact size="40px" color="blue" className="react top" />
              </Col>
              <Col className="gutter-row" span={14}></Col>
              <Col className="gutter-row" span={2}>
                <Switch
                  onChange={handlechange}
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Col>
              <Col className="gutter-row " span={3} style={{ color: "white" }}>
                <Button
                  type="primary"
                  onClick={() => setIsLogout(true)}
                  style={{ marginTop: "-4px" }}
                >
                  <FaPowerOff />
                  &nbsp;<b>Logout</b>
                </Button>
              </Col>
              <Modal
                open={isLogout}
                onOk={confirm}
                onCancel={cancel} okText="Yes" cancelText="No"
                title="Are you sure to logout from this window ??"
              />
            </Row>
            <br />
          </Header>
          <Layout>
            <Sider style={{ height: "800px", backgroundColor: "white" }}>
              <h4 style={{ marginTop: "20px" }}>
                {" "}
                <Link to="">Dashboard</Link>
              </h4>
              <h4 style={{ marginTop: "10px" }}>
                {" "}
                <Link to="usertable">Users</Link>
              </h4>
              <h4 style={{ marginTop: "10px" }}>
                {" "}
                <Link to="attract">Atractions/Places</Link>
              </h4>
            </Sider>
            <Content>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      ) : (
        <Layout>
          <Header style={{ background: "#9f9fa1" }}>
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col className="gutter-row" span={4}>
                <FaReact size="40px" color="blue" className="react top" />
              </Col>
              <Col className="gutter-row" span={12}></Col>
              <Col className="gutter-row" span={2}>
                <Switch onChange={handlechange} />
              </Col>
              <Col className="gutter-row" span={2}>
                <Link to="">Dashboard</Link>
              </Col>
              <Col className="gutter-row " span={2} style={{ color: "white" }}>
                <Link to="usertable">Users</Link>
              </Col>
              <Col className="gutter-row " span={2} style={{ color: "white" }}>
                <Link to="attract">Atractions/Places</Link>
              </Col>
              <Modal
                open={isLogout}
                onOk={confirm}
                onCancel={cancel}
                title="Are you sure to logout from this window ??"
              />
            </Row>
            <br />
          </Header>
          <Layout>
            <Sider style={{ height: "800px", backgroundColor: "white" }}>
              <br />
              <h4 style={{ marginTop: "10px" }}>
                {" "}
                <Button
                  type="primary"
                  onClick={() => setIsLogout(true)}
                  style={{ marginTop: "-4px" }}
                >
                  <FaPowerOff />
                  &nbsp;<b>Logout</b>
                </Button>
              </h4>
            </Sider>
            <Content>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      )}
      <ToastContainer theme="colored" limit={1}/>
    </div>
  );
}
