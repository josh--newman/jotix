function Database(_args) {
	
	// create a new note
	function createNote(parentId, content) {
		var db = Ti.Database.open("jotixdbv1");
		var breadcrumbs = db.execute('SELECT breadcrumbs FROM notes WHERE noteId = (?)', parentId).fieldByName('breadcrumbs') + ">" + content;
		db.execute('INSERT INTO notes (parentId, content, breadcrumbs) VALUES (?,?,?)', parentId, content, breadcrumbs);
		db.close();
	}
	
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
	
}

module.exports = Database;