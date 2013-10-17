/**
 * @author Robert Chatfield, Josh Newman
 * Sound
 * Controller
 */

var Sounds = {
	HI : "beep-timber.aif",
	LOW: "beep-shinymetal.aif"
};

function playSound(s) {
	Ti.API.log('playSound('+s+')');
	if (Settings.sound()) {
		var url = "/sound/" + Sounds[s];
		Ti.API.log('Playing: ' + url + ', at vol: '+ Settings.volume());
		var p = Ti.Media.createSound({url:url});
		p.setVolume(Settings.volume());
		p.play();
		Ti.API.log('Played : ' + url);
	} else {
		Ti.API.log('Not Played');
	}
}
