var Settings = require('model/settings');

function updateView() {
	Ti.API.log('Main.updateView()');
	initTable.updateView();
	mainContainer.font = {fontFamily: Settings().font()};
	mainContainer.color = Settings().theme().text;
	mainContainer.backgroundColor = Settings().theme().bg;
	mainContainer.barColor = Settings().theme().bg;
}

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

var JotixTable = require('ui/main/jotixTable'); 
var mainNavGroup = Ti.UI.iPhone.createNavigationGroup({
	top: 20
});
var mainContainer = Titanium.UI.createWindow({  
	tabBarHidden: true,
	navBarHidden: true,
	top: 0
});
var initTable = JotixTable({navGroup: mainNavGroup, parentId: "pID"});
mainNavGroup.window = initTable.win;
updateView();
mainContainer.add(mainNavGroup);

/**
 * SETTINGS
 */
var settingsContainer = require('ui/settings/SettingsMain');

var settingsButton = Ti.UI.createButton({title: "Settings"});
settingsButton.addEventListener('click', function() {
	settingsContainer({updateView: updateView}).view.open({modal:true});
});
mainNavGroup.window.leftNavButton = settingsButton;

mainContainer.open();
