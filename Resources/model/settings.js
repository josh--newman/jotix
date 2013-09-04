/**
 * STATIC VALUES
 */

var _themes = [
		{
			title: "Default",
			text : "#000",		// Black
			text2: "#6D6D72",	// Grey
			sym  : "#2793FF",	// Blue
			bg   : "#FFF",		// White
			bg2  : "#F8F8F7",	// Off-white (section header)
			bg3  : "#EFEFF4"	// Grey (search)
		},
		{
			title: "Invert",
			text : "#FFF",		// White
			text2: "#92928D",	// Grey
			sym  : "#FC6E21",	// Orange
			bg   : "#000",		// Black
			bg2  : "#10100A",	// Off-black
			bg3  : "#363631"	// Dark Grey
		},
		{
			title: "Sepia",
			text : "#000000",	// Black
			text2: "#5E3D22",	// Brown
			sym  : "#5E3D22",	// Same brown
			bg   : "#F6F4EF",	// Table bg (lightest)
			bg2  : "#E7E1D5",	// darker sepia
			bg3  : "#F5EFDC"	// other sepia
		}
	],
	_themeNames = [];
for (var i in _themes) {
	_themeNames.push(_themes[i].title);
}

var _fonts=[
		"Avenir",
		"Baskerville",
		"Courier New",
		"Georgia",
		"Helvetica Neue",
		"Palatino"
	];

var VOL_MAX = 100,
	VOL_MIN = 0;

/**
 * SETTER/GETTER Functions
 */

function SettingsData(_args) {
	
	// THEMES
	function setTheme(theme) {
		Ti.API.log("Old Theme: " + _themeNames[Titanium.App.Properties.getInt("theme", 0)]);
		if (theme < _themes.length && theme >= 0) {
			Titanium.App.Properties.setInt("theme", theme);
		}
		Ti.API.log("New Theme: " + _themeNames[Titanium.App.Properties.getInt("theme", 0)]);
	}
	function theme() {
		return _themes[Titanium.App.Properties.getInt("theme", 0)];
	}
	function themeIndex() {
		return Titanium.App.Properties.getInt("theme", 0);
	}
	function themeNames() {
		return _themeNames;
	}

	// FONTS
	function setFont(font) {
		if (font < _fonts.length && font >= 0) {
			Titanium.App.Properties.setInt("font", font);
		}
	}
	function font() {
		return _fonts[Titanium.App.Properties.getInt("font", 4)];
	}
	function fontIndex() {
		return Titanium.App.Properties.getInt("font", 4);
	}
	function fontNames() {
		return _fonts;
	}
	
	// SOUND
	function setSound(toggle) {
		Titanium.App.Properties.setBool("sound", toggle);
	}
	function sound() {
		return Titanium.App.Properties.getBool("sound", true);		
	}
	function setVolume(vol) {
		if (vol <= VOL_MAX && vol >= VOL_MIN) {
			Titanium.App.Properties.setInt("volume", Math.round(vol));
		}
	}
	function volume() {
		return Titanium.App.Properties.getInt("volume", 50);
	}
	
	return {
		  setTheme: setTheme,
		     theme: theme,
		themeIndex: themeIndex,
		themeNames: themeNames,

		   setFont: setFont,
		      font: font,
		 fontIndex: fontIndex,
		 fontNames: fontNames,
		 
		  setSound: setSound,
		     sound: sound,
		 setVolume: setVolume,
		    volume: volume
	};
}

module.exports = SettingsData;
