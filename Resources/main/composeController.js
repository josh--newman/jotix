/**
 * @author Robert Chatfield, Josh Newman
 * Compose new note
 * Controller
 */

// done
function composeDonePressed(e, win) {
	composeDone(e, win);
}

// add
function composeAddPressed(e, win, table) {
	// SAVE NOTE
	composeDone(e, win);
	// ANIMATE NEW NOTE
	// WAIT FOR LAST ANIMATION TO STOP
	setTimeout(function(){
		composeWin({parentId: Notes.currentPID(), thisTable: table});
	}, 800);
}

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
