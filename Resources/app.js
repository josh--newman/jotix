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
Ti.include('/settings/settingsMainView.js');
Ti.include('/settings/settingsMainController.js');
Ti.include('/settings/settingsSoundView.js');
Ti.include('/settings/settingsSoundController.js');
Ti.include('/settings/settingsTextView.js');
Ti.include('/settings/settingsTextController.js');
Ti.include('/settings/settingsWebView.js');
Ti.include('/settings/settingsWebController.js');

/**
 * JOTIX INCLUDES
 */
Ti.include('/main/mainButtonsView.js');
Ti.include('/main/mainButtonsController.js');
Ti.include('/main/searchView.js');
Ti.include('/main/searchController.js');

/**
 * JOTIX MAIN
 */
var JotixTable = require('main/jotixTable');
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

