import React from "react";
import { Form, DrawerProps, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateRecord } from "../../utils/slice";
import { AppDispatch, RootState } from "../../../../../store/app";
import { validateFields } from "../../../../../config/Global";
import SVGIcon from "../../../../../utils/SVGIcon";
import Config from "../../../../../config/Config";
import CancelButton from "../../../../../components/Buttons/CancelButton";
import SaveButton from "../../../../../components/Buttons/SaveButton";
import PageSpinner from "../../../../../components/PageSpinner/PageSpinner";
import FormComponent from "./FormComponent";
import { assignErrorToInput } from "../../../../../store/api";

interface EditDrawerProps extends DrawerProps {
  titleName?: string;
  close: () => void;
}

const EditComponent: React.FC<EditDrawerProps> = ({
  titleName,
  close,
  ...rest
}) => {
  const dispatch: AppDispatch = useDispatch();
  const ROLE = useSelector((state: RootState) => state.ROLE);
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
    dispatch(updateRecord(ROLE.details.id, data))
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
      open={ROLE.details ? true : false}
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
          editValues={ROLE.details}
          handleSubmit={handleSubmit}
          onValuesChange={validateForm}
        />
      )}
    </Drawer>
  );
};

export default EditComponent;
