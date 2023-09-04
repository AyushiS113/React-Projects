import React from "react";
import { Form, ModalProps, Button, Drawer } from "antd";
import { validateFields } from "../../utils/commonFunctions";
import PageSpinner from "../PageSpinner/PageSpinner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/app";
import SVGIcon from "../../utils/SVGIcon";
import Config from "../../config/Config";
import { assignErrorToInput } from "../../store/api";

interface AddModalProps extends ModalProps {
  titleName?: string;
  close: () => void;
  formComponent: React.FC<any>;
  callApi: any;
  formProps?: any;
}

const AddDrawer: React.FC<AddModalProps> = ({
  titleName,
  close,
  formComponent: FormComponent,
  callApi,
  formProps,
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
    console.log("sdf");
    validateFields(form, setDisabled);
  };

  const handleFormSubmit = (data: any) => {
    setSaving(true);

    dispatch(callApi(data))
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
          {...formProps}
        />
      )}
    </Drawer>
  );
};

export default AddDrawer;
