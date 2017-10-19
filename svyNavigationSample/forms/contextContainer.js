/**
 * @private 
 * @type {scopes.svyNavigationModel.NavigationContext}
 *
 * @properties={typeid:35,uuid:"465E7857-697B-46DD-929A-33A9C2B18C3B",variableType:-4}
 */
var m_NavContext = null;

/**
 * @public 
 * @param {scopes.svyNavigationModel.NavigationContext} navContext
 * @return {String} the instance name of the form which is placed in the container
 * @properties={typeid:24,uuid:"09F21D7F-1852-47E1-AF33-38AFC9525432"}
 */
function setNavigationContext(navContext){
    elements.tabpanel.removeAllTabs();
    elements.breadcrumbs.setCrumbs(null);
    elements.lblHeader.text = '';
    var formInstanceName = null;
    m_NavContext = navContext;
    if (navContext) {
        var navItem = navContext.getLastNavigationItem();        
        formInstanceName = navItem.getFormName();
        elements.tabpanel.addTab(navItem.getFormName());
        elements.lblHeader.text = utils.stringFormat('%1$s',[navItem.getText()]);
        
        /** @type {Array<bootstrapextracomponents-breadcrumbs.crumb>} */
        var crumbs = [];
        var navItems = navContext.getNavigationItems();
        for (var i = 0; i < navItems.length; i++) {           
            /** @type {bootstrapextracomponents-breadcrumbs.crumb} */
            var crumb = {crumbId: i+1, displayName: navItems[i].getText()};
            crumbs.push(crumb);
        }
        elements.breadcrumbs.setCrumbs(crumbs);
    }
    return formInstanceName;
}

/**
 * @public
 * @return {String}
 * @properties={typeid:24,uuid:"668F4AC3-9097-408B-A280-148E41882A33"}
 */
function getCurrentFormName(){
    if (elements.tabpanel.tabIndex > 0) {
        return elements.tabpanel.getTabFormNameAt(elements.tabpanel.tabIndex);
    }
    return null;
}

/**
 * Called whenever a breadcrumb item is clicked with the JSEvent and the item clicked on.
 *
 * @param {JSEvent} event
 * @param {bootstrapextracomponents-breadcrumbs.crumb} crumb
 * @param {Number} index
 *
 * @private
 *
 * @properties={typeid:24,uuid:"6C434AB7-E23E-4361-9471-A24910D5FCD3"}
 */
function onCrumbClicked(event, crumb, index) {
    application.output('crumbId: ' + crumb.crumbId);
    application.output('index: ' + index);
    
    while (m_NavContext.getNavigationItemsCount() > crumb.crumbId) {
        var closed = scopes.svyNavigation.closeCurrentForm(m_NavContext);
        if (!closed) {
            break;
        }
    }
    //setNavigationContext(m_NavContext);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"A16B7B7D-513A-4220-AA2B-3893023CAF56"}
 */
function onActionClose(event) {
    scopes.svyNavigation.closeContext(m_NavContext);
}
