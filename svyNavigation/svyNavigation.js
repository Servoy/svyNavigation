/**
 * @public 
 * @enum 
 * @properties={typeid:35,uuid:"564021D4-081B-4FE5-8FE4-FF2585815D29",variableType:-4}
 */
var NAVIGATION_EVENT = {
	BEFORE_CLOSE: 'before-close',
	AFTER_OPEN: 'after-open'
};

/**
 * @private 
 * @type {Array<Function>}
 * @properties={typeid:35,uuid:"81D3643A-CACA-4109-9308-F219E9F2CDC0",variableType:-4}
 */
var listeners = [];


/**
 * @private 
 * @type {Array<NavigationItem>}
 * @properties={typeid:35,uuid:"C8BA50D6-E824-477C-A20E-601C2889D0B8",variableType:-4}
 */
var items = [];

/**
 * Opens the navigation item. 
 * If the item already exists in the stack, then all items after the specified item are closed
 * beforeClose event will be fired allowing a chance to rect or cancel
 * afterOpen will fire allowing UIs to update
 * 
 * @public 
 * @param {NavigationItem|String} itemOrID
 * @return {Boolean}
 * @properties={typeid:24,uuid:"1210FE48-6A94-40DD-9BF4-B843044EA1ED"}
 */
function open(itemOrID){
	
	// look for existing item in nav stack
	var id = itemOrID instanceof String ? itemOrID : itemOrID.getID();
	var navItem = itemOrID instanceof NavigationItem ? itemOrID : null;
	var index = items.length;
	for(var i = 0; i < items.length; i++){
		var item = items[i];
		
		// found item
		// TODO Copy /  update item if it already existed, allow for mutation ?
		if(item.getID() == id){
			index = i;
			navItem = item;
			break;
		}
	}
	
	// Item ID not found in stack
	if(!navItem){
		// TODO log warning
		return false;
	}
	
	// before event
	if(!beforeClose()){
		// TODO log warning
		return false;
	}
	
	// trim stack
	items = items.slice(0,index);
	
	// add item
	items.push(navItem);
	
	// after event
	afterOpen();
	
	return true;
}

/**
 * @private 
 * @param {NavigationItem|String} itemOrID
 * @return {Number}
 * @properties={typeid:24,uuid:"931CD229-352B-4840-A469-793A68A0EF64"}
 */
function indexOf(itemOrID){
	var id = itemOrID instanceof String ? itemOrID : itemOrID.getID();
	for (var i = 0; i < items.length; i++){
		var item = items[i];
		if(item.getID() == id){
			return i;
		}
	}
	return -1;
}

/**
 * Closes current navigation item and opens the previous item
 * @public 
 * @return {Boolean}
 * @properties={typeid:24,uuid:"2F17EE08-7E2D-4559-9C53-53D50612A8FB"}
 */
function close(){
	
	// get previous item
	var item = items[items.length - 2];
	
	// No previous item
	if(!item){
		// TODO log warning
		return false;
	}
	
	// open item
	return open(item);
}

/**
 * @public 
 * @param {NavigationItem} navigationItem
 * @return {Boolean}
 * @properties={typeid:24,uuid:"2E121717-BF41-45FB-A7A0-86C384EC2359"}
 */
function reset(navigationItem){
	
	// before event
	if(!beforeClose()){
		// TODO log warning
		return false;
	}
	
	// reset to item
	items = [navigationItem];
	
	// after event
	afterOpen();
	
	return true;
}

/**
 * @public 
 * @return {Array<NavigationItem>}
 * @properties={typeid:24,uuid:"37235352-825E-4881-8E35-78A52A467961"}
 */
function getNavigationItems(){
	var a = [];
	for(var i in items){
		a.push(items[i]);
	}
	return a;
}

/**
 * @public 
 * @param {String} id
 * @return {NavigationItem}
 * @properties={typeid:24,uuid:"73F69D5E-6708-4937-AE3D-ACBC5C620A89"}
 */
function getNavigationItem(id){
	// TODO consider making a map for performance improvement
	for(var i in items){
		var item = items[i];
		if(item.getID() == id){
			return item;
		}
	}
	return null;
}
/**
 * @public 
 * @return {NavigationItem}
 * @properties={typeid:24,uuid:"0BAAECA1-12F7-4EDF-B27B-12502A00F940"}
 */
function getCurrentItem(){
	return items[items.length-1];
}

/**
 * @public 
 * @param {NavigationItem|String} itemOrID
 * @return {Boolean}
 * @properties={typeid:24,uuid:"A9618AEE-8091-49D1-B838-EAC9CFDC7CCB"}
 */
function hasItem(itemOrID){
	return indexOf(itemOrID) >= 0;
}

/**
 * @public 
 * @param {Function} listener
 *
 * @properties={typeid:24,uuid:"04A23E5B-4EC6-4E24-BAB1-AA9CAF0A8169"}
 */
function addNavigationListener(listener){
	listeners.push(listener);
}
/**
 * @public 
 * @param {Function} listener
 *
 * @properties={typeid:24,uuid:"E5011D75-223B-40AA-A4A0-79C4A13CB464"}
 */
function removeNavigationListener(listener){
	
}

/**
 * @private 
 * @return {Boolean}
 * @properties={typeid:24,uuid:"914C25FC-8CA0-4B8E-B399-624FED29A6EC"}
 */
function beforeClose(){
	return fireEvent(NAVIGATION_EVENT.BEFORE_CLOSE,getCurrentItem());
}
/**
 * @private 
 * @properties={typeid:24,uuid:"6E9FD4C0-BD9C-4257-80F3-677953F8ACE6"}
 */
function afterOpen(){
	fireEvent(NAVIGATION_EVENT.AFTER_OPEN,getCurrentItem());
}

/**
 * @private 
 * @param {String} eventType
 * @param {NavigationItem} [item]
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"CFB73B7E-56EB-4FBD-B48F-F8BA4C312B0B"}
 */
function fireEvent(eventType, item){
	var event = new NavigationEvent(eventType,item);
	for(var i in listeners){
		/** @type {Function} */
		var listener = listeners[i];
		var result = listener.call(this,event);
		if(eventType == NAVIGATION_EVENT.BEFORE_CLOSE){
			if(result === false){
				return false;
			}
		}
	}
	return true;
}
/**
 * @constructor
 * @private 
 * @param {String} eventType
 * @param {NavigationItem} [item]
 * @properties={typeid:24,uuid:"B809ACA1-1541-4A8B-A0F7-0557C2034248"}
 */
function NavigationEvent(eventType, item){
	
	/**
	 * @public 
	 * @return {String}
	 */
	this.getEventType = function(){
		return eventType;
	}
	
	/**
	 * @public 
	 * @return {NavigationItem}
	 */
	this.getNavigationItem = function(){
		return item;
	}
}

/**
 * @constructor
 * @public  
 * @param {String} formName
 * @param {String} [text]
 * @param {String} [tooltipText]
 * @properties={typeid:24,uuid:"2280FA71-A862-4C29-943A-57DA126FFB0D"}
 */
function NavigationItem(formName, text, tooltipText) {
    if(!formName || !utils.stringTrim(formName)){
        throw new Error('Form name is not specified');
    }
    
    /**
     * @protected
     * @type {String}
     * @ignore
     */
    this.id = application.getUUID().toString();
    
    /**
     * @protected
     * @type {String}
     * @ignore
     */
    this.m_FormName = formName;
    /**
     * @protected
     * @type {String}
     * @ignore
     */
    this.m_Text = text ? text : formName;
    /**
     * @protected
     * @type {String}
     * @ignore
     */
    this.m_TooltipText = tooltipText ? tooltipText : this.m_Text;
    /**
     * @protected
     * @type {*}
     * @ignore
     */
    this.m_CustomData = null;
}

/**
 * Extends the NavigationItem prototype by adding the necessary methods.
 * Using this approach to minimize the memory footprint of the NavigationItem instances.
 * @private
 * @properties={typeid:24,uuid:"D50A8EE4-B680-4470-A1B1-1B21D2CA7285"}
 */
function setupNavigationItem() {
    /**
     * Gets the name of the form associated with this navigation item.
     * @public
     * @return {String}
     */
    NavigationItem.prototype.getFormName = function() {
        return this.m_FormName;
    };
    /**
     * Sets the name of the form associated with this navigation item.
     * @public
     * @param {String} formName
     */
    NavigationItem.prototype.setFormName = function(formName) {
        if (!formName || !utils.stringTrim(formName)) {
            throw new Error('FormName is not specified');
        }
        this.m_FormName = formName;
    };
    /**
     * @public
     * @return {String}
     */
    NavigationItem.prototype.getText = function() {
        return this.m_Text;
    };
    /**
     * @public
     * @param {String} text
     */
    NavigationItem.prototype.setText = function(text) {
        if (!text || !utils.stringTrim(text)) {
            throw new Error('Text is not specified');
        }
        this.m_Text = text;
    };
    /**
     * @public
     * @return {String}
     */
    NavigationItem.prototype.getTooltipText = function() {
        return this.m_TooltipText;
    };
    /**
     * @public
     * @return {String}
     */
    NavigationItem.prototype.getID = function() {
        return this.id;
    };
    /**
     * @public
     * @param {String} tooltipText
     */
    NavigationItem.prototype.setTooltipText = function(tooltipText) {
        this.m_TooltipText = tooltipText;
    };
    /**
     * @public
     * @return {*}
     */
    NavigationItem.prototype.getCustomData = function() {
        return this.m_CustomData;
    };
    /**
     * @public
     * @param {*} customData
     */
    NavigationItem.prototype.setCustomData = function(customData) {
        this.m_CustomData = customData;
    };
}

/**
 * Initializes the module.
 * NOTE: This var must remain at the BOTTOM of the file.
 * @private
 * @SuppressWarnings (unused)
 *
 * @properties={typeid:35,uuid:"73D3B2D7-093B-4C94-B13E-867D9923BE16",variableType:-4}
 */
var init = function() {
    setupNavigationItem();
}();