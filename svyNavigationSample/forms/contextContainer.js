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
 *
 * @properties={typeid:24,uuid:"09F21D7F-1852-47E1-AF33-38AFC9525432"}
 */
function setNavigationContext(navContext){
    elements.tabpanel.removeAllTabs();
    elements.breadcrumbs.setCrumbs(null);
    
    m_NavContext = navContext;
    
    var navItem = navContext.getLastNavigationItem();
    elements.tabpanel.addTab(navItem.getFormName());
    elements.lblHeader.text = utils.stringFormat('%1$s (%2$s)',[navItem.getText(), navItem.getFormName()]);
    
    /** @type {Array<bootstrapextracomponents-breadcrumbs.crumb>} */
    var crumbs = [];
    var navItems = navContext.getNavigationItems();
    for (var i in navItems) {
        /** @type {bootstrapextracomponents-breadcrumbs.crumb} */
        var crumb = {crumbId: i+1, displayName: navItems[i].getText()};
        crumbs.push(crumb);
    }
    elements.breadcrumbs.setCrumbs(crumbs);
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
    setNavigationContext(m_NavContext);
}
