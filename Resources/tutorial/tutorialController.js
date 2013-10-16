/**
 * @author Robert Chatfield, Josh Newman
 * Jotix
 * tutorialController.js
 */

navNextButton.addEventListener('click', function() {
	var currPage = carouselContainer.currentPage;
	if (currPage < carouselContainer.views.length - 1) {
		carouselContainer.scrollToView(currPage + 1);
	}
});

navDoneButton.addEventListener('click', function() {
	carouselWindow.close();
});
