/**
 * @author Robert Chatfield, Josh Newman
 * Jotix Notes
 * Model
 */

var ORIENTATIONS = [Ti.UI.PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT];
var LABEL_PADDING = 15;
var tableViewCollection = {};

var Notes = {
	// APP STATE
	 setCurrentPID: function(parentID) {
	 					Ti.API.log('Settings PID: ' + parentID);
				     	Ti.App.Properties.setString("currentPID", parentID);
				    },
	    currentPID: function() {
						Ti.API.log('Notes.currentPID()');
						return Ti.App.Properties.getString("currentPID", -1);
					},
	   contentAtID: function(_args) {
						Ti.API.log('Notes.contentAtID(): ' + JSON.stringify(_args,null,4));
						var PID = _args.parentId;
						for (var n in notesFlatDatabase) {
							if (notesFlatDatabase[n].noteId == PID) {
								return notesFlatDatabase[n].content;
							}
						}
						return "";
					},
		notesArray: function(_args) {
						Ti.API.log('Notes.notesArray(): ' + JSON.stringify(_args,null,4));
						var PID = _args.parentId;
						// FIND ALL instances of that item
						var notesWithThisPID = [];
						for (var n in notesFlatDatabase) {
							if (notesFlatDatabase[n].parentId == PID) {
								notesWithThisPID.push(notesFlatDatabase[n]);
							}
						}
						Ti.API.log('notesFlatDatabase: ' + JSON.stringify(notesFlatDatabase,null,4));
						return notesWithThisPID;
					},
	pIDBreadcrumbs: function(_args) {
						Ti.API.log('Notes.pIDBreadcrumbs(): ' + JSON.stringify(_args,null,4));
						var PID = _args.parentId;
						var tempPID = PID;
						var bcArray = [];
						bcArray.push(tempPID);
						var giveupcount = 30;
						while (tempPID > 0 && giveupcount > 0) {
							tempPID = _getParentIdOf(tempPID);
							if (tempPID != -1) bcArray.push(tempPID);
							giveupcount--;
						}
						return bcArray.reverse();
					},
		insertNote: function(_args) {
						Ti.API.log('Notes.insertNote(): ' + JSON.stringify(_args,null,4));
						var insertIndex = _args.index,
							insertIntoParentId = _args.parentId;
						Ti.App.Properties.setString("currentPID", insertIntoParentId);
						var newNote = _insertNewBlankNote(insertIntoParentId, insertIndex);
						_syncDatabase();
						return newNote;
					},
		removeNote: function(_args) {
						Ti.API.log('Notes.removeNote(): ' + JSON.stringify(_args,null,4));
						var removeId = _args.id;
						for (var n in notesFlatDatabase) {
							if (notesFlatDatabase[n].noteId == removeId) {
								// splice out of database 
								Ti.API.log('Removed: ' +notesFlatDatabase.splice(n,1));
							}
						}
						_syncDatabase();
					},
		 amendNote: function(_args) {
						Ti.API.log('Notes.amendNote(): ' + JSON.stringify(_args,null,4));
						var amendID = _args.id,
							amendContent = _args.content;
						for (var n in notesFlatDatabase) {
							if (notesFlatDatabase[n].noteId == amendID) {
								notesFlatDatabase[n].content = amendContent;
								notesFlatDatabase[n].breadcrumbs = _breadcrumbs(amendID) +">"+ amendContent;
							}
						}
						_syncDatabase();
		 			}
		   
};


var defaultData = [
	{
		    content: "Jotix Note App",
		     noteId: -1,
		   parentId: null,
		      order: 0,
		breadcrumbs: ""
	},
	{
		    content: "1612ICT",
		     noteId: 0,
		   parentId: -1,
		      order: 0,
		breadcrumbs: "1612ICT"
	},
	{
		    content: "Lecturer",
		     noteId: 5,
		   parentId: 0,
		      order: 0,
		breadcrumbs: "1612ICT>Lecturer"
	},
	{
		    content: "Jolon Faichney",
		     noteId: 3,
		   parentId: 5,
		      order: 0,
		breadcrumbs: "1612ICT>Lecturer>Jolon Faichney"
	},
	{
		    content: "(07) 555 28792",
		     noteId: 1,
		   parentId: 5,
		      order: 1,
		breadcrumbs: "1612ICT>Lecturer>(07) 555 28792"
	},
	{
		    content: "G09 1.58",
		     noteId: 2,
		   parentId: 5,
		      order: 2,
		breadcrumbs: "1612ICT>Lecturer>(07) 555 28792 "
	},
	{
		    content: "Design Principles",
		     noteId: 4,
		   parentId: 0,
		      order: 1,
		breadcrumbs: "1612ICT>Design Principles"
	},
	{
		    content: "Simplicity",
		     noteId: 6,
		   parentId: 4,
		      order: 0,
		breadcrumbs: "1612ICT>Design Principles>Simplicity"
	},
	{
		    content: "Consistency",
		     noteId: 7,
		   parentId: 4,
		      order: 1,
		breadcrumbs: "1612ICT>Design Principles>Consistency"
	},
	{
		    content: "Efficiency",
		     noteId: 8,
		   parentId: 4,
		      order: 2,
		breadcrumbs: "1612ICT>Design Principles>Efficiency"
	},
	{
		    content: "Learnability",
		     noteId: 9,
		   parentId: 4,
		      order: 3,
		breadcrumbs: "1612ICT>Design Principles>Learnability"
	},
	{
		    content: "Satisfaction",
		     noteId: 10,
		   parentId: 4,
		      order: 4,
		breadcrumbs: "1612ICT>Design Principles>Satisfaction"
	},
	{
		    content: "1005ICT",
		     noteId: 11,
		   parentId: -1,
		      order: 1,
		breadcrumbs: "1005ICT"
	},
	{
		    content: "2001ICT",
		     noteId: 12,
		   parentId: -1,
		      order: 2,
		breadcrumbs: "2001ICT"
	}
];

Ti.App.Properties.setObject("notesDatabase", defaultData);

var notesFlatDatabase = Ti.App.Properties.getObject("notesDatabase", defaultData);

function _syncDatabase() {
	Ti.App.Properties.setObject("notesDatabase", notesFlatDatabase);
}

function _createNote(PID, i) {
	// increment nextNoteId
	Ti.App.Properties.setInt("nextNoteId", Ti.App.Properties.getInt("nextNoteId", 200) + 1);
	var newNote = {
		    content: "",
		     noteId: Ti.App.Properties.getInt("nextNoteId", 200),
		   parentId: PID,
		      order: i,
		breadcrumbs: _breadcrumbs(PID) +">"
	};
	Ti.API.log("New note created: " + JSON.stringify(newNote,null,4));
	return newNote;
}
function _insertNewBlankNote(PID, i) {
	// FIND ALL instances of that item
	var notesWithThisPID = [];
	for (var n in notesFlatDatabase) {
		if (notesFlatDatabase[n].parentId == PID) {
			// splice out of database and into array
			notesWithThisPID.push(notesFlatDatabase.splice(n,1)[0]);
		}
	}
	// INSERT THE NEW BLANK ONE
	if (!i) i = notesWithThisPID.length;
	var theNewNote = _createNote(PID, i);
	notesWithThisPID.splice(i, 0, theNewNote);
	Ti.API.log("INSERT notesWithThisPID: " + JSON.stringify(notesWithThisPID,null,4));
	for (var n in notesWithThisPID) {
		if (notesWithThisPID[n].order >= i) {notesWithThisPID[n].order++;} 
		notesFlatDatabase.push(notesWithThisPID[n]);
	}
	Ti.API.log("INSERT notesFlatDatabase: " + JSON.stringify(notesFlatDatabase,null,4));
	return theNewNote;
}

function _breadcrumbs(PID) {
	var bcSTR = "";
	for (var i in notesFlatDatabase) {
		if (notesFlatDatabase[i].noteId == PID) {
			bcSTR = notesFlatDatabase[i].breadcrumbs;
		} 
	}
	return bcSTR;
}

function _getParentIdOf(id) {
	var pID;
	for (var n in notesFlatDatabase) {
		if (notesFlatDatabase[n].noteId == id) {
			pID = notesFlatDatabase[n].parentId;
			break;
		}
	}
	return pID;
}
