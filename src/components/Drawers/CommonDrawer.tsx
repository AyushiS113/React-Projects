import { Drawer } from "antd";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CommonDrawer: React.FC<any> = ({ title, onClose, open, ...rest }) => {
  return (
    <Drawer
      title={title || "Title"}
      placement="right"
      onClose={onClose}
      open={open}
      width={"80%"}
      destroyOnClose
      closeIcon={<FontAwesomeIcon icon={faTimes} />}
      {...rest}
    />
  );
};

export default CommonDrawer;
