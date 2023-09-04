import React from "react";
import { Form, ModalProps, Drawer } from "antd";
import CancelButton from "../Buttons/CancelButton";
import SaveButton from "../Buttons/SaveButton";
import { validateFields } from "../../utils/commonFunctions";
import PageSpinner from "../PageSpinner/PageSpinner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/app";
import SVGIcon from "../../utils/SVGIcon";
import Config from "../../config/Config";
import { assignErrorToInput } from "../../store/api";

interface EditModalProps extends ModalProps {
  titleName?: string;
  close: () => void;
  formComponent: React.FC<any>;
  callApi: any;
  editValues?: any;
  formProps?: any;
}

const EditDrawer: React.FC<EditModalProps> = ({
  titleName,
  close,
  formComponent: FormComponent,
  callApi,
  editValues,
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
    validateFields(form, setDisabled);
  };

  const handleSubmit = (data: any) => {
    setSaving(true);
    dispatch(callApi(editValues.id, data))
      .then(() => {
        drawerClose();
      }).catch((error: any) => {
        assignErrorToInput(form, error?.STATUS);
      })
      .finally(() => setSaving(false));
  };

  return (
    <Drawer
      title={`Edit ${titleName}`}
      open={editValues ? true : false}
      width={"70%"}
      onClose={drawerClose}
      destroyOnClose
      closeIcon={<SVGIcon icon="close" color={Config.themePrimaryBtn} />}
      footer={[
        <CancelButton key={2} onClick={drawerClose} />,
        <SaveButton
          key={1}
          form="editForm"
          disabled={disabled}
          loading={saving}
        />,
      ]}
      {...rest}
    >
      {saving ? (
        <PageSpinner />
      ) : (
        <FormComponent
          form={form}
          id="editForm"
          editValues={editValues}
          handleSubmit={handleSubmit}
          onValuesChange={validateForm}
          {...formProps}
        />
      )}
    </Drawer>
  );
};

export default EditDrawer;
