/**
 * @author Robert Chatfield, Josh Newman
 * Jotix Notes main window
 * View & Controller
 */

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
	
	var THEME_GB          = Settings.theme().bg,
		THEME_GB2         = Settings.theme().bg2,
		THEME_FONT_FAMILY = Settings.font(),
		THEME_FONT_COLOR  = Settings.theme().text,
		THEME_SEARCH_COLOR= Settings.theme().bg2;
	
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
		var textInput = Ti.UI.createTextArea({
					 value: thisId + " and this is the best app!",
					  font: {fontFamily: THEME_FONT_FAMILY},
					 color: THEME_FONT_COLOR,
		   backgroundColor: "none",
					height: Ti.UI.SIZE,
					   top: LABEL_PADDING / 3,
					bottom: LABEL_PADDING / 3,
					  left: LABEL_PADDING,
					 right: LABEL_PADDING
		});
		// var label = Ti.UI.createLabel({
			  // text: thisId + " and this is the best app!",
			  // font: {fontFamily: THEME_FONT_FAMILY},
			 // color: THEME_FONT_COLOR,
			// height: Ti.UI.SIZE,
			  // left: LABEL_PADDING,
			   // top: LABEL_PADDING,
			// bottom: LABEL_PADDING
		// });
		styledElements.rowLabels.push(textInput);
		row.add(textInput);
		
		// -- adding event listening here on the textInput
		//    because it can't be accessed from table.
		textInput.addEventListener('focus', function(e){
			// Make a done button in rightNavButton 
		});
		textInput.addEventListener('blur', function(e){
			Ti.API.log('blur textInput: ' + JSON.stringify(e,null,4));
			// Make an add button in rightNavButton
			// save contents
		});
		textInput.addEventListener('return', function(e){
			// Check that blur gets triggered
			// Add new item below current index
			// focus on item
		});
		
		data.add(row);
	}
		
	// CREATE TABLE
	var table = Ti.UI.createTableView({
		        data: [data],
		    editable: true
	});
	
	// ADD
	var addButton = Ti.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.ADD});
	
	// CREATE VIEW
	var self = Titanium.UI.createWindow({ 
		 rightNavButton: addButton,
		        toolbar: navBarButtons,
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
		
		THEME_GB          = Settings.theme().bg,
		THEME_GB2         = Settings.theme().bg2,
		THEME_FONT_FAMILY = Settings.font(),
		THEME_FONT_COLOR  = Settings.theme().text,
		THEME_SEARCH_COLOR= Settings.theme().bg2;
		
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
	// TABLE
	table.addEventListener('click', function(e) {
		// SHOW NOTES 
		Ti.API.log("parentId:" + e.rowData.thisId);
		navGroup.open(newList({
			navGroup: navGroup, 
			parentId: e.rowData.thisId
		}).win);
	});
	table.addEventListener('focus', function(e) {
		// This doesn't get called
		Ti.API.log("note Focus:" + JSON.stringify(e,null,4));
	});
	table.addEventListener('blur', function(e) {
		// This doesn't get called
		Ti.API.log("note blur:" + JSON.stringify(e,null,4));
	});

	
	// RETURN VIEW
	// updateView();
	return {win: self, updateView: updateView};
}

module.exports = newList;
