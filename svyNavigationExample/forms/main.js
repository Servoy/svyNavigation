/**
 * @properties={typeid:35,uuid:"3DA75641-9394-413E-9515-B4787BA2841A",variableType:-4}
 */
var menu = [
	{
		text:'Customers',
		formName:'customers',
		iconName:'fa fa-user'
	},
	{
		text:'Products',
		formName:'products',
		iconName:'fa fa-cubes'
	},
	{
		text:'Suppliers',
		formName:'supplier',
		iconName:'fa fa-truck'
	}
];

/**
 * @private 
 * @properties={typeid:24,uuid:"78F023E5-4B0E-4CF5-BCDD-5227AE0941DB"}
 */
function initMenu(){
	for(var i in menu){
		var item = menu[i];
		/** @type {servoyextra-sidenav.MenuItem} */
		var menuItem = {
	        id: application.getUUID().toString(),
	        text: item.text,
	        data: { text: item.text, formName: item.formName},
	        styleClass: '',
	        iconStyleClass: item.iconName
	    };
		elements.nav.addMenuItem(menuItem);
	}
}
/**
 * @param {object} menuItemId
 * @param {JSEvent} event
 *
 * @return {boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"FD261CFF-361F-423D-AF1E-D67FE6892CBE"}
 */
function onMenuItemSelected(menuItemId, event) {
	var item = elements.nav.getMenuItem(menuItemId);
	var form = forms[item.data.formName];
	scopes.svyNavigation.open(new scopes.svyNavigation.NavigationItem(item.data.formName,item.text,item.text));
	return true;
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
 * @properties={typeid:24,uuid:"19B0F50C-4839-40F5-B258-BAF5E71755CA"}
 */
function onCrumbClicked(event, crumb, index) {
	scopes.svyNavigation.open(crumb.crumbId);
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"3AF8542F-2C3A-462A-847D-BE27E3DE53FF"}
 */
function onLoad(event) {
	initMenu();
	scopes.svyNavigation.addNavigationListener(onNavigation);
	scopes.svyNavigation.reset(new scopes.svyNavigation.NavigationItem('customers','Customers'))
}


/**
 * @private
 * @param {scopes.svyNavigation.NavigationEvent} event
 * @properties={typeid:24,uuid:"9ACC8EAB-89FD-4F25-B312-F4D97A09B833"}
 */
function onNavigation(event) {
	var type = event.getEventType();
	var item = event.getNavigationItem();
	if(type == scopes.svyNavigation.NAVIGATION_EVENT.AFTER_OPEN){
		var form = forms[item.getFormName()];
		var data = item.getCustomData();
		
		// load record
		if(data && data.pk){
			form.foundset.loadRecords(data.pk);
		}
		
		// show form
		elements.nav.containedForm = form;
		
		// update bread crumbs
		updateBreadcrumbs();

		// update menu items
		updateMenuItems();
	}	
}

/**
 * @private 
 * @properties={typeid:24,uuid:"71F47EB8-6910-499B-8160-74C24670AB3B"}
 */
function updateMenuItems(){
	var item = scopes.svyNavigation.getCurrentItem();
	var menuItems = elements.nav.menu;
	for(var i in menuItems){
		if(menuItems[i].data.formName == item.getFormName()){
			elements.nav.setSelectedMenuItem(menuItems[i].id,true);
			return;
		}
	}
}

/**
 * @private 
 * @properties={typeid:24,uuid:"C7DF39C3-DE32-4035-A273-1A005262FC92"}
 */
function updateBreadcrumbs(){
	elements.breadcrumb.breadcrumbs = [];
	
	
	/** @type {Array<scopes.svyNavigation.NavigationItem>} */
	var itemsForCrumbs = []
	
	// reverse over all items
	var items = scopes.svyNavigation.getNavigationItems().reverse();
	for(var i in items){
		
		// add crumb
		var item = items[i];
		itemsForCrumbs.push(item);
		
		// if crumb is not linked, then we are done
		var data = items[i].getCustomData();
		if(!data || !data.linked){
			break;
		}
	}
	
	// put crumbs back in order and add them
	itemsForCrumbs = itemsForCrumbs.reverse();
	for(var j in itemsForCrumbs){
		addCrumb(itemsForCrumbs[j]);
	}
	
	/**
	 * @private 
	 * @param {scopes.svyNavigation.NavigationItem} navItem
	 */
	function addCrumb(navItem){
		/** @type {bootstrapextracomponents-breadcrumbs.crumb} */
		var crumb = {
			crumbId:navItem.getID(),
			displayName:navItem.getText()
		};
		
		elements.breadcrumb.addCrumb(crumb);
	}
}
