import React from "react";
import { Button } from "antd";
import { ButtonProps } from "../../Buttons/interface/ButtonInterface";
import { RootState } from "../../../store/app";
import { useSelector } from "react-redux";
import { checkPrivileges } from "../../../config/Global";

const CreateButton: React.FC<ButtonProps> = ({
  action,
  permissionKey,
  permission,
  name = "Create",
}) => {
  const Auth = useSelector((state: RootState) => state.AUTH);

  const permitted = permissionKey
    ? checkPrivileges(Auth.userDetail, permissionKey)
    : permission;

  return permitted ? (
    <Button className="primaryBtn" onClick={action}>
      {name}
    </Button>
  ) : (
    <></>
  );
};

export default CreateButton;
