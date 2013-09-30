/**
 * @author Robert Chatfield, Josh Newman
 * Search
 * Controller
 */

searchDoneButton.addEventListener('click', function(e){
	table.data = [createTableData()];
	searchView.close();
});

tableview.addEventListener('click', function(e){
	searchForId(e.source.parentID);
});

function searchForId(parentID) {
	// do stuff
	Ti.API.log('searchForId(' + parentID +')');
	searchView.close();
}
