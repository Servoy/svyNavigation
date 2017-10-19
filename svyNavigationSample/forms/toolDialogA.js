
/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"839C2984-0D2B-4380-9877-314CAD796CCB"}
 */
function onShow(firstShow, event) {
    elements.lblInstanceId.text = 'Instance form name: ' + controller.getName();
}
