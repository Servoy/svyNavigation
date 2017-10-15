/**
 * @properties={typeid:24,uuid:"535F1F2F-439B-40F3-A6AB-18CF4E398DD4"}
 */
function test_NavigationItem() {
	var n = new scopes.svyNavigationModel.NavigationItem('a','b');
	jsunit.assertEquals('a',n.getFormName());
	jsunit.assertEquals('b',n.getText());	
}

/**
 * @properties={typeid:24,uuid:"F798B6E1-3623-4946-988F-082F2B2BF17A"}
 */
function test_NavigationContext() {
	var nc = new scopes.svyNavigationModel.NavigationContext(scopes.svyNavigationModel.NavigationContextType.Standard);
	jsunit.assertEquals(0,nc.getNavigationItemsCount());
}