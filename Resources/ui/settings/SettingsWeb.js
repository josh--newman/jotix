function SettingsWeb(_args) {
	var self = Ti.UI.createWindow({
		title: "Web",
		font: {fontFamily: Settings().font()},
		color: Settings().theme().text,
		backgroundColor: Settings().theme().bg2,
	    barColor: Settings().theme().bg,
		tabBarHidden: true
	});
	
	self.add(Ti.UI.createWebView({
		url: 'http://www.apple.com'
	}));
	
	return self;
}

module.exports = SettingsWeb;
