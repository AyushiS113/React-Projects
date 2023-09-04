import React from "react";
import { AgGridReact, AgGridReactProps, AgReactUiProps } from "ag-grid-react";
import Config from "../../config/Config";
import "ag-grid-enterprise";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/app";

interface AgGridWrapperProps extends AgReactUiProps, AgGridReactProps {
  type?: "serverSide" | "clientSide";
  onGridReadyWithDispatch?: any;
}

const AgGridWrapper: React.FC<AgGridWrapperProps> = ({
  children,
  type = "clientSide",
  onGridReadyWithDispatch,
  ...rest
}) => {
  const gridType =
    type === "serverSide" ? Config.grid.server : Config.grid.local;
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="ag-theme-alpine ag-grid-wrapper">
      <AgGridReact
        {...gridType}
        onGridReady={(params: any) => dispatch(onGridReadyWithDispatch(params))}
        {...rest}
      >
        {children}
      </AgGridReact>
    </div>
  );
};

export default AgGridWrapper;
