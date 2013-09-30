/**
 * @author Robert Chatfield, Josh Newman
 * Jotix Notes main window
 * View
 */

Ti.API.log("new JotixList()");

var styledElements = {rows:[], rowLabels:[], other:[]};
var THEME_GB          = Settings.theme().bg,
	THEME_GB2         = Settings.theme().bg2,
	THEME_FONT_FAMILY = Settings.font(),
	THEME_FONT_COLOR  = Settings.theme().text,
	THEME_SEARCH_COLOR= Settings.theme().bg2;

function createRow(c, i, nID, pID) {
	var row = Ti.UI.createTableViewRow({
			  height: Ti.UI.SIZE,
	 backgroundColor: THEME_GB,
			  thisId: nID
	});
	styledElements.rows.push(row);
	var noteLabel = Ti.UI.createLabel({
				  text: c,
				 index: i,
				thisId: nID,
			  parentId: pID,
				  font: {fontFamily: THEME_FONT_FAMILY},
				 color: THEME_FONT_COLOR,
	   backgroundColor: "none",
				height: Ti.UI.SIZE,
				   top: LABEL_PADDING,	// included from /model/settings.js
				bottom: LABEL_PADDING,
				  left: LABEL_PADDING,
				 right: 60
	});
	styledElements.rowLabels.push(noteLabel);
	row.add(noteLabel);
	
	var viewNestedButton = Ti.UI.createButton({
		title: "more",
		thisId: nID
		// systemButton: Titanium.UI.iPhone.SystemButton.CONTACT_ADD,
	});
	var viewNestedView = Ti.UI.createView({
		 right: 10,
		 width: 60,
		height: 44
	});
	viewNestedView.add(viewNestedButton);
	row.add(viewNestedView);
	
		
	// -- adding event listening here on the textInput
	//    because it can't be accessed from table.
	noteLabel.addEventListener('click', function(e){noteClick(e); });
	viewNestedButton.addEventListener('click', function(e){viewNestedClick(e); });
	
	return {row: row, noteLabel: noteLabel};
}


function createTableData() {
	styledElements.rowLabels = [];	// initialise
	var notesArr = Notes.notesArray({parentId: Notes.currentPID()});
	
	// CREATE ROWS
	var data = Ti.UI.createTableViewSection({
		    headerTitle: Notes.contentAtID({parentId: Notes.currentPID()}),
		backgroundColor: THEME_GB
	});	
	
	for (var i = 0; i < notesArr.length; i++) {
		var row = createRow(notesArr[i].content, i, notesArr[i].noteId, notesArr[i].parentId).row;
		data.add(row);
	}
	return data;
}

// CREATE TABLE
var table = Ti.UI.createTableView({
			   data: [createTableData()],
	backgroundColor: THEME_GB
	       // editable: true
});

// CREATE BUTTONS
var addButton	= Ti.UI.createButton({
	systemButton: Titanium.UI.iPhone.SystemButton.ADD,
	    parentId: Notes.currentPID()
});
var doneButton	= Ti.UI.createButton({
	systemButton: Titanium.UI.iPhone.SystemButton.DONE,
	    parentId: Notes.currentPID()
});

// CREATE WINDOW
var self = Titanium.UI.createWindow({ 
	 rightNavButton: addButton,
	        // toolbar: navBarButtons,	// Hidden from Assignment 2... muhahaha
	           font: {fontFamily: THEME_FONT_FAMILY},
	          color: THEME_FONT_COLOR,
	backgroundColor: THEME_GB2,
           barColor: THEME_GB,
       tabBarHidden: true,
	       parentId: Notes.currentPID()
});
styledElements.other.push(self);
self.add(table);
appIsInitialised = true;

// EVENT LISTENERS   -- handled in CONTROLLER
// table.addEventListener('click', function(e) {tableRowClick(e);});
addButton.addEventListener('click', function(e) {addButtonClick(e);});
doneButton.addEventListener('click', function(e) {doneButtonClick(e);});

// UPDATE VIEW
function updateView() {
	Ti.API.log('JotixNotes.updateView()');
	
	THEME_GB          = Settings.theme().bg,
	THEME_GB2         = Settings.theme().bg2,
	THEME_FONT_FAMILY = Settings.font(),
	THEME_FONT_COLOR  = Settings.theme().text,
	THEME_SEARCH_COLOR= Settings.theme().bg2;
	
	for (var row in styledElements.rows) {
		styledElements.rows[row].backgroundColor = THEME_GB;
	} 
	for (var rowLabel in styledElements.rowLabels) {
		styledElements.rowLabels[rowLabel].font  = {fontFamily: THEME_FONT_FAMILY};
		styledElements.rowLabels[rowLabel].color = THEME_FONT_COLOR;
	} 
	for (var i in styledElements.other) {
		styledElements.other[i].font = {fontFamily: THEME_FONT_FAMILY};
		styledElements.other[i].color = THEME_FONT_COLOR;
		styledElements.other[i].backgroundColor = THEME_GB2;
		styledElements.other[i].barColor = THEME_GB;
	}		
}

