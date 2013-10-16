/**
 * @author Robert Chatfield, Josh Newman
 * Jotix Notes main window
 * View
 */

function NoteView() {
	Ti.API.log("new JotixList()");
	
	this.styledElements		= {rows:[], rowLabels:[], other:[]};
	this.THEME_GB			= Settings.theme().bg;
	this.THEME_GB2			= Settings.theme().bg2;
	this.THEME_FONT_FAMILY	= Settings.font();
	this.THEME_FONT_COLOR	= Settings.theme().text;
	this.THEME_SEARCH_COLOR	= Settings.theme().bg2;
	
	// CREATE TABLE
	this.table = Ti.UI.createTableView({
				   data: [this.createTableData()],
		backgroundColor: this.THEME_GB
		       // editable: true
	});
	
	// CREATE BUTTONS
	this.addButton	= Ti.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.ADD,
		    parentId: Notes.currentPID()
	});
	this.doneButton	= Ti.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.DONE,
		    parentId: Notes.currentPID()
	});
	
	// CREATE WINDOW
	this.win = Titanium.UI.createWindow({
		 rightNavButton: this.addButton,
		        // toolbar: navBarButtons,	// Hidden from Assignment 2... muhahaha
		           font: {fontFamily: this.THEME_FONT_FAMILY},
		          color: this.THEME_FONT_COLOR,
		backgroundColor: this.THEME_GB2,
	           barColor: this.THEME_GB,
	       tabBarHidden: true,
		       parentId: Notes.currentPID()
	});
	this.styledElements.other.push(this.win);
	this.win.add(this.table);
	Notes.addTableView({id: Notes.currentPID(), table: this.table});
	appIsInitialised = true;
	
}

NoteView.prototype.createRow = function(c, i, nID, pID) {
	var noteLabel = Ti.UI.createLabel({
				  text: c,
				 index: i,
				thisId: nID,
			  parentId: pID,
				  font: {fontFamily: this.THEME_FONT_FAMILY},
				 color: this.THEME_FONT_COLOR,
	   backgroundColor: "none",
				height: Ti.UI.SIZE,
				   top: LABEL_PADDING,	// included from /model/settings.js
				bottom: LABEL_PADDING,
				  left: LABEL_PADDING,
				 right: 70,
		  		  type: "edit"
	});

	var viewNestedButton = Ti.UI.createButton({
		 title: "more",
		thisId: nID,
		 right: LABEL_PADDING,
		  type: "nest"
		// systemButton: Titanium.UI.iPhone.SystemButton.CONTACT_ADD,
	});
	var viewNestedView = Ti.UI.createView({
		 right: 0,
		   top: 0,
		height: 48,
		 width: 70,
	backgroundColor: "yellow",
		  type: "nest"
	});
	viewNestedView.add(viewNestedButton);

	var row = Ti.UI.createTableViewRow({
			  height: Ti.UI.SIZE,
	 backgroundColor: this.THEME_GB,
			  thisId: nID,
			elements: {
			  			noteLabel: noteLabel,
			  			viewNestedButton: viewNestedButton
			  		  },
			    type: "edit"
	});
	row.add(noteLabel);
	row.add(viewNestedView);

	// this.styledElements.rowLabels.push(noteLabel);
	// this.styledElements.rows.push(row);


	// -- adding event listening here on the textInput
	//    because it can't be accessed from table.
	// noteLabel.addEventListener('click', function(e){this.noteClick(e); });
	// viewNestedButton.addEventListener('click', function(e){this.viewNestedClick(e); });

	return {row: row, noteLabel: noteLabel};
};

NoteView.prototype.createTableData = function() {
	var notesArr = Notes.notesArray({parentId: Notes.currentPID()});

	// CREATE ROWS
	var data = Ti.UI.createTableViewSection({
		    headerTitle: Notes.contentAtID({parentId: Notes.currentPID()}),
		backgroundColor: this.THEME_GB
	});

	for (var i = 0; i < notesArr.length; i++) {
		var row = this.createRow(notesArr[i].content, i, notesArr[i].noteId, notesArr[i].parentId).row;
		data.add(row);
	}
	return data;
};

NoteView.prototype.updateView = function() {
	Ti.API.log('JotixNotes.updateView()');

	this.THEME_GB          = Settings.theme().bg,
	this.THEME_GB2         = Settings.theme().bg2,
	this.THEME_FONT_FAMILY = Settings.font(),
	this.THEME_FONT_COLOR  = Settings.theme().text,
	this.THEME_SEARCH_COLOR= Settings.theme().bg2;

	for (var row in this.styledElements.rows) {
		this.styledElements.rows[row].backgroundColor = this.THEME_GB;
	}
	for (var rowLabel in this.styledElements.rowLabels) {
		this.styledElements.rowLabels[rowLabel].font  = {fontFamily: this.THEME_FONT_FAMILY};
		this.styledElements.rowLabels[rowLabel].color = this.THEME_FONT_COLOR;
	}
	for (var i in this.styledElements.other) {
		this.styledElements.other[i].font = {fontFamily: this.THEME_FONT_FAMILY};
		this.styledElements.other[i].color = this.THEME_FONT_COLOR;
		this.styledElements.other[i].backgroundColor = this.THEME_GB2;
		this.styledElements.other[i].barColor = this.THEME_GB;
	}
};

