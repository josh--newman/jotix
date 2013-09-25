/**
 * @author Robert Chatfield, Josh Newman
 * Main Buttons for Toolbar
 * View
 */

var actionButton	= Ti.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.ACTION});
var sortButton 		= Ti.UI.createButton({
										    title : 'Sort',
										    right : 50,
										    width : 50,
										    height: 30
										});
var searchButton	= Ti.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.SEARCH});
var flexButton		= Ti.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE});

var navBarButtons = [
	actionButton,
	flexButton,
	sortButton,
	flexButton,
	searchButton
];
