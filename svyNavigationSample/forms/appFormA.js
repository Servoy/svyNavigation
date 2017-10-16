
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
    elements.lblInstnaceID.text = controller.getName();
}
