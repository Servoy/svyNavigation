/**
 * @private 
 * @properties={typeid:35,uuid:"2E76E00A-CE02-4F03-B349-8037064B666A",variableType:-4}
 */
var m_Result = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"CA5F1EEA-0B81-4268-8438-4CFB12585E16"}
 */
function onActionL(event) {
    m_Result = 'L';
    scopes.svyNavigation.closeCurrentForm(scopes.svyNavigation.getFormInstanceContext(controller.getName()));
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"E173862C-206C-40D2-819B-2FD554301FBC"}
 */
function onActionR(event) {
    m_Result = 'R';
    scopes.svyNavigation.closeCurrentForm(scopes.svyNavigation.getFormInstanceContext(controller.getName()));
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"D1E41319-8855-4A50-B5E0-2E1A38D4B60B"}
 */
function onShow(firstShow, event) {
    m_Result = null;
}

/**
 * @public
 * @return {String}
 * @properties={typeid:24,uuid:"9CEADA3F-0239-4538-BDE2-7D3EAAB6DE3A"}
 */
function getResult(){
    return m_Result;
}