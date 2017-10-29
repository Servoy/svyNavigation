/**
 * @properties={typeid:24,uuid:"A5F2BC58-DCEE-4CBE-9006-361CBD1D7965"}
 */
function test_validateNavigationHandler() {
    var badHandler = { };
    var goodHandler = new scopes.svyNavigationController.NavigationHandler();
    //note: accessing a private function
    var func = scopes.svyNavigationController['validateNavigationHandler'];

    //this should not throw any errors
    func(goodHandler);

    scopes.sharedTestUtils.assertThrows(func, [badHandler]);
    scopes.sharedTestUtils.assertThrows(func);
}

/**
 * @properties={typeid:24,uuid:"E7B99062-8AFE-46B6-9D95-19BEA3EE32F1"}
 */
function test_NavigationController() { 
    var badHandler = {};
    /**
     * @type {scopes.svyNavigationController.NavigationHandler}
     */
    var mockupHandler = new scopes.sharedTestUtils.MockupNavigationHandler();
    
    var ctr = new scopes.svyNavigationController.NavigationController(mockupHandler);
    var frmName1 = 'formA'; 
    var frmName2 = 'formB'; 
    var frmName3 = 'formC'; 
    var navItem1 = new scopes.svyNavigationModel.NavigationItem(frmName1);  
    var navItem2 = new scopes.svyNavigationModel.NavigationItem(frmName2);  
    var navItem3 = new scopes.svyNavigationModel.NavigationItem(frmName3);  
    var navCntxtTest = new scopes.svyNavigationModel.NavigationContext(scopes.svyNavigationModel.NavigationContextType.Standard);
    
    jsunit.assertFalse(ctr.contextIsRegistered(navCntxtTest));
    jsunit.assertNull(ctr.getContextById(navCntxtTest.getContextID()));
    
    mockupHandler.resetTestState();
    var navCntxt1 = ctr.openInNewStandardContext(navItem1);
    var callLog = mockupHandler.getCallLog();
    jsunit.assertEquals(1,callLog.length);
    jsunit.assertEquals('openFormInApplication',callLog[0].methodName);
    
    jsunit.assertNotNull(navCntxt1);
    jsunit.assertEquals(scopes.svyNavigationModel.NavigationContextType.Standard,navCntxt1.getContextType());
    jsunit.assertTrue(ctr.contextIsRegistered(navCntxt1));
    jsunit.assertNotNull(ctr.getContextById(navCntxt1.getContextID()));
    jsunit.assertSame(navItem1, navCntxt1.getLastNavigationItem());
    
    mockupHandler.resetTestState();
    navCntxtTest = ctr.openInExistingContext(navCntxt1,navItem2);
    callLog = mockupHandler.getCallLog();
    jsunit.assertEquals(1,callLog.length);
    jsunit.assertEquals('openFormInApplication',callLog[0].methodName);
    jsunit.assertSame(navCntxt1,navCntxtTest);
    jsunit.assertSame(navItem2, navCntxt1.getLastNavigationItem());
    jsunit.assertEquals(2, navCntxt1.getNavigationItemsCount());
    
    mockupHandler.resetTestState();
    navCntxtTest = ctr.openInExistingContext(navCntxt1,navItem3,true);
    callLog = mockupHandler.getCallLog();
    jsunit.assertSame(navCntxt1,navCntxtTest);
    jsunit.assertSame(navItem3, navCntxt1.getLastNavigationItem());
    jsunit.assertEquals(2, navCntxt1.getNavigationItemsCount());
    
    mockupHandler.resetTestState();
    var navCntxt2 = ctr.openInNewDialogContext(navItem2,true);
    callLog = mockupHandler.getCallLog();
    jsunit.assertEquals(1,callLog.length);
    jsunit.assertEquals('openFormInModalDialog',callLog[0].methodName);
    jsunit.assertNotSame(navCntxt1,navCntxt2);
    jsunit.assertEquals(scopes.svyNavigationModel.NavigationContextType.ModalDialog,navCntxt2.getContextType());
    jsunit.assertSame(navItem2, navCntxt2.getLastNavigationItem());
    jsunit.assertEquals(1, navCntxt2.getNavigationItemsCount());
    
    mockupHandler.resetTestState();
    navCntxtTest = ctr.openInExistingContext(navCntxt1,navItem1,true);
    callLog = mockupHandler.getCallLog();
    jsunit.assertEquals(1,callLog.length);
    jsunit.assertEquals('openFormInModalDialog',callLog[0].methodName);
    jsunit.assertNotSame('After a modal dialog is opened everything else should open in modal dialogs too', navCntxt1, navCntxtTest);
    jsunit.assertSame(navItem3, navCntxt1.getLastNavigationItem());
    jsunit.assertSame(navItem1, navCntxtTest.getLastNavigationItem());
    jsunit.assertEquals(2, navCntxt1.getNavigationItemsCount());
    jsunit.assertEquals(1, navCntxtTest.getNavigationItemsCount());
    
    jsunit.assertTrue(ctr.contextIsRegistered(navCntxtTest));
    mockupHandler.resetTestState();
    ctr.closeContext(navCntxtTest);
    callLog = mockupHandler.getCallLog();
    jsunit.assertFalse(ctr.contextIsRegistered(navCntxtTest));
    jsunit.assertEquals(2,callLog.length);
    jsunit.assertEquals('closeCurrentForm',callLog[0].methodName);
    jsunit.assertEquals('closeContext',callLog[1].methodName);
    
    mockupHandler.resetTestState();
    ctr.closeCurrentForm(navCntxt1);
    callLog = mockupHandler.getCallLog();
    jsunit.assertSame('Closing the current form in a context should "activate" the previous form and make it "current"', navItem1, navCntxt1.getLastNavigationItem());
    jsunit.assertEquals(1, navCntxt1.getNavigationItemsCount());
    jsunit.assertEquals(2,callLog.length);
    jsunit.assertEquals('closeCurrentForm',callLog[0].methodName);
    jsunit.assertEquals('openFormInApplication',callLog[1].methodName);
    jsunit.assertEquals(navItem1,callLog[1].args[0]);
    
    mockupHandler.resetTestState();
    ctr.closeCurrentForm(navCntxt1);
    callLog = mockupHandler.getCallLog();
    jsunit.assertFalse('Closing the last remainng form in a context should close the context as well', ctr.contextIsRegistered(navCntxt1));
    jsunit.assertEquals(2,callLog.length);
    jsunit.assertEquals('closeCurrentForm',callLog[0].methodName);
    jsunit.assertEquals('closeContext',callLog[1].methodName);
    jsunit.assertFalse(ctr.contextIsRegistered(navCntxt1));
    
    jsunit.assertTrue(ctr.contextIsRegistered(navCntxt2));
    navCntxtTest = ctr.getFormInstanceContext(navItem2.getFormName());
    jsunit.assertNull(navCntxtTest);
    ctr.registerFormInstance(navItem2.getFormName(), navCntxt2);
    navCntxtTest = ctr.getFormInstanceContext(navItem2.getFormName());
    jsunit.assertSame(navCntxt2,navCntxtTest);
    ctr.unregisterFormInstance(navItem2.getFormName());
    navCntxtTest = ctr.getFormInstanceContext(navItem2.getFormName());
    jsunit.assertNull(navCntxtTest);
    
    scopes.sharedTestUtils.assertThrows(ctr.registerFormInstance, [navItem2.getFormName(), navCntxt1], null, 'Trying to register form instance with an unregistered context should fail');
    
    scopes.sharedTestUtils.assertThrows(function(){new scopes.svyNavigationController.NavigationController()});
    scopes.sharedTestUtils.assertThrows(function(){new scopes.svyNavigationController.NavigationController(badHandler)});
    scopes.sharedTestUtils.assertThrows(ctr.openInNewStandardContext);
    
}
