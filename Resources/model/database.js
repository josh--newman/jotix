var DB_NAME = "jotixdbv1";

function Database() {
	this.db = Ti.Database.install('/model/jotixdb.sqlite', DB_NAME);	
}

// create a new note
Database.prototype.createNote = function(parentId, content) {
	db = Ti.Database.open(DB_NAME);
	var index = getNextIndex(parentId, db);
	var breadcrumbs = db.execute('SELECT breadcrumbs FROM notes WHERE noteId = (?)', parentId).fieldByName('breadcrumbs') + ">" + content;
	db.execute('INSERT INTO notes (parentId, content, [index], breadcrumbs) VALUES (?,?,?,?)', parentId, content, index, breadcrumbs);
	db.close();
};

// load notes list
Database.prototype.showNotes = function(parentId) {
	db = Ti.Database.open(DB_NAME);
	var sortPref;
	switch (0) { // get sort preference from settings here
		case 0:
			sortPref = "[index]";
			break;
		case 1:
			sortPref = "content";
			break;
		case 2:
			sortPref = "dateCreated";
			break;
	}
	Ti.API.log("sortPref: " + sortPref);
	var rows = db.execute('SELECT content, noteId, parentId FROM notes WHERE parentId = (?) ORDER BY ' + sortPref + ' ASC', parentId);
	var result = [];
	while (rows.isValidRow()) {
		result.push({
			content: rows.fieldByName('content'),
			noteId: rows.fieldByName('noteId'),
			parentId: rows.fieldByName('parentId')
		});
		rows.next();
	}
	// Ti.API.log(JSON.stringify(result, null, 4));
	rows.close();
	db.close();
	return result;
};

// load ALL notes
Database.prototype.showAllNotes = function() {
	db = Ti.Database.open(DB_NAME);
	var rows = db.execute("SELECT content, noteId, parentId, breadcrumbs FROM notes");
	var result = [];
	while (rows.isValidRow()) {
		result.push({
			content: rows.fieldByName('content'),
			noteId: rows.fieldByName('noteId'),
			parentId: rows.fieldByName('parentId'),
			breadcrumbs: rows.fieldByName('breadcrumbs')
		});
		rows.next();
	}
	rows.close();
	db.close();
	return result;
};

// update existing note
Database.prototype.updateNote = function(id, newContent) {
	db = Ti.Database.open(DB_NAME);
	var parentId = db.execute('SELECT parentId FROM notes WHERE noteId = (?)', id).fieldByName('parentId', Titanium.Database.FIELD_TYPE_INT);
	var breadcrumbs = db.execute('SELECT breadcrumbs FROM notes WHERE noteId = (?)', parentId).fieldByName('breadcrumbs') + ">" + newContent;
	db.execute('UPDATE notes SET content = (?), dateModified = CURRENT_TIMESTAMP, breadcrumbs = (?) WHERE noteId = (?)', newContent, breadcrumbs, id);
	//set breadcrumbs
	db.close();
};

// delete a note
Database.prototype.deleteNote = function(id) {
	db = Ti.Database.open(DB_NAME);
	db.execute('DELETE FROM notes WHERE noteId = ?', id);
	db.close();
};

// get content at ID
Database.prototype.contentAtID = function(id) {
	db = Ti.Database.open(DB_NAME);
	var rows = db.execute('SELECT content FROM notes WHERE noteId = (?)', id);
	Ti.API.log("rows: " + JSON.stringify(rows,null,4));
	var result = [];
	while (rows.isValidRow()) {
		result.push({
			content: rows.fieldByName('content')
		});
		rows.next;
	}
	rows.close();
	db.close();
	return result;
};


// helper methods
function getNextIndex(parentId, db) {
	var index = db.execute('SELECT [index] FROM notes WHERE parentId = (?) ORDER BY [index] ASC', parentId);
	var max = 0;
	while (index.isValidRow()) {
		max = index.fieldByName('index') > max ? index.fieldByName('index') : max;
		index.next();
	}
	index.close();
	return ++max;
};


