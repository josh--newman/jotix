/**
 * @author Robert Chatfield, Josh Newman
 * Jotix Notes main window
 * Controller
 */


// NAV BUTTON FUNCTIONS

function addButtonClick(e) {
	Ti.API.log('addButtonClick: ' + JSON.stringify(e.source,null,4));
	composeWin({parentId: Notes.currentPID(), thisTable: Notes.getTableView(Notes.currentPID())});
}
function doneButtonClick(e) {
	Ti.API.log('doneButtonClick');
	Notes.setCurrentPID(e.source.parentId);	// Just in case
	self.setRightNavButton(addButton);
	if (e.source.value == "") {
		// delete note
		Notes.removeNote({id: currentlyFocusedTextArea.thisId});
	} else {
		// amend note in database
		Notes.amendNote({id: currentlyFocusedTextArea.thisId, content: currentlyFocusedTextArea.value});
	}
	currentlyFocusedTextArea = null;
	// currentlyFocusedTextArea.blur();
	table.data = [createTableData()];
}


// WHOLE VIEW NAVIGATION

self.addEventListener('close', function(e){
	Ti.API.log("Window closed: " + e.source.parentId);
	Notes.windowWasClosed({id: e.source.parentId});
});


// TABLEVIEW FUNCTIONS

function noteReturn(e) {
	Ti.API.log('return textInput');//: ' + JSON.stringify(e,null,4));
	// Add new item below current index
	if (e.source.value != "") insertNote(e.source.parentId, e.source.index);
}

function noteClick(e) {
	Ti.API.log('noteClick: ' + JSON.stringify(e.source,null,4));
	Notes.setCurrentPID(e.source.parentId);	// Just in case
	composeWin({
		parentId: Notes.currentPID(),
		thisTable: table,
		noteData: {
			content: e.source.text,
			noteId: e.source.thisId
		}
	});
}
function viewNestedClick(e) {
	// SHOW NOTES
	Ti.API.log("viewNestedClick: " + JSON.stringify(e.source,null,4));
	Notes.setCurrentPID(e.source.thisId);
	Ti.API.log("viewNestedClick; parentId:" + Notes.currentPID() + " ######################################################");
	mainNavGroup.open(newList().win);
}

function tableRowClick(e) {
	// SHOW NOTES
	Ti.API.log("tableRowClick: " + JSON.stringify(e.source,null,4));
	Notes.setCurrentPID(e.source.thisId);
	Ti.API.log("tableRowClick; parentId:" + Notes.currentPID() + " ######################################################");
	mainNavGroup.open(newList().win);
}


// HELPER FUNCTIONS

function insertNote(pID, i) {
	Ti.API.log('insertNote('+pID+', '+i+')');
	// add a new note after theIndex
	Notes.setCurrentPID(pID);	// Just in case
	if (i == -1) {
		var data = Ti.UI.createTableViewSection({
		        headerTitle: Notes.contentAtID({parentId: Notes.currentPID()}),
			backgroundColor: THEME_GB
		});
		var newData = Notes.insertNote({parentId: pID, index: 0});
		var newRow = createRow(newData.content, newData.order, newData.noteId, newData.pID);
		data.add(newRow.row);
		table.data = [data];
		currentlyFocusedTextArea = newRow.textInput;
	} else {
		var indexOfNewRow = i + 1;
		Ti.API.log('adding new note to: ' + Notes.currentPID() + ' at index: ' + indexOfNewRow);
		table.scrollToIndex(indexOfNewRow);
		var newData = Notes.insertNote({parentId: pID, index: indexOfNewRow});
		var newRow = createRow(newData.content, newData.order, newData.noteId, newData.pID);
		// Ti.API.log('table.data[0].rows: ' + JSON.stringify(table.data[0].rows,null,4));
		table.insertRowAfter(i,newRow.row,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});

		currentlyFocusedTextArea = newRow.textInput;
	}
	currentlyFocusedTextArea.focus();
	// remove "NO MORE NOTES" graphic
}
function deleteEmptyNote(i) {
	table.deleteRow(i,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.UP});
	currentlyFocusedTextArea = null;
	// add "NO MORE NOTES" graphic
}

