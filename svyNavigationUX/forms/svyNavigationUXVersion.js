/**
 * @override
 * @properties={typeid:24,uuid:"F5FF8EDB-06C2-4559-87AF-A7B6CBDF0524"}
 */
function getId() {
	return 'com.servoy.bap.navigation.ux';
}

/**
 * @override
 * @properties={typeid:24,uuid:"3F56B20F-BB2F-43BC-95FF-5AD5560AD751"}
 */
function getVersion() {
	return '1.0.0';
}

/**
 * @properties={typeid:24,uuid:"E816041A-73AA-4C13-BDE3-735B37FC61C2"}
 * @override
 */
function getDependencies() {
	return [{id: "com.servoy.bap.utils", minVersion: "1.4.0"},
			{id: "com.servoy.bap.navigation", minVersion: "1.0.0"}]
}