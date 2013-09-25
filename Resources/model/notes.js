
var ORIENTATIONS = [Ti.UI.PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT];
var LABEL_PADDING = 15;

var Notes = {
	// APP STATE
	 setCurrentPID: function(parentID) {
	 					Ti.API.log('Settings PID: ' + parentID);
				     	Ti.App.Properties.setString("currentPID", parentID);
				    },
	    currentPID: function() {
						return Ti.App.Properties.getString("currentPID", "");
					},
	   contentAtID: function() {
						return "Parent's content";
					},
		notesArray: function() {
						var madeUpData = [];
			
						for (var i = 0; i < 5; i++) {
							madeUpData.push({
								noteId: i,
								parentId: "101",
								// index: i,
								content: "content @ " + i,
								// dateCreated: "1st October",
								// dateModified: "1st October",
								breadcrumbs: "Parent's content > content @ " + i
							});
						}
						
						return madeUpData;
					},
		insertNote: function(_args) {},
		removeNote: function(_args) {},
		  editNote: function(_args) {}
		   
};
