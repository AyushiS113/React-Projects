const ServerGridConfig = {
	rowHeight: 27,
	headerHeight: 27,
	options: {
		rowModelType: "serverSide",
		animateRows: true,
		pagination: true,
		paginationPageSize: 10,
		cacheBlockSize: 10,
		rowHeight: 30,
		blockLoadDebounceMillis: 500,
	},
	defaultColDef: {
		resizable: true,
		sortable: true,
		filter: 'agTextColumnFilter',
		filterParams: {
			suppressAndOrCondition: true,
			debounceMs: 1500
		},
		floatingFilter: true,
		minWidth: 150,
		flex: 1,
		cellStyle: { textAlign: "center" },
		cellClass: "custom__cell",
	},
	columnTypes: {
		actionColumn: {
			cellRenderer: 'ActionRenderer'
		},
	},
}
export default ServerGridConfig