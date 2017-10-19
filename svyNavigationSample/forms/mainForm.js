/**
 * @private
 * @properties={typeid:35,uuid:"0E8F4018-86A0-422F-B185-941E2B20F347",variableType:-4}
 */
var m_ManagedContexts = {};

/*================== NavigationHandler interface implementation START ========================*/
/**
 * @public
 * @param {scopes.svyNavigationModel.NavigationItem} navigationItem
 * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
 * @param {scopes.svyNavigationController.NavigationController} navigationController
 * @throws {Error} If the form could not be opened.
 *
 * @properties={typeid:24,uuid:"D48A9B96-9745-45B7-9D4E-C7E823235FB0"}
 */
function openFormInApplication(navigationItem, navigationContext, navigationController) {
    var contextId = navigationContext.getContextID();
    /** @type {RuntimeForm<contextContainer>} */
    var contextContainer = forms[contextId];
    if (!contextContainer) {
        var ok = application.createNewFormInstance(forms.contextContainer.controller.getName(), contextId);
        if (ok) {
            /** @type {RuntimeForm<contextContainer>} */
            contextContainer = forms[contextId];
        } else {
            plugins.dialogs.showErrorDialog('Error', 'Could not create context container form instance');
            return;
        }
    }
    var formInstanceName = contextContainer.setNavigationContext(navigationContext);
    navigationController.registerFormInstance(formInstanceName,navigationContext);
    m_ManagedContexts[contextId] = 'tab';
    
    var tabCnt = elements.tabPanelMain.getMaxTabIndex();
    for (var index = 1; index <= tabCnt; index++) {
        if (elements.tabPanelMain.getTabFormNameAt(index) == contextId) {
            return;
        }
    }
    elements.tabPanelMain.addTab(contextContainer, contextId, navigationItem.getText());
}
/**
 * @public
 * @param {scopes.svyNavigationModel.NavigationItem} navigationItem
 * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
 * @param {scopes.svyNavigationController.NavigationController} navigationController
 * @throws {Error} If the form could not be opened.
 *
 * @properties={typeid:24,uuid:"3033B322-D2A9-42FF-83A2-2094EC2F775A"}
 */
function openFormInDialog(navigationItem, navigationContext, navigationController) {
    var contextId = navigationContext.getContextID();
    /** @type {RuntimeForm<contextContainer>} */
    var contextContainer = forms[contextId];
    if (!contextContainer) {
        var ok = application.createNewFormInstance(forms.contextContainer.controller.getName(), contextId);
        if (ok) {
            /** @type {RuntimeForm<contextContainer>} */
            contextContainer = forms[contextId];
        } else {
            plugins.dialogs.showErrorDialog('Error', 'Could not create context container form instance');
            return;
        }
    }
    var formInstanceName = contextContainer.setNavigationContext(navigationContext);
    navigationController.registerFormInstance(formInstanceName,navigationContext);
    m_ManagedContexts[contextId] = 'dialog';
    
    var win = application.getWindow(contextId);
    if (!win) {
        win = application.createWindow(contextId, JSWindow.DIALOG);
        win.resizable = true;
        win.title = navigationItem.getText();
    }
    
    win.show(contextContainer);
}
/**
 * @public
 * @param {scopes.svyNavigationModel.NavigationItem} navigationItem
 * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
 * @param {scopes.svyNavigationController.NavigationController} navigationController
 * @throws {Error} If the form could not be opened.
 *
 * @properties={typeid:24,uuid:"F301FABD-30CC-4749-8AF7-B3CE92321384"}
 */
function openFormInModalDialog(navigationItem, navigationContext, navigationController) {
    var contextId = navigationContext.getContextID();
    /** @type {RuntimeForm<contextContainer>} */
    var contextContainer = forms[contextId];
    if (!contextContainer) {
        var ok = application.createNewFormInstance(forms.contextContainer.controller.getName(), contextId);
        if (ok) {
            /** @type {RuntimeForm<contextContainer>} */
            contextContainer = forms[contextId];
        } else {
            plugins.dialogs.showErrorDialog('Error', 'Could not create context container form instance');
            return;
        }
    }
    var formInstanceName = contextContainer.setNavigationContext(navigationContext);
    navigationController.registerFormInstance(formInstanceName,navigationContext);
    m_ManagedContexts[contextId] = 'modalDialog';
    
    var win = application.getWindow(contextId);
    if (!win) {
        win = application.createWindow(contextId, JSWindow.MODAL_DIALOG);                
        win.resizable = true;
        win.title = navigationItem.getText();
    }
    
    win.show(contextContainer);
}

/**
 * Closes the current/active form which is loaded in the specified context.
 * @public
 * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"2DF3A64E-C5EE-48F1-A7AF-A30884E12A2A"}
 */
function closeCurrentForm(navigationContext) {
    var contextId = navigationContext.getContextID();
    /** @type {RuntimeForm<contextContainer>} */
    var contextContainer = forms[contextId];
    if (!contextContainer) {
        return false;
    }
    var currentFormInstanceName = contextContainer.getCurrentFormName();
    contextContainer.setNavigationContext(null);
    if (currentFormInstanceName) {
        scopes.svyNavigation.unregisterFormInstance(currentFormInstanceName);
    }
    return true;
}

/**
 * Closes the specified context along with all forms currently opened in it.
 * @public
 * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"040CE9E2-03A1-4E85-9F2D-77EA5E1CA73A"}
 */
function closeContext(navigationContext) {
    var contextId = navigationContext.getContextID();
    var type = m_ManagedContexts[contextId];
    if (!type){
        plugins.dialogs.showErrorDialog('Error',utils.stringFormat('The specified context "%1$s" is not managed by the main form.',[contextId]))
        return false;
    }
    switch (type) {
        case 'tab': {
            var tabCnt = elements.tabPanelMain.getMaxTabIndex();
            for (var index = 1; index <= tabCnt; index++) {
                if (elements.tabPanelMain.getTabFormNameAt(index) == contextId) {
                    return elements.tabPanelMain.removeTabAt(index);
                }
            }
            return false;
        }
        case 'dialog': 
        case 'modalDialog': {
            var win = application.getWindow(contextId);
            if (!win){
                return false;
            }
            if (win.hide()){
                win.destroy();
                return true;
            }
            return false;
        }
        
        default: {
            plugins.dialogs.showErrorDialog('Error', 'Unsupported container type: ' + type);
            return false;
        }
    }
}
/*================== NavigationHandler interface implementation END ========================*/

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"8F40D87A-D9AC-4916-B1C4-689CE8EF15B2"}
 */
function onLoad(event) {
    elements.sidenavMenu.clearMenuItems();
    elements.sidenavMenu.addMenuItem(createMenuItem('Fom A', forms.appFormA.controller.getName(), 'tab'));
    elements.sidenavMenu.addMenuItem(createMenuItem('Form B', forms.appFormB.controller.getName(), 'tab'));

    /** @type {scopes.svyNavigationController.NavigationHandler} */
    var handler = this;
    scopes.svyNavigation.initializeDefaultController(handler);
}

/**
 * @private
 * @param {String} text
 * @param {String} formName
 * @param {String} containerType
 * @return {servoyextra-sidenav.MenuItem}
 *
 * @properties={typeid:24,uuid:"81918F21-C1BA-4082-8978-4086F2AD2927"}
 */
function createMenuItem(text, formName, containerType) {
    /** @type {servoyextra-sidenav.MenuItem} */
    var menuItem = {
        id: application.getUUID().toString(),
        text: text,
        data: { text: text, formName: formName, containerType: containerType },
        styleClass: '',
        iconStyleClass: 'glyphicon glyphicon-expand'
    };
    return menuItem;
}

/**
 * @param {object} menuItemId
 * @param {JSEvent} event
 *
 * @return {boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"A9F58B37-3C66-409F-B1AC-B66CF9672841"}
 */
function onMenuItemSelected(menuItemId, event) {
    /** @type {servoyextra-sidenav.MenuItem} */
    var menuItem = elements.sidenavMenu.getMenuItem(menuItemId);
    /** @type {{text: String, formName: String, containerType: String}} */
    var data = menuItem.data;
    var formInstanceId = application.getUUID().toString();
    application.createNewFormInstance(data.formName,formInstanceId);
    var navItem = new scopes.svyNavigationModel.NavigationItem(formInstanceId, data.text);
    switch (data.containerType) {
        case 'tab': {
            scopes.svyNavigation.openInNewStandardContext(navItem, true);
            break;
        }
        case 'dialog': {
            scopes.svyNavigation.openInNewDialogContext(navItem, false, true);
            break;
        }
        case 'modalDialog': {
            scopes.svyNavigation.openInNewDialogContext(navItem, true, true);
            break;
        }

        default: {
            plugins.dialogs.showErrorDialog('Error', 'Unsupported container type: ' + data.containerType);
            break;
        }
    }
    return true;
}
