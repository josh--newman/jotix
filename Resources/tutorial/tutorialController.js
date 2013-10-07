/**
 * @author Robert Chatfield, Josh Newman
 * Jotix
 * tutorialController.js
 */

tutorialDoneButton.addEventListener('click', function() {
	// do stuff here
	carouselWindow.close();
	Settings.setTutorialSeen({seen: true});
});
