import React, { useEffect } from "react";
import { Col, Row } from "antd";
import { FormBox, InputBox } from "../../../../../components/AntdAddons";
import { rules } from "./rules";
import { fetchRolesList } from "../../../../../store/CommonSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/app";

const FormComponent: React.FC<any> = ({
  form,
  id,
  handleSubmit,
  onValuesChange,
  editValues,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const commonStore = useSelector((state: RootState) => state.COMMON);

  useEffect(() => {
    dispatch(fetchRolesList());
  }, []);

  useEffect(() => {
    if (editValues) {
      form.setFieldsValue(editValues);
    }
  }, [editValues, form]);

  const onFinish = (data: any) => {
    handleSubmit(data);
  };

  return (
    <>
      <FormBox
        form={form}
        id={id}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Row gutter={15}>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Text
              required
              name="name"
              label="Name"
              rules={rules.name()}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Text
              required
              label="Mobile Number"
              name="mobile_no"
              rules={rules.mobileNumber()}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Text
              required
              name="email"
              label="Email"
              rules={rules.email()}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Select
              label="Role"
              name="role_id"
              required
              placeholder="Select Role"
              rules={rules.roleId()}
              options={{
                list: commonStore.rolesList,
                valueKey: "id",
                textKey: "name",
              }}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Text
              required
              name="password"
              label="Password"
              rules={rules.password()}
            />
          </Col>
        </Row>
      </FormBox>
    </>
  );
};

export default FormComponent;
