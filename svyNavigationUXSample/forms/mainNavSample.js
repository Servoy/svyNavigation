/**
 * @return {Array<servoyextra-sidenav.MenuItem>}
 * @protected
 * @properties={typeid:24,uuid:"CE12F32F-B497-4ED7-88D8-DB8FB51CD9D2"}
 */
function getMenuItems() {
	var menuItems = [];
	
	/** @type {servoyextra-sidenav.MenuItem} */
	var menuItem = new Object();
	menuItem.id = "svyNavigationUX$Welcome";
	menuItem.iconStyleClass = "fa fa-home";
	menuItem.text = "Home";
	menuItems.push(menuItem);

	/** @type {servoyextra-sidenav.MenuItem} */
	menuItem = new Object();
	menuItem.id = "suppliers";
	menuItem.text = "Suppliers"
	menuItem.iconStyleClass = "fa fa-folder";
	menuItems.push(menuItem);
	
	/** @type {servoyextra-sidenav.MenuItem} */
	menuItem = new Object();
	menuItem.id = "products";
	menuItem.text = "Products"
	menuItem.iconStyleClass = "fa fa-folder";
	menuItems.push(menuItem);
	
	return menuItems;
}

/**
 * @param {scopes.svyNavigation.NavigationItem} item
 *
 * @properties={typeid:24,uuid:"05514045-B75F-405F-95C4-9013EE13DD45"}
 * @override
 */
function afterOpen(item) {
	_super.afterOpen(item);
	
	// TODO why not to move this into the core logic of svyNavItem as well as filter/search/sort or even foundset !?
	var data = item.getCustomData();
	
	var form = forms[item.getFormName()];
	if (form && data && data.pks) {
		
		// TODO shall i select or search record by pk ?
		scopes.svyDataUtils.selectRecordByPks(form.foundset, data.pks[0]);
	}
}