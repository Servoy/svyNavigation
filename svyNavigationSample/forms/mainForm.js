/*================== NavigationHandler interface implementation START ========================*/
/**
 * @public
 * @param {scopes.svyNavigationModel.NavigationItem} navigationItem
 * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
 * @throws {Error} If the form could not be opened.
 *
 * @properties={typeid:24,uuid:"D48A9B96-9745-45B7-9D4E-C7E823235FB0"}
 */
function openFormInApplication(navigationItem, navigationContext) {
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
    contextContainer.setNavigationContext(navigationContext);

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
 * @throws {Error} If the form could not be opened.
 *
 * @properties={typeid:24,uuid:"3033B322-D2A9-42FF-83A2-2094EC2F775A"}
 */
function openFormInDialog(navigationItem, navigationContext) {
    throw new Error('Abstract interface method');
}
/**
 * @public
 * @param {scopes.svyNavigationModel.NavigationItem} navigationItem
 * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
 * @throws {Error} If the form could not be opened.
 *
 * @properties={typeid:24,uuid:"F301FABD-30CC-4749-8AF7-B3CE92321384"}
 */
function openFormInModalDialog(navigationItem, navigationContext) {
    throw new Error('Abstract interface method');
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
    throw new Error('Abstract interface method');
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
    throw new Error('Abstract interface method');
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
