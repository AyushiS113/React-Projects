import { Button, Form } from 'antd';
import React, { useState } from 'react'
import LoginBanner from "../../../assets/images/login-image.png";
import { FormBox, InputBox } from '../../../components/AntdAddons';
import LoginBG from "../../../assets/images/login-pattern.png";
import { Link, useNavigate } from 'react-router-dom';
import { assignErrorToInput } from '../../../store/api';
import { LoginRequest } from './Validation';
import { AppDispatch } from '../../../store/app';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../../store/AuthSlice';

const ForgotPassword: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const [form] = Form.useForm();
	const [saving, setSaving] = useState<boolean>(false);
	const navigate = useNavigate();

	const handleSubmit = (data: any) => {
		setSaving(true);
		dispatch(forgotPassword(data)).then(() => {
			form.resetFields()
			navigate('/login');
		}).catch((error: any) => {
			assignErrorToInput(form, error?.STATUS);
		}).finally(() => setSaving(false))
	};

	return (
		<section className="loginSection forgotPassword">
			<div className="loginWrap">
				<div className="loginLogo">
					<div className="loginBanner">
						<img src={LoginBanner} alt="Banner" />
					</div>
				</div>
				<div className="loginForm" style={{ backgroundImage: `url(${LoginBG})` }}>
					<div className="loginFormWrap">
						<div className="formTitle">
							<h2>Forgot Password</h2>
						</div>
						<FormBox form={form} onFinish={handleSubmit}>
							<InputBox.Text
								name="email"
								label="Email ID"
								placeholder="Enter Email"
								rules={LoginRequest().email()}
							/>
							<div className="text-center">
								<Button loading={saving} type="primary" htmlType="submit" className="activeBtn">
									Forgot Password
								</Button>
							</div>
							<div className="text-right mt-10 font-medium text-white">
								<Link to="/login">Back to login</Link>
							</div>
						</FormBox>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ForgotPassword;