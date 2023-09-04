import { ColDef } from "ag-grid-community";
import {
  idColumn,
  nameColumn,
  actionColumn,
} from "../../../../../utils/commonColumns";
import { renderNA } from "../../../../../utils/commonFunctions";

const emailColumn: ColDef = {
  field: "email",
  headerName: "Email",
  cellRenderer: (props: any) => {
    return renderNA(props.data.email);
  },
};

const mobileNumberColumn: ColDef = {
  field: "mobileNumber",
  headerName: "Mobile Number",
  cellRenderer: (props: any) => {
    return renderNA(props.data.mobile_no);
  },
};
const columnDefs: ColDef[] = [
  idColumn,
  nameColumn,
  emailColumn,
  mobileNumberColumn,
  actionColumn,
];
export default columnDefs;
