/**
 *
 *
 *
 * Get Navigation Items for the logged user.
 *
 * API to add/remove navigation items to Permissions.
 *
 * GetNavigationItems
 *
 * AddNavigationItems
 *
 * TODO force self-run of the module to enable security
 * TODO duplicate settins x tenant !?
 *
 * TODO i can cache the properties into an in-memory dataset, so i can query quickly the permissions i need
 * TODO whenever i enter/remove a permission from the cache i should update the cache
 *
 *
 * A) Create Menu Items
 * 	A1. As user i can create a MenuItem in the Form; A menuItem can be a Sidenav item or a Tabpanel Tab or a simple Label.
 * 	MenuItem will have an unique ID; the MenuItem may be a sub-menu item linked to a parentMenuItem; can be subMenuItem of sidenav or another element in a subform. Use NameSpace for it e.g. RootMenuItemID.SubMenuItemID.SubSubMenuItemID.
 * 	Optional: i may create MenuItem as metadata of the property value
 *  A2. As user i can create the MenuItem record in DB
 *  I will insert the unique ID.
 *
 **/

/**
 * @private
 * @type {String}
 *
 * @properties={typeid:35,uuid:"9ED09586-F4A1-4EF7-9011-26BB11FD0683"}
 */
var SVY_NAVIGATION_SECURITY_VERSION = "1.0.0";

/**
 * Enumeration for navigation policy options which control how to update the stack of navigation item when an item is opened or closed.
 * @public
 * @enum
 * @properties={typeid:35,uuid:"20C0B9A0-EA61-42A2-8775-91F1A9426423",variableType:-4}
 */
var NAMESPACE_POLICY = {
	/**
	 * Include the active solutionName in the Navigation Item namespace
	 * It allow to create multiple menu's for multiple solution
	 * This is the Default policy
	 */
	INCLUDE_SOLUTION_NAME: 'include_solution_name',

	/**
	 * Do not include the active solutionName in the Navigation Item namespace
	 * Use this policy if you wish to use the same navigation items within different solutions
	 */
	NO_SOLUTION_NAME: 'no_solution_name'
};

/**
 * @private
 * @type {String}
 *
 * @properties={typeid:35,uuid:"96B5A926-33EF-44B7-B06C-5AB635F6D9CA"}
 */
var PROPERTY_TYPE_NAVITEM = 'navigationitem';

/**
 * @type {String}
 * @private
 * @properties={typeid:35,uuid:"6B4ACA91-BF78-48F8-B0B7-CB553814B867"}
 */
var activeSolutionName = application.getSolutionName();

/**
 * @private
 * @properties={typeid:35,uuid:"6D48DF3D-C02A-485A-B0BF-1B5A282B0E78",variableType:-4}
 */
var log = scopes.svyLogManager.getLogger('com.servoy.svynavigationsecurity');

/**
 * @private 
 * @properties={typeid:35,uuid:"F40D4F7F-7BB8-4750-98C2-9F5073F7EADC",variableType:-4}
 */
var loadedInMemory = false;

/**
 * Set the navigation security policies
 * @type {NavigationSecurityPolicies}
 * @private
 * @properties={typeid:35,uuid:"114EAD1B-EE58-4332-9854-BED71AABDB09",variableType:-4}
 */
var navigationSecurityPolicies = createNavigationSecurityPolicies();

/**
 * Internal constructor. To create a new instance of the NavigationPolicies class use the method {@link createNavigationPolicies}.
 * @classdesc This class encapsulates the various supported navigation policies.
 * @protected
 * @constructor
 * @properties={typeid:24,uuid:"D2EB14A9-4230-410A-BE65-ED0FCD9AEEDA"}
 */
function NavigationSecurityPolicies() {

	/**
	 * @protected
	 * @type {String}
	 * @ignore
	 */
	this.namespacePolicy = NAMESPACE_POLICY.INCLUDE_SOLUTION_NAME;

	/**
	 * Sets the namespace policy
	 * @public
	 * @param {String} policy options which control how to update the stack of navigation item when an item is opened or closed. Must be one of the {@link NAVIGATION_POLICY} enumeration options.
	 * @return {NavigationSecurityPolicies} This NavigationPolicies instance for call-chaining support.
	 */
	this.setNamespacePolicy = function(policy) {
		this.namespacePolicy = policy;
		return this;
	}

	/**
	 * Gets the current namespace policy
	 * @public
	 * @return {String} The current open existing item policy as one of the {@link NAMESPACE_POLICY} enumeration options.
	 */
	this.getNamespacePolicy = function() {
		return this.namespacePolicy;
	}
}

/**
 * Factory method for creating {@link NavigationSecurityPolicies} objects.
 * @public
 * @return {NavigationSecurityPolicies} The created {@link NavigationSecurityPolicies} object.
 *
 * @properties={typeid:24,uuid:"2C85A664-1F32-41B0-BAC9-9BF0950E5C3E"}
 */
function createNavigationSecurityPolicies() {
	return new NavigationSecurityPolicies();
}

/**
 * Set the active solutionName to be included in the namespace when using NAMESPACE_POLICY.INCLUDE_SOLUTION_NAME.
 * Use this function when you are using a different solution than your main solution to manage SecureNavigationItems
 *
 * @param {String} solName
 * @public
 *
 * @properties={typeid:24,uuid:"B2EEAF54-FECB-4CC6-ABF4-9FC4F075CEBD"}
 */
function setSolutionName(solName) {
	// TODO shall i create a warning if solution name was already set ?
	activeSolutionName = solName;
}

/**
 * @private
 * @param {scopes.svyNavigation.NavigationEvent} event
 *
 * @properties={typeid:24,uuid:"B6FD88B3-C4C5-442B-8598-342B02253003"}
 */
function onOpen(event) {
	var type = event.getEventType();
	var item = event.getNavigationItem();

	if (type == scopes.svyNavigation.NAVIGATION_EVENT.AFTER_OPEN) {
		// TODO check if user has permission to nav item
	}
	return true;
}

/**
 * @private 
 * @properties={typeid:24,uuid:"5509C7B7-FED6-45D4-8D86-C8C6E3EAFDC3"}
 */
function loadSecureNavigationItems() {
	var query = datasources.db.svy_security.svy_properties.createSelect();
	query.result.clear();
	// TODO i need to resolve the UUIDs
	query.result.add(query.columns.property_uuid);			// 0 uuid
	//query.result.add(null, 'navitem_id');					// 1 navitem_id
	//query.result.add(null, 'parent_navitem_id');			// 2 parent_navitem_id
	query.result.add(query.columns.property_namespace);		// 3
	query.result.add(query.columns.property_value);			// 4
	query.result.add(query.columns.display_name);			// 5
	query.result.add(query.columns.tenant_name);			// 6
	query.result.add(query.columns.user_name);				// 7
	//query.result.add(null, 'solution_name');				// 8 solution_name
	
	// filter by navitems
	query.where.add(query.columns.property_type.eq(PROPERTY_TYPE_NAVITEM));

	// set navitemID, parentNavitemID, solutionName
	var dataset = databaseManager.getDataSetByQuery(query, true, -1);
	dataset.addColumn('navitem_id',2,JSColumn.TEXT);
	dataset.addColumn('parent_navitem_id',3,JSColumn.TEXT);
	dataset.addColumn('solution_name',9,JSColumn.TEXT);

	for (var i = 1; i <= dataset.getMaxRowIndex(); i++) {
		var row = dataset.getRowAsArray(i);

		/** @type {String} */
		var namespace = row[3];
		var namespaces = namespace.split(".");
		var itemNavID = namespaces[namespaces.length - 1];
		if (namespaces.length > 1) {

			var itemParentID = null;
			// TODO can i just rely on the global property !? How do i know if a menu item stored in DB includes the solutionName or not in it's namespace !?
			if (navigationSecurityPolicies.getNamespacePolicy() === NAMESPACE_POLICY.INCLUDE_SOLUTION_NAME) {
				var itemSolName = namespaces[0];

				// get the parent navitemid
				if (namespaces.length > 2) {
					itemParentID = namespaces[namespaces.length - 2];
				}

				// set the solutionName
				dataset.setValue(i, 9, itemSolName);
			} else {
				itemParentID = namespaces[namespaces.length - 1];
			}

			// TODO shall i check if the parent_nav_item ID exists !?
			// set the parent navItemID
			dataset.setValue(i, 3, itemParentID);
		}
		// set the navItemID
		dataset.setValue(i, 2, itemNavID);
		
		// if no display name use the navItemID
		if (!dataset.getValue(i, 6)) {
			dataset.setValue(i, 6, itemNavID);
		}
	}
	
	dataset.createDataSource('svy_navitem');
	
	loadedInMemory = true;
}

/**
 * Gets all users in the system.
 * @public
 * @return {Array<SecureNavigationItem>} An array with all users or an empty array if no users are defined.
 *
 * @properties={typeid:24,uuid:"7F118D2D-65EC-4303-A7BD-A7E3E739EDDD"}
 */
function getSecureNavigationItems() {
	//loadSecureNavigationItems();
	
    var secureNavItems = [];
    var fs = datasources.mem.svy_navitem.getFoundSet();
    fs.sort('display_name asc')
    fs.loadAllRecords();
    for (var i = 1; i <= fs.getSize(); i++) {
        var record = fs.getRecord(i);
        secureNavItems.push(new SecureNavigationItem(record));
    }
    return secureNavItems;
}

/**
 * @public 
 * @param {String} navItemID
 * @return {SecureNavigationItem}
 *
 * @properties={typeid:24,uuid:"C1F947F6-85AB-46C9-A660-B3218E497545"}
 */
function getSecureNavigationItem(navItemID) {
	
	// TODO shall navitem_id be unique !?
	var queryArgs = ['navitem_id'];
	var queryValues = [navItemID]
	
	if (navigationSecurityPolicies.getNamespacePolicy() === NAMESPACE_POLICY.INCLUDE_SOLUTION_NAME) {
		queryArgs.push('solution_name');
		queryValues.push(activeSolutionName)
	}
	
	/** @type {JSFoundSet<mem:svy_navitem>} */
	var fs = scopes.svyDataUtils.getFoundSetWithExactValues(datasources.mem.svy_navitem.getDataSource(), queryArgs, queryValues);
    if (fs.getSize() === 1) {
        var record = fs.getRecord(1)
		return new SecureNavigationItem(record);
    } else if (fs.getSize() > 1) {
    	throw "Found multiple nav items with the same ID";
    }
    return null;
}

/**
 * Create a MenuItem in DB
 *
 * @param {String} navItemID unique ID for the navItem. Note navItemID should not contain '.';
 * @param {String} formName
 * @param {String} [parentNavItemID]
 * @param {String} [nameSpacePrefix] optional prefix to be added in the namespace.
 * 
 * @return {SecureNavigationItem}
 * @public
 *
 * @properties={typeid:24,uuid:"1F4EF648-433B-4D6C-908D-D194E7774DB7"}
 */
function createSecureNavigationItem(navItemID, formName, parentNavItemID, nameSpacePrefix) {

	// TODO use <tags> to classify type of elements, allow a better parsing.
	// e.g. <sol:sampleSolution>.<pre:prefix>.parentid.navitemid
	// or   <sol:sampleSolution><pre:prefix><pid:parentid><id:navitemid>
	
	// TODO parse input <: > are not valid chars. Ends up into a complex parser...
	// TODO can query it quick enough !?
	
	if (!navItemID) {
		throw new Error('NavItemID cannot be null or empty');
	}
	if (navItemID.indexOf('.') > -1) {
		throw new Error('NavItemID cannot contain \'.\'');
	}

	var solutionName = null;
	var propertyNameSpace = '';

	// include solutionName in property namespace
	if (navigationSecurityPolicies.getNamespacePolicy() === NAMESPACE_POLICY.INCLUDE_SOLUTION_NAME) {
		solutionName = activeSolutionName;
		propertyNameSpace = activeSolutionName;
	}
	
	// TODO should appear before solutionName !? should maybe use the prefix as solutionName !?
	if (nameSpacePrefix) {
		propertyNameSpace += nameSpacePrefix;
	}

	if (parentNavItemID) {
		// TODO i should get the full parent namespace, not only the ID
		propertyNameSpace += '.' + parentNavItemID + '.' + navItemID;
	} else {
		propertyNameSpace += '.' + navItemID;
	}

	// TODO shall i allow to set the tenant name ? Would allow to create a different menu per tenant, but would it make sense !?
	// TODO shall i allow to provide a navItemDescription as JSON or JSONString !? I rather refer to the actual form
	// TODO i should make sure that namespace is unique
	//var property = scopes.svyProperties.createProperty(propertyNameSpace, null, PROPERTY_TYPE_NAVITEM);

	var fs = datasources.mem.svy_navitem.getFoundSet();

	// Check if value is unique values
	var fsExists = scopes.svyDataUtils.getFoundSetWithExactValues(fs.getDataSource(), ["property_namespace", "navitem_id", "solution_name"], [propertyNameSpace, navItemID, solutionName]);
	if (fsExists.getSize()) {
		// return the exception here !?
		throw new scopes.svyDataUtils.ValueNotUniqueException("There is already a secureNavigationItem with the given values", fsExists);
	}

	// create the property
	// TODO shall i move this code in the foundset event of the in-mem table svy-navitem !?
	var property = scopes.svyProperties.createProperty(propertyNameSpace, formName, PROPERTY_TYPE_NAVITEM);
	if (!property) {
		return null;
	}

	// create the in-mem record
	var rec = fs.getRecord(fs.newRecord(false, false));

	// overrule the UUID using the same UUID of the saved property
	rec.property_uuid = property.getPropertyUUID();
	rec.navitem_id = navItemID;
	rec.parent_navitem_id = parentNavItemID;
	rec.property_namespace = propertyNameSpace;

	// solution name set when POLICY include the solutionName
	rec.solution_name = solutionName;

	// usually menuItem are created globally, there is no need to set a tenant
	

	// TODO can it be more generic than a formName !?
	rec.property_value = formName;

	// Intentionally skip
	rec.tenant_name;
	rec.user_name;

	saveRecord(rec);
	var navItem = new SecureNavigationItem(rec);
	return navItem;
}

// TODO shall i extend NavigationItem or !?

/**
 * @constructor
 * @param {JSRecord<mem:svy_navitem>} record
 *
 * @extends {scopes.svyNavigation.NavigationItem}
 * @private
 * @properties={typeid:24,uuid:"8A6FF330-552F-466F-9D52-6014A4E2161A"}
 */
function SecureNavigationItem(record) {

	/**
	 * @protected
	 * @type {JSRecord<mem:svy_navitem>}
	 */
	this.record = record;

	// TODO currently it assumes value is a string, shall it be more generic, what then !?
	var formName = this.getValue();
	scopes.svyNavigation.NavigationItem.call(this, formName, record.display_name);
	
	
    /**
     * Gets the display name for this navigation item.
     *
     * @public
     * @return {String} The property value of this property. Can be null if a display name is not set.
     */
    this.getDisplayName = function() {
        return record.display_name;
    }
    
    /**
     * Sets the display name
     *
     * @public
     * @return {SecureNavigationItem} The property uuid of this property.
     */
    this.setDisplayName = function(displayName) {
//    	if (!textLengthIsValid(displayName, MAX_DISPLAYNAME_LENGTH)) {
//    		throw new Error(utils.stringFormat('DisplayName must be between 1 and %1$s characters long.', [MAX_DISPLAYNAME_LENGTH]));
//    	}
        record.display_name = displayName;
        saveRecord(record);
        return this;
    }
	
}

/**
 * @constructor
 * @private
 * @properties={typeid:24,uuid:"0B42C1A5-03D2-4AD9-9D0F-8BBD1B5FFFFF"}
 */
function setupSecureNavigationItem() {

	// Extend
	SecureNavigationItem.prototype = Object.create(scopes.svyNavigation.NavigationItem.prototype);
	SecureNavigationItem.prototype.constructor = SecureNavigationItem;

	/**
	 * @public
	 * @return {String}
	 */
	SecureNavigationItem.prototype.getMenuItemID = function() {
		/** @type {JSRecord<mem:svy_navitem>} */
		var record = this['record'];
		return record.navitem_id;
	};

	/**
	 * @public
	 * @return {String}
	 */
	SecureNavigationItem.prototype.getParentMenuItemID = function() {
		/** @type {JSRecord<mem:svy_navitem>} */
		var record = this['record'];
		return record.parent_navitem_id;
	};

	/**
	 * @public
	 * @return {*}
	 */
	SecureNavigationItem.prototype.getValue = function() {
		/** @type {JSRecord<mem:svy_navitem>} */
		var record = this['record'];
		return record.property_value;
	};

	/**
	 * TODO shall i accept a JSON and stringify it !?
	 * @param {String} value
	 * @public
	 * @return {Boolean}
	 */
	SecureNavigationItem.prototype.setValue = function(value) {
		// TODO i should check the length

		/** @type {JSRecord<mem:svy_navitem>} */
		var record = this['record'];
		record.property_value = value;
		return saveRecord(record)
	};
	
	
	  /**
     * Grants the specified permission to this navigation item.
     * Any users that are members of this role will be granted the permission.
     *
     * @public
     * @param {scopes.svySecurity.Permission|String} permission The permission object or name of permission to add.
     * @return {SecureNavigationItem} This navigation item for call-chaining support.
     */
	SecureNavigationItem.prototype.addPermission = function(permission) {

        if (!permission) {
            throw 'Permission cannot be null';
        }
        
        if (permission instanceof String) {
            /**
             * @type {String}
             * @private
             */
            var permissionName = permission instanceof String ? permission : permission.getName();
            permission = scopes.svySecurity.getPermission(permissionName);
            if (!permission) {
                throw 'Permission "' + permissionName + '" does not exist in system';
            }
        }
        
		/** @type {JSRecord<mem:svy_navitem>} */
		var record = this['record'];        
        permission.addProperty(record.property_uuid);
        return this;
    }

    /**
     * Gets all the permissions granted to this navitem.
     *
     * @public
     * @return {Array<scopes.svySecurity.Permission>} An array with all permissions granted to this navitem or an empty array if no permissions are granted.
     */
    SecureNavigationItem.prototype.getPermissions = function() {
		var property = getSecureProperty(this);
		return property.getPermissions();
    }

    /**
     * Checks if the specified permission is granted to this navigation item.
     *
     * @public
     * @param {scopes.svySecurity.Permission|String} permission The permission object or name of permission to check.
     * @return {Boolean} True if the specified permission is granted to this navigation item.
     */
    SecureNavigationItem.prototype.hasPermission = function(permission) {
        if (!permission) {
            throw 'Permission cannot be null';
        }
		var property = getSecureProperty(this);
        return property.hasPermission(permission);
    }

    /**
     * Removes the specified permission from this navigation item.
     *
     * @public
     * @param {scopes.svySecurity.Permission|String} permission The permission object or name of permission to remove.
     * @return {SecureNavigationItem} This navigation item for call-chaining support.
     */
    SecureNavigationItem.prototype.removePermission = function(permission) {
        if (!permission) {
            throw 'Permission cannot be null';
        }
        var property = getSecureProperty(this);
        property.removePermission(permission);
        return this;
    }
    
    
    /**
     * Checks if the logged user is granted permission to this navigation item
     *
     * @public
     * @return {Boolean} True if the specified user is granted permission to this navigation item.
     */
    SecureNavigationItem.prototype.userHasPermission = function() {
    	
    	var user = scopes.svySecurity.getUser();
    	if (!user) {
            throw 'Logged user cannot be null';
    	}
    	
    	// TODO can i improve such API !?
    	var permissions = this.getPermissions();
    	for (var i = 0; i < permissions.length; i++) {
    		if (user.hasPermission(permissions[i])) {
    			return true;
    		}
    	}
    	
    	return false;
    }    
	
    /**
     * @param {SecureNavigationItem} secureNavItem 
     * @private */
    function getSecureProperty(secureNavItem) {
		/** @type {JSRecord<mem:svy_navitem>} */
		var record = secureNavItem['record'];
		var property = scopes.svySecurity.getSecureProperty(record.property_uuid);
		if (!property) {
			throw 'Navitem "' + record.property_uuid + '" does not exist in system';
		}
		return property;
    }
}


/**
 * Immediately and permanently deletes the specified property.
 * @note USE WITH CAUTION! There is no undo for this operation.
 *
 * @public
 * @param {SecureNavigationItem|UUID|String} item The secure navitem object or the UUID (UUID or UUID as String) of the property to delete.
 * @return {Boolean} False if property could not be deleted.
 * @properties={typeid:24,uuid:"2D517D1F-11F7-4C1A-B350-9F9869288A36"}
 * @AllowToRunInFind
 */
function deleteSecureNavigationItem(item) {
	
    if (!item) {
        throw 'Property cannot be null';
    }
    
    var itemUUID;
    if (item instanceof String) {
        itemUUID = item

    }
    if (item instanceof UUID) {
        itemUUID = item.toString();
    }

    // get foundset
    var fs = datasources.mem.svy_navitem.getFoundSet();
    var qry = datasources.mem.svy_navitem.createSelect();
    qry.where.add(qry.columns.property_uuid.eq(itemUUID));
    fs.loadRecords(qry);

    if (fs.getSize() == 0) {
        log.error('Could not delete tenant. Could not find property {}.', itemUUID);
        return false;
    }

    try {
        deleteRecord(fs.getRecord(1));
        return true;
    } catch (e) {
    	log.error(utils.stringFormat('Could not delete tenant %1$. Unkown error: %2$. Check log.', [itemUUID, e.message]));
        throw e;
    }
}

/**
 * Returns the tenantName for the active session
 * @private
 * @return {String}
 * @properties={typeid:24,uuid:"309E61AE-BE9E-4EE9-949E-099657D168AC"}
 */
function getTenantName() {
	if (scopes.svySecurity) {
		var session = scopes.svySecurity.getSession();
		if (session) {
			return getTenantName();
		}
	}
	return null;
}

/**
 * Returns the userName for the active session
 * @private
 * @return {String}
 * @properties={typeid:24,uuid:"08B7BBE3-9C14-40D5-80F1-5A49292DEE67"}
 */
function getUserName() {
	if (scopes.svySecurity) {
		var session = scopes.svySecurity.getSession();
		if (session) {
			return getTenantName();
		}
	}
	return null;
}

/**
 * Gets the version of this module
 * @public
 * @return {String} the version of the module using the format Major.Minor.Revision
 * @properties={typeid:24,uuid:"0418D804-74FA-4BDF-9B19-DBB1F977B5E9"}
 */
function getVersion() {
	return SVY_NAVIGATION_SECURITY_VERSION;
}

/**
 * Utility to save record with error thrown
 * @private
 * @param {JSRecord} record
 *
 * @properties={typeid:24,uuid:"2B3D0459-F022-467C-9516-698578AB0A2A"}
 */
function saveRecord(record) {

	// Transactions on in-mem DB only will always be local
	var startedLocalTransaction = true;
	//log.debug('Starting internal database transaction.');
	//databaseManager.startTransaction();

	try {
		if (!databaseManager.saveData(record)) {
			throw new Error('Failed to save record ' + record.exception);
		}
//		if (startedLocalTransaction) {
//			log.debug('Committing internal database transaction.');
//			if (!databaseManager.commitTransaction(true, true)) {
//				throw new Error('Failed to commit database transaction.');
//			}
//		}
	} catch (e) {
		log.error('Record could not be saved due to the following: "{}" Rolling back database transaction.', e.message);
//		databaseManager.rollbackTransaction();
		record.revertChanges();
		throw e;
	}
}

/**
 * Utility to delete record with errors thrown
 * @private
 * @param {JSRecord} record
 *
 * @properties={typeid:24,uuid:"A45023E3-BADE-4398-9EF5-1686613D31AF"}
 */
function deleteRecord(record) {

	// Transactions on in-mem DB only will always be local
//	var startedLocalTransaction = true;
//	log.debug('Starting internal database transaction.');
//	databaseManager.startTransaction();

	try {
		if (!record.foundset.deleteRecord(record)) {
			throw new Error('Failed to delete record.');
		}
//		if (startedLocalTransaction) {
//			log.debug('Committing internal database transaction.');
//			if (!databaseManager.commitTransaction(true, true)) {
//				throw new Error('Failed to commit database transaction.');
//			}
//		}
	} catch (e) {
		log.error('Record could not be deleted due to the following: {} Rolling back database transaction.', e.message);
//		databaseManager.rollbackTransaction();
		throw e;
	}
}

/**
 * Initializes the module.
 * NOTE: This var must remain at the BOTTOM of the file.
 * @private
 * @SuppressWarnings (unused)
 *
 * @properties={typeid:35,uuid:"3F442C54-1714-4BEE-90E8-68701BEB1EE4",variableType:-4}
 */
var init = function() {

	// TODO how can i force this module to self execute it-self !?
	scopes.svyNavigation.addNavigationListener(onOpen)

	setupSecureNavigationItem();
	
	// load items in memory
	loadSecureNavigationItems();
}();

