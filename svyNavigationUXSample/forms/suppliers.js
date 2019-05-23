/**
 * Called when the mouse is clicked on a row/cell (foundset and column indexes are given).
 * the foundsetindex is always -1 when there are grouped rows
 * the record is not an actual JSRecord but an object having the dataprovider values of the clicked record
 *
 * @param {Number} foundsetindex
 * @param {Number} [columnindex]
 * @param {object} [record]
 * @param {JSEvent} [event]
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"3406B6B3-DEEB-4DBB-AD6B-F277F10A9DF3"}
 */
function onCellClickProducts(foundsetindex, columnindex, record, event) {
	var column = elements.tableProducts.getColumn(columnindex);
	// navigate to the given product
	var item = new scopes.svyNavigation.NavigationItem("products");
	var productRecord = foundset.suppliers_to_products.getSelectedRecord();
	
	if (column.id === "link") {
		scopes.svyNavigation.open(item, productRecord, scopes.svyNavigation.NAVIGATION_SELECTION_TYPE.SELECT_RECORD);
	}
	
	if (column.id === "force") {
		scopes.svyNavigation.open(item, productRecord, scopes.svyNavigation.NAVIGATION_SELECTION_TYPE.FORCE_SELECT_RECORD);
	}
	
	if (column.id === "set") {
		scopes.svyNavigation.open(item, foundset.suppliers_to_products, scopes.svyNavigation.NAVIGATION_SELECTION_TYPE.SET_FOUNDSET);
	}
	
	if (column.id === "load-record") {
		scopes.svyNavigation.open(item, productRecord, scopes.svyNavigation.NAVIGATION_SELECTION_TYPE.LOAD_RECORDS);
	}
	
	if (column.id === "load") {
		scopes.svyNavigation.open(item, foundset.suppliers_to_products, scopes.svyNavigation.NAVIGATION_SELECTION_TYPE.LOAD_RECORDS);
	}
}
