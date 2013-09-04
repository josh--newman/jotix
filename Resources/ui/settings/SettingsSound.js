function SettingsSound(_args) {
	var self = Ti.UI.createWindow({
		title: "Sound",
		font: {fontFamily: Settings().font()},
		color: Settings().theme().text,
		backgroundColor: Settings().theme().bg2,
	    barColor: Settings().theme().bg,
		tabBarHidden: true
	});
	
	var data = [];
	
	var rowSound = Ti.UI.createTableViewRow({
		          title: "Sound",
		         height: 44,
		           font: {fontFamily: Settings().font()},
		          color: Settings().theme().text,
		backgroundColor: Settings().theme().bg
	});
	var soundToggle = Ti.UI.createSwitch({
		right: 10,
		value: Settings().sound()
	});
	rowSound.add(soundToggle);
	data.push(rowSound);
	
	soundToggle.addEventListener('change', function(e){
		if (e.value == false) {
			settingsTable.deleteRow(1, {animationStyle:Titanium.UI.iPhone.RowAnimationStyle.TOP});
		} else {
			settingsTable.appendRow(rowVolume, {animationStyle:Titanium.UI.iPhone.RowAnimationStyle.TOP});
		}
		Settings().setSound(e.value);
	});
	
	var rowVolume = Ti.UI.createTableViewRow({
		         height: 44,
		backgroundColor: Settings().theme().bg	
	});
	var volumeSlider = Ti.UI.createSlider({
		  left: 15,
		 right: 10,
		   min: 0,
		   max: 100,
		 value: Settings().volume()
	});
	rowVolume.add(volumeSlider);
	if (Settings().sound()) {
		data.push(rowVolume);
	}
	
	// volumeSlider.addEventListener('change', function(e){
		// Ti.API.log('volume: ' + Math.round(e.value));
	// });
	volumeSlider.addEventListener('touchend', function(e){
		// Ti.API.log('volume: ' + Math.round(e.value));
		// SET VOLUME TO SETTINGS
		Settings().setVolume(e.value);
	});
	
	var settingsTable = Ti.UI.createTableView({
		          style: Ti.UI.iPhone.TableViewStyle.GROUPED,
		           font: {fontFamily: Settings().font()},
		          color: Settings().theme().text,
		backgroundColor: Settings().theme().bg2,
		           data: data
	});
	
	self.add(settingsTable);
	
	return self;
}

module.exports = SettingsSound;
