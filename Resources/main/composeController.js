/**
 * @author Robert Chatfield, Josh Newman
 * Compose new note
 * Controller
 */

// done
function composeDone(e, win) {
	var thisId = e.source.noteId;
	var content = e.source.textarea.value;
	
	if (content == "") {
		// DELETE NOTE
		Notes.removeNote({id: thisId});
	} else {
		// SAVE NOTE
		Notes.amendNote({id: thisId, content: content});
	}
		
	// UPDATE TABLE VIEW
	table.data = [createTableData()];
	
	// CLOSE COMPOSE WINDOW
	win.close({modal: true});
	win = null;
}

// add
function composeAdd(e, win) {
	// SAVE NOTE
	
	// ANIMATE NEW NOTE
	
}
