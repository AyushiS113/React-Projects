const ServerGridConfig: any = {
    rowHeight: 27,
    headerHeight: 27,
    options: {
        rowModelType: 'serverSide',
        animateRows: true,
        pagination: true,
        paginationPageSize: 10,
        cacheBlockSize: 10,
        rowHeight: 40,
        //blockLoadDebounceMillis: 500,
        serverSideStoreType: 'partial',
    },
    defaultColDef: {
        resizable: true,
        filterParams: {
            suppressAndOrCondition: true,
            debounceMs: 1500,
        },
        floatingFilter: true,
        minWidth: 150,
        flex: 1,
        cellStyle: { textAlign: 'center' },
        cellClass: 'custom__cell',
    },
    columnTypes: {
        actionColumn: {
            cellRenderer: 'ActionRenderer',
        },
    },
}
export default ServerGridConfig
