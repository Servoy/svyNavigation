/**
 * @protected
 * @properties={typeid:35,uuid:"30886171-920E-4B83-97D2-22F8FD56B287",variableType:-4}
 */
var DEFAULT_NAVBAR_ACTIONS = {
	SEARCH: "navbar-search",
	USER: "navbar-user",
	LOGOUT: "navbar-logout"
}

/**
 * @private
 * @properties={typeid:24,uuid:"3AF37729-CA8A-4A14-B54A-42D360287C64"}
 * @override
 */
function initNavigationForm() {

	// init the navbar menu
	var navbarItems = loadNavbarItems();
	elements.navbar.setMenuItems(navbarItems);
}

/**
 * This method is called as part of then form's onLoad event.
 * Load the returned list of menu items into the sidenav menu of the template.
 * Override this method and return an Array of type servoyextra-sidenav.MenuItem (Array<servoyextra-sidenav.MenuItem>)
 * to initialize the sidenav menu with your own set of menu items.<br/>
 * Learn more on MenuItem and Sidenav https://github.com/Servoy/servoy-extra-components/wiki/Sidenav#menu-item
 *
 * @return {Array<CustomType<servoyextra-sidenav.MenuItem>>}
 * @protected
 *
 * @example <pre>
 * function loadMenuItems() {
 * 	var menuItems = [];
 *
 *	\\ @type {CustomType&lt;servoyextra-sidenav.MenuItem&gt;}
 *	var menuItem = new Object();
 *	menuItem.id = "yourFormName";
 *	menuItem.iconStyleClass = "fa fa-home";
 *	menuItem.text = "Home";
 *	menuItems.push(menuItem);
 *
 *	return menuItems;
 *}
 * </pre>
 * @properties={typeid:24,uuid:"AF61BE50-553C-4679-9CFB-F88C841E1F52"}
 */
function loadMenuItems() {
	var menuItems = [];

	/** @type {CustomType<servoyextra-sidenav.MenuItem>} */
	var menuItem = new Object();
	menuItem.id = "svyNavigationUX$Welcome";
	menuItem.text = "NAVIGATION"
	menuItem.iconStyleClass = "fas fa-compass";
	menuItems.push(menuItem);

	// return the menu items
	return menuItems;
}

/**
 *
 * This method is called as part of then form's onLoad event.
 * Load the returned list of menu items into the top navbar menu of this template.
 * Override this method and return an Array of type bootstrapextracomponents-navbar.menuItem (Array<bootstrapextracomponents-navbar.menuItem>)
 * to initialize the navbar menu with your own set of menu items.<br/>
 * Learn more on MenuItem and Navbar https://github.com/Servoy/bootstrapextracomponents/wiki/Navbar#menuitem-type
 *
 * @return {Array<CustomType<bootstrapextracomponents-navbar.menuItem>>}
 *
 * @protected
 * @example <pre>function loadNavbarItems() {
 *	var menuItems = [];
 * 	var menuItem;
 *
 *	menuItem = elements.navbar.createMenuItem('Search', DEFAULT_NAVBAR_ACTIONS.SEARCH, 'RIGHT');
 *	menuItem.displayType = 'INPUT_GROUP';
 *	menuItem.styleClass = 'closed searchbar';
 *	menuItem.inputButtonStyleClass = "btn-default";
 *	menuItem.iconName = "fa fa-search";
 *	menuItems.push(menuItem);
 *
 *	if (security.getUserName()) {
 *		menuItem = elements.navbar.createMenuItem(security.getUserName(), DEFAULT_NAVBAR_ACTIONS.USER, 'RIGHT');
 *		menuItem.displayType = 'MENU_ITEM';
 *		menuItem.iconName = 'fa fa-user';
 *		menuItem.styleClass = 'no-border';
 *		var submenuItems = [];
 *
 *		submenuItems.push(elements.navbar.createMenuItem('Logout', DEFAULT_NAVBAR_ACTIONS.LOGOUT));
 *		menuItem.subMenuItems = submenuItems;
 *		menuItems.push(menuItem);
 *	}
 *
 *	return menuItems;
 *}</pre>
 * @properties={typeid:24,uuid:"0C474952-DD23-4D6F-BFD8-C37AB1A91F91"}
 */
function loadNavbarItems() {
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
 * Returns the active formName which is the containedForm of the sidenav element
 *
 * @return {String}
 * @public
 *
 * @properties={typeid:24,uuid:"749FDF50-DA8D-4F86-B4DF-EF053918F4DC"}
 */
function getActiveFormName() {
	if (elements.formcontainer && elements.formcontainer.containedForm) {
		return elements.formcontainer.containedForm;
	} else {
		return null;
	}
}

/**
 * @private
 * @param {scopes.svyNavigation.NavigationEvent} event
 *
 * @properties={typeid:24,uuid:"50860FEC-0106-4771-A6DD-F55C3BD623D5"}
 * @override
 */
function onOpen(event) {

	/** @type {scopes.svyNavigation.NavigationItem} */
	var item = event.getNavigationItem();
	var formName = item.getFormName();

	// get the form instance
	var form = forms[formName];
	if (!form) {
		throw new scopes.svyExceptions.IllegalStateException('Cannot navigate to form because cannot find form instance ' + formName);
	}

	// show form
	elements.formcontainer.containedForm = formName;

	//  update the selected menu item for the main menu
	/** @type {String} */
	var menuId = getMenuItemID(item.getFormName());
	if (menuId) {
		elements.navbar.setMenuSelected(menuId);
	} else {
		elements.navbar.setMenuSelected(null);
	}
}

/**
 * Called whenever a menu item from the sidenav is selected with the JSEvent and the menuItemId clicked on.
 *
 * @param {String} menuItemId
 * @param {JSEvent} event
 *
 * @return {boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"B4FC7397-E5FC-4FFA-8227-C9812013657A"}
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
		var menuItem = elements.formcontainer.getMenuItem(menuItemId);

		// TODO will always be a new navigation item !?!?
		var item = new scopes.svyNavigation.NavigationItem(formName, menuItem.text);
		return scopes.svyNavigation.open(item);
	}

	return true;
}

/**
 * Called as part of the onMenuItemSelectedHandler event
 * Called whenever a menu item from the sidenav is selected with the JSEvent and the menuItemId clicked on.
 * This method can be overriden to prevent the selection (.e.g check if user has permissions) or for handling specific menu options which will trigger a function (.e.g logout) instead of switching the visible form
 * Return false to stop the navigation and prevent the selection.
 *
 * @protected
 * @param {String} menuItemId
 * @param {JSEvent} event
 *
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"CC8DD323-478F-4516-9170-A37ADA1361F6"}
 */
function onMenuItemSelected(menuItemId, event) {
	return true;
}

/**
 * Called whenever a menu item is clicked or a submenu item is selected with the JSEvent and the menuItem object clicked on.
 *
 * @param {JSEvent} event
 * @param {CustomType<bootstrapextracomponents-navbar.menuItem>} menuItem
 *
 * @private
 *
 * @properties={typeid:24,uuid:"014B1944-FB21-4ED1-B938-E83FADDB6BDE"}
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
		onLogout();
		break;
	default:

		// form to navigate too
		var formName = getMenuItemFormName(menuItemId)
		var form = forms[formName];

		// navigate to a form
		if (form) {
			// TODO will always be a new navigation item !?!?
			var item = new scopes.svyNavigation.NavigationItem(menuItemId, menuItem.text);
			if (scopes.svyNavigation.open(item)) {
				elements.navbar.setMenuSelected(menuItemId);
			}
		} else {
			onNavbarMenuItemClicked(event, menuItem);
		}
		break;
	}
}

/**
 * Called as part of the onNavbarMenuItemClickedHandler event
 * Called whenever a menu item is clicked or a submenu item is selected with the JSEvent and the menuItem object clicked on.
 * This method can be overriden for handling specific navbar options
 *
 * @param {JSEvent} event
 * @param {CustomType<bootstrapextracomponents-navbar.menuItem>} menuItem
 * @protected
 *
 * @example <pre>
 * function onNavbarMenuItemClicked(event, menuItem) {
 *
 *   switch (menuItem.itemId) {
 *   case DEFAULT_NAVBAR_ACTIONS.LOGOUT:
 *   	scopes.svySecurity.logout();
 *   	break;
 *   default:
 *   	break;
 *   }
 *}</pre>
 *
 * @properties={typeid:24,uuid:"6691C1D0-4ACC-428C-85B8-FA48AE8315E9"}
 */
function onNavbarMenuItemClicked(event, menuItem) {
	// intentionally left empty
}

/**
 * @private
 * @param {String} searchText
 *
 * @properties={typeid:24,uuid:"92676B60-80C6-42AD-8711-8CFB99B3F82A"}
 */
function onGlobalSearch(searchText) {
	scopes.svyNavigationUX.triggerGlobalSearch(searchText);
}

/**
 * Override the method for a custom logout
 * @protected
 * @properties={typeid:24,uuid:"EB0FF824-3889-48C5-8A47-00B37AF9CB19"}
 */
function onLogout() {
	// test for svySecurity logout
	if (scopes['svySecurity']) {
		scopes['svySecurity'].logout();
	} else {
		security.logout();
	}
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"54F332FC-EE16-4DDE-B9E5-13EE9FB0064B"}
 */
function onShow(firstShow, event) {
	if (firstShow) {
		// set first selection
		if (elements.formcontainer.containedForm) {
			/** @type {String}*/
			var selectedItemID = getMenuItemID(elements.formcontainer.containedForm);
			var selectedItem = elements.navbar.getMenuItem(selectedItemID);
			if (selectedItem) {
				elements.navbar.setMenuSelected(selectedItemID, false, false);
			}
		}
	}
}
