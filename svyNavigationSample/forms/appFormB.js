
/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"A651F23C-0DC0-46F9-A2F5-1888739FA60A"}
 */
function onShow(firstShow, event) {
    elements.lblInstanceId.text = 'Form instance name: ' + controller.getName();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"B9FF761E-00A9-4781-9560-F1DDE90DFBF1"}
 */
function onActionDrillDown(event) {
    var drillDownFormInstanceName = 'DrillDown' + application.getUUID().toString();
    var ok = application.createNewFormInstance(forms.appFormA.controller.getName(), drillDownFormInstanceName);
    if (!ok){
        plugins.dialogs.showErrorDialog('Error','Failed to create drill down form instance');
        return;
    }
    var navItem = new scopes.svyNavigationModel.NavigationItem(drillDownFormInstanceName, 'DrillDown B->A');

    //show the drill down form in the same context as this form
    var navContext = scopes.svyNavigation.getFormInstanceContext(controller.getName());
    //Note: replacing the current(this) form in the context with the drill down form
    scopes.svyNavigation.openInExistingContext(navContext, navItem, true);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"679757D9-5BF6-4AE5-81B2-C6A929145631"}
 */
function onActionModalDialog(event) {
    var dialogFormInstanceName = 'ModalDialog' + application.getUUID().toString();
    var ok = application.createNewFormInstance(forms.toolDialogB.controller.getName(), dialogFormInstanceName);
    if (!ok){
        plugins.dialogs.showErrorDialog('Error','Failed to create dialog form instance');
        return;
    }
    var navItem = new scopes.svyNavigationModel.NavigationItem(dialogFormInstanceName, 'Modal Dialog B');
    navItem.setCloseCallbackInfo(utils.stringFormat('forms.%1$s.modalDialogCloseCallback',[controller.getName()]), {propA: 'FooBar', propB: 42});
    
    //show in non-modal dialog
    scopes.svyNavigation.openInNewDialogContext(navItem, true);
}


/**
 * @private 
 * @param {scopes.svyNavigationModel.NavigationItem} navItem
 * @param {{propA: String, propB: Number}} arg
 *
 * @properties={typeid:24,uuid:"8A96590F-FBC0-4C36-8F30-397499EF7994"}
 */
function modalDialogCloseCallback(navItem, arg){
    /** @type {RuntimeForm<toolDialogB>} */
    var dlgFrm = forms[navItem.getFormName()];
    var dlgResult = dlgFrm.getResult();
    var msg = [];
    msg.push('Modal dialog result: ' + dlgResult);
    msg.push('close callback arg.propA: ' + arg.propA);
    msg.push('close callback arg.propB: ' + arg.propB);
    plugins.dialogs.showInfoDialog('Close Callback Results',msg.join('<br>'));
}