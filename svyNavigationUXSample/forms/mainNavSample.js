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
	menuItem.iconStyleClass = "fas fa-compass";
	menuItem.text = "Navigation";
	menuItems.push(menuItem);

	/** @type {CustomType<servoyextra-sidenav.MenuItem>} */
	menuItem = new Object();
	menuItem.id = "suppliers";
	menuItem.text = "Suppliers"
	menuItem.iconStyleClass = "fas fa-truck-loading";
	menuItems.push(menuItem);
	
	/** @type {CustomType<servoyextra-sidenav.MenuItem>} */
	menuItem = new Object();
	menuItem.id = "products";
	menuItem.text = "Products"
	menuItem.iconStyleClass = "fas fa-boxes";
	menuItems.push(menuItem);
	
	return menuItems;
}