import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form } from "antd";
// import { useNavigate } from "react-router-dom";
import { FormBox, InputBox } from "../../../components/AntdAddons";
import LoginBG from "../../../assets/images/login-pattern.png";
import { LoginRequest } from "./Validation";
import { useDispatch, useSelector } from "react-redux";
import { doLogin } from "../../../store/AuthSlice";
import { AppDispatch, RootState } from "../../../store/app";
import { Link, useNavigate } from "react-router-dom";
import { stringDecryption } from "../../../config/Global";
import { assignErrorToInput } from "../../../store/api";

const LoginForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
	const [rememberMe, setRememberMe] = useState(false)
  const Auth = useSelector((state: RootState) => state.AUTH);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    dispatch(doLogin(data)).then(() => {
      navigate("/");
    }).catch((error: any) => {
      assignErrorToInput(form, error?.STATUS);
    })
  };

  useEffect(() => {
    let rememberMe: any = localStorage.getItem("remember_me");
    if (rememberMe) {
      rememberMe = JSON.parse(stringDecryption(rememberMe));
      form.setFieldsValue({
        username: rememberMe.email,
        password: rememberMe.password,
        remember: true,
      });
			setRememberMe(true)
    }
  }, [form]);

  return (
    <div className="loginForm" style={{ backgroundImage: `url(${LoginBG})` }}>
      <div className="loginFormWrap">
        <div className="formTitle">
          <h2>Welcome IWNL Energy</h2>
        </div>
        <FormBox form={form} onFinish={handleSubmit}>
          <InputBox.Text
            name="username"
            label={"Email ID"}
            placeholder="example@domain.com"
          // rules={LoginRequest().email("Email ID")}
          />
          <InputBox.Password
            name="password"
            label="Password"
            placeholder="xxxxxxx"
            rules={LoginRequest().password("Password")}
          />
          <div className="text-center">
            <Button loading={Auth.isLoading} type="primary" htmlType="submit">
              Login
            </Button>
          </div>
					<div className="mt-10 font-medium login_extra_fields" style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Checkbox name='remember_me' checked={rememberMe} onChange={() => setRememberMe(!rememberMe)}>Remember me</Checkbox>
						<Link to="/forgot-password">Forgot Password?</Link>
					</div>
        </FormBox>
      </div>
    </div>
  );
};

export default LoginForm;
