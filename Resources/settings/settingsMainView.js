/**
 * @author Robert Chatfield, Josh Newman
 * Settings > main window
 * View
 */

var platformWidth = Ti.Platform.displayCaps.platformWidth;
var platformHeight = Ti.Platform.displayCaps.platformHeight;


// BOTTON TO SHOW SETTINGS
var showSettingsButton = Ti.UI.createButton({
	title: "Settings"
});


/**
 * BUILD CONTAINER
 * COUNTAINER (MODAL: SHOW AND HIDE THIS)
 *   > NAVGROUP
 *     > EACH VIEW
 */

var settingsContainer = Ti.UI.createWindow({
	navBarHidden: true,
			 top: 0
});

var settingsMain = Ti.UI.createWindow({
	title: "Settings",
});

var settingsDoneButton = Ti.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.DONE});
settingsMain.leftNavButton = settingsDoneButton;

/**
 * BUILD SETTING ROWS
 */
var settingMainRows = [];
var settingsSect1 = Ti.UI.createTableViewSection({});
var settingsSect2 = Ti.UI.createTableViewSection({});

var settingsRowSound = Ti.UI.createTableViewRow({
	   title: "Sound",
	hasChild: true
});
settingsSect1.add(settingsRowSound);
settingMainRows.push(settingsRowSound);

// var settingsRowText = Ti.UI.createTableViewRow({
	   // title: "Text",
	// hasChild: true
// });
// settingsSect1.add(settingsRowText);
// settingMainRows.push(settingsRowSound);

var settingsRowWeb = Ti.UI.createTableViewRow({
	   title: "Developer",
	hasChild: true
});
settingsSect1.add(settingsRowWeb);
settingMainRows.push(settingsRowWeb);

var settingsRowTutorial = Ti.UI.createTableViewRow({
	   title: "Tutorial"
});
settingsSect2.add(settingsRowTutorial);
settingMainRows.push(settingsRowTutorial);

var settingsTable = Ti.UI.createTableView({
	style: Ti.UI.iPhone.TableViewStyle.GROUPED,
	 data: [settingsSect1, settingsSect2]
});
settingsMain.add(settingsTable);


/**
 * ADD GRAPHIC
 */
var logo = Ti.UI.createView({
	backgroundImage: 'images/settings_logo.png',
	center: {
		x: platformWidth / 2
	},
	bottom: 0,
	width: 100,
	height: 44
});
var logoView = Ti.UI.createView({
	height: 70
});
logoView.add(logo);
settingsTable.footerView = logoView;
// settingsMain.add(logo);

/**
 * BUILD WINDOWS + NAV>WINDOW
 */
var settingsNavGroup = Ti.UI.iPhone.createNavigationGroup({
	window: settingsMain,
	   top: 20
});
settingsContainer.add(settingsNavGroup);

var needsUpdate = false;
