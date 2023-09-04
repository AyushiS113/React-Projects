import React from "react";
import AgGridWrapper from "../../../../../components/AgGridWrapper/AgGridWrapper";
import ActionButtons from "../../../../../components/ActionButtons";
import { setupGrid } from "../../utils/slice";
import columnDefs from "./columnDefs";

const Listing: React.FC<any> = ({
  moduleName,
  handleViewClick,
  handleDeleteClick,
  handleEditClick,
}) => {
  const ActionRenderer = (props: any) => {
    return (
      <ActionButtons
        data={props}
        view={{
          action: handleViewClick,
          permissionKey: `${moduleName.toUpperCase()}_DETAILS`,
        }}
        edit={{
          action: handleEditClick,
          permissionKey: `${moduleName.toUpperCase()}_UPDATE`,
        }}
        deleteButton={{
          action: handleDeleteClick,
          permissionKey: `${moduleName.toUpperCase()}_DELETE`,
        }}
      />
    );
  };

  return (
    <>
      <AgGridWrapper
        type="serverSide"
        components={{
          ActionRenderer,
        }}
        onGridReadyWithDispatch={setupGrid}
        columnDefs={columnDefs}
      />
    </>
  );
};

export default Listing;
