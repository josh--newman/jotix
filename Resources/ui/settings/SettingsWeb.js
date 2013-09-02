function SettingsWeb(_args) {
	var self = Ti.UI.createWindow({
		title: "Web",
		font: {fontFamily: Settings().font()},
		color: Settings().theme().text,
		backgroundColor: Settings().theme().bg2,
	    barColor: Settings().theme().bg,
		tabBarHidden: true
	});
	
	return self;
}

module.exports = SettingsWeb;
