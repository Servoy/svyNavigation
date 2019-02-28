
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"9A79F67C-34A4-41DB-8243-8DBE02434F74"}
 */
function onActionCreateNew(event) {
	forms.navigationHome.show('navigationNew')
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"6E0AD47B-7A57-43DD-BD82-A20BC3C20C74"}
 */
function onShow(firstShow, event) {
	scopes.svyNavigationSecurity.getSecureNavigationItems();
}
