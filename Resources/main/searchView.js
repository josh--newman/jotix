/**
 * @author Robert Chatfield, Josh Newman
 * Search
 * View
 */

var searchView = Ti.UI.createWindow({
	          title: "Search",
	          color: Settings().theme().text,
	backgroundColor: Settings().theme().bg2,
           barColor: Settings().theme().bg,
	   tabBarHidden: true
});
var searchDoneButton = Titanium.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.DONE});
searchView.setRightNavButton(searchDoneButton);
