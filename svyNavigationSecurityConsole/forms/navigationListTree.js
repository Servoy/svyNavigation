/**
 * Called when the mouse is clicked on a row/cell (foundset and column indexes are given) or.
 * when the ENTER key is used then only the selected foundset index is given
 * Use the record to exactly match where the user clicked on
 *
 * @param {Number} foundsetindex
 * @param {Number} [columnindex]
 * @param {JSRecord} [record]
 * @param {JSEvent} [event]
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"FA6C9C55-5D0B-4816-95E1-50AF7824DAF6"}
 */
function onCellClick(foundsetindex, columnindex, record, event) {
	forms.navigationHome.show('navigationDetail')

}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"C813104E-6B59-4071-80EE-3EB93D533A85"}
 */
function onShow(firstShow, event) {
	
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"69C482A0-9A20-4181-851B-1D1CF0F00FCA"}
 */
function onLoad(event) {
	var query = datasources.mem.svy_navitem.createSelect();
	query.where.add(query.columns.parent_navitem_id.isNull);
	var fs = datasources.mem.svy_navitem.getFoundSet();
	fs.loadRecords(query)
	
	elements.dbtreeview.bindings = [{
		datasource: foundset.getDataSource(),
		nrelationname : 'svy_sec_console_navitem_to_navitem$children',
		textdataprovider: "display_name"
	}];
	elements.dbtreeview.addRoots(fs);
	elements.dbtreeview.refresh();
	
	//elements.dbtreeview.setCallBackInfo(databaseManager.getDataSource('example_data', 'orders'),callbackfunction,'orderid');
}
