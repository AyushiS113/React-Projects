import React, { useState } from "react";

import ToolBar from "../../../components/ToolBar";
import CreateButton from "../../../components/ToolBar/Buttons/CreateButton";
import RecordPerPage from "../../../components/ToolBar/Dropdown/RecordPerPage";
import ContentBox from "../../../components/ContentBox/ContentBox";
import Listing from "./components/Listing/Listing";
import { setPerPageSize, details, setDetails, deleteRecord } from "./utils/slice";
import DeleteModal from "../../../components/Modals/DeleteModal";
import ViewDrawer from "./components/ViewDrawer";
import { AppDispatch } from "../../../store/app";
import { useDispatch } from "react-redux";
import AddComponent from "./components/Form/AddComponent";
import EditComponent from "./components/Form/EditComponent";
import { RoleBreadcrumb } from "../../../config/BreadcrumbConfig";

const moduleName = "Roles";

const RoleManagement: React.FC<any> = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [deleteValue, setDeleteValue] = useState<any>();

  const getDetails = (data: any) => {
    console.log('data', data);
    
    dispatch(details(data.id)).then(() => {
      // 
    }).catch(() => {
      // 
    });
  }
  return (
    <>
      <ToolBar breadcrumbs={RoleBreadcrumb} >
        <CreateButton
          action={() => setIsCreateVisible(true)}
          permissionKey={`${moduleName.toUpperCase()}_CREATE`}
        />
        <RecordPerPage
          onChange={(perPageSize: number) => {
            dispatch(setPerPageSize(perPageSize))
          }}
        />
      </ToolBar>
      <ContentBox>
        <Listing
          moduleName={moduleName}
          handleViewClick={getDetails}
          handleEditClick={getDetails}
          handleDeleteClick={setDeleteValue}
        />
        <AddComponent
          titleName={moduleName}
          open={isCreateVisible}
          close={() => setIsCreateVisible(false)}
        />
        <ViewDrawer
          titleName={moduleName}
          close={() => dispatch(setDetails(null))}
        />
        <EditComponent
          titleName={moduleName}
          close={() => dispatch(setDetails(null))}
        />
        <DeleteModal
          title={moduleName}
          deleteValues={deleteValue}
          callApi={deleteRecord}
          close={() => setDeleteValue(null)}
        />
      </ContentBox>
    </>
  );
};

export default RoleManagement;
