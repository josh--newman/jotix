var fontIndex  = Settings().fontIndex(),
	fontNames  = Settings().fontNames(),
	themeIndex = Settings().themeIndex(),
	themeNames = Settings().themeNames();

var styledElements = [];
var settingsUpdateView;
var settingsTable;

function SettingsText(_args) {
	settingsUpdateView = _args.updateView;
	
	var self = Ti.UI.createWindow({
		          title: "Text",
		          color: Settings().theme().text,
		backgroundColor: Settings().theme().bg2,
	           barColor: Settings().theme().bg,
		   tabBarHidden: true
	});
	
	settingsTable = buildTable(self);
	
	self.add(settingsTable);
	
	styledElements.push(self);
	
	return self;
}

function buildTable(view) {
	// FONTS
	
	var fontSec = Ti.UI.createTableViewSection({
		headerTitle: "Font"
	});	
	
	for (var i = 0; i<fontNames.length; i++) {
		var row1 = Ti.UI.createTableViewRow({
			title: fontNames[i],
			font : {fontFamily: fontNames[i]},
			color: Settings().theme().text,
			backgroundColor: Settings().theme().bg
		});
		if (fontIndex == i) {
			row1.setHasCheck(true);
		} else {
			row1.setHasCheck(false);
		}
		styledElements.push(row1);
		fontSec.add(row1);
	}	
	
	fontSec.addEventListener('click', function(e) {
		fontSelected(e, view);
	});
	
	// THEMES
	
	var themeSec = Ti.UI.createTableViewSection({
		headerTitle: "Theme"
	});	
	
	for (var i = 0; i<themeNames.length; i++) {
		var row1 = Ti.UI.createTableViewRow({
			title: themeNames[i],
			color: Settings().theme().text,
			backgroundColor: Settings().theme().bg
		});
		if (themeIndex == i) {
			row1.setHasCheck(true);
		} else {
			row1.setHasCheck(false);
		}
		styledElements.push(row1);
		themeSec.add(row1);
	}

	themeSec.addEventListener('click', function(e) {
		themeSelected(e, view);
	});
	
	
	// BUILD TABLE
	var table = Ti.UI.createTableView({
		style: Ti.UI.iPhone.TableViewStyle.GROUPED,
		font : {fontFamily: Settings().font()},
		color: Settings().theme().text,
		backgroundColor: Settings().theme().bg2,
		data : [fontSec, themeSec]
	});
	
	// RETURN
	return table;
}

function fontSelected(e, view) {
	var fontID = e.index;
	if (fontID != Settings().fontIndex()) {
		Ti.API.log('newFont: ' + fontNames[fontID]);
		Settings().setFont(fontID);
		fontIndex  = Settings().fontIndex();
		updateView(view);
	}
}

function themeSelected(e, view) {
	var themeID = e.index - fontNames.length;
	if (Settings().themeIndex() != themeID) {
		Ti.API.log('newTheme: ' + themeNames[themeID]);
		Settings().setTheme(themeID);
		themeIndex = Settings().themeIndex();
		updateView(view);
	}
}

function updateView(view) {
	Ti.API.log('settingsText.updateView()');
	view.remove(settingsTable);
	settingsTable = buildTable(view);
	view.add(settingsTable);
	// for (var view in styledElements) {
		// //Ti.API.log('updateView()' + JSON.stringify(styledElements[view],null,4));
		// styledElements[view].font = {fontFamily: Settings().font()};
		// styledElements[view].color = Settings().theme().text;
		// styledElements[view].backgroundColor = Settings().theme().bg2;
		// styledElements[view].barColor = Settings().theme().bg;
	// }
	if (themeNames[themeIndex] != 'Invert') {
		// Status bar black with white writing
		Ti.API.log('Status Bar Changed to: OPAQUE_BLACK');
		Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK;
	} else {
		// Status bar white with black writing
		Ti.API.log('Status Bar Changed to: DEFAULT');
		Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.DEFAULT;
	}
	settingsUpdateView();
}

module.exports = SettingsText;
