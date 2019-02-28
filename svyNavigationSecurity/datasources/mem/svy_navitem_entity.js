
/**
 * Record pre-update trigger.
 * Validate the record to be updated.
 * When false is returned the record will not be updated in the database.
 * When an exception is thrown the record will also not be updated in the database but it will be added to databaseManager.getFailedRecords(),
 * the thrown exception can be retrieved via record.exception.getValue().
 *
 * @param {JSRecord<mem:svy_navitem>} record record that will be updated
 *
 * @return {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"C56F8BC0-36D9-4FFC-90FB-8266CEC31A78"}
 */
function onRecordUpdate(record) {
	var not_valid = false;
	var property = scopes.svyProperties.getProperty(record.property_uuid);
	if (property) {
		
		var dataset = record.getChangedData();
		for (var i = 1; i <= dataset.getMaxRowIndex(); i++) {
			var row = dataset.getRowAsArray(i);
			var dataprovider = row[0];
			var newValue = row[2];
			
			// it can change also displayValue and eventually formValue !?
			switch (dataprovider) {
			case 'display_name':
				property.setDisplayName(newValue);
				break;
			case 'property_value':
				property.setPropertyValue(record.property_value);
				break;
			default:
				throw 'Property ' + dataprovider + ' of navitem ' + record.property_uuid + ' cannot be changed';
				break;
			}
		}		
	} else {
		not_valid = true;
	}
	
	// throw exception to pass info to handler, will be returned in record.exception.getValue() when record.exception is a DataException
	if (not_valid) throw 'cannot delete nav item ' + record.property_uuid;

	return true;
}

/**
 * Record pre-delete trigger.
 * Validate the record to be deleted.
 * When false is returned the record will not be deleted in the database.
 * When an exception is thrown the record will also not be deleted in the database but it will be added to databaseManager.getFailedRecords(),
 * the thrown exception can be retrieved via record.exception.getValue().
 *
 * @param {JSRecord<mem:svy_navitem>} record record that will be deleted
 *
 * @return {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"93994311-2121-4F20-9556-328C94943960"}
 */
function onRecordDelete(record) {
	
	var not_valid = false;
	var property = scopes.svyProperties.getProperty(record.property_uuid);
	if (property) {
		not_valid = !scopes.svyProperties.deleteProperty(property);
	} else {
		not_valid = true;
	}

	// throw exception to pass info to handler, will be returned in record.exception.getValue() when record.exception is a DataException
	if (not_valid) throw 'cannot delete nav item ' + record.property_uuid;

	// return boolean to indicate success
	return true
}
