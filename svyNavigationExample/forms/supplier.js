
/**
 * Called when the mouse is clicked on a row/cell (foundset and column indexes are given) or.
 * when the ENTER key is used then only the selected foundset index is given
 * Use the record to exactly match where the user clicked on
 *
 * @param {Number} foundsetindex
 * @param {Number} [columnindex]
 * @param {JSRecord} [record]
 * @param {JSEvent} [event]
 *
 * @private
 *
 * @properties={typeid:24,uuid:"D6E83FB0-3E05-4701-A719-48CA6AB305A6"}
 */
function onCellClick(foundsetindex, columnindex, record, event) {
//	Example Form Instances
//	var formName = application.getUUID().toString();
//	application.createNewFormInstance('products',formName);

	var formName = 'products';
	var item = new scopes.svyNavigation.NavigationItem(formName,'Products');
	
	// custom data for drill-down
	item.setCustomData({pk:suppliers_to_products.productid,linked:true});
	scopes.svyNavigation.open(item);
}
