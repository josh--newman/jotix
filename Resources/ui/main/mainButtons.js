function mainButtons() {
	// 
	// SYSTEM BUTTONS
	// 
	var add 	= Titanium.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.ADD});
	var done 	= Titanium.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.DONE});
	var action 	= Titanium.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.ACTION});
	var flex    = Titanium.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE});
	
	var deviceWidth = Ti.Platform.displayCaps.deviceWidth;
	var navBarBtns = [];
	var btn1 = Ti.UI.createButton({
	    title :'Share',
	    // systemButton: Titanium.UI.iPhone.SystemButton.ACTION,
	    right : 0,
	    width : 50,
	    height : 30
	});
	var btn2 = Ti.UI.createButton({
	    title :'Sort',
	    right : 50,
	    width : 50,
	    height : 30
	});
	var btn3 = Ti.UI.createButton({
	    title :'Add',
	    // systemButton:Titanium.UI.iPhone.SystemButton.ADD,
	    right : 50,
	    width : 50,
	    height : 30
	});
	navBarBtns.push(action);
	navBarBtns.push(flex);
	navBarBtns.push(btn2);
	navBarBtns.push(flex);
	navBarBtns.push(add);
	
	return navBarBtns;
}

module.exports = mainButtons;
