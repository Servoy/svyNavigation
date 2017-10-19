/**
 * @private
 * @type {scopes.svyNavigationController.NavigationController}
 * @properties={typeid:35,uuid:"96C122F1-9CFF-4D34-BF10-56FC7E14496D",variableType:-4}
 */
var m_DefaultNavController = null;
/**
 * @public
 * @param {scopes.svyNavigationController.NavigationHandler} handler
 *
 * @properties={typeid:24,uuid:"B9ACF2EB-0406-4DC4-9E62-EFC408DEA643"}
 */
function initializeDefaultController(handler) {
    m_DefaultNavController = new scopes.svyNavigationController.NavigationController(handler);
}

/**
 * @public
 * @return {scopes.svyNavigationController.NavigationController}
 * @properties={typeid:24,uuid:"D115545B-AEFD-4AFA-B95D-4BF0C85CA99C"}
 */
function getDefaultController() {
    return m_DefaultNavController;
}

/**
 * @public
 * @return {Boolean}
 * @properties={typeid:24,uuid:"CAF4F8DE-5083-4301-849E-0944664C9A12"}
 */
function hasDefaultController() {
    return (m_DefaultNavController != null);
}

/**
 * @private
 * @properties={typeid:24,uuid:"BEF8CA86-FEA6-4996-B90D-C73E55E76349"}
 */
function checkDefaultController() {
    if (!hasDefaultController()) {
        throw new Error('Default controller is not initialized');
    }
}

/**
 * @public
 * @param {scopes.svyNavigationModel.NavigationItem} navigationItem
 * @param {Boolean} [addToRecentList]
 * @return {scopes.svyNavigationModel.NavigationContext} The context in which the item was opened or null if the item could not be opened.
 *
 * @properties={typeid:24,uuid:"B0F44D40-5AA6-4A1A-8DEF-A8A8A4522952"}
 */
function openInNewStandardContext(navigationItem, addToRecentList) {
    checkDefaultController();
    return m_DefaultNavController.openInNewStandardContext(navigationItem, addToRecentList);
}

/**
 * @public
 * @param {scopes.svyNavigationModel.NavigationItem} navigationItem
 * @param {Boolean} useModalDialog
 * @param {Boolean} [addToRecentList]
 * @return {scopes.svyNavigationModel.NavigationContext} The context in which the item was opened or null if the item could not be opened.
 *
 * @properties={typeid:24,uuid:"02A995B7-B181-483A-8D8F-9D45C17F2C78"}
 */
function openInNewDialogContext(navigationItem, useModalDialog, addToRecentList) {
    checkDefaultController();
    return m_DefaultNavController.openInNewDialogContext(navigationItem, useModalDialog, addToRecentList);
}

/**
 * @public
 * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
 * @param {scopes.svyNavigationModel.NavigationItem} navigationItem
 * @param {Boolean} [replaceCurrentItem]
 * @param {Boolean} [addToRecentList]
 * @return {scopes.svyNavigationModel.NavigationContext} The context in which the item was opened or null if the item could not be opened. Note that the result context may be different from the specified input one.
 *
 * @properties={typeid:24,uuid:"DFF944D9-FAD1-41E8-B9B4-6B3EE1F74781"}
 */
function openInExistingContext(navigationContext, navigationItem, replaceCurrentItem, addToRecentList) {
    checkDefaultController();
    return m_DefaultNavController.openInExistingContext(navigationContext, navigationItem, replaceCurrentItem, addToRecentList);
}

/**
 * @public
 * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"EBF68ABA-12FB-49EA-97A4-3CF0A56D7565"}
 */
function closeCurrentForm(navigationContext) {
    checkDefaultController();
    return m_DefaultNavController.closeCurrentForm(navigationContext);
}

/**
 * @public
 * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"64BAD5B8-D8AD-4F77-AD0C-9DACB2931214"}
 */
function closeContext(navigationContext) {
    checkDefaultController();
    return m_DefaultNavController.closeContext(navigationContext);
}

/**
 * @public
 * @param {String} contextId
 * @return {scopes.svyNavigationModel.NavigationContext}
 *
 * @properties={typeid:24,uuid:"068683C6-FC60-4687-B06E-968C85458271"}
 */
function getContextById(contextId) {
    checkDefaultController();
    return m_DefaultNavController.getContextById(contextId);
}

/**
 * @public
 * @param {scopes.svyNavigationModel.NavigationContext} context
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"7543C2C8-205A-457E-B290-A8AD1AC7F28C"}
 */
function contextIsRegistered(context) {
    checkDefaultController();
    return m_DefaultNavController.contextIsRegistered(context);
}

/**
 * @public
 * @param {String} formInstanceName
 * @return {scopes.svyNavigationModel.NavigationContext}
 *
 * @properties={typeid:24,uuid:"D617665A-7969-4223-9489-4D530C5A9369"}
 */
function getFormInstanceContext(formInstanceName) {
    checkDefaultController();
    return m_DefaultNavController.getFormInstanceContext(formInstanceName);
}

/**
 * @public
 * @param {String} formInstanceName
 * @param {scopes.svyNavigationModel.NavigationContext} context
 *
 * @properties={typeid:24,uuid:"21030A0D-9185-4767-A7D2-5FC93CEE50C5"}
 */
function registerFormInstance(formInstanceName, context) {
    checkDefaultController();
    return m_DefaultNavController.registerFormInstance(formInstanceName, context);
}

/**
 * @public
 * @param {String} formInstanceName
 *
 * @properties={typeid:24,uuid:"4E8256B8-E9CD-465A-BF13-7ABB9EE3DE82"}
 */
function unregisterFormInstance(formInstanceName) {
    checkDefaultController();
    return m_DefaultNavController.unregisterFormInstance(formInstanceName);
}
