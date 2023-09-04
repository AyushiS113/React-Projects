import React from "react";
import { Button } from "antd";
import SVGIcon from "../../../utils/SVGIcon";
import { ButtonProps } from "../../Buttons/interface/ButtonInterface";

const EditButton: React.FC<ButtonProps> = ({
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
      title={"Edit"}
      className="editIcon"
      onClick={() => {
        console.log('ddddddddddd data', data);
        
        action(data);
      }}
      {...rest}
    >
      <SVGIcon icon="edit" />
    </Button>
  );
};

export default EditButton;
