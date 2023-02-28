import React, { useEffect, useState } from "react";
import { Input, Button, Form, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import useStore from "../stores/CommonStore"

export default function Login() {
  const navigate = useNavigate();
  const [btndisabled, setBtnDisabled] = useState(false);
  const store = useStore();

  useEffect(()=>{
    const token=localStorage.getItem("accessToken")
    if(token){
      navigate('/dash')
    }else{
      navigate('/')
    }
  },[navigate])

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
  const onValuesChange = (changedValues, allValues) => {
    if (allValues.username !== undefined && allValues.password !== undefined) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };
  const onSubmit = (values) => {
    store.LoginStore.loginUser(values)
  };
  const validateMessages = {};
  return (
   <div>
     <div
      style={{
        height: "280px",
        width: "500px",
        background: "rgb(238, 236, 232)",
        borderRadius: "5px",
        marginLeft: "400px",
        marginTop: "100px",
      }}
    >
      <h2>Login</h2>
      <UserOutlined style={{ fontSize: "40px" }} />
      <br />
      <br />
      <Card style={{ color: "wheat" }}>
        <Form
          {...formItemLayout}
          validateMessages={validateMessages}
          onValuesChange={onValuesChange}
          onFinish={onSubmit}
        >
          <Form.Item
            name={["username"]}
            label="Enter Email"
            rules={[
              {
                required: true,
                message: "Username is required !",
                type: "email",
              },
              {
                pattern: /[a-z0-9]+@[a-z]+.[a-z]{2,3}/,
                message: "Username is not valid !",
              },
            ]}
          >
            <Input
              placeholder="example@melivecode.com"
              suffix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            name={["password"]}
            label="Enter Password"
            rules={[
              {
                required: true,
                message: "Password is required !",
              },
              {
                min: 8,
                message: "Minimum length is 8 character",
              },
            ]}
          >
            <Input.Password placeholder="xxxxxxxx" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={btndisabled}
              style={{ marginLeft: "190px" }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
   </div>
  );
}
