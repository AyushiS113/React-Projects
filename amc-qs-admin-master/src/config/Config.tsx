import { IServerSideGetRowsParams } from "ag-grid-community";
import { AgGridReactProps, AgReactUiProps } from "ag-grid-react";


interface ConfigProps {
	[key: string]: any;
	grid: {
		local: AgGridReactProps | AgReactUiProps;
		server: AgGridReactProps | AgReactUiProps;
	};
}

export const onFilterChanged = (params: any) => {
	const agGrid = params;
	if (agGrid && agGrid.api.getModel().getRowCount() === 0) {
		agGrid.api.showNoRowsOverlay();
	}
	if (agGrid && agGrid.api.getModel().getRowCount() > 0) {
		agGrid.api.hideOverlay();
	}
};

const Config: ConfigProps = {
	gutter: 24,
	sidebar_width: 280,
	dateFormat: "DD/MM/YYYY",
	dateTimeFormat: "DD/MM/YYYY HH:mm:ss",
	grid: {
		server: {
			rowModelType: "serverSide",
			serverSideStoreType: 'partial',
			gridOptions: {
				animateRows: true,
				pagination: true,
				paginationPageSize: 50,
				rowHeight: 50,
				enableRangeSelection: true,
				cacheBlockSize: 50,
				blockLoadDebounceMillis: 500,
			},
			defaultColDef: {
				resizable: true,
				sortable: true,
				filter: "agTextColumnFilter",
				filterParams: {
					suppressAndOrCondition: true,
				},
				// floatingFilter: true,
				flex: 1,
				minWidth: 200,
				menuTabs: ["filterMenuTab"]
			},
			columnTypes: {
				actionColumn: {
					cellRenderer: "ActionRenderer",
				},
			},
		},
		local: {
			gridOptions: {
				animateRows: true,
				pagination: true,
				paginationPageSize: 50,
				rowHeight: 50,
				enableRangeSelection: true,
			},
			defaultColDef: {
				resizable: true,
				sortable: true,
				filter: "agTextColumnFilter",
				filterParams: {
					suppressAndOrCondition: true,
				},
				// floatingFilter: true,
				flex: 1,
				minWidth: 200,
				menuTabs: ["filterMenuTab"]
			},
			columnTypes: {
				actionColumn: {
					cellRenderer: "ActionRenderer",
				},
			},
			onFilterChanged: onFilterChanged,
			onSortChanged: onFilterChanged
		},
	},
};

export const getServerListPayload = (params: IServerSideGetRowsParams) => {

	return {
		filter_data: params.request.filterModel,
		sort_data: params.request.sortModel,
		per_page: (params.request.endRow ?? 0) - (params.request.startRow ?? 0),
		page: Math.ceil(
			((params.request.startRow ?? 0) + 1) /
				((params.request.endRow ?? 0) - (params.request.startRow ?? 0))
		),
	};
};

export default Config;
