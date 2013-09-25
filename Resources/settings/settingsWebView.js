/**
 * @author Robert Chatfield, Josh Newman
 * Settings > Web
 * View
 */

var settingsWebWin = Ti.UI.createWindow({
	          title: "Web",
	          color: Settings.theme().text,
	backgroundColor: Settings.theme().bg2,
    	   barColor: Settings.theme().bg,
	   tabBarHidden: true
});

var defaultURL = 'http://www.apple.com';

var settingsWebview = Ti.UI.createWebView({
	url: defaultURL
});
settingsWebWin.add(settingsWebview);

var openInSafariButton = Ti.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.ACTION});
settingsWebWin.setRightNavButton(openInSafariButton);
