/**
 * @author Robert Chatfield, Josh Newman
 * Jotix
 * tutorialView.js
 */

var carouselWindow = Titanium.UI.createWindow({
	backgroundGradient: {
		type: 'linear',
		startPoint: {x: '0%', y: '0%'},
		endPoint: {x: '0%', y: '100%'},
		colors: ['#1DADF8', '#CC73E1'] //29,173,248 (blue)  204,115,225 (pink)  255,0,128 (hot pink)
	},
	navBarHidden: true,
	top: 0,
	orientationModes: [Ti.UI.PORTRAIT]
});

var fourSSafeView = Ti.UI.createView({
	height: IPHONE4_HEIGHT - 44,
	width: platformWidth,
	center: {
		x: platformWidth / 2,
		y: platformHeight / 2
	},
	background: "yellow"
});

// create image view
var image = Ti.UI.createImageView({
	image: 'images/welcome_shot.png',
	center: {
		x: platformWidth / 2,
		y: IMG_SIZE/2 + 10
	},
	height: IMG_SIZE,
	width: IMG_SIZE
});
fourSSafeView.add(image);

// add title label
var title = Ti.UI.createLabel({
	text: "Welcome to Jotix",
	color: "white",
	center: {
		x: platformWidth / 2,
		y: IMG_SIZE + 50
	},
	font: {
		fontSize: 30,
		fontWeight: "semibold"
	}
});
fourSSafeView.add(title);

// add subtitle text
var subtitle = Ti.UI.createLabel({
	text: "Note taking at its finest",
	color: "white",
	center: {
		x: platformWidth / 2,
		y: title.center.y + 30
	}
});
fourSSafeView.add(subtitle);

var tutorialDoneButton = Ti.UI.createButton({
	title: "Start",
	center: {
		x: platformWidth / 2,
		y: subtitle.center.y + 50 
	},
	width: 60,
	borderRadius: 8,
	borderColor: "white",
	color: "white"
});
fourSSafeView.add(tutorialDoneButton);

carouselWindow.add(fourSSafeView);

