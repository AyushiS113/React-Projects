import React from "react";
import { Button } from "antd";
import SVGIcon from "../../../utils/SVGIcon";
import { ButtonProps } from "../../Buttons/interface/ButtonInterface";

const DeleteButton: React.FC<ButtonProps> = ({
  action,
  data,
  permission,
  ...rest
}) => {
  if (!permission) {
    return null;
  }
  return (
    <Button
      type="text"
      title={"Delete"}
      className="deleteIcon"
      onClick={() => {
        action(data);
      }}
      {...rest}
    >
      <SVGIcon icon="delete" width={12} />
    </Button>
  );
};

export default DeleteButton;
