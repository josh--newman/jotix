var navBarButtons = require("ui/main/mainButtons");

var LABEL_PADDING = 15;
	
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
	
	var THEME_GB          = Settings().theme().bg,
		THEME_GB2         = Settings().theme().bg2,
		THEME_FONT_FAMILY = Settings().font(),
		THEME_FONT_COLOR  = Settings().theme().text,
		THEME_SEARCH_COLOR= Settings().theme().bg2;
	
	for (var i = 0; i < count; i++) {
		thisId = (nextId + i);
		var row = Ti.UI.createTableViewRow({
			  height: Ti.UI.SIZE,
			hasChild: true,
	 backgroundColor: THEME_GB,
			  thisId: thisId,
			navGroup: navGroup
		});
		styledElements.rows.push(row);
		var label = Ti.UI.createLabel({
			  text: thisId + " and this is the best app!",
			  font: {fontFamily: THEME_FONT_FAMILY},
			 color: THEME_FONT_COLOR,
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
		  barColor: THEME_SEARCH_COLOR,
		showCancel: false,
		  hintText: 'search'
	});
	
	// CREATE TABLE
	var table = Ti.UI.createTableView({
		        data: [data],
		      search: search,
		searchHidden: true,
		    editable: true
	});
	
	// EDIT MODE
	var edit1 = Titanium.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.EDIT});
	var edit2 = Titanium.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.DONE});
	
	// CREATE VIEW
	var self = Titanium.UI.createWindow({ 
		 rightNavButton: edit1,
		           font: {fontFamily: THEME_FONT_FAMILY},
		          color: THEME_FONT_COLOR,
		backgroundColor: THEME_GB2,
	           barColor: THEME_GB,
	       tabBarHidden: true
	});
	styledElements.other.push(self);
	self.add(table);
	
	// UPDATE VIEW
	function updateView() {
		Ti.API.log('JotixNotes.updateView()');
		
		THEME_GB          = Settings().theme().bg,
		THEME_GB2         = Settings().theme().bg2,
		THEME_FONT_FAMILY = Settings().font(),
		THEME_FONT_COLOR  = Settings().theme().text,
		THEME_SEARCH_COLOR= Settings().theme().bg2;
		
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
	
	
	/**
	 * CONTROLLER
	 */
	// SEARCH
	search.addEventListener('change', function(e){
		e.value; // search string as user types
	});
	search.addEventListener('return', function(e){
		search.blur();
	});
	search.addEventListener('cancel', function(e){
		search.blur();
	});
	// TABLE
	table.addEventListener('click', function(e) {
		hideToolbar();
		// SHOW NOTES 
		Ti.API.log("parentId:" + e.rowData.thisId);
		navGroup.open(newList({
			navGroup: navGroup, 
			parentId: e.rowData.thisId
		}).win);
	});
	// EDIT MODE
	edit1.addEventListener('click', function(e){
		self.setToolbar(navBarButtons());
		self.rightNavButton = edit2;
	});
	edit2.addEventListener('click', function(e){
		hideToolbar();
	});
	function hideToolbar() {
		self.setToolbar(null,{animated:true});
		self.rightNavButton = edit1;
	}

	
	// RETURN VIEW
	// updateView();
	return {win: self, updateView: updateView};
}

module.exports = newList;
