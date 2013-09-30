/**
 * @author Robert Chatfield, Josh Newman
 * Jotix Notes main window
 * View & Controller
 */

function createNewList(){
	Ti.API.log('newList()');
	Ti.include('/main/notesView.js');
	Ti.include('/main/notesController.js');
	return {win: self, updateView: updateView};
}

module.exports = createNewList;
