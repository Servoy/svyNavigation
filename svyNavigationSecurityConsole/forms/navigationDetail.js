/**
 * @protected  
 * @type {String}
 *
 * @properties={typeid:35,uuid:"1EBC8F60-EB1D-488F-910B-150EBA97BC48"}
 */
var m_SelectedPermission = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"055AE7B4-6B7B-4011-8F5E-7698F8AEEC85"}
 */
function onActionCancel(event) {
	// TODO implement the delete
	foundset.getSelectedRecord().revertChanges();
	back()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"84C96F6E-56D0-4522-9DA6-A945F1C1B7CA"}
 */
function onActionViewList(event) {
	back();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"2F2CFC81-6E7E-41FA-89E9-C4DDCA0819D0"}
 */
function onActionSave(event) {
	if (databaseManager.saveData(foundset.getSelectedRecord())) {
		back();
	} else {
		plugins.dialogs.showErrorDialog("Error","Cannot save navitem " + foundset.property_uuid);
	}
}

/**
 * @protected
 * @properties={typeid:24,uuid:"EB345F05-8A3F-4470-ADBF-F6EFFE60C76E"}
 */
function back() {
	forms.navigationHome.show("navigationList");
}

/**
 * Perform the element default action. 
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"002C9307-F772-4545-98F7-883F2F0392BB"}
 */
function onActionDelete(event) {
	var btnDelete = 'Delete';
	var btnCancel = 'Cancel';
	var res = plugins.dialogs.showWarningDialog('Confirm Delete', utils.stringFormat('You are about to delete the navitem "%1$s".<br>There is no undo for this operation.<br>Do you want to continue?', [display_name]), btnCancel, btnDelete);
	if (res == btnDelete) {
		// res = property(user_name);
		res = scopes.svyNavigationSecurity.deleteSecureNavigationItem(foundset.property_uuid);
		if (res) {
			back();
		} else {
			plugins.dialogs.showWarningDialog('Delete Not Successful', 'Could not delete property.');
		}
	}
}


/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"0FF7358F-9F89-47F2-9258-363A8FBC6E83"}
 */
function onActionAddPermission(event) {
    if (!property_uuid) {
        return;
    }
    
    var fsPermissions = datasources.db.svy_security.permissions.getFoundSet();
    fsPermissions.loadAllRecords();
    if (fsPermissions.getSize() == 0) {
        plugins.dialogs.showWarningDialog('No Permissions Available', 'No permissions are available in the system.');
        return;
    }
    var permissions = databaseManager.convertToDataSet(fsPermissions, ['permission_name']).getColumnAsArray(1);
    var permissionToAdd =  plugins.dialogs.showSelectDialog('Select Permission To Grant','Select the permission to grant to the selected property:', permissions);
    if (!permissionToAdd) {
        return;
    }
    
    var property = scopes.svyProperties.getProperty(property_uuid);
    
    var permission = scopes.svySecurity.getPermission(permissionToAdd);
    permission.addProperty(property);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"15509095-499A-43E3-B7B4-76C33A4019A5"}
 */
function onActionRemovePermission(event) {
	
    if (!property_uuid) {
        return;
    }
    
    if (!m_SelectedPermission) {
        plugins.dialogs.showInfoDialog('Selection Required','Please, select a permission first.');
        return;
    }

    var permission = scopes.svySecurity.getPermission(m_SelectedPermission);
    if (!permission) {
        plugins.dialogs.showErrorDialog('Error', utils.stringFormat('Cannot find Permission [%1$s]', [m_SelectedPermission]));
        return;
    }
    
    
    var confirmBtn = 'Remove';
    var response =  plugins.dialogs.showWarningDialog('Remove Permission From Property', utils.stringFormat('Do you want to remove permission <b>%1$s</b> from property <b>%2$s</b>?', [m_SelectedPermission, display_name]), 'No', confirmBtn);
    
    if (response != confirmBtn) {
        return;
    }
    
    var property = scopes.svyProperties.getProperty(property_uuid);
    
    permission.removeProperty(property);
}
