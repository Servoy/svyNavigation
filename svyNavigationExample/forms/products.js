
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"3B00D932-DFC5-4954-B855-4F5FFAE1611F"}
 */
function showSupplier(event) {
	
//	Example Form Instance
//	var formName = application.getUUID().toString();
//	application.createNewFormInstance('supplier',formName);

	var formName = 'supplier';
	var item = new scopes.svyNavigation.NavigationItem(formName,'Supplier','Supplier');
	
	// custom data can be used for drill down
	item.setCustomData({pk:supplierid,linked:true});
	scopes.svyNavigation.open(item);
}
