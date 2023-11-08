import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { BreadcrumbComponentItemTypes, BreadcrumbConfigProps } from "../../config/InterfacesAndTypes";
interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbConfigProps;
}
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <Breadcrumb className="ph-gutter" >
      {breadcrumbs.path?.map((item: BreadcrumbComponentItemTypes, index: number) => (
        <Breadcrumb.Item key={index}>
          {item.link ? <Link to={item.link}>{item.name}</Link> : item.name}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
