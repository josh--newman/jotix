/**
 * @author Robert Chatfield, Josh Newman
 * Jotix Notes main window
 * View & Controller
 */

Ti.include('/main/notesView.js');
Ti.include('/main/notesController.js');

function createNewList(){
	Ti.API.log('createNewList()');
	var self = new NoteView();
	self.addEventListeners();
	return self;
}

module.exports = createNewList;
