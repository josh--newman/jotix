var Settings = require('model/settings');
Settings().setFont(4);
Settings().setTheme(0);

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
var mainNavGroup = Ti.UI.iPhone.createNavigationGroup({});
var mainContainer = Titanium.UI.createWindow({  
	tabBarHidden: true,
	navBarHidden: true
});
var initTable = new JotixTable({navGroup: mainNavGroup, parentId: "pID"});
mainNavGroup.window = initTable.table;
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

function updateView() {
	Ti.API.log('Main.updateView()');
	initTable.updateView();
	mainContainer.font = {fontFamily: Settings().font()};
	mainContainer.color = Settings().theme().text;
	mainContainer.backgroundColor = Settings().theme().bg;
	mainContainer.barColor = Settings().theme().bg;
}