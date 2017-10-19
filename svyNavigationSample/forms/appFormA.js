
/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"EC7B3E92-089C-4833-92CA-4A8598B11D2B"}
 */
function onShow(firstShow, event) {
    elements.lblInstnaceID.text = 'Form instance name: ' + controller.getName();
}

/**
 * Perform the element default action. 
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"191D9C9C-4EAD-4E7A-9906-E68F84634A38"}
 */
function onActionDrillDown(event) {
    var drillDownFormInstanceName = 'DrillDown' + application.getUUID().toString();
    var ok = application.createNewFormInstance(forms.appFormB.controller.getName(), drillDownFormInstanceName);
    if (!ok){
        plugins.dialogs.showErrorDialog('Error','Failed to create drill down form instance');
        return;
    }
    var navItem = new scopes.svyNavigationModel.NavigationItem(drillDownFormInstanceName, 'DrillDown A->B');
    
    //show the drill down form in the same navigation context as this form
    var navContext = scopes.svyNavigation.getFormInstanceContext(controller.getName());    
    scopes.svyNavigation.openInExistingContext(navContext, navItem);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"0C02E751-9131-4962-B715-7750B02DF2D4"}
 */
function onActionOpenDialog(event) {
    var dialogFormInstanceName = 'Dialog' + application.getUUID().toString();
    var ok = application.createNewFormInstance(forms.toolDialogA.controller.getName(), dialogFormInstanceName);
    if (!ok){
        plugins.dialogs.showErrorDialog('Error','Failed to create dialog form instance');
        return;
    }
    var navItem = new scopes.svyNavigationModel.NavigationItem(dialogFormInstanceName, 'Dialog A');
    
    //show in non-modal dialog
    scopes.svyNavigation.openInNewDialogContext(navItem,false);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"D45745C9-09E2-4CFA-9FD4-03C02050B1B1"}
 */
function onActionOpenNewContext(event) {
    var newContextFormInstanceName = 'NewContext' + application.getUUID().toString();
    var ok = application.createNewFormInstance(forms.appFormA.controller.getName(), newContextFormInstanceName);
    if (!ok){
        plugins.dialogs.showErrorDialog('Error','Failed to create new form instance');
        return;
    }
    var navItem = new scopes.svyNavigationModel.NavigationItem(newContextFormInstanceName, 'New Context A->A');
    
    scopes.svyNavigation.openInNewStandardContext(navItem);
}
