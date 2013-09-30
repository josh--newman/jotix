/**
 * @author Robert Chatfield, Josh Newman
 * Jotix
 * tutorialView.js
 */


var carouselWindow = Titanium.UI.createWindow({
	top: 0,
	backgroundGradient: {
		type: 'linear',
		startPoint: {x: '0%', y: '0%'},
		endPoint: {x: '0%', y: '100%'},
		colors: ['#1DADF8', '#CC73E1'] //29,173,248 (blue)  204,115,225 (pink)  255,0,128 (hot pink)
	}
});

// create tutorial container
var carouselContainer = Ti.UI.createView({
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
		y: (platformHeight / 2) + (carouselContainer.height / 2)
	},
	height: NAV_HEIGHT
});

// buttons for nav
var navSkipButton = Ti.UI.createButton({
	title: "Skip",
	center: {
		x: platformWidth * 0.2,
		y: NAV_HEIGHT / 2
	}
});

var navNextButton = Ti.UI.createButton({
	title: "Close",
	center: {
		x: platformWidth / 2,
		y: NAV_HEIGHT / 2
	}
});
//carouselNav.add(navSkipButton);
carouselNav.add(navNextButton);

// Create image views and set their positions
for (var c in cardArray) {
	carouselContainer.add(createCard(cardArray[c].image, cardArray[c].title, cardArray[c].subtitle, platformWidth * c));
};

Ti.API.log(carouselContainer.children.length);

// create card function
function createCard(image, title, subtitle, leftPos) {
	// create view
	var card = Ti.UI.createView({
		left: leftPos
	});
	
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
			y: title.center.y + 50
		}
	});
	card.add(subtitle);
	
	return card;
};

carouselWindow.add(carouselNav);
carouselWindow.add(carouselContainer);
// carouselWindow.open({modal: true});

carouselContainer.addEventListener('click', function(){
	Ti.API.log('CLICKD: carouselContainer');
});
carouselWindow.addEventListener('click', function(){
	Ti.API.log('CLICKD: carouselWindow');
});

Ti.API.log('V');
