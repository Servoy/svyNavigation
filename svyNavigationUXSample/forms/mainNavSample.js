/**
 * @return {Array<CustomType<servoyextra-sidenav.MenuItem>>}
 * @protected
 * @override 
 * @properties={typeid:24,uuid:"CE12F32F-B497-4ED7-88D8-DB8FB51CD9D2"}
 */
function loadMenuItems() {
	var menuItems = [];
		
	/** @type {CustomType<servoyextra-sidenav.MenuItem>} */
	var menuItem = new Object();
	menuItem.id = "svyNavigationUX$Welcome";
	menuItem.iconStyleClass = "fa fa-home";
	menuItem.text = "Home";
	menuItems.push(menuItem);

	/** @type {CustomType<servoyextra-sidenav.MenuItem>} */
	menuItem = new Object();
	menuItem.id = "suppliers";
	menuItem.text = "Suppliers"
	menuItem.iconStyleClass = "fa fa-folder";
	menuItems.push(menuItem);
	
	/** @type {CustomType<servoyextra-sidenav.MenuItem>} */
	menuItem = new Object();
	menuItem.id = "products";
	menuItem.text = "Products"
	menuItem.iconStyleClass = "fa fa-folder";
	menuItems.push(menuItem);
	
	return menuItems;
}