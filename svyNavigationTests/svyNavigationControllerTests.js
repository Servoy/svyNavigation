/**
 * @properties={typeid:24,uuid:"A5F2BC58-DCEE-4CBE-9006-361CBD1D7965"}
 */
function test_validateNavigationHandler(){
    var badHandler = {};
    var goodHandler = new scopes.svyNavigationController.NavigationHandler();
    //note: accessing a private function
    var func = scopes.svyNavigationController['validateNavigationHandler'];
    
    scopes.sharedTestUtils.assertThrows(func, [badHandler])
    //this should not throw any errors
    func(goodHandler);
}