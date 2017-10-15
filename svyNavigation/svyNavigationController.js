/**
 * @constructor 
 * @public
 * @classdesc Used as interface for objects which can handle navigation requests (e.g. shell or main forms, etc.) to perform the actual opening, docking, closing, etc. of application forms.
 * @properties={typeid:24,uuid:"4E11AA6B-2D12-4D62-B36E-826BDB5E0695"}
 */
function NavigationHandler() {
    /**
     * @public
     * @param {scopes.svyNavigationModel.NavigationItem} navigationItem
     * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
     * @throws {Error} If the form could not be opened.
     */
    this.openFormInApplication = function(navigationItem, navigationContext) {
        throw new Error('Abstract interface method');
    }
    /**
     * @public
     * @param {scopes.svyNavigationModel.NavigationItem} navigationItem
     * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
     * @throws {Error} If the form could not be opened.
     */
    this.openFormInDialog = function(navigationItem, navigationContext) {
        throw new Error('Abstract interface method');
    }
    /**
     * @public
     * @param {scopes.svyNavigationModel.NavigationItem} navigationItem
     * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
     * @throws {Error} If the form could not be opened.
     */
    this.openFormInModalDialog = function(navigationItem, navigationContext) {
        throw new Error('Abstract interface method');
    }

    /**
     * Closes the current/active form which is loaded in the specified context.
     * @public
     * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
     * @return {Boolean}
     */
    this.closeCurrentForm = function(navigationContext) {
        throw new Error('Abstract interface method');
    }

    /**
     * Closes the specified context along with all forms currently opened in it.
     * @public
     * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
     * @return {Boolean}
     */
    this.closeContext = function(navigationContext) {
        throw new Error('Abstract interface method');
    }
}

/**
 * @private
 * @param {NavigationHandler} handler
 * @throws {Error} If the handler is not specified or if it does not implement all the methods defined in the NavigationHandler interface.
 * @properties={typeid:24,uuid:"172A6C5C-6D48-4723-9B3F-F8E5839F0AE7"}
 */
function validateNavigationHandler(handler) {
    if (!handler) {
        throw new Error('Handler is not specified.');
    }
    var modelInstance = new NavigationHandler();
    var props = Object.getOwnPropertyNames(modelInstance);
    var methodNames = props.filter(function(e, i, arr) {
        if (typeof modelInstance[e] === 'function') {
            return true;
        }
        return false;
    });

    methodNames.forEach(function(methodName) {
        if (! (methodName in handler)) {
            throw new Error(utils.stringFormat('The required method "%1$s" is not implemented by the specified handler.', [methodName]));
        }
    });
}

/**
 * @constructor
 * @param {NavigationHandler} handler
 * @properties={typeid:24,uuid:"875F2A28-E3B1-4F7F-A023-50B207E78FA5"}
 */
function NavigationController(handler) {

    validateNavigationHandler(handler);

    /**
     * @private
     * @type {NavigationController}
     */
    var self = this;
    /**
     * @private
     * @type {Array<scopes.svyNavigationModel.NavigationContext>}
     */
    var m_AllContexts = [];
    /**
     * @private
     * @type {Array<scopes.svyNavigationModel.NavigationContext>}
     */
    var m_StandardContexts = [];
    /**
     * @private
     * @type {Array<scopes.svyNavigationModel.NavigationContext>}
     */
    var m_DialogContexts = [];
    /**
     * @private
     * @type {Array<scopes.svyNavigationModel.NavigationContext>}
     */
    var m_ModalDialogContexts = [];

    /**
     * @private
     * @param {scopes.svyNavigationModel.NavigationContext} context
     */
    function registerContext(context) {
        //check if the specified context is already registered
        if (self.contextIsRegistered(context)) {
            return;
        }
        switch (context.getContextType()) {
            case scopes.svyNavigationModel.NavigationContextType.Standard: {
                m_StandardContexts.push(context);
                break;
            }
            case scopes.svyNavigationModel.NavigationContextType.Dialog: {
                m_DialogContexts.push(context);
                break;
            }
            case scopes.svyNavigationModel.NavigationContextType.ModalDialog: {
                m_ModalDialogContexts.push(context);
                break;
            }
            default: {
                throw new Error('Unknown context type: ' + context.getContextType());
            }
        }
        m_AllContexts.push(context);
    }

    /**
     * @private
     * @param {scopes.svyNavigationModel.NavigationContext} context
     */
    function unregisterContext(context) {
        //TODO: implement this
    }

    /**
     * @public
     * @param {scopes.svyNavigationModel.NavigationContext} context
     * @return {Boolean}
     */
    this.contextIsRegistered = function(context) {
        return (m_AllContexts.indexOf(context) != -1);
    }

    /**
     * @private
     * @param {scopes.svyNavigationModel.NavigationItem} navigationItem
     */
    function addItemToRecentList(navigationItem) {
        //TODO: implement this
    }

    /**
     * @private
     * @param {scopes.svyNavigationModel.NavigationItem} navigationItem
     * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
     */
    function openForm(navigationItem, navigationContext) {
        switch (navigationContext.getContextType()) {
            case scopes.svyNavigationModel.NavigationContextType.Standard: {
                handler.openFormInApplication(navigationItem, navigationContext);
                break;
            }
            case scopes.svyNavigationModel.NavigationContextType.Dialog: {
                handler.openFormInDialog(navigationItem, navigationContext);
                break;
            }
            case scopes.svyNavigationModel.NavigationContextType.ModalDialog: {
                handler.openFormInModalDialog(navigationItem, navigationContext);
                break;
            }

            default: {
                throw new Error(utils.stringFormat('Unknown navigation context type "%1$s"', [navigationContext.getContextType()]));
            }
        }
    }

    /**
     * @private
     * @param {scopes.svyNavigationModel.NavigationItem} navigationItem
     * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
     * @param {Boolean} isNewContext
     * @param {Boolean} replaceCurrentItem
     * @param {Boolean} [addToRecentList]
     * @return {Boolean}
     */
    function openInContext(navigationItem, navigationContext, isNewContext, replaceCurrentItem, addToRecentList) {
        //Note: the context should be updated BEFORE opening the form in case the handler needs to use the new information (e.g. to display correct breadcrumbs info)
        registerContext(navigationContext);
        var lastItem = navigationContext.getLastNavigationItem();
        if (!isNewContext && replaceCurrentItem && lastItem) {
            if (handler.closeCurrentForm(navigationContext)){
                navigationContext.removeLastNavigationItem();
            } else {
                return false;
            }
        }
        
        navigationContext.addNavigationItem(navigationItem);
        
        try {
            openForm(navigationItem, navigationContext);
        } catch (e) {
            //"revert" the context changes
            navigationContext.removeLastNavigationItem();
            if (isNewContext) {
                unregisterContext(navigationContext);
            } else if (replaceCurrentItem && lastItem) {
                openForm(lastItem, navigationContext);
            }
            throw e;
        }

        if (addToRecentList) {
            addItemToRecentList(navigationItem);
        }
        return true;
    }

    /**
     * @public
     * @param {scopes.svyNavigationModel.NavigationItem} navigationItem
     * @param {Boolean} [addToRecentList]
     * @return {scopes.svyNavigationModel.NavigationContext} The context in which the item was opened or null if the item could not be opened.
     */
    this.openInNewStandardContext = function(navigationItem, addToRecentList) {
        var contextType = scopes.svyNavigationModel.NavigationContextType.Standard;
        if (m_ModalDialogContexts.length > 0) {
            contextType = scopes.svyNavigationModel.NavigationContextType.ModalDialog;
        }

        var context = new scopes.svyNavigationModel.NavigationContext(contextType);
        if (openInContext(navigationItem, context, true, false, addToRecentList)){
            return context;
        }
        return null;
    }

    /**
     * @public
     * @param {scopes.svyNavigationModel.NavigationItem} navigationItem
     * @param {Boolean} useModalDialog
     * @param {Boolean} [addToRecentList]
     * @return {scopes.svyNavigationModel.NavigationContext} The context in which the item was opened or null if the item could not be opened.
     */
    this.openInNewDialogContext = function(navigationItem, useModalDialog, addToRecentList) {
        var contextType = scopes.svyNavigationModel.NavigationContextType.Dialog;
        if (useModalDialog || (m_ModalDialogContexts.length > 0)) {
            contextType = scopes.svyNavigationModel.NavigationContextType.ModalDialog;
        }

        var context = new scopes.svyNavigationModel.NavigationContext(contextType);
        if (openInContext(navigationItem, context, true, false, addToRecentList)) {
            return context;
        }
        return null;
    }

    /**
     * @public
     * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
     * @param {scopes.svyNavigationModel.NavigationItem} navigationItem
     * @param {Boolean} [replaceCurrentItem]
     * @param {Boolean} [addToRecentList]
     * @return {scopes.svyNavigationModel.NavigationContext} The context in which the item was opened or null if the item could not be opened. Note that the result context may be different from the specified input one.
     */
    this.openInExistingContext = function(navigationContext, navigationItem, replaceCurrentItem, addToRecentList) {
        if (!navigationContext) {
            throw new Error('navigationContext is not specified');
        }

        if (!navigationItem) {
            throw new Error('navigationItem is not specified');
        }

        if (!self.contextIsRegistered(navigationContext)) {
            throw new Error('The specified navigation context is not managed by this navigation controller');
        }

        var contextTypeToUse = navigationContext.getContextType();
        if (m_ModalDialogContexts.length > 0) {
            //if a modal dialog is currently opened then everything else which is opened by this controller must be in a separate modal dialog
            contextTypeToUse = scopes.svyNavigationModel.NavigationContextType.ModalDialog;
        }
        var contextToUse = navigationContext;
        var isNewContext = false;
        if (contextTypeToUse == scopes.svyNavigationModel.NavigationContextType.ModalDialog) {
            contextToUse = new scopes.svyNavigationModel.NavigationContext(contextTypeToUse);
            isNewContext = true;
        }

        if (openInContext(navigationItem, contextToUse, isNewContext, replaceCurrentItem, addToRecentList)){
            return contextToUse;
        }
        return null;
    }

    /**
     * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
     * @return {Boolean}
     */
    this.closeCurrentForm = function(navigationContext) {
        if (!navigationContext) {
            throw new Error('navigationContext is not specified');
        }

        if (!self.contextIsRegistered(navigationContext)) {
            throw new Error('The specified navigation context is not managed by this navigation controller');
        }

        var res = handler.closeCurrentForm(navigationContext);
        if (res) {
            navigationContext.removeLastNavigationItem();
            var nextNavItem = navigationContext.getLastNavigationItem();
            if (nextNavItem) {
                openForm(nextNavItem, navigationContext);
            }
        }

        return res;
    }
}
