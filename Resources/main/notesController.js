/**
 * @author Robert Chatfield, Josh Newman
 * Jotix Notes main window
 * Controller
 */

NoteView.prototype.addEventListeners = function(){
	// NAV BUTTON FUNCTIONS
	this.addButton.addEventListener('click', function(e) {NoteView.prototype.addButtonClick(e);});
	this.doneButton.addEventListener('click', function(e) {NoteView.prototype.doneButtonClick(e);});
	
	// WHOLE VIEW NAVIGATION
	this.win.addEventListener('close', function(e){
		Ti.API.log("Window closed: " + e.source.parentId);
		playSound("LOW");
		Notes.windowWasClosed({id: e.source.parentId});
	});
	
	// TABLEVIEW FUNCTIONS
	this.table.addEventListener('click', function(e) {
		// Ti.API.log('Table tap: ' + JSON.stringify(e,null,4));
		if (e.source.type === "nest") {
			Ti.API.log('e.source.type: nest');
			NoteView.prototype.viewNestedClick(e);
		} else if (e.source.type === "edit") {
			Ti.API.log('e.source.type: edit');
			NoteView.prototype.noteClick(e);
		}
	});
};



NoteView.prototype.addButtonClick = function(e) {
	Ti.API.log('addButtonClick: ' + JSON.stringify(e.source,null,4));
	playSound("HI");
	composeWin({parentId: Notes.currentPID(), thisTable: Notes.getTableView(Notes.currentPID())});
};
NoteView.prototype.doneButtonClick = function(e) {
	Ti.API.log('doneButtonClick');
	playSound("LOW");
	Notes.setCurrentPID(e.source.parentId);	// Just in case
	this.win.setRightNavButton(this.addButton);
	if (e.source.value == "") {
		// delete note
		Notes.removeNote({id: this.currentlyFocusedTextArea.thisId});
	} else {
		// amend note in database
		Notes.amendNote({id: this.currentlyFocusedTextArea.thisId, content: this.currentlyFocusedTextArea.value});
	}
	this.currentlyFocusedTextArea = null;
	// currentlyFocusedTextArea.blur();
	this.table.data = [this.createTableData()];
};



NoteView.prototype.noteReturn = function(e) {
	Ti.API.log('return textInput');//: ' + JSON.stringify(e,null,4));
	// Add new item below current index
	if (e.source.value != "") insertNote(e.source.parentId, e.source.index);
};

NoteView.prototype.noteClick = function(e) {
	Ti.API.log('noteClick: ' + JSON.stringify(e.source,null,4));
	playSound("HI");
	Notes.setCurrentPID(e.source.parentId);	// Just in case
	composeWin({
		parentId: Notes.currentPID(),
		thisTable: this.table,
		noteData: {
			content: e.source.text,
			noteId: e.source.thisId
		}
	});
};
NoteView.prototype.viewNestedClick = function(e) {
	// SHOW NOTES
	Ti.API.log("viewNestedClick: " + JSON.stringify(e.source,null,4));
	playSound("HI");
	Notes.setCurrentPID(e.source.thisId);
	Ti.API.log("viewNestedClick; parentId:" + Notes.currentPID() + " ######################################################");
	mainNavGroup.open(newList().win);
};

NoteView.prototype.insertNote = function(pID, i) {
	Ti.API.log('insertNote('+pID+', '+i+')');
	// add a new note after theIndex
	Notes.setCurrentPID(pID);	// Just in case
	if (i == -1) {
		var data = Ti.UI.createTableViewSection({
		        headerTitle: Notes.contentAtID({parentId: Notes.currentPID()}),
			backgroundColor: this.THEME_GB
		});
		var newData = Notes.insertNote({parentId: pID, index: 0});
		var newRow = this.createRow(newData.content, newData.order, newData.noteId, newData.pID);
		data.add(newRow.row);
		this.table.data = [data];
		this.currentlyFocusedTextArea = newRow.textInput;
	} else {
		var indexOfNewRow = i + 1;
		Ti.API.log('adding new note to: ' + Notes.currentPID() + ' at index: ' + indexOfNewRow);
		this.table.scrollToIndex(indexOfNewRow);
		var newData = Notes.insertNote({parentId: pID, index: indexOfNewRow});
		var newRow = this.createRow(newData.content, newData.order, newData.noteId, newData.pID);
		// Ti.API.log('table.data[0].rows: ' + JSON.stringify(table.data[0].rows,null,4));
		this.table.insertRowAfter(i,newRow.row,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});

		this.currentlyFocusedTextArea = newRow.textInput;
	}
	this.currentlyFocusedTextArea.focus();
	// remove "NO MORE NOTES" graphic
};
NoteView.prototype.deleteEmptyNote = function(i) {
	this.table.deleteRow(i,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.UP});
	this.currentlyFocusedTextArea = null;
	// add "NO MORE NOTES" graphic
};

