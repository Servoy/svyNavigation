/**
 * @public
 * @enum
 * @properties={typeid:35,uuid:"1D6E1143-926F-4F57-A647-9844CA4F0B94",variableType:-4}
 */
var NavigationContextType = {
    Standard: 'STANDARD',
    Dialog: 'DIALOG',
    ModalDialog: 'MODAL_DIALOG'
}

/**
 * @public
 * @param {String} contextType one of the NavigationContextType enum options
 * @throws {Error} if the contextType is not specified or is not one of the NavigationContextType enum options
 *
 * @properties={typeid:24,uuid:"8ED5FF46-48AD-43DF-BB0F-16747887EFD5"}
 */
function validateContextType(contextType) {
    if (!contextType) {
        throw new Error('contextType is not specified');
    }
    switch (contextType) {
        case NavigationContextType.Standard:
        case NavigationContextType.Dialog:
        case NavigationContextType.ModalDialog: {
            return;
        }
        default: {
            throw new Error(utils.stringFormat('Unknown context type: "%1$s"', [contextType]));
        }
    }
}

/**
 * @constructor
 * @public
 * @param {String} formName
 * @param {String} [text]
 * @param {String} [tooltipText]
 * @properties={typeid:24,uuid:"119DC666-543C-4DB7-BAB3-BCC5806AE834"}
 */
function NavigationItem(formName, text, tooltipText) {
    /**
     * @protected
     * @type {String}
     * @ignore
     */
    this.m_FormName = formName;
    /**
     * @protected
     * @type {String}
     * @ignore
     */
    this.m_Text = text ? text : formName;
    /**
     * @protected
     * @type {String}
     * @ignore
     */
    this.m_TooltipText = tooltipText ? tooltipText : this.m_Text;
    /**
     * @protected
     * @type {*}
     * @ignore
     */
    this.m_CustomData = null;
    /**
     * @protected
     * @type {{qualifiedMethodName: String, arg: Object}}
     * @ignore
     */
    this.m_CloseCallbackInfo = null;
}

/**
 * Extends the NavigationItem prototype by adding the necessary methods.
 * Using this approach to minimize the memory footprint of the NavigationItem instances.
 * @private
 * @properties={typeid:24,uuid:"33CF221A-A7E7-4456-BF55-CAE664825511"}
 */
function setupNavigationItem() {
    /**
     * Gets the name of the form associated with this navigation item.
     * @public
     * @return {String}
     */
    NavigationItem.prototype.getFormName = function() {
        return this.m_FormName;
    };
    /**
     * Sets the name of the form associated with this navigation item.
     * @public
     * @param {String} formName
     */
    NavigationItem.prototype.setFormName = function(formName) {
        if (!formName || !utils.stringTrim(formName)) {
            throw new Error('FormName is not specified');
        }
        this.m_FormName = formName;
    };
    /**
     * @public
     * @return {String}
     */
    NavigationItem.prototype.getText = function() {
        return this.m_Text;
    };
    /**
     * @public
     * @param {String} text
     */
    NavigationItem.prototype.setText = function(text) {
        if (!text || !utils.stringTrim(text)) {
            throw new Error('Text is not specified');
        }
        this.m_Text = text;
    };
    /**
     * @public
     * @return {String}
     */
    NavigationItem.prototype.getTooltipText = function() {
        return this.m_TooltipText;
    };
    /**
     * @public
     * @param {String} tooltipText
     */
    NavigationItem.prototype.setTooltipText = function(tooltipText) {
        this.m_TooltipText = tooltipText;
    };
    /**
     * @public
     * @return {*}
     */
    NavigationItem.prototype.getCustomData = function() {
        return this.m_CustomData;
    };
    /**
     * @public
     * @param {*} customData
     */
    NavigationItem.prototype.setCustomData = function(customData) {
        this.m_CustomData = customData;
    };
    /**
     * @public
     * @param {String} qualifiedMethodName If null will clear the close callback information, otherwise must be a fully qualified method name (e.g. forms.formname.methodname or scopes.scopename.methodname). The close callback method signature must be callback(source: NavigationItem, arg: Object)
     * @param {Object} [arg] Argument which should be passed to the close callback as second argument.
     */
    NavigationItem.prototype.setCloseCallbackInfo = function(qualifiedMethodName, arg) {
        if (qualifiedMethodName === null) {
            this.m_CloseCallbackInfo = null;
        } else {
            if (!qualifiedMethodName || !utils.stringTrim(qualifiedMethodName)) {
                throw new Error('Invalid callback qualified method name');
            }
            this.m_CloseCallbackInfo = { qualifiedMethodName: qualifiedMethodName, arg: (arg || null) };
        }
    };
    /**
     * @public
     * @return {{qualifiedMethodName: String, arg: Object}} The close callback information or null if a close callback is not assigned.
     */
    NavigationItem.prototype.getCloseCallbackInfo = function() {
        /**
         * @private  
         * @type {{qualifiedMethodName: String, arg: Object}} 
         */
        var res = this.m_CloseCallbackInfo;
        return res;
    };

}

/**
 * @constructor
 * @public
 * @param {String} contextType one of the NavigationContextType enum options
 * @throws {Error} If contextType is not one of the NavigationContextType enum options
 * @classdesc Custom type which encapsulates the navigation context.
 *
 * @properties={typeid:24,uuid:"FFCF52A5-822B-4D91-A054-90806C0C544A"}
 */
function NavigationContext(contextType) {

    validateContextType(contextType);

    /**
     * @private
     * @type {String}
     */
    var m_ContextType = contextType;

    /**
     * @private
     * @type {String}
     */
    var m_ContextID = 'CNTXT' + application.getUUID().toString(); //Note: using alphabetical prefix to make the ID a valid JS identifier

    /**
     * @private
     * @type {Array<NavigationItem>}
     */
    var m_NavigationItems = [];

    /**
     * Gets the unique context ID.
     * @public
     * @return {String} The unique context ID.
     */
    this.getContextID = function() {
        return m_ContextID;
    }

    /**
     * @public
     * @return {Boolean}
     */
    this.hasNavigationItems = function() {
        return m_NavigationItems.length > 0;
    }
    /**
     * @public
     * @return {Number}
     */
    this.getNavigationItemsCount = function() {
        return m_NavigationItems.length;
    }
    /**
     * @public
     * @return {NavigationItem}
     */
    this.getLastNavigationItem = function() {
        if (m_NavigationItems.length > 0) {
            return m_NavigationItems[m_NavigationItems.length - 1];
        }
        return null;
    }
    /**
     * @param {NavigationItem} navItem
     */
    this.addNavigationItem = function(navItem) {
        if (!navItem) {
            throw new Error('Navigation item is not specified');
        }
        m_NavigationItems.push(navItem);
    }
    /**
     * @public
     * @return {NavigationItem}
     */
    this.removeLastNavigationItem = function() {
        if (m_NavigationItems.length > 0) {
            return m_NavigationItems.pop();
        }
        return null;
    }
    /**
     * @public
     * @return {Array<NavigationItem>}
     */
    this.getNavigationItems = function() {
        //return a copy of the internal array
        return [].concat(m_NavigationItems);
    }
    /**
     * @public
     * @return {String} one of the NavigationContextType enum values
     */
    this.getContextType = function() {
        return m_ContextType;
    }
}

/**
 * Initializes the module.
 * NOTE: This var must remain at the BOTTOM of the file.
 * @private
 * @SuppressWarnings (unused)
 *
 * @properties={typeid:35,uuid:"B4FFD835-3507-4D21-9C02-54EDD6A5E0B7",variableType:-4}
 */
var init = function() {
    setupNavigationItem();
}();