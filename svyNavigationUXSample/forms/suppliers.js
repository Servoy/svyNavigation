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
	if (column.id === "link") {
		
		// navigate to the given product
		var item = new scopes.svyNavigation.NavigationItem("products");
		item.setCustomData({
			pks: foundset.suppliers_to_products.getSelectedRecord().getPKs()
		});
		
		scopes.svyNavigation.open(item);
	}
}
