import React from "react";
import { Form, DrawerProps, Button, Drawer } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../store/app";
import { validateFields } from "../../../../../config/Global";
import { assignErrorToInput } from "../../../../../store/api";
import SVGIcon from "../../../../../utils/SVGIcon";
import Config from "../../../../../config/Config";
import PageSpinner from "../../../../../components/PageSpinner/PageSpinner";
import { createRecord } from "../../utils/slice";
import FormComponent from "./FormComponent";

interface AddDrawerProps extends DrawerProps {
  titleName?: string;
  close: () => void;
}

const AddComponent: React.FC<AddDrawerProps> = ({
  titleName,
  close,
  ...rest
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [form] = Form.useForm();
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const [saving, setSaving] = React.useState<boolean>(false);

  const drawerClose = () => {
    close();
    form.resetFields();
  };

  const validateForm = () => {
    validateFields(form, setDisabled);
  };

  const handleFormSubmit = (data: any) => {
    setSaving(true);

    dispatch(createRecord(data))
      .then(() => {
        drawerClose();
      }).catch((error: any) => {
        assignErrorToInput(form, error?.STATUS);
      })
      .finally(() => setSaving(false));
  };

  return (
    <Drawer
      title={`Add ${titleName}`}
      placement="right"
      width={"70%"}
      onClose={drawerClose}
      destroyOnClose
      closeIcon={<SVGIcon icon="close" color={Config.themePrimaryBtn} />}
      footer={[
        <Button
          key="2"
          htmlType="button"
          className="cancelBtn"
          onClick={drawerClose}
        >
          Cancel
        </Button>,
        <Button
          key="1"
          disabled={disabled}
          form="addForm"
          loading={saving}
          htmlType="submit"
          type="primary"
        >
          Save
        </Button>,
      ]}
      {...rest}
    >
      {saving ? (
        <PageSpinner />
      ) : (
        <FormComponent
          form={form}
          id="addForm"
          handleSubmit={handleFormSubmit}
          onValuesChange={validateForm}
        />
      )}
    </Drawer>
  );
};

export default AddComponent;
