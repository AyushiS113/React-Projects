import { ColDef } from "ag-grid-community";
import { dateFormatter } from "../config/Global";
import { renderNA } from "./commonFunctions";
import dateComparator from "./dateComparator";

export const idColumn: ColDef = {
  field: "id",
  headerName: "# ID",
  pinned: "left",
};

export const nameColumn: ColDef = {
  field: "name",
  headerName: "Name",
  cellRenderer: (props: any) => {
    return renderNA(props.data.name);
  },
};

export const isActiveColumn: ColDef = {
  field: "is_active",
  headerName: "Is Active?",
  filter: "agSetColumnFilter",
  cellRenderer: (props: any) => {
    return renderNA(props.data.name);
  },
  filterParams: {
    values: (params: any) => {
      const data = ["Active", "Deactivate"];
      params.success(data);
    },
    buttons: ["apply", "reset"],
    closeOnApply: true,
  },
};

export const actionColumn: ColDef = {
  field: "",
  type: "actionColumn",
  sortable: false,
  filter: false,
  width: 100,
  minWidth: 100,
  pinned: "right",
};

export const createdAtColumn: ColDef = {
  field: "created_at",
  headerName: "Created at",
  sortable: true,
  width: 200,
  minWidth: 200,
  filter: "agDateColumnFilter",
  cellRenderer: (props: any) => {
    return props.data.created_at ? dateFormatter(props.data.created_at) : "N/A";
  },
  filterParams: {
    buttons: ["apply", "reset"],
    inRangeInclusive: true,
    suppressAndOrCondition: true,
    comparator: dateComparator,
    browserDatePicker: true,
  },
};
export const updatedAtColumn: ColDef = {
  field: "updated_at",
  headerName: "Updated at",
  sortable: true,
  width: 200,
  minWidth: 200,
  filter: "agDateColumnFilter",
  cellRenderer: (props: any) => {
    return props.data.updated_at ? dateFormatter(props.data.updated_at) : "N/A";
  },
  filterParams: {
    buttons: ["apply", "reset"],
    inRangeInclusive: true,
    suppressAndOrCondition: true,
    comparator: dateComparator,
    browserDatePicker: true,
  },
};
