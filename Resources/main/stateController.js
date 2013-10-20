/**
 * @author Robert Chatfield, Josh Newman
 * State
 * Controller
 */

function goToRootNote() {
	// GO BACK TO ROOT NOTE
	// HIDE EVERY WINDOW
	for (var w in tableViewCollection) {
		tableViewCollection[w].close({animated: false});
	}	
}
function goToNote(id) {
	// GO TO NOTE 
	var parentIdBreadcrumbsArray = Notes.pIDBreadcrumbs({parentId: id});
	Ti.API.log('parentIdBreadcrumbsArray: ' + JSON.stringify(parentIdBreadcrumbsArray,null,4));
	// -- open each list
	for (var i in parentIdBreadcrumbsArray) {
		Notes.setCurrentPID(parentIdBreadcrumbsArray[i]);
		mainNavGroup.open(newList().win, {animated:false});
	}
	parentIdBreadcrumbsArray = [];
	
	Ti.API.log('\n mainContainer.statusBarStyle: ' + mainContainer.statusBarStyle);
}