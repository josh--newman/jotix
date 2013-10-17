Ti.include('/main/composeView.js');
Ti.include('/main/composeController.js');

function Compose(_args) {
	var self, win, composeDoneButton, composeAddButton, ta;
	composeView(_args);
	addEventListenersToComposeView();
}

module.exports = Compose;
