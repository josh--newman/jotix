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
			bg3  : "#EFEFF4",	// Grey (search)
			sb   : Titanium.UI.iPhone.StatusBar.GRAY
		},
		{
			title: "Invert",
			text : "#FFF",		// White
			text2: "#92928D",	// Grey
			sym  : "#FC6E21",	// Orange
			bg   : "#000",		// Black
			bg2  : "#10100A",	// Off-black
			bg3  : "#363631",	// Dark Grey
			sb   : Titanium.UI.iPhone.StatusBar.GRAY
		},
		{
			title: "Sepia",
			text : "#000000",	// Black
			text2: "#5E3D22",	// Brown
			sym  : "#5E3D22",	// Same brown
			bg   : "#F6F4EF",	// Table bg (lightest)
			bg2  : "#E7E1D5",	// darker sepia
			bg3  : "#F5EFDC", 	// other sepia
			sb   : Titanium.UI.iPhone.StatusBar.GRAY
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

var Settings = {
	// THEMES
		  setTheme: function(theme) {
						Ti.API.log("Old Theme: " + _themeNames[Titanium.App.Properties.getInt("theme", 0)]);
						if (theme < _themes.length && theme >= 0) {
							Titanium.App.Properties.setInt("theme", theme);
						}
						Ti.API.log("New Theme: " + _themeNames[Titanium.App.Properties.getInt("theme", 0)]);
					},
		     theme: function() {
						return _themes[Titanium.App.Properties.getInt("theme", 0)];
					},
		themeIndex: function() {
						return Titanium.App.Properties.getInt("theme", 0);
					},
		themeNames: function() {
						return _themeNames;
					},
	// FONTS
		   setFont: function(font) {
						if (font < _fonts.length && font >= 0) {
							Titanium.App.Properties.setInt("font", font);
						}
					},
		      font: function() {
						return _fonts[Titanium.App.Properties.getInt("font", 4)];
					},
		 fontIndex: function() {
						return Titanium.App.Properties.getInt("font", 4);
					},
		 fontNames: function() {
						return _fonts;
					},
		 
	// SOUND
		  setSound: function(toggle) {
						Titanium.App.Properties.setBool("sound", toggle);
					},
		     sound: function() {
						return Titanium.App.Properties.getBool("sound", true);		
					},
		 setVolume: function(vol) {
						if (vol <= VOL_MAX && vol >= VOL_MIN) {
							Titanium.App.Properties.setInt("volume", Math.round(vol));
						}
					},
		    volume: function() {
						return Titanium.App.Properties.getInt("volume", 50);
					}
};
