/**
 * @author Robert Chatfield, Josh Newman
 * Jotix
 * tutorialController.js
 */

Ti.API.log('Controller loaded');
var lastTouchPosition;
carouselContainer.addEventListener('touchstart', function(e){
	Ti.API.log("touchPos");
	var touchPos = {x: e.x, y: e.y};
	lastTouchPosition = e.source.convertPointToView(touchPos, carouselWindow);
});
 
carouselContainer.addEventListener('touchmove', function(e){
	var touchPos = {x: e.x, y: e.y};
	var newTouchPosition = e.source.convertPointToView(touchPos, carouselWindow); 
	// Only support moving pages horizontally
	carouselContainer.left += newTouchPosition.x - lastTouchPosition.x;
 	
	lastTouchPosition = newTouchPosition;
});

carouselContainer.addEventListener('touchend', function(e){
	// Determine which view is most in the centre of the screen
	for (var i = 0; i < carouselContainer.children.length; i++)
	{
		var left = carouselContainer.left + carouselContainer.children[i].left;
		var right = carouselContainer.left + carouselContainer.children[i].left + carouselContainer.children[i].width;
		var centre = platformWidth / 2;
		
		if (left <= centre && right >= centre)
		{
			// Move this page to the centre
			var newLeft = (platformWidth - carouselContainer.children[i].width) / 2;
			
			// How much do we need to move all of the pages by?
			var deltaX = newLeft - (carouselContainer.left + carouselContainer.children[i].left);
			
			//carouselContainer.left += deltaX;
			
			var endLeft = carouselContainer.left + deltaX;
			
			var animation = Titanium.UI.createAnimation({
				left: endLeft,
				curve: Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT
			});
			
			animation.addEventListener('complete', function(e){
				carouselContainer.left = endLeft;
			});
			
			carouselContainer.animate(animation);
			break;
		}
	}
});

navNextButton.addEventListener('close', function(e){
	carouselWindow.close({modal: true});
});
