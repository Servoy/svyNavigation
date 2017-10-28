/**
 * @properties={typeid:24,uuid:"535F1F2F-439B-40F3-A6AB-18CF4E398DD4"}
 */
function test_NavigationItem() {
    var frmName = 'a';
    var text = 'b';
    var toolTip = 'c';
    var someText = 'some text';
    var navItem = new scopes.svyNavigationModel.NavigationItem(frmName, text, toolTip);
    jsunit.assertEquals(frmName, navItem.getFormName());
    jsunit.assertEquals(text, navItem.getText());
    jsunit.assertEquals(toolTip, navItem.getTooltipText());
    jsunit.assertNull(navItem.getCloseCallbackInfo());
    jsunit.assertNull(navItem.getCustomData());
    
    navItem.setFormName(someText);
    jsunit.assertEquals(someText,navItem.getFormName());
    
    navItem.setCustomData(someText);
    jsunit.assertEquals(someText,navItem.getCustomData());
    
    navItem.setText(someText);
    jsunit.assertEquals(someText,navItem.getText());
    
    navItem.setTooltipText(someText);
    jsunit.assertEquals(someText,navItem.getTooltipText());
    
    var arg = {foo: someText};
    navItem.setCloseCallbackInfo(someText, arg);
    var res = navItem.getCloseCallbackInfo();
    jsunit.assertNotNull(res);
    jsunit.assertEquals(someText, res.qualifiedMethodName);
    jsunit.assertEquals(someText, res.arg.foo);
    
    scopes.sharedTestUtils.assertThrows(navItem.setFormName);
    scopes.sharedTestUtils.assertThrows(navItem.setFormName, ['']);
    scopes.sharedTestUtils.assertThrows(navItem.setFormName, ['   ']);
    scopes.sharedTestUtils.assertThrows(function(){new scopes.svyNavigationModel.NavigationItem()});
}

/**
 * @properties={typeid:24,uuid:"F798B6E1-3623-4946-988F-082F2B2BF17A"}
 */
function test_NavigationContext() {
    var nc = new scopes.svyNavigationModel.NavigationContext(scopes.svyNavigationModel.NavigationContextType.Standard);
    jsunit.assertNotNull(nc.getContextID());
    jsunit.assertEquals(scopes.svyNavigationModel.NavigationContextType.Standard,nc.getContextType());
    jsunit.assertEquals(0, nc.getNavigationItemsCount());
    jsunit.assertNull(nc.getLastNavigationItem());
    jsunit.assertNotNull(nc.getNavigationItems());
    jsunit.assertEquals(0,nc.getNavigationItems().length);
    jsunit.assertNull(nc.removeLastNavigationItem());
    
    var frmName = 'fakeFormName';
    var navItem1 = new scopes.svyNavigationModel.NavigationItem(frmName);
    nc.addNavigationItem(navItem1);
    jsunit.assertEquals(1, nc.getNavigationItemsCount());
    jsunit.assertSame(navItem1,nc.getLastNavigationItem());
    
    var navItem2 = new scopes.svyNavigationModel.NavigationItem(frmName);
    nc.addNavigationItem(navItem2);
    jsunit.assertEquals(2, nc.getNavigationItemsCount());
    jsunit.assertSame(navItem2,nc.getLastNavigationItem());
    jsunit.assertEquals(2,nc.getNavigationItems().length);
    
    jsunit.assertSame(navItem2,nc.removeLastNavigationItem());
    jsunit.assertEquals(1, nc.getNavigationItemsCount());
    jsunit.assertSame(navItem1,nc.getLastNavigationItem());
    
    scopes.sharedTestUtils.assertThrows(nc.addNavigationItem);
    scopes.sharedTestUtils.assertThrows(function(){new scopes.svyNavigationModel.NavigationContext()});
    scopes.sharedTestUtils.assertThrows(function(){new scopes.svyNavigationModel.NavigationContext('bad argument')});
}

/**
 * @properties={typeid:24,uuid:"BAD0ABC3-C25E-43D5-9E1B-21E9EB01425B"}
 */
function test_validateContextType() {
    try {
        scopes.svyNavigationModel.validateContextType(scopes.svyNavigationModel.NavigationContextType.Standard);
        scopes.svyNavigationModel.validateContextType(scopes.svyNavigationModel.NavigationContextType.Dialog);
        scopes.svyNavigationModel.validateContextType(scopes.svyNavigationModel.NavigationContextType.ModalDialog);
    } catch (e) {
        jsunit.fail('Should have not thrown error');
    }
    scopes.sharedTestUtils.assertThrows(scopes.svyNavigationModel.validateContextType);
    scopes.sharedTestUtils.assertThrows(scopes.svyNavigationModel.validateContextType, ['invalid-value']);
}
