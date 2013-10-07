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
	}
});

// create image view
var image = Ti.UI.createImageView({
	image: 'images/welcome_shot.png',
	center: {
		x: platformWidth / 2,
		y: 180
	},
	height: 280,
	width: 280
});
carouselWindow.add(image);

// add title label
var title = Ti.UI.createLabel({
	text: "Welcome to Jotix",
	color: "white",
	center: {
		x: platformWidth / 2,
		y: image.height + 90
	},
	font: {
		fontSize: 30,
		fontWeight: "semibold"
	}
});
carouselWindow.add(title);

// add subtitle text
var subtitle = Ti.UI.createLabel({
	text: "Note taking at its finest",
	color: "white",
	center: {
		x: platformWidth / 2,
		y: title.center.y + 50
	}
});
carouselWindow.add(subtitle);

var tutorialDoneButton = Ti.UI.createButton({
	title: "Done",
	center: {
		x: platformWidth / 2,
		y: subtitle.center.y + 60 
	},
	width: 60,
	borderRadius: 8,
	borderColor: "white",
	color: "white"
});
carouselWindow.add(tutorialDoneButton);

// create tutorial container
// var carouselContainer = Ti.UI.createView({
	// center: {
		// x: platformWidth / 2,
		// y: (platformHeight / 2) - (NAV_HEIGHT / 2)
	// },
	// height: IPHONE4_HEIGHT - NAV_HEIGHT
// });

// create tutorial navigation
// var carouselNav = Ti.UI.createView({
	// center: {
		// x: platformWidth / 2,
		// y: (platformHeight / 2) + (carouselContainer.height / 2)
	// },
	// height: NAV_HEIGHT
// });

// // buttons for nav
// var navSkipButton = Ti.UI.createButton({
	// title: "Skip",
	// center: {
		// x: platformWidth * 0.2,
		// y: NAV_HEIGHT / 2
	// }
// });
// 
// var navNextButton = Ti.UI.createButton({
	// title: "Next",
	// center: {
		// x: platformWidth * 0.8,
		// y: NAV_HEIGHT / 2
	// }
// });
// carouselNav.add(navSkipButton);
// carouselNav.add(navNextButton);


// Create image views and set their positions
// for (var c = 0; c < cardArray.length; c++) {
	// carouselContainer.add(createCard(cardArray[c].image, cardArray[c].title, cardArray[c].subtitle, platformWidth * c));
// };

// // create card function
// function createCard(image, title, subtitle, leftPos) {
	// // create view
	// var card = Ti.UI.createView({
		// left: leftPos
	// });
// 	
	// // create image view
	// var image = Ti.UI.createImageView({
		// image: image,
		// center: {
			// x: platformWidth / 2,
			// y: 150
		// },
		// height: 250,
		// width: 250
	// });
	// // add image to view
	// card.add(image);
// 	
	// // add title label
	// var title = Ti.UI.createLabel({
		// text: title,
		// color: "white",
		// center: {
			// x: platformWidth / 2,
			// y: image.height + 75
		// },
		// font: {
			// fontSize: 30,
			// fontWeight: "semibold"
		// }
	// });
	// card.add(title);
// 	
	// // add subtitle text
	// var subtitle = Ti.UI.createLabel({
		// text: subtitle,
		// color: "white",
		// center: {
			// x: platformWidth / 2,
			// y: title.center.y + 50
		// }
	// });
	// card.add(subtitle);
// 	
	// return card;
// };

// carouselWindow.add(carouselNav);
// carouselWindow.add(carouselContainer);
carouselWindow.open();
