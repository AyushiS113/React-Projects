import React from "react";
import { Button, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface DeleteComponentProps {
	moduleName: string
	deleteValues: any
	visible: boolean
	close: any
	saving: boolean
	deleteRecord: any
}

const DeleteComponent: React.FC<any> = ({ moduleName, deleteValues, visible, close, saving, deleteRecord }: DeleteComponentProps) => {

	return (
		<Modal
			centered
			className="deleteModal"
			title={`Delete ${moduleName}`}
			open={visible}
			closeIcon={<FontAwesomeIcon icon={faTimes} />}
			onCancel={close}
			cancelButtonProps={{ style: { display: "none" } }}
			okButtonProps={{ style: { display: "none" } }}
			footer={[
				<Button key="2" htmlType="button" className="cancelBtn" onClick={close}>
					Cancel
				</Button>,
				<Button
					key="1"
					htmlType="button"
					type="primary"
					loading={saving}
					onClick={deleteRecord}
				>
					Delete
				</Button>,
			]}
		>
			<div className="deleteNote">
				Are you sure want to delete <span>{deleteValues.name}</span> {moduleName}?
			</div>
		</Modal>
	)
};

export default DeleteComponent;
