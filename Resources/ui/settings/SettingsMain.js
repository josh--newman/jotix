var needsUpdate = false;

function SettingsMain(_args) {
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
	
	var done = Ti.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.DONE});
	settingsMain.leftNavButton = done;
	
	
	/**
	 * BUILD SETTING ROWS
	 */
	var settingRows = [];
	
	var rowSound = Ti.UI.createTableViewRow({
		title:"Sound",
		hasChild:true
	});
	settingRows.push(rowSound);
	
	var rowText = Ti.UI.createTableViewRow({
		title:"Text",
		hasChild:true
	});
	settingRows.push(rowText);
	
	var rowWeb = Ti.UI.createTableViewRow({
		title:"Developer",
		hasChild:true
	});
	settingRows.push(rowWeb);
	
	var settingsTable = Ti.UI.createTableView({
		style: Ti.UI.iPhone.TableViewStyle.GROUPED,
		data: settingRows
	});
	settingsMain.add(settingsTable);

	
	/**
	 * UPDATE VIEW
	 */
	function updateView() {
		Ti.API.log('SettingsMain.updateView()');
		// settingsContainer
		settingsContainer.color = Settings().theme().text;
		settingsContainer.backgroundColor = Settings().theme().bg;
		// settingsMain
		settingsMain.color = Settings().theme().text;
		settingsMain.backgroundColor = Settings().theme().bg2;
	    settingsMain.barColor = Settings().theme().bg;
	    // settingsTable
		settingsTable.color = Settings().theme().text;
		settingsTable.backgroundColor = Settings().theme().bg2;
		// settingRows []
		for (var row in settingRows) {
			settingRows[row].color = Settings().theme().text;
			settingRows[row].backgroundColor = Settings().theme().bg;
		}
		needsUpdate = true;
	}

	
	/**
	 * BUILD WINDOWS + NAV>WINDOW
	 */
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:settingsMain,
		top: 20
	});
	settingsContainer.add(navGroup);

	updateView();
	needsUpdate = false;
	
	
	/**
	 * CONTROLLER INCLUDE
	 */
	// Ti.include("ui/settings/SettingsMainController.js");
	// NAV BAR 
	done.addEventListener('click', function() {
		if (needsUpdate) {
			needsUpdate = false;
			_args.updateView();	// _args passed in by Settings Controller
		}
		settingsContainer.close({modal:true});
	});
	
	// TABLE ROWS
	rowSound.addEventListener('click', function(e) {
		var settingsSound = require('ui/settings/SettingsSound');
		navGroup.open(settingsSound());
	});
	rowText.addEventListener('click',  function(e) {
		var settingsText  = require('ui/settings/SettingsText');
		navGroup.open(settingsText({updateView: updateView}));
	});
	rowWeb.addEventListener('click',   function(e) {
		var settingsWeb   = require('ui/settings/SettingsWeb');
		navGroup.open(settingsWeb());
	});

	
	return {view: settingsContainer, updateView: updateView};
}

module.exports = SettingsMain;
