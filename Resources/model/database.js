function Database(_args) {
	
	// create a new item
	function createItem(parentId, content) {
		var db = Ti.Database.open("jotixdb");
		db.execute('CREATE TABLE IF NOT EXISTS notes (parentId INT, content TEXT, dateCreated TEXT, order INT)');
		db.execute('INSERT INTO notes (parentId, content) VALUES (?,?)', parentId, content); // need some way to get the order
		db.close();
	}
	
	// update existing item
	function updateItem(item, newContent) {
		// var db = Ti.Database.open("maindb");
		// db.close();
	}
	
	// delete an item
	function deleteItem(item) {
		// var db = Ti.Database.open("jotixdb");
		
		// db.close();
	}
	
}

module.exports = Database;