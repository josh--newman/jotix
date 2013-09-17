/**
 * @author Robert Chatfield, Josh Newman
 * Settings > Web
 * Controller
 */

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
    	Titanium.Platform.openURL(settingsWebview.url);
	}
	dialog.close();
  });
  dialog.show();
});
