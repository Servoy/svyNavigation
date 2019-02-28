/**
 * @type {String}
 * @protected 
 *
 * @properties={typeid:35,uuid:"984DD14D-0411-43AC-A226-F4038C830CC5"}
 */
var solutionName = null;

/**
 * @type {String}
 * @protected
 * @properties={typeid:35,uuid:"0B9AB87D-395D-4BE6-8070-BC079EA2ECD9"}
 */
var propertyValue = null;

/**
 * @type {String}
 * @protected
 * @properties={typeid:35,uuid:"487F52AC-2971-401A-9136-3D6795794BBD"}
 */
var displayName = null;

/**
 * @type {String}
 * @protected
 * @properties={typeid:35,uuid:"4F9EF2FF-573E-49DC-BC56-0FF82376E9A3"}
 */
var navItemID = null;

/**
 * @type {String}
 * @protected 
 * @properties={typeid:35,uuid:"7DF8C46A-1CA2-48CA-A8A7-FA3847BD9315"}
 */
var parentNavItemID = null;

/**
 * @public
 *
 * @properties={typeid:24,uuid:"7B9D1D4D-8394-4A43-A24A-BE2E51CC1C5E"}
 */
function show() {
	application.getWindow().show(this);
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"6212F431-6658-4B6A-BB5B-9D44AC904014"}
 */
function onShow(firstShow, event) { }

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"76DF274D-B06F-4BBF-B241-16831EE93BBD"}
 */
function onActionDelete(event) {
	back()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"097508DB-059F-4A92-9470-1A6A12AE4E55"}
 */
function onActionViewList(event) {
	//forms.propertiesList.show();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"4D6FC622-0438-4A8B-BB69-E51298D70CA9"}
 */
function onActionSave(event) {

	// TODO check for solutionName policy to enable or not solutionName. Also i may want solutioName to be always the same, best to set it somewhere else
	scopes.svyNavigationSecurity.setSolutionName(solutionName);
	var newNavItem = scopes.svyNavigationSecurity.createSecureNavigationItem(navItemID, propertyValue, parentNavItemID);
	//var newProperty = scopes.svyProperties.createProperty(propertyNamespace, propertyValue, propertyType);
	if (newNavItem) {
		newNavItem.setDisplayName(displayName);
		//back();
	}
	forms.navigationHome.show("navigationList");
	// TODO handle something went wrong
}

/**
 * @protected
 * @properties={typeid:24,uuid:"21BDDD7B-D6BF-48E4-96C1-96D63C03DB67"}
 */
function back() {
	forms.navigationHome.show("navigationList");
	resetVariables()
}

/**
 * @properties={typeid:24,uuid:"3D75DD97-B63A-4E01-8920-F071B5CCFF01"}
 */
function resetVariables() {
	//solutionName = null;
	navItemID = null;
	parentNavItemID = null;
	propertyValue = null;
	displayName = null;
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"FC295A4F-053E-4436-8FFB-FB3CEFA18DC1"}
 */
function onHide(event) {
	resetVariables();
	return true
}
