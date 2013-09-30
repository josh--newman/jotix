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
	var ta = Ti.UI.createTextArea({
				 value: content,
				noteId: noteId,
			  parentId: parentId,
				  font: {fontFamily: THEME_FONT_FAMILY},
				 color: THEME_FONT_COLOR,
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
	var composeDoneButton = Ti.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.DONE, 
		noteId: noteId,
		textarea: ta
	});
	// var composeAddButton  = Ti.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.ADD});
	
	// Add view to self
	var contentWin = Ti.UI.createWindow({
		navBarHidden: true
	});
	contentWin.add(view);
	
	var nav = Ti.UI.iPhone.createNavigationGroup({
		window: contentWin
	});
	
	// create self
	var self = Ti.UI.createWindow({
		top: 0,
		leftNavButton: composeDoneButton
	});
	self.add(nav);

	// COLOR
	contentWin.navTintColor = "green"; 
	nav.navTintColor = "grey"; 
	self.navTintColor = "red";

	
	// OPEN
	self.open({modal: true});

	composeDoneButton.addEventListener('click', function(e){composeDone(e, self);});
	// composeAddButton.addEventListener( 'click', function(e){composeAdd( e, self); });
	ta.addEventListener('postlayout', function(e){ta.focus();});
	
	// ta.focus();
	
	// return {win:self, textarea: ta};
}

Ti.include('/main/composeController.js');

module.exports = composeView;
