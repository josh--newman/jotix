/**
 * @author Robert Chatfield, Josh Newman
 * Settings > Text
 * View
 */

var fontIndex  = Settings.fontIndex(),
	fontNames  = Settings.fontNames(),
	themeIndex = Settings.themeIndex(),
	themeNames = Settings.themeNames();

var settingsTextWin = Ti.UI.createWindow({
	          title: "Text",
	          color: Settings.theme().text,
	backgroundColor: Settings.theme().bg2,
           barColor: Settings.theme().bg,
	   tabBarHidden: true
});

var settingsTextTable = buildTextTable();
settingsTextWin.add(settingsTextTable);
var styledElements = [settingsTextWin];

var fontSec, themeSec; // required for Controller

function buildTextTable() {
	// FONTS
	fontSec = Ti.UI.createTableViewSection({headerTitle: "Font"});	
	for (var i = 0; i<fontNames.length; i++) {
		var row1 = Ti.UI.createTableViewRow({
					  title: fontNames[i],
					   font: {fontFamily: fontNames[i]},
					  color: Settings.theme().text,
			backgroundColor: Settings.theme().bg
		});
		if (fontIndex == i) {
			row1.setHasCheck(true);
		} else {
			row1.setHasCheck(false);
		}
		// styledElements.push(row1);
		fontSec.add(row1);
	}	
	

	// THEMES
	themeSec = Ti.UI.createTableViewSection({headerTitle: "Theme"});	
	
	for (var i = 0; i<themeNames.length; i++) {
		var row1 = Ti.UI.createTableViewRow({
					  title: themeNames[i],
			          color: Settings.theme().text,
			backgroundColor: Settings.theme().bg
		});
		if (themeIndex == i) {row1.setHasCheck(true);} 
		else {row1.setHasCheck(false);}
		// styledElements.push(row1);
		themeSec.add(row1);
	}
	
	
	// BUILD TABLE
	table = Ti.UI.createTableView({
				  style: Ti.UI.iPhone.TableViewStyle.GROUPED,
		           font: {fontFamily: Settings.font()},
		          color: Settings.theme().text,
		backgroundColor: Settings.theme().bg2,
		          data : [fontSec, themeSec]
	});
	
	return table;
}
