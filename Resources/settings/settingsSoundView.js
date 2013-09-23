/**
 * @author Robert Chatfield, Josh Newman
 * Settings > Sound
 * View
 */

var settingsSoundWin = Ti.UI.createWindow({
		      title: "Sound",
	          color: Settings.theme().text,
	backgroundColor: Settings.theme().bg2,
           barColor: Settings.theme().bg,
	   tabBarHidden: true
});

var settingsSoundData = [];

// SOUND TOGGLE
var settingsSoundRowSound = Ti.UI.createTableViewRow({
	          title: "Sound",
	         height: 44,
	          color: Settings.theme().text,
	backgroundColor: Settings.theme().bg,
	   touchEnabled: false
});
var settingsSoundToggle = Ti.UI.createSwitch({
	right: 10,
	value: Settings.sound()
});
settingsSoundRowSound.add(settingsSoundToggle);
settingsSoundData.push(settingsSoundRowSound);

// SOUND VOLUME
var settingsSoundRowVolume = Ti.UI.createTableViewRow({
	         height: 44,
	backgroundColor: Settings.theme().bg,
	   touchEnabled: false
});
var settingsSoundVolumeSlider = Ti.UI.createSlider({
	  left: 15,
	 right: 10,
	   min: 0,
	   max: 100,
	 value: Settings.volume()
});
settingsSoundRowVolume.add(settingsSoundVolumeSlider);
if (Settings.sound()) {
	settingsSoundData.push(settingsSoundRowVolume);
}

// BUILD TABLE
var settingsSoundTable = Ti.UI.createTableView({
	          style: Ti.UI.iPhone.TableViewStyle.GROUPED,
	          color: Settings.theme().text,
	backgroundColor: Settings.theme().bg2,
	           data: settingsSoundData,
	allowsSelection: false
});
settingsSoundWin.add(settingsSoundTable);
