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

// Create image views and set their positions
var cards = [];
for (var c in cardArray) {
	cards.push(createCard(cardArray[c].image, cardArray[c].title, cardArray[c].subtitle));
};

// create tutorial container
var carouselContainer = Ti.UI.createScrollableView({
	views: cards,
	showPagingControl: false,
	pagingControlAlpha: 0.2,
	center: {
		x: platformWidth / 2,
		y: (platformHeight / 2) - (NAV_HEIGHT / 2)
	},
	height: IPHONE4_HEIGHT - NAV_HEIGHT
});

// create tutorial navigation
var carouselNav = Ti.UI.createView({
	center: {
		x: platformWidth / 2,
		y: (platformHeight / 2) + (carouselContainer.height / 2) - 25
	},
	height: NAV_HEIGHT
});

// buttons for nav
var navDoneButton = Ti.UI.createButton({
	title: "Done",
	center: {
		x: platformWidth * 0.2,
		y: NAV_HEIGHT / 2
	},
	width: 60,
	borderRadius: 8,
	borderColor: "white",
	color: "white"
});

var navNextButton = Ti.UI.createButton({
	title: "Next",
	center: {
		x: platformWidth * 0.8,
		y: NAV_HEIGHT / 2
	},
	width: 60,
	borderRadius: 8,
	borderColor: "white",
	color: "white"
});
carouselNav.add(navDoneButton);
carouselNav.add(navNextButton);

// create card function
function createCard(image, title, subtitle) {
	// create view
	var card = Ti.UI.createView({});
	
	// create image view
	var image = Ti.UI.createImageView({
		image: image,
		center: {
			x: platformWidth / 2,
			y: 150
		},
		height: 250,
		width: 250
	});
	// add image to view
	card.add(image);
	
	// add title label
	var title = Ti.UI.createLabel({
		text: title,
		color: "white",
		center: {
			x: platformWidth / 2,
			y: image.height + 75
		},
		font: {
			fontSize: 30,
			fontWeight: "semibold"
		}
	});
	card.add(title);
	
	// add subtitle text
	var subtitle = Ti.UI.createLabel({
		text: subtitle,
		color: "white",
		center: {
			x: platformWidth / 2,
			y: title.center.y + 30
		}
	});
	card.add(subtitle);
	
	return card;
};

carouselWindow.add(carouselNav);
carouselWindow.add(carouselContainer);
