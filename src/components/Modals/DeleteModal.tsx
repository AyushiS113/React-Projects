import React, { useState } from "react";
import { Button, ModalProps } from "antd";
import CommonModal from "./CommonModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/app";

interface DeleteModalProps extends ModalProps {
  title?: string;
  close: any;
  deleteValues: any;
  callApi: any;
  name?: string | number;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  title,
  close,
  deleteValues,
  callApi,
  name,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [saving, setSaving] = useState<boolean>(false);

  const deleteProduct = () => {
    setSaving(true);
    callApi(deleteValues.id);
    dispatch(callApi(deleteValues.id))
      .then(() => {
        // if (!data.status) {
        //   form.setFields(data.error);
        // } else {
        close();
        // }
      })
      .finally(() => setSaving(false));
  };

  return deleteValues ? (
    <CommonModal
      className="deleteModal"
      title={`Delete ${title}`}
      open={deleteValues ? true : false}
      onCancel={close}
      footer={[
        <Button key="2" htmlType="button" className="cancelBtn" onClick={close}>
          Cancel
        </Button>,
        <Button
          key="1"
          htmlType="button"
          type="primary"
          loading={saving}
          onClick={deleteProduct}
        >
          Delete
        </Button>,
      ]}
    >
      <div className="deleteNote">
        Are you sure want to delete {name && <span>{name}</span>} {title}?
      </div>
    </CommonModal>
  ) : (
    <></>
  );
};
export default DeleteModal;
