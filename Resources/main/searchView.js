/**
 * @author Robert Chatfield, Josh Newman
 * Search
 * View
 */
var searchView = Ti.UI.createWindow({
	          title: "Search",
	          color: Settings.theme().text,
	backgroundColor: Settings.theme().bg2,
           barColor: Settings.theme().bg,
	   tabBarHidden: true
});
var searchDoneButton = Titanium.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.DONE});
searchView.setRightNavButton(searchDoneButton);

var searchBar = Titanium.UI.createSearchBar({
    // barColor:'#000', 
    // height:43,
    showCancel: false,
      hintText: 'Search'
});

var tableview = Titanium.UI.createTableView({
	// minRowHeight:60,
			     search: searchBar,
        filterAttribute: 'breadcrumbs',
    filterCaseSensitive: false
});

searchView.add(tableview);

function generateSearchableTable() {
	var dbdata = [
		{
			parentID: "pID1",
			content: "Content is good",
			breadcrumbs: "All of the content > Content is good" 
		},
		{
			parentID: "pID1",
			content: "Content is bad",
			breadcrumbs: "All of the content > Content is good" 
		},
		{
			parentID: "pID1",
			content: "Content is alright",
			breadcrumbs: "All of the content > Content is good" 
		},
		{
			parentID: "pID2",
			content: "IAD is the best",
			breadcrumbs: "Interactive Application Development > IAD is the best" 
		}
	];
	
	var tabledata = [];
	
	for (var i in dbdata) {
		var row = Ti.UI.createTableViewRow({
			title: dbdata[i].content,
			breadcrumbs: dbdata[i].breadcrumbs,
			parentID: dbdata[i].parentID
		});
		tabledata.push(row);
	}
	
	tableview.data = tabledata;	
	
	searchBar.focus();
}
