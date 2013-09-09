function SettingsWeb(_args) {
	var self = Ti.UI.createWindow({
		title: "Web",
		color: Settings().theme().text,
		backgroundColor: Settings().theme().bg2,
	    barColor: Settings().theme().bg,
		tabBarHidden: true
	});
	
	var webview = Ti.UI.createWebView({
		url: 'http://www.apple.com'
	});
	self.add(webview);
	
	var openInSafariButton = Ti.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.ACTION});
	self.setRightNavButton(openInSafariButton);
	
	openInSafariButton.addEventListener('click', function(e){
	  var dialog = Ti.UI.createAlertDialog({
	    cancel: 0,
	    open: 1,
	    buttonNames: ['Cancel', 'Open'],
	    message: 'Open in Safari?',
	    title: 'Safari'
	  });
	  dialog.addEventListener('click', function(e){
	    if (e.index === e.source.cancel){
	    	Ti.API.info('The cancel button was clicked');
	    } else if (e.index === e.source.open) {
	    	Titanium.Platform.openURL(webview.url);
		}
		dialog.close();
	  });
	  dialog.show();
	});
	
	return self;
}

module.exports = SettingsWeb;
