var navBarButtons = require("ui/main/mainButtons");

function newList(_args){
	Ti.API.log("new JotixList()");
	
	var navGroup = _args.navGroup;
	var parentId = _args.parentId;
	var styledElements = {rows:[], rowLabels:[], other:[]};
	
	var nextId = parentId + '+';
	var count = 20;
	
	// CREATE ROWS
	var data = Ti.UI.createTableViewSection({
		headerTitle: parentId
	});	
	
	var LABEL_PADDING = 15;
	
	for (var i = 0; i < count; i++) {
		thisId = (nextId + i);
		var row = Ti.UI.createTableViewRow({
			  height: Ti.UI.SIZE,
			hasChild: true,
	 backgroundColor: Settings().theme().bg,
			  thisId: thisId,
			navGroup: navGroup
		});
		styledElements.rows.push(row);
		var label = Ti.UI.createLabel({
			  text: thisId + " and this is the best app!",
			  font: {fontFamily: Settings().font()},
			 color: Settings().theme().text,
			height: Ti.UI.SIZE,
			  left: LABEL_PADDING,
			   top: LABEL_PADDING,
			bottom: LABEL_PADDING
		});
		styledElements.rowLabels.push(label);
		row.add(label);
		data.add(row);
	}
	
	// CREATE SEARCH
	var search = Titanium.UI.createSearchBar({
		barColor: Settings().theme().bg2,
		showCancel: false,
		hintText: 'search'
	});
	search.addEventListener('change', function(e){
		e.value; // search string as user types
	});
	search.addEventListener('return', function(e){
		search.blur();
	});
	search.addEventListener('cancel', function(e){
		search.blur();
	});
	
	// CREATE TABLE
	var table = Ti.UI.createTableView({
		  data: [data],
		search: search,
		searchHidden:true
	});
	table.addEventListener('click', function(e) {
		hideToolbar();
		showNotes(e);
	});
	
	// EDIT MODE
	var edit1 = Titanium.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.EDIT});
	var edit2 = Titanium.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.DONE});
	edit1.addEventListener('click', function(e){
		self.setToolbar(navBarButtons());
		self.rightNavButton = edit2;
	});
	edit2.addEventListener('click', function(e){
		hideToolbar();
	});
	
	function hideToolbar() {
		self.setToolbar([]);
		self.rightNavButton = edit1;
	}
	
	// UPDATE VIEW
	function updateView() {
		Ti.API.log('JotixNotes.updateView()');
		for (var row in styledElements.rows) {
			styledElements.rows[row].backgroundColor = Settings().theme().bg;
		} 
		for (var rowLabel in styledElements.rowLabels) {
			styledElements.rowLabels[rowLabel].font  = {fontFamily: Settings().font()};
			styledElements.rowLabels[rowLabel].color = Settings().theme().text;
		} 
		for (var i in styledElements.other) {
			styledElements.other[i].font = {fontFamily: Settings().font()};
			styledElements.other[i].color = Settings().theme().text;
			styledElements.other[i].backgroundColor = Settings().theme().bg2;
			styledElements.other[i].barColor = Settings().theme().bg;
		}		
	}
	
	// CREATE VIEW
	var self = Titanium.UI.createWindow({ 
		rightNavButton: edit1,
		font: {fontFamily: Settings().font()},
		color: Settings().theme().text,
		backgroundColor: Settings().theme().bg2,
	    barColor: Settings().theme().bg,
	    tabBarHidden: true
	});
	styledElements.other.push(self);
	self.add(table);
	
	// RETURN VIEW
	updateView();
	return {table: self, updateView: updateView};
}

function showNotes(e) {
	// Ti.API.log("showNotes(" + JSON.stringify(e,null,4) + ")");
	// i'm guessing.. 
	var navGroup = e.rowData.navGroup;
	var parentId = e.rowData.thisId;
	Ti.API.log("parentId:" + parentId);
	navGroup.open(newList({navGroup: navGroup, parentId: parentId}).table);
}

module.exports = newList;
