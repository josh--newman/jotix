/**
 * @author Robert Chatfield, Josh Newman
 * Settings > Sound
 * Controller
 */

settingsSoundToggle.addEventListener('change', function(e){
	if (e.value === false) {
		settingsSoundTable.deleteRow(1, {animationStyle:Titanium.UI.iPhone.RowAnimationStyle.TOP});
	} else {
		settingsSoundTable.appendRow(settingsSoundRowVolume, {animationStyle:Titanium.UI.iPhone.RowAnimationStyle.TOP});
	}
	Settings.setSound(e.value);
});
settingsSoundVolumeSlider.addEventListener('touchend', function(e){
	Settings.setVolume(e.value);
	playSound("HI");
});
