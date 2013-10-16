/**
 * @author Robert Chatfield, Josh Newman
 * Compose new note
 * Controller
 */


function addEventListenersToComposeView() {
	composeDoneButton.addEventListener('click', function(e){composeDonePressed(e, self);});
	composeAddButton.addEventListener( 'click', function(e){composeAddPressed(e, self, table);});
	ta.addEventListener('postlayout', function(e){ta.focus();});
	ta.addEventListener('change', function(e){composeAddButtonState();});	
	self.addEventListener('close', function(e){releaseComposeView();});
}

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
	var currentTable = Notes.getTableView({id: Notes.currentPID()});
	Ti.API.log('Notes.currentPID(): ' + JSON.stringify(Notes.currentPID(),null,4));
	Ti.API.log('currentTable: ' + JSON.stringify(currentTable,null,4));
	Ti.API.log('tableViewCollection: ' + JSON.stringify(tableViewCollection,null,4));
	
	currentTable.data = [NoteView.prototype.createTableData()];
	
	// CLOSE COMPOSE WINDOW
	win.close({modal: true});
	win = null;
}

function releaseComposeView() {
	Ti.API.log('releaseComposeView()');
	self = null;
	win = null;
	ta = null;
	composeDoneButton = null;
	composeAddButton = null;
}

function composeAddButtonState() {
	Ti.API.log('composeAddButtonState()');
	if (ta.value === "" && composeAddButton.enabled) {
		composeAddButton.setEnabled(false);
	} else { // if (ta.value !== "" && !composeAddButton.enabled) {
		composeAddButton.setEnabled(true);
	}
}
		
