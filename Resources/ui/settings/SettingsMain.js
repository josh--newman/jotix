var needsUpdate = false;

function SettingsMain(_args) {
	
	var styledElements = [];
	
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
	done.addEventListener('click', function() {
		if (needsUpdate) {
			needsUpdate = false;
			_args.updateView();
		}
		settingsContainer.close({modal:true});
	});
	settingsMain.leftNavButton = done;
	
	
	/**
	 * BUILD SETTING ROWS
	 */
	var settingRows = [];
	
	var rowSound = Ti.UI.createTableViewRow({
		title:"Sound",
		hasChild:true
	});
	rowSound.addEventListener('click', function(e) {navGroup.open(settingsSound());});
	settingRows.push(rowSound);
	
	var rowText = Ti.UI.createTableViewRow({
		title:"Text",
		hasChild:true
	});
	rowText.addEventListener('click', function(e) {navGroup.open(settingsText({updateView: updateView}));});
	settingRows.push(rowText);
	
	var rowWeb = Ti.UI.createTableViewRow({
		title:"Developer",
		hasChild:true
	});
	rowWeb.addEventListener('click', function(e) {navGroup.open(settingsWeb());});
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
	var settingsSound = require('ui/settings/SettingsSound'),
	    settingsText  = require('ui/settings/SettingsText'),
	    settingsWeb   = require('ui/settings/SettingsWeb');
	
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:settingsMain,
		top: 20
	});
	settingsContainer.add(navGroup);

	updateView();
	needsUpdate = false;
	return {view: settingsContainer, updateView: updateView};
}

module.exports = SettingsMain;
