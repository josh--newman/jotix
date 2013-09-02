function SettingsSound(_args) {
	var self = Ti.UI.createWindow({
		title: "Sound",
		font: {fontFamily: Settings().font()},
		color: Settings().theme().text,
		backgroundColor: Settings().theme().bg2,
	    barColor: Settings().theme().bg,
		tabBarHidden: true
	});
	
	var settingsTable = Ti.UI.createTableView({
		style: Ti.UI.iPhone.TableViewStyle.GROUPED,
		font: {fontFamily: Settings().font()},
		color: Settings().theme().text,
		backgroundColor: Settings().theme().bg2,
		data:[
			{
				title:"Sound",
				font: {fontFamily: Settings().font()},
				color: Settings().theme().text,
				backgroundColor: Settings().theme().bg
			},
			{
				title:"Volume",
				font: {fontFamily: Settings().font()},
				color: Settings().theme().text,
				backgroundColor: Settings().theme().bg
			}
		]
	});
	
	self.add(settingsTable);
	
	return self;
}

module.exports = SettingsSound;
