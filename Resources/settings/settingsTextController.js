/**
 * @author Robert Chatfield, Josh Newman
 * Settings > Text
 * Controller
 */

function settingsTextTableAddListeners(view){
	fontSec.addEventListener('click', function(e) {
		var fontID = e.index;
		if (Settings.fontIndex() != fontID) {
			Ti.API.log('newFont: ' + fontNames[fontID]);
			Settings.setFont(fontID);
			fontIndex = Settings.fontIndex();
			updateViewSettingsText();
		}
	});
	themeSec.addEventListener('click', function(e) {
		var themeID = e.index - fontNames.length;
		if (Settings.themeIndex() != themeID) {
			Ti.API.log('newTheme: ' + themeNames[themeID]);
			Settings.setTheme(themeID);
			themeIndex = Settings.themeIndex();
			updateViewSettingsText();
		}
	});
}

function updateViewSettingsText(view) {
	Ti.API.log('settingsText.updateView()');
	settingsTextWin.remove(settingsTextTable);
	settingsTextTable = buildTextTable();
	settingsTextTableAddListeners();
	settingsTextWin.add(settingsTextTable);
	if (themeNames[themeIndex] != 'Invert') {
		// Status bar black with white writing
		Ti.API.log('Status Bar Changed to: OPAQUE_BLACK');
		Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK;
	} else {
		// Status bar white with black writing
		Ti.API.log('Status Bar Changed to: DEFAULT');
		Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.DEFAULT;
	}
	// settingsUpdateView();
	updateViewSettings();
}

settingsTextTableAddListeners();
