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
     * @param {NavigationController} navigationController
     * @throws {Error} If the form could not be opened.
     */
    this.openFormInApplication = function(navigationItem, navigationContext, navigationController) {
        throw new Error('Abstract interface method');
    }
    /**
     * @public
     * @param {scopes.svyNavigationModel.NavigationItem} navigationItem
     * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
     * @param {NavigationController} navigationController
     * @throws {Error} If the form could not be opened.
     */
    this.openFormInDialog = function(navigationItem, navigationContext, navigationController) {
        throw new Error('Abstract interface method');
    }
    /**
     * @public
     * @param {scopes.svyNavigationModel.NavigationItem} navigationItem
     * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
     * @param {NavigationController} navigationController
     * @throws {Error} If the form could not be opened.
     */
    this.openFormInModalDialog = function(navigationItem, navigationContext, navigationController) {
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
     */
    var m_FormInstanceContextMap = {};

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
     * @param {Array} array
     * @param {*} item
     */
    function removeItemFromArray(array, item){
        var indx = array.indexOf(item);
        if (indx != -1) {
            array.splice(indx, 1);
        }
    }

    /**
     * @private
     * @param {scopes.svyNavigationModel.NavigationContext} context
     */
    function unregisterContext(context) {
        removeItemFromArray(m_AllContexts, context);
                
        switch (context.getContextType()) {
            case scopes.svyNavigationModel.NavigationContextType.Standard: {
                removeItemFromArray(m_StandardContexts, context);
                break;
            }
            case scopes.svyNavigationModel.NavigationContextType.Dialog: {
                removeItemFromArray(m_DialogContexts, context);
                break;
            }
            case scopes.svyNavigationModel.NavigationContextType.ModalDialog: {
                removeItemFromArray(m_ModalDialogContexts, context);
                break;
            }
            default: {
                throw new Error('Unknown context type: ' + context.getContextType());
            }
        }
    }

    /**
     * @public
     * @param {String} formInstanceName
     * @param {scopes.svyNavigationModel.NavigationContext} context
     */
    this.registerFormInstance = function(formInstanceName, context){
        if (this.contextIsRegistered(context)){
            m_FormInstanceContextMap[formInstanceName] = context;
        } else {
            throw new Error(utils.stringFormat('The context "%1$s" is not registered with this navigation controller.',[context.getContextID()]));
        }
    }
    
    /**
     * @public
     * @param {String} formInstanceName
     */
    this.unregisterFormInstance = function(formInstanceName){
        delete m_FormInstanceContextMap[formInstanceName];
    }
    
    /**
     * @public
     * @param {String} formInstanceName
     * @return {scopes.svyNavigationModel.NavigationContext}
     */
    this.getFormInstanceContext = function(formInstanceName){
        /** @type {scopes.svyNavigationModel.NavigationContext} */
        var context = m_FormInstanceContextMap[formInstanceName] || null;
        return context;
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
     * @public
     * @param {String} contextId
     * @return {scopes.svyNavigationModel.NavigationContext}
     */
    this.getContextById = function(contextId) {
        for (var index = 0; index < m_AllContexts.length; index++) {
            var item = m_AllContexts[index];
            if (item.getContextID() == contextId) {
                return item;
            }                
        }
        return null;
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
                handler.openFormInApplication(navigationItem, navigationContext, self);
                break;
            }
            case scopes.svyNavigationModel.NavigationContextType.Dialog: {
                handler.openFormInDialog(navigationItem, navigationContext, self);
                break;
            }
            case scopes.svyNavigationModel.NavigationContextType.ModalDialog: {
                handler.openFormInModalDialog(navigationItem, navigationContext, self);
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
            if (handler.closeCurrentForm(navigationContext)) {
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
        if (openInContext(navigationItem, context, true, false, addToRecentList)) {
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

        if (openInContext(navigationItem, contextToUse, isNewContext, replaceCurrentItem, addToRecentList)) {
            return contextToUse;
        }
        return null;
    }

    /**
     * @public
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

        var lastNavItem = navigationContext.getLastNavigationItem();
        var closeCallbackInfo = lastNavItem.getCloseCallbackInfo();
        var res = handler.closeCurrentForm(navigationContext);
        if (res) {
            navigationContext.removeLastNavigationItem();
            var nextNavItem = navigationContext.getLastNavigationItem();
            if (nextNavItem) {
                openForm(nextNavItem, navigationContext);
            } else {
                if (handler.closeContext(navigationContext)) {
                    unregisterContext(navigationContext);
                }
            }
            if (closeCallbackInfo && closeCallbackInfo.qualifiedMethodName) {
                //the qualified method name should be forms.formname.methodname or scopes.scopename.methodname
                var parts = closeCallbackInfo.qualifiedMethodName.split('.');
                if (parts.length == 3){
                    var mthd = null;
                    switch (parts[0]) {
                        case 'forms': {
                            mthd = forms[parts[1]][parts[2]];
                            break;
                        }
                        case 'scopes': {
                            mthd = scopes[parts[1]][parts[2]];
                            break;
                        }
                    
                        default: {
                            application.output('Invalid qualified method name for close callback: ' + closeCallbackInfo.qualifiedMethodName);
                            break;
                        }
                    }
                    if (mthd) {
                        //need to do this with a job because the close request may have been initiated from the form which is being closed
                        plugins.scheduler.addJob(application.getUUID().toString(),application.getServerTimeStamp(), mthd, [lastNavItem, closeCallbackInfo.arg]);
                    }
                }
            }
        }

        return res;
    }

    /**
     * @public
     * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
     * @return {Boolean}
     */
    this.closeContext = function(navigationContext) {
        if (!navigationContext) {
            throw new Error('navigationContext is not specified');
        }

        if (!self.contextIsRegistered(navigationContext)) {
            throw new Error('The specified navigation context is not managed by this navigation controller');
        }

        var res = false;
        while (navigationContext.hasNavigationItems()) {
            res = this.closeCurrentForm(navigationContext);
            if (!res) {
                return res;
            }
        }
        return true;
    }
}
