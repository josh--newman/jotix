/**
 * @author Robert Chatfield, Josh Newman
 * Jotix Notes main window
 * Controller
 */

var currentlyFocusedTextArea;

function noteFocus(e) {
	Ti.API.log('focus textInput: ' + JSON.stringify(e,null,4));
	// Make a done button in rightNavButton 
	self.setRightNavButton(doneButton);
	currentlyFocusedTextArea = e.source;
}
function noteBlur(e) {
	Ti.API.log('blur textInput: ' + JSON.stringify(e,null,4));
	// Make an add button in rightNavButton
	self.setRightNavButton(addButton);
	// save contents
	if (e.source.value == "") {
		table.deleteRow(e.source.index,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.UP});
		currentlyFocusedTextArea = null;
	} else {
		// update table
	}
	
}
function noteReturn(e) {
	Ti.API.log('return textInput: ' + JSON.stringify(e,null,4));
	// Add new item below current index
	insertNote(e.source.parentId, e.source.index);
}
function insertNote(pID, i) {
	// add a new note after theIndex
	Notes.setCurrentPID(pID);	// Just in case
	var indexOfNewRow = i + 1;
	Ti.API.log('adding new note to: ' + Notes.currentPID() + ' at index: ' + indexOfNewRow);
	table.scrollToIndex(indexOfNewRow);
	var newRow = createRow("", indexOfNewRow, 111, pID);
	table.insertRowAfter(i,newRow.row,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});
	currentlyFocusedTextArea = newRow.textInput;
	currentlyFocusedTextArea.focus();
}

function tableRowClick(e) {
	// SHOW NOTES 
	Notes.setCurrentPID(e.source.thisId);
	Ti.API.log("tableRowClick; parentId:" + Notes.currentPID());
	mainNavGroup.open(newList().win);	
}

function addButtonClick(e) {
	Ti.API.log('addButtonClick');
	self.setRightNavButton(doneButton);
	insertNote(e.source.parentId, table.sections[0].rows.length - 1);
}
function doneButtonClick(e) {
	Ti.API.log('doneButtonClick');
	self.setRightNavButton(addButton);
	currentlyFocusedTextArea.blur();
}
