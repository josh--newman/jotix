function database() {
	
	// create a new note
	function createNote(parentId, content) {
		var db = Ti.Database.open("jotixdbv1");
		var index = getNextIndex(parentId, db);
		var breadcrumbs = db.execute('SELECT breadcrumbs FROM notes WHERE noteId = (?)', parentId).fieldByName('breadcrumbs') + ">" + content;
		db.execute('INSERT INTO notes (parentId, content, index, breadcrumbs) VALUES (?,?,?,?)', parentId, content, index, breadcrumbs);
		db.close();
	}
	
	// load notes
	function showNotes(parentId) {
		var db = Ti.Database.open("jotixdbv1");
		var rows = db.execute('SELECT * FROM notes WHERE parentId = (?)', parentId);
		db.close();
		return rows;
	}
	
	// update existing note
	function updateNote(id, newContent) {
		var db = Ti.Database.open("jotixdbv1");
		db.execute('UPDATE notes SET content = (?), dateModified = CURRENT_TIMESTAMP WHERE noteId = (?)', content,  id);
		db.close();
	}
	
	// delete a note
	function deleteNote(id) {
		var db = Ti.Database.open("jotixdbv1");
		db.execute('DELETE FROM notes WHERE noteId = ' + id);
		db.close();
	}
	
	// helper methods
	function getNextIndex(parentId, db) {
		var index = db.execute('SELECT [index] FROM notes WHERE parentId = (?) ORDER BY [index] ASC', parentId);
		var max = 0;
		while (index.isValidRow()) {
			max = index.fieldByName('index') > max ? index.fieldByName('index') : max;
			index.next();
		}
		index.close();
		index = ++max;
		return index;
	}
	
}

module.exports = database;