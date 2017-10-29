/**
 * @properties={typeid:24,uuid:"44485823-7F16-4444-972D-618B78741CEA"}
 */
function test_NavigationController() { 
    //"backdoor" reset of the svyNavigation scope to its initial state (in case it was initialized by a previous test)
    scopes.svyNavigation['m_DefaultNavController'] = null;
    
    jsunit.assertFalse(scopes.svyNavigation.hasDefaultController());
    jsunit.assertNull(scopes.svyNavigation.getDefaultController());
        
    /**
     * @type {scopes.svyNavigationController.NavigationHandler}
     */
    var mockupHandler = new scopes.sharedTestUtils.MockupNavigationHandler();
    
    var frmName1 = 'formA'; 
    var frmName2 = 'formB'; 
    var frmName3 = 'formC'; 
    var navItem1 = new scopes.svyNavigationModel.NavigationItem(frmName1);  
    var navItem2 = new scopes.svyNavigationModel.NavigationItem(frmName2);  
    var navItem3 = new scopes.svyNavigationModel.NavigationItem(frmName3);  
    var navCntxtTest = new scopes.svyNavigationModel.NavigationContext(scopes.svyNavigationModel.NavigationContextType.Standard);
    
    scopes.sharedTestUtils.assertThrows(scopes.svyNavigation.closeContext, [navCntxtTest], null, 'should fail if default controller is not initialized');
    scopes.sharedTestUtils.assertThrows(scopes.svyNavigation.closeCurrentForm, [navCntxtTest], null, 'should fail if default controller is not initialized');
    scopes.sharedTestUtils.assertThrows(scopes.svyNavigation.contextIsRegistered, [navCntxtTest], null, 'should fail if default controller is not initialized');
    scopes.sharedTestUtils.assertThrows(scopes.svyNavigation.getContextById, [navCntxtTest.getContextID()], null, 'should fail if default controller is not initialized');
    scopes.sharedTestUtils.assertThrows(scopes.svyNavigation.getFormInstanceContext, [frmName1], null, 'should fail if default controller is not initialized');
    scopes.sharedTestUtils.assertThrows(scopes.svyNavigation.openInExistingContext, [navCntxtTest, navItem1], null, 'should fail if default controller is not initialized');
    scopes.sharedTestUtils.assertThrows(scopes.svyNavigation.openInNewDialogContext, [navItem1], null, 'should fail if default controller is not initialized');
    scopes.sharedTestUtils.assertThrows(scopes.svyNavigation.openInNewStandardContext, [navItem1], null, 'should fail if default controller is not initialized');
    scopes.sharedTestUtils.assertThrows(scopes.svyNavigation.registerFormInstance, [frmName1, navCntxtTest], null, 'should fail if default controller is not initialized');
    scopes.sharedTestUtils.assertThrows(scopes.svyNavigation.unregisterFormInstance, [frmName1], null, 'should fail if default controller is not initialized');
    
    scopes.svyNavigation.initializeDefaultController(mockupHandler);
    jsunit.assertFalse(scopes.svyNavigation.contextIsRegistered(navCntxtTest));
    jsunit.assertNull(scopes.svyNavigation.getContextById(navCntxtTest.getContextID()));
    
    mockupHandler.resetTestState();
    var navCntxt1 = scopes.svyNavigation.openInNewStandardContext(navItem1);
    var callLog = mockupHandler.getCallLog();
    jsunit.assertEquals(1,callLog.length);
    jsunit.assertEquals('openFormInApplication',callLog[0].methodName);
    
    jsunit.assertNotNull(navCntxt1);
    jsunit.assertEquals(scopes.svyNavigationModel.NavigationContextType.Standard,navCntxt1.getContextType());
    jsunit.assertTrue(scopes.svyNavigation.contextIsRegistered(navCntxt1));
    jsunit.assertNotNull(scopes.svyNavigation.getContextById(navCntxt1.getContextID()));
    jsunit.assertSame(navItem1, navCntxt1.getLastNavigationItem());
    
    mockupHandler.resetTestState();
    navCntxtTest = scopes.svyNavigation.openInExistingContext(navCntxt1,navItem2);
    callLog = mockupHandler.getCallLog();
    jsunit.assertEquals(1,callLog.length);
    jsunit.assertEquals('openFormInApplication',callLog[0].methodName);
    jsunit.assertSame(navCntxt1,navCntxtTest);
    jsunit.assertSame(navItem2, navCntxt1.getLastNavigationItem());
    jsunit.assertEquals(2, navCntxt1.getNavigationItemsCount());
    
    mockupHandler.resetTestState();
    navCntxtTest = scopes.svyNavigation.openInExistingContext(navCntxt1,navItem3,true);
    callLog = mockupHandler.getCallLog();
    jsunit.assertSame(navCntxt1,navCntxtTest);
    jsunit.assertSame(navItem3, navCntxt1.getLastNavigationItem());
    jsunit.assertEquals(2, navCntxt1.getNavigationItemsCount());
    
    mockupHandler.resetTestState();
    var navCntxt2 = scopes.svyNavigation.openInNewDialogContext(navItem2,true);
    callLog = mockupHandler.getCallLog();
    jsunit.assertEquals(1,callLog.length);
    jsunit.assertEquals('openFormInModalDialog',callLog[0].methodName);
    jsunit.assertNotSame(navCntxt1,navCntxt2);
    jsunit.assertEquals(scopes.svyNavigationModel.NavigationContextType.ModalDialog,navCntxt2.getContextType());
    jsunit.assertSame(navItem2, navCntxt2.getLastNavigationItem());
    jsunit.assertEquals(1, navCntxt2.getNavigationItemsCount());
    
    mockupHandler.resetTestState();
    navCntxtTest = scopes.svyNavigation.openInExistingContext(navCntxt1,navItem1,true);
    callLog = mockupHandler.getCallLog();
    jsunit.assertEquals(1,callLog.length);
    jsunit.assertEquals('openFormInModalDialog',callLog[0].methodName);
    jsunit.assertNotSame('After a modal dialog is opened everything else should open in modal dialogs too', navCntxt1, navCntxtTest);
    jsunit.assertSame(navItem3, navCntxt1.getLastNavigationItem());
    jsunit.assertSame(navItem1, navCntxtTest.getLastNavigationItem());
    jsunit.assertEquals(2, navCntxt1.getNavigationItemsCount());
    jsunit.assertEquals(1, navCntxtTest.getNavigationItemsCount());
    
    jsunit.assertTrue(scopes.svyNavigation.contextIsRegistered(navCntxtTest));
    mockupHandler.resetTestState();
    scopes.svyNavigation.closeContext(navCntxtTest);
    callLog = mockupHandler.getCallLog();
    jsunit.assertFalse(scopes.svyNavigation.contextIsRegistered(navCntxtTest));
    jsunit.assertEquals(2,callLog.length);
    jsunit.assertEquals('closeCurrentForm',callLog[0].methodName);
    jsunit.assertEquals('closeContext',callLog[1].methodName);
    
    mockupHandler.resetTestState();
    scopes.svyNavigation.closeCurrentForm(navCntxt1);
    callLog = mockupHandler.getCallLog();
    jsunit.assertSame('Closing the current form in a context should "activate" the previous form and make it "current"', navItem1, navCntxt1.getLastNavigationItem());
    jsunit.assertEquals(1, navCntxt1.getNavigationItemsCount());
    jsunit.assertEquals(2,callLog.length);
    jsunit.assertEquals('closeCurrentForm',callLog[0].methodName);
    jsunit.assertEquals('openFormInApplication',callLog[1].methodName);
    jsunit.assertEquals(navItem1,callLog[1].args[0]);
    
    mockupHandler.resetTestState();
    scopes.svyNavigation.closeCurrentForm(navCntxt1);
    callLog = mockupHandler.getCallLog();
    jsunit.assertFalse('Closing the last remainng form in a context should close the context as well', scopes.svyNavigation.contextIsRegistered(navCntxt1));
    jsunit.assertEquals(2,callLog.length);
    jsunit.assertEquals('closeCurrentForm',callLog[0].methodName);
    jsunit.assertEquals('closeContext',callLog[1].methodName);
    jsunit.assertFalse(scopes.svyNavigation.contextIsRegistered(navCntxt1));
    
    jsunit.assertTrue(scopes.svyNavigation.contextIsRegistered(navCntxt2));
    navCntxtTest = scopes.svyNavigation.getFormInstanceContext(navItem2.getFormName());
    jsunit.assertNull(navCntxtTest);
    scopes.svyNavigation.registerFormInstance(navItem2.getFormName(), navCntxt2);
    navCntxtTest = scopes.svyNavigation.getFormInstanceContext(navItem2.getFormName());
    jsunit.assertSame(navCntxt2,navCntxtTest);
    scopes.svyNavigation.unregisterFormInstance(navItem2.getFormName());
    navCntxtTest = scopes.svyNavigation.getFormInstanceContext(navItem2.getFormName());
    jsunit.assertNull(navCntxtTest);
    
    scopes.sharedTestUtils.assertThrows(scopes.svyNavigation.registerFormInstance, [navItem2.getFormName(), navCntxt1], null, 'Trying to register form instance with an unregistered context should fail');
    
    scopes.sharedTestUtils.assertThrows(scopes.svyNavigation.openInNewStandardContext);
    
}