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
 * @properties={typeid:24,uuid:"9CD1403B-EE1A-4557-8DE1-CCC6C5DF4EB1"}
 */
function onCellClick(foundsetindex, columnindex, record, event) {
	forms.navigationHome.show('navigationDetail')

}
