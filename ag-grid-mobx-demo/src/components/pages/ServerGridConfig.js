const ServerGridConfig = {
	rowHeight: 27,
	headerHeight: 27,
	options: {
		rowModelType: "serverSide",
		animateRows: true,
		pagination: true,
		paginationPageSize: 5,
		cacheBlockSize: 5,
		rowHeight: 40,
		blockLoadDebounceMillis: 500,
		serverSideStoreType: 'partial',
	},
	defaultColDef: {
		resizable: true,
		sortable: true,
		filter: 'agTextColumnFilter',
		filterParams: {
			suppressAndOrCondition: true,
			debounceMs: 1500
		},
	},
}
export default ServerGridConfig