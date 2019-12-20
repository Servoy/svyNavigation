/**
 * @protected 
 * @param firstShow
 * @param event
 *
 * @properties={typeid:24,uuid:"964B658E-BFE5-48EC-B331-5EB3F73CAF1A"}
 */
function onShow(firstShow, event) {
	// listen for a global search event
	scopes.svyNavigationUX.addGlobalSearchListener(globalSearchListener);
}

/**
 * @protected
 * @param searchText
 *
 * @properties={typeid:24,uuid:"949AFA3F-904D-4041-8E88-7BD0E821E059"}
 * @AllowToRunInFind
 */
function globalSearchListener(searchText) {
	if (foundset.find()) {
		foundset.productname = "#%" + searchText + "%";
		foundset.search();
	}}

/**
 * @protected
 * @param event
 *
 * @properties={typeid:24,uuid:"64245DFB-59F4-4176-BD80-2605D9424241"}
 */
function onHide(event) {
	// stop listening when hiding the form
	scopes.svyNavigationUX.removeGlobalSearchListener(globalSearchListener)
	return true
}