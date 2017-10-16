
/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"A651F23C-0DC0-46F9-A2F5-1888739FA60A"}
 */
function onShow(firstShow, event) {
    elements.lblInstanceId.text = controller.getName();
}
