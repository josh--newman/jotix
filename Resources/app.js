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

// DATABASE TESTING
Ti.include('/model/database.js');

var database = new Database();

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
 * TUTORIAL
 */
Ti.include('/tutorial/tutorialModel.js');
Ti.include('/tutorial/tutorialView.js');
Ti.include('/tutorial/tutorialController.js');


/**
 * JOTIX INCLUDES
 */
Ti.include('/model/notes.js');
Ti.include('/main/mainButtonsView.js');
Ti.include('/main/mainButtonsController.js');
Ti.include('/main/searchView.js');
Ti.include('/main/searchController.js');
var newList = require('main/notesViewController');
var composeWin = require('main/composeView');

/**
 * JOTIX MAIN
 */
var mainNavGroup = Ti.UI.iPhone.createNavigationGroup({top: 20});

Notes.setCurrentPID(-1);
var cachedCurrentPID = Notes.currentPID();
Notes.setCurrentPID(-1); 	// root note

var initTable = newList();
mainNavGroup.window = initTable.win;
mainNavGroup.window.setLeftNavButton(showSettingsButton);	// included from mainButtonsView
var mainContainer = Ti.UI.createWindow({
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
	Ti.API.log('mainContainer.statusBar: ' + mainContainer.statusBar);
	Ti.API.log('Settings.theme().sb: ' + Settings.theme().sb);
	Ti.API.log('Titanium.UI.iPhone.StatusBar.DEFAULT: ' + Titanium.UI.iPhone.StatusBar.DEFAULT);
	Ti.API.log('Titanium.UI.iPhone.StatusBar.GREY: ' + Titanium.UI.iPhone.StatusBar.GREY);
	Ti.API.log('Titanium.UI.iPhone.StatusBar.GRAY: ' + Titanium.UI.iPhone.StatusBar.GRAY);
	Ti.API.log('Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK: ' + Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK);
	Ti.API.log('Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK: ' + Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK);
	Ti.API.log('Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT: ' + Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT);
	mainContainer.setStatusBarStyle(Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK);
	Ti.API.log('\nmainContainer.statusBarStyle: ' + mainContainer.statusBarStyle);
}

updateViewMain();

mainContainer.open({modal: true});


/**
 * SHOW TUTORIAL
 */
Settings.setTutorialSeen({seen: false}); 
Ti.API.log("Settings.tutorialSeen(): " + Settings.tutorialSeen());
if (Settings.tutorialSeen() == false) {
	setTimeout(function(){
		carouselWindow.open({modal: true});
	}, 700);
}


// LOAD PREVIOUS STATE  --  BREADCRUMBS SEQUENTIALLY
// -- work backwards and collect parentId's
if (cachedCurrentPID != -1) {
	var parentIdBreadcrumbsArray = Notes.pIDBreadcrumbs({parentId: cachedCurrentPID});
	Ti.API.log('parentIdBreadcrumbsArray: ' + JSON.stringify(parentIdBreadcrumbsArray,null,4));
	// -- open each list
	for (var i in parentIdBreadcrumbsArray) {
		Notes.setCurrentPID(parentIdBreadcrumbsArray[i]);
		mainNavGroup.open(newList().win);
	}
	parentIdBreadcrumbsArray = [];
	
	Ti.API.log('\n mainContainer.statusBarStyle: ' + mainContainer.statusBarStyle);
}





