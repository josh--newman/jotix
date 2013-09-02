var _theme = 0,
	_themes = [
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
	];	

var _font = 0,
	_fonts=[
		"Avenir",
		"Baskerville",
		"Courier New",
		"Georgia",
		"Helvetica Neue",
		"Palatino"
	];


function SettingsData(_args) {
	// THEMES
	function setTheme(theme) {
		Ti.API.log("Old Theme: " + _themes[_theme].title);
		if (theme < _themes.length) {
			_theme = theme;
		}
		Ti.API.log("New Theme: " + _themes[_theme].title);
	}
	function theme() {
		return _themes[_theme];
	}
	function themeIndex() {
		return _theme;
	}
	function themeNames() {
		var data = [];
		for (var i in _themes) {
			data.push(_themes[i].title);
		}
		return data;
	}

	// FONTS
	function setFont(font) {
		if (font < _fonts.length) {
			_font = font;
		}
	}
	function font() {
		return _fonts[_font];
	}
	function fontIndex() {
		return _font;
	}
	function fontNames() {
		return _fonts;
	}
	
	return {
		  setTheme: setTheme,
		     theme: theme,
		themeIndex: themeIndex,
		themeNames: themeNames,

		   setFont: setFont,
		      font: font,
		 fontIndex: fontIndex,
		 fontNames: fontNames
	};
}

module.exports = SettingsData;
