import React from "react";
import { Button } from "antd";
import SVGIcon from "../../../utils/SVGIcon";
import { ButtonProps } from "../../Buttons/interface/ButtonInterface";

const PdfButton: React.FC<ButtonProps> = ({
  action,
  data,
  permission = true,
  ...rest
}) => {
  if (!permission) {
    return null;
  }
  return (
    <Button
      type="text"
      title={"Pdf Export"}
      className=""
      onClick={() => action(data)}
      {...rest}
    >
      <SVGIcon icon="PDF" />
    </Button>
  );
};

export default PdfButton;
