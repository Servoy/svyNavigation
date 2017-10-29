/**
 * Expects <b>block</b> to throw an <b>error</b>
 * @public
 * @param {Function} block is usually a function expression that wraps a code to be tested
 * @param {Array<*>} [argsArr]
 * @param {String} [expectedErrMsg]
 * @param {String} [message] the message to use if the assertion fails
 *
 * @properties={typeid:24,uuid:"D4257899-61DD-4023-B4FF-769D4E3B0FFF"}
 */
function assertThrows(block, argsArr, expectedErrMsg, message) {
    try {
        if (argsArr) {
            block.apply(this, argsArr);
        } else {
            block(); // executes block
        }
    } catch (e) {
        if (expectedErrMsg) {

            if (expectedErrMsg == e.message) {
                // Means that the expected and the thrown error messages are the same
                return;
            }
            
            jsunit.fail(utils.stringFormat('%1$s - Expected error [%2$s]. Actual error [%3$s].', [message, expectedErrMsg, e.message]));
        }

        //means an error is thrown as expected
        return;
    }

    jsunit.fail(utils.stringFormat('%1$s - Error is not thrown.', [message]));
}

/**
 * Substitutes functions implementation for the time when the block is executed.
 * Replaces back the original functions when the block finishes.
 * @public
 * @param {Array<FunctionDescriptor>} functions functions description
 * @param {Function} block block code to execute with substituted function.
 * @param {Array<*>} [blockArgs]
 *
 * @properties={typeid:24,uuid:"5D7608B3-DE8B-4250-A450-B0E41853F196"}
 */
function substituteFunctionImplementation(functions, block, blockArgs) {
    for (var i = 0; i < functions.length; i++) {
        var descriptor = functions[i];
        descriptor.object[descriptor.originalFunctionName] = descriptor.functionToUse;
    }
    try {
        blockArgs = blockArgs || [];
        block(blockArgs);
    } finally {
        for (i = 0; i < functions.length; i++) {
            descriptor = functions[i];
            descriptor.object[descriptor.originalFunctionName] = descriptor.originalFunction;
        }
    }
}

/**
 * Used with substituteFunctionImplementation
 * @constructor
 * @public
 * @param object Object containing the original function.
 * @param {String} originalFunctionName
 * @param {Function} originalFunction
 * @param {Function} functionToUse function to replace with
 *
 * @properties={typeid:24,uuid:"386DEBC7-30E1-46E3-832C-1F7907ED7409"}
 */
function FunctionDescriptor(object, originalFunctionName, originalFunction, functionToUse) {
    this.object = object;
    this.originalFunction = originalFunction;
    this.functionToUse = functionToUse;
    this.originalFunctionName = originalFunctionName;
}

/**
 * @constructor
 * @public
 *
 * @properties={typeid:24,uuid:"7D1558A5-EB06-44EF-A01C-121FE6B3B586"}
 */
function MockupNavigationHandler() {
    var m_CallLog = [];
    var m_ReturnResult = true;
    var m_ThrowError = false;
    /**
     * @public
     */
    this.resetTestState = function(){
        m_CallLog = [];
        m_ReturnResult = true;
        m_ThrowError = false;
    }
    /**
     * @public
     * @return {Array<{methodName: String, args: Array}>}
     */
    this.getCallLog = function(){
        return [].concat(m_CallLog);
    }
    /**
     * @public
     * @param {scopes.svyNavigationModel.NavigationItem} navigationItem
     * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
     * @param {scopes.svyNavigationController.NavigationController} navigationController
     * @throws {Error} If the form could not be opened.
     */
    this.openFormInApplication = function(navigationItem, navigationContext, navigationController) {
        m_CallLog.push({ methodName: 'openFormInApplication', args: [navigationItem, navigationContext, navigationController] });
        if (m_ThrowError) {
            throw new Error('unit test error');
        }
    }
    /**
     * @public
     * @param {scopes.svyNavigationModel.NavigationItem} navigationItem
     * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
     * @param {scopes.svyNavigationController.NavigationController} navigationController
     * @throws {Error} If the form could not be opened.
     */
    this.openFormInDialog = function(navigationItem, navigationContext, navigationController) {
        m_CallLog.push({ methodName: 'openFormInDialog', args: [navigationItem, navigationContext, navigationController] });
        if (m_ThrowError) {
            throw new Error('unit test error');
        }
    }
    /**
     * @public
     * @param {scopes.svyNavigationModel.NavigationItem} navigationItem
     * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
     * @param {scopes.svyNavigationController.NavigationController} navigationController
     * @throws {Error} If the form could not be opened.
     */
    this.openFormInModalDialog = function(navigationItem, navigationContext, navigationController) {
        m_CallLog.push({ methodName: 'openFormInModalDialog', args: [navigationItem, navigationContext, navigationController] });
        if (m_ThrowError) {
            throw new Error('unit test error');
        }
    }

    /**
     * Closes the current/active form which is loaded in the specified context.
     * @public
     * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
     * @return {Boolean}
     */
    this.closeCurrentForm = function(navigationContext) {
        m_CallLog.push({ methodName: 'closeCurrentForm', args: [navigationContext] });
        if (m_ThrowError) {
            throw new Error('unit test error');
        }
        return m_ReturnResult;
    }

    /**
     * Closes the specified context along with all forms currently opened in it.
     * @public
     * @param {scopes.svyNavigationModel.NavigationContext} navigationContext
     * @return {Boolean}
     */
    this.closeContext = function(navigationContext) {
        m_CallLog.push({ methodName: 'closeContext', args: [navigationContext] });
        if (m_ThrowError) {
            throw new Error('unit test error');
        }
        return m_ReturnResult;
    }
}