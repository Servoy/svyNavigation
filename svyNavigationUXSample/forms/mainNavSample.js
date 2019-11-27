/**
 * @return {Array<CustomType<servoyextra-sidenav.MenuItem>>}
 * @protected
 * @override 
 * @properties={typeid:24,uuid:"CE12F32F-B497-4ED7-88D8-DB8FB51CD9D2"}
 */
function loadMenuItems() {
	var menuItems = [];
	
	var menuSubItem;
	
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
	
	/** @type {CustomType<servoyextra-sidenav.MenuItem>} */
	menuItem = new Object();
	menuItem.id = scopes.svySecurityUX.SVY_SECURITY_UX.TENANT;
	menuItem.text = "Security"
	menuItem.iconStyleClass = "fa fa-shield";
	
	var menuSubItems = [];
	
	/** @type {CustomType<servoyextra-sidenav.MenuItem>} */
	menuSubItem = new Object();
	menuSubItem.id = scopes.svySecurityUX.SVY_SECURITY_UX.TENANT_ROLES;
	menuSubItem.text = "Roles"
	menuSubItem.iconStyleClass = "fa fa-user-shield";
	menuSubItems.push(menuSubItem);
	
	/** @type {CustomType<servoyextra-sidenav.MenuItem>} */
	menuSubItem = new Object();
	menuSubItem.id = scopes.svySecurityUX.SVY_SECURITY_UX.TENANT_USERS;
	menuSubItem.text = "Users"
	menuSubItem.iconStyleClass = "fa fa-user-shield";
	menuSubItems.push(menuSubItem);
	
	menuItem.menuItems = menuSubItems;
	
	menuItems.push(menuItem);

	return menuItems;
}