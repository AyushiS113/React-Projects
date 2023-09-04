import React from "react";
import { Button } from "antd";
import SVGIcon from "../../../utils/SVGIcon";
import { ButtonProps } from "../../Buttons/interface/ButtonInterface";

const ViewButton: React.FC<ButtonProps> = ({
  action,
  data,
  permission = true,
  iconProps,
  ...rest
}) => {
  if (!permission) {
    return null;
  }

  return (
    <Button
      type="text"
      title={"View"}
      className=""
      onClick={() => action(data)}
      {...rest}
    >
      <SVGIcon icon="view" width={16} {...iconProps} />
    </Button>
  );
};

export default ViewButton;
