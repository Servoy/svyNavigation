/**
 * @protected
 * @properties={typeid:35,uuid:"2B0AE741-5A64-4206-B804-3C6D02DF9DAA",variableType:-4}
 */
var DEFAULT_NAVBAR_ACTIONS = {
	SEARCH: "navbar-search",
	USER: "navbar-user",
	LOGOUT: "navbar-logout"
}

/**
 * @private
 * @properties={typeid:24,uuid:"35A142E7-128E-4496-8F28-5D62647F5FCF"}
 * @override
 */
function initNavigationForm() {

	// init the sidenav menu
	var menuItems = getMenuItems();
	elements.sidenav.setRootMenuItems(menuItems);

	// init the navbar menu
	var navbarItems = getNavbarItems();
	elements.navbar.setMenuItems(navbarItems);
}

/**
 * @return {Array<servoyextra-sidenav.MenuItem>}
 * @protected
 * @properties={typeid:24,uuid:"7C672A54-C78D-48DF-946B-F1F96993AAB7"}
 */
function getMenuItems() {
	var menuItems = [];

	/** @type {servoyextra-sidenav.MenuItem} */
	var menuItem = new Object();
	menuItem.id = "svyNavigationUX$Welcome";
	menuItem.text = "Welcome"
	menuItem.iconStyleClass = "fa fa-folder-open";
	menuItems.push(menuItem);

	return menuItems;
}

/**
 * @return {Array<bootstrapextracomponents-navbar.menuItem>}
 *
 * @protected
 * @properties={typeid:24,uuid:"22C5E77A-8061-4AF0-801F-7A1DAE6644FE"}
 */
function getNavbarItems() {
	var menuItems = [];
	var menuItem;

	menuItem = elements.navbar.createMenuItem('Search', DEFAULT_NAVBAR_ACTIONS.SEARCH, 'RIGHT');
	menuItem.displayType = 'INPUT_GROUP';
	menuItem.styleClass = 'closed searchbar';
	menuItem.inputButtonStyleClass = "btn-default";
	menuItem.iconName = "fa fa-search";
	menuItems.push(menuItem);

	if (security.getUserName()) {
		menuItem = elements.navbar.createMenuItem(security.getUserName(), DEFAULT_NAVBAR_ACTIONS.USER, 'RIGHT');
		menuItem.displayType = 'MENU_ITEM';
		menuItem.iconName = 'fa fa-user';
		menuItem.styleClass = 'no-border';
		var submenuItems = [];

		submenuItems.push(elements.navbar.createMenuItem('Logout', DEFAULT_NAVBAR_ACTIONS.LOGOUT));
		menuItem.subMenuItems = submenuItems;
		menuItems.push(menuItem);
	}

	return menuItems;
}

/**
 * @return {String}
 * @public
 *
 * @properties={typeid:24,uuid:"01FF50C6-D6EA-4CB1-81C7-58E11A8FFD46"}
 */
function getActiveFormName() {
	if (elements.sidenav && elements.sidenav.containedForm) {
		return elements.sidenav.containedForm;
	} else {
		return null;
	}
}

/**
 * @protected
 * @param {scopes.svyNavigation.NavigationItem} item
 *
 * @properties={typeid:24,uuid:"EB547A09-C78E-462F-936D-21FB1E5675B4"}
 * @override
 */
function afterOpen(item) {

	var formName = item.getFormName();
	//	var navPks = item.getPks();
	//	var navFilters = item.getFilters();

	// get the form instance
	var form = forms[formName];
	if (!form) {
		throw new scopes.svyExceptions.IllegalStateException('Cannot navigate to form because cannot find form instance ' + formName);
	}

	//	/** @type {JSFoundSet}  */
	//	var formFoundset = form['foundset'];
	//
	//	// manage nav filters
	//	var filtersUpdate = false;
	//	var filterPrefix = "ips-navfilter-"; // use prefix for navigation filters so they can be distinguished from normal filters
	//	var existingFilters = formFoundset.getFoundSetFilterParams();
	//
	//	// clean previous navigation filters
	//	for (var i = 0; i < existingFilters.length; i++) {
	//		/** @type {String} */
	//		var existingFilterName = existingFilters[i][4];
	//		if (existingFilterName && existingFilterName.substr(0, filterPrefix.length) == filterPrefix) {
	//			if (!formFoundset.removeFoundSetFilterParam(existingFilterName)) {
	//				throw new scopes.svyExceptions.IllegalStateException("IpsNavigation error: cannot remove foundset filter " + existingFilterName);
	//			}
	//			filtersUpdate = true;
	//		}
	//	}

	//	// add new filters
	//	for (i = 0; i < navFilters.length; i++) {
	//		var navFilter = navFilters[i];
	//		if (!formFoundset.addFoundSetFilterParam(navFilter.dataProvider, navFilter.operator, navFilter.value, navFilter.name)) {
	//			throw new scopes.svyExceptions.IllegalStateException("IpsNavigation error: cannot add foundset filter " + navFilter.name);
	//		}
	//		filtersUpdate = true;
	//	}
	//
	//	if (navPks && navPks.length) { // load pk if specified
	//		scopes.svyDataUtils.loadRecords(formFoundset, navPks);
	//	} else if (filtersUpdate) { // else reload filters if they have been updated
	//		formFoundset.loadRecords();
	//	}

	// show form
	elements.sidenav.containedForm = formName;

	//  update the selected menu item for the main menu
	var menuId = getMenuItemID(item.getFormName());
	if (menuId) {
		elements.sidenav.setSelectedMenuItem(menuId);
	} else {
		elements.sidenav.setSelectedMenuItem(null);
	}
}

/**
 * @param {String} menuItemId
 * @param {JSEvent} event
 *
 * @return {boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"F63F028E-A9C6-40E2-9B2B-2D89DA4C02F2"}
 */
function onMenuItemSelectedHandler(menuItemId, event) {

	if (onMenuItemSelected(menuItemId, event) === false) {
		return false;
	}

	// form to navigate too
	var formName = getMenuItemFormName(menuItemId)
	var form = forms[formName];

	// open the selected navigation item
	if (menuItemId && formName && form) {
		var menuItem = elements.sidenav.getMenuItem(menuItemId);

		// TODO will always be a new navigation item !?!?
		var item = new scopes.svyNavigation.NavigationItem(formName, menuItem.text);
		return scopes.svyNavigation.open(item);
	}

	return true;
}

/**
 * @protected
 * @param {String} menuItemId
 * @param {JSEvent} event
 *
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"F49F40C5-606A-48E5-9E0D-392601162147"}
 */
function onMenuItemSelected(menuItemId, event) {
	return true;
}

/**
 * Called whenever a menu item is clicked or a submenu item is selected with the JSEvent and the menuItem object clicked on.
 *
 * @param {JSEvent} event
 * @param {bootstrapextracomponents-navbar.menuItem} menuItem
 *
 * @private
 *
 * @properties={typeid:24,uuid:"27141B27-E4A4-4E9E-972B-782E0A8CA996"}
 */
function onNavbarMenuItemClickedHandler(event, menuItem) {
	var menuItemId = menuItem.itemId;

	if (onMenuItemSelected(menuItemId, event) === false) {
		return;
	}

	switch (menuItemId) {
	case DEFAULT_NAVBAR_ACTIONS.SEARCH:
		onGlobalSearch(menuItem.text);
		break;
	case DEFAULT_NAVBAR_ACTIONS.LOGOUT:
		scopes.svySecurity.logout();
		break;
	default:

		// form to navigate too
		var formName = getMenuItemFormName(menuItemId)
		var form = forms[formName];

		// navigate to a form
		if (form) {
			if (scopes.svyNavigation.open(menuItemId)) {
				elements.navbar.setMenuSelected(menuItemId);
			}
		}
		break;
	}
}

/**
 * Called whenever a menu item is clicked or a submenu item is selected with the JSEvent and the menuItem object clicked on.
 *
 * @param {JSEvent} event
 * @param {bootstrapextracomponents-navbar.menuItem} menuItem
 * @protected
 *
 *
 * @properties={typeid:24,uuid:"8A65736D-B12C-4978-8A11-468129B7201F"}
 */
function onNavbarMenuItemClicked(event, menuItem) { }

/**
 *
 * @protected
 * @param {String} searchText
 *
 * @properties={typeid:24,uuid:"3DEDEC6C-611D-4FF2-A726-A79EA0B7060D"}
 */
function onGlobalSearch(searchText) {
	// TODO should it fire an event GLOBAL_SEARCH for which inner forms can listen to !?
	// How to add an event listener for search !? should be a new scope in svyNavigationUX ?
}
