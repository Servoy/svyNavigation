/**
 * @protected  
 * @enum 
 * @properties={typeid:35,uuid:"6DD3A365-FA98-4478-BF8D-1E99AAD08D4B",variableType:-4}
 */
var NAVIGATION_EVENT = {
	GLOBAL_SEARCH: 'global-search'
};

/**
 * @param {Function} listener
 * @public
 *
 * @properties={typeid:24,uuid:"942B4700-9824-401D-B648-13577CAD641A"}
 */
function addGlobalSearchListener(listener) {
	scopes.svyEventManager.addListener(NAVIGATION_EVENT.GLOBAL_SEARCH, NAVIGATION_EVENT.GLOBAL_SEARCH, listener);
}


/**
 * @param {Function} listener
 * @public 
 *
 * @properties={typeid:24,uuid:"88C787BF-C39C-43C7-B3FD-810CDC58E8A1"}
 */
function removeGlobalSearchListener(listener) {
	scopes.svyEventManager.removeListener(NAVIGATION_EVENT.GLOBAL_SEARCH, NAVIGATION_EVENT.GLOBAL_SEARCH, listener);
}

/**
 * @public
 * @param {String} searchText
 *
 * @properties={typeid:24,uuid:"48780730-F4A6-4E1C-AA35-E6944AE6F4DC"}
 */
function triggerGlobalSearch(searchText) {
	scopes.svyEventManager.fireEvent(NAVIGATION_EVENT.GLOBAL_SEARCH, NAVIGATION_EVENT.GLOBAL_SEARCH, searchText);
}
