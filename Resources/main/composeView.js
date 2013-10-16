/**
 * @author Robert Chatfield, Josh Newman
 * Compose new note
 * View
 */

var TEXTAREA_PADDING = 8;

function composeView(_args) {
	Ti.API.log('composeView(): '+ JSON.stringify(_args,null,4));
	var parentId = _args.parentId;
	var table = _args.table;
	var content="", noteId="";
	if (_args.noteData) {
		var content = _args.noteData.content;
		var noteId  = _args.noteData.noteId;
	} else {
		var newNoteData = Notes.insertNote({index: Notes.notesArray({parentId:parentId}).length, parentId: parentId});
		content = "";
		noteId = newNoteData.noteId; // DATA CALL TO GET 
	}
	
	/*
	 * 	WINDOW								-- self
	 * 	 > NAV (just for a toolbar)			-- nav
	 * 	  > WINDOW (dummy window)			-- contentWin
	 *     > VIEW (animates and changes)	-- view
	 *      > TEXTAREA 						-- ta
	 */
	
	// Add textarea to view
	ta = Ti.UI.createTextArea({
				 value: content,
				noteId: noteId,
			  parentId: parentId,
				  font: {fontFamily: Settings.font()},
				 color: Settings.theme().text,
	   backgroundColor: "none",
				// height: Ti.UI.SIZE,
				   top: TEXTAREA_PADDING,
				bottom: TEXTAREA_PADDING,
				  left: TEXTAREA_PADDING,
				 right: TEXTAREA_PADDING
	});

	// Create view (for animation)
	var view = Ti.UI.createView({
			           font: {fontFamily: Settings.font()},
					  color: Settings.theme().text,
			backgroundColor: Settings.theme().bg,
					   top: 0,
					bottom: 0,
					  left: 0,
					 right: 0
	});
	view.add(ta);
	
	// BUTTONS
	composeDoneButton = Ti.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.DONE, 
		noteId: noteId,
		textarea: ta
	});
	composeAddButton  = Ti.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.ADD, 
		noteId: noteId,
		textarea: ta,
		enabled: false
	});
	
	// ta.keyboardToolbar = [composeDoneButton, flexButton, composeAddButton];
	// ta.keyboardToolbarColor = '#999';
    // ta.keyboardToolbarHeight = 44;
	
	// Add view to self
	var contentWin = Ti.UI.createWindow({
		navBarHidden: true
	});
	contentWin.add(view);
	
	var nav = Ti.UI.iPhone.createNavigationGroup({
		window: contentWin
	});
	
	// create self
	self = Ti.UI.createWindow({
		top: 0,
		leftNavButton: composeDoneButton,
		rightNavButton: composeAddButton
	});
	self.add(nav);

	// COLOR
	contentWin.navTintColor = "green"; 
	nav.navTintColor = "grey"; 
	self.navTintColor = "red";

	
	// OPEN
	self.open({modal: true});

	
	// ta.focus();
	
	// return {win:self, textarea: ta};
}
