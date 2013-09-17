/**
 * @author Robert Chatfield, Josh Newman
 * Jotix
 * app.js
 */

/**
 * BUILD WINDOW STUFF
 *
 *  >> MAIN CONTAINER
 *     > NAVGROUP
 *       > JOTIXTABLE
 *
 *  >> SETTINGS CONTAINER
 *     > ...STUFF
 */


/**
 * SETTINGS INCLUDES
 */
var Settings = require('model/settings');
Ti.include("ui/settings/settingsMainView.js");
Ti.include("ui/settings/settingsMainController.js");
Ti.include("ui/settings/settingsSoundView.js");
Ti.include("ui/settings/settingsSoundController.js");
Ti.include("ui/settings/settingsTextView.js");
Ti.include("ui/settings/settingsTextController.js");
Ti.include("ui/settings/settingsWebView.js");
Ti.include("ui/settings/settingsWebController.js");

/**
 * JOTIX INCLUDES
 */
Ti.include("ui/main/mainButtonsView.js");
Ti.include("ui/main/mainButtonsController.js");
Ti.include("ui/main/searchView.js");
Ti.include("ui/main/searchController.js");

/**
 * JOTIX MAIN
 */
var JotixTable = require('ui/main/jotixTable');
var mainNavGroup = Ti.UI.iPhone.createNavigationGroup({top: 20});
var initTable = JotixTable({navGroup: mainNavGroup, parentId: "pID"});
mainNavGroup.window = initTable.win;
mainNavGroup.window.setLeftNavButton(showSettingsButton);	// included from mainButtonsView
var mainContainer = Titanium.UI.createWindow({
	tabBarHidden: true,
	navBarHidden: true,
	         top: 0	
});
mainContainer.add(mainNavGroup);

function updateViewMain() {
	Ti.API.log('Main.updateView()');
	initTable.updateView();
	// mainContainer.font = {fontFamily: Settings().font()};
	mainContainer.color = Settings().theme().text;
	mainContainer.backgroundColor = Settings().theme().bg;
	mainContainer.barColor = Settings().theme().bg;
}

updateViewMain();

mainContainer.add(mainNavGroup);
mainContainer.open();

