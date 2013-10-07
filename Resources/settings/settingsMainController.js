/**
 * @author Robert Chatfield, Josh Newman
 * Settings > main window
 * Controller
 */

// BOTTON TO SHOW SETTINGS
showSettingsButton.addEventListener('click', function() {
	settingsContainer.open({modal:true});
});


// NAV BAR 
settingsDoneButton.addEventListener('click', function() {
	if (needsUpdate) {
		needsUpdate = false;
		updateViewMain();
	}
	settingsContainer.close({modal:true});
});

// TABLE ROWS
settingsRowSound.addEventListener('click', function(e) {
	settingsNavGroup.open(settingsSoundWin);
});
// settingsRowText.addEventListener('click',  function(e) {
	// settingsNavGroup.open(settingsTextWin);
// });
settingsRowWeb.addEventListener('click',   function(e) {
	settingsWebview.url = defaultURL;
	settingsNavGroup.open(settingsWebWin);
});
settingsRowTutorial.addEventListener('click',   function(e) {
	carouselWindow.open({modal: true});
});



/**
 * UPDATE VIEW
 */
function updateViewSettings() {
	Ti.API.log('SettingsMain.updateView()');
	// settingsContainer
	settingsContainer.color = Settings.theme().text;
	settingsContainer.backgroundColor = Settings.theme().bg;
	// settingsMain
	settingsMain.color = Settings.theme().text;
	settingsMain.backgroundColor = Settings.theme().bg2;
    settingsMain.barColor = Settings.theme().bg;
    // settingsTable
	settingsTable.color = Settings.theme().text;
	settingsTable.backgroundColor = Settings.theme().bg2;
	// settingRows []
	for (var row in settingMainRows) {
		settingMainRows[row].color = Settings.theme().text;
		settingMainRows[row].backgroundColor = Settings.theme().bg;
	}
	needsUpdate = true;
}

updateViewSettings();

// POSITION OF IMAGE
Ti.Gesture.addEventListener('orientationchange', function(e){
	// Ti.API.log("Orientation changed: " + e.orientation);
    if(e.orientation == 3 || e.orientation == 4){
    	logo.center = {x: platformHeight / 2};
    }
    else if(e.orientation == 1){
    	logo.center = {x: platformWidth / 2};
    }
    Ti.API.log("logo: " + JSON.stringify(logo,null,4));
});