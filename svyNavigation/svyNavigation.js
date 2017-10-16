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
function initializeDefaultController(handler){
    m_DefaultNavController = new scopes.svyNavigationController.NavigationController(handler);
}

/**
 * @public 
 * @return {scopes.svyNavigationController.NavigationController}
 * @properties={typeid:24,uuid:"D115545B-AEFD-4AFA-B95D-4BF0C85CA99C"}
 */
function getDefaultController(){
    return m_DefaultNavController;
}

/**
 * @public 
 * @return {Boolean}
 * @properties={typeid:24,uuid:"CAF4F8DE-5083-4301-849E-0944664C9A12"}
 */
function hasDefaultController(){
    return (m_DefaultNavController != null);    
}

/**
 * @private 
 * @properties={typeid:24,uuid:"BEF8CA86-FEA6-4996-B90D-C73E55E76349"}
 */
function checkDefaultController(){
    if (!hasDefaultController()){
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
    return m_DefaultNavController.openInNewStandardContext(navigationItem,addToRecentList);
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
    return m_DefaultNavController.openInNewDialogContext(navigationItem,useModalDialog,addToRecentList);
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
    return m_DefaultNavController.openInExistingContext(navigationContext,navigationItem,replaceCurrentItem,addToRecentList);
}

/**
 * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"EBF68ABA-12FB-49EA-97A4-3CF0A56D7565"}
 */
function closeCurrentForm(navigationContext) {
    checkDefaultController();
    return m_DefaultNavController.closeCurrentForm(navigationContext);
}