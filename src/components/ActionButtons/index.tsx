import React from "react";
import ViewButton from "./Buttons/ViewButton";
import EditButton from "./Buttons/EditButton";
import DeleteButton from "./Buttons/DeleteButton";
import { ButtonProps } from "../Buttons/interface/ButtonInterface";
import LockButton from "./Buttons/LockButton";
import { checkPrivileges } from "../../config/Global";
import { useSelector } from "react-redux";
import { RootState } from "../../store/app";

interface ActionButtonsProps {
  data: any;
  view?: ButtonProps;
  edit?: ButtonProps;
  deleteButton?: ButtonProps;
  lock?: ButtonProps;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  data,
  lock,
  view,
  deleteButton,
  edit,
}) => {
  const Auth = useSelector((state: RootState) => state.AUTH);
  console.log('data', data);
  
  return (
    <div className="action-column">
      {lock?.action && (
        <LockButton
          data={data?.data}
          permission={checkPrivileges(Auth.userDetail, lock.permissionKey)}
          {...lock}
        />
      )}
      {view?.action && (
        <ViewButton
          data={data?.data}
          permission={checkPrivileges(Auth.userDetail, view.permissionKey)}
          {...view}
        />
      )}
      {edit?.action && (
        <EditButton
          data={data?.data}
          permission={checkPrivileges(Auth.userDetail, edit.permissionKey)}
          {...edit}
        />
      )}
      {deleteButton?.action && (
        <DeleteButton
          data={data?.data}
          permission={checkPrivileges(
            Auth.userDetail,
            deleteButton.permissionKey
          )}
          {...deleteButton}
        />
      )}
    </div>
  );
};

export default ActionButtons;
