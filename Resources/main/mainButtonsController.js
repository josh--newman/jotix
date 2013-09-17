/**
 * @author Robert Chatfield, Josh Newman
 * Main Buttons for Toolbar
 * Controller
 */

searchButton.addEventListener('click', function() {
	searchView.open({modal: true});
});

actionButton.addEventListener('click', function() {
	Ti.UI.createOptionDialog({
		       cancel: 1,
		      options: ['Email', 'Cancel'],
		selectedIndex: 0,
		        title: 'Share?'
	}).show();
});

sortButton.addEventListener('click', function() {
	Ti.UI.createOptionDialog({
		       cancel: 3,
		      options: ['Manually', 'By Content', 'By Date', 'Cancel'],
		selectedIndex: 0,
		        title: 'Sort notes'
	}).show();
});
