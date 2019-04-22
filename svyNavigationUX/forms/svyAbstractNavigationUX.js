/**
 * @protected
 * 
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"77BE1648-75C9-4618-8D48-1EFA55208C4A"}
 */
function onLoad(event) {
	scopes.svyNavigation.addNavigationListener(onOpen);
	
	initNavigationForm();
}

/**
 * This method is called as part of the [onLoad]{@link onLoad} operation flow.
 * 
 * @protected 
 * @properties={typeid:24,uuid:"06EA8983-8AAA-4DE2-AC4B-6E02FC6BCB12"}
 */
function initNavigationForm() { }

/**
 * @private
 * @param {scopes.svyNavigation.NavigationEvent} event
 *
 * @properties={typeid:24,uuid:"037A69DA-38B4-4F4A-9991-DB224D6E7A9A"}
 */
function onOpen(event) {

	var type = event.getEventType();

	/** @type {scopes.svyNavigation.NavigationItem} */
	var item = event.getNavigationItem();

	if (type == scopes.svyNavigation.NAVIGATION_EVENT.BEFORE_CLOSE) {
		
		// don't allow navigation when beforeClose is called
		if (beforeClose(item) === false) {
			return false;
		}
		
	} else if (type == scopes.svyNavigation.NAVIGATION_EVENT.AFTER_OPEN) {
		afterOpen(item);
	}
	return true;
}


/**
 * This method is called as part of the [onOpen]{@link onOpen} operation flow.
 * 
 * @protected 
 * @param {scopes.svyNavigation.NavigationItem} item
 * 
 * @return {Boolean} True (default) if the navItem can be closed and navigation can proceed, false to cancel the navigation.
 *
 * @properties={typeid:24,uuid:"8CAD8898-32AE-43ED-847E-7F589A9B0B41"}
 */
function beforeClose(item) {
	return true;
}

/**
 * This method is called as part of the [onOpen]{@link onOpen} operation flow.
 * 
 * @protected 
 * @param {scopes.svyNavigation.NavigationItem} item
 *
 * @properties={typeid:24,uuid:"13B1A0DF-5FFD-4E1A-9B09-B899DB318A03"}
 */
function afterOpen(item) { }

/**
 * Returns the formName associated with the given menuItemID.
 * With the Default behavior it assumes the given menuItemID value is the formName to be used in navigation, therefore it returns the menuItemID value as is.
 * Override this function if you would like to use your own mapping between the menuItemID and the formName for navigation item.
 * 
 * @protected 
 * @param {String|Number} menuItemID 
 * 
 * TODO add example
 * 
 * @return {String} Returns the formName for the given menuItemID. Default returns the menuItemID value.
 *
 * @properties={typeid:24,uuid:"A585AF53-8457-4C4D-894E-CE8F9FF9F3CB"}
 */
function getMenuItemFormName(menuItemID) {
	
	/** @type {String} */
	var formName = menuItemID;
	return formName;
}

/**
 * Returns the menuItemID associated with the given formName.
 * With the Default behavior it assumes the given menuItemID value is the formName to be used in navigation, therefore it returns the formName value as is.
 * Override this function if you would like to use your own mapping between the menuItemID and the formName for navigation item.
 * 
 * @protected 
 * @param {String} formName 
 * 
 * TODO add example
 * 
 * @return {String|Number} Returns the menuItemID for the given formName. Default returns the formName value.
 *
 * @properties={typeid:24,uuid:"CF047442-EBE5-450A-B58D-AA8F34DC1703"}
 */
function getMenuItemID(formName) {
	return formName;
}

/**
 * @return {String}
 * @public
 *
 * @properties={typeid:24,uuid:"AB5A744A-D138-4EEF-8410-50B275EEED89"}
 */
function getActiveFormName() {
	throw new scopes.svyExceptions.AbstractMethodInvocationException("implement getActiveFormName for Navigation Form " + controller.getName());
}
