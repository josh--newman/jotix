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
Ti.include('/model/settings.js');
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
Ti.include('/model/notes.js');
Ti.include('/main/mainButtonsView.js');
Ti.include('/main/mainButtonsController.js');
Ti.include('/main/searchView.js');
Ti.include('/main/searchController.js');
var newList = require('main/notesViewController');

/**
 * JOTIX MAIN
 */
var mainNavGroup = Ti.UI.iPhone.createNavigationGroup({top: 20});
var initTable = newList();
mainNavGroup.window = initTable.win;
mainNavGroup.window.setLeftNavButton(showSettingsButton);	// included from mainButtonsView
var mainContainer = Titanium.UI.createWindow({
		tabBarHidden: true,
		navBarHidden: true,
		         top: 0,
	orientationModes: ORIENTATIONS	// included from /model/settings.js
});
mainContainer.add(mainNavGroup);

function updateViewMain() {
	Ti.API.log('Main.updateView()');
	initTable.updateView();
	mainContainer.color = Settings.theme().text;
	mainContainer.backgroundColor = Settings.theme().bg;
	mainContainer.barColor = Settings.theme().bg;
}

updateViewMain();

mainContainer.add(mainNavGroup);
mainContainer.open({modal: true});

