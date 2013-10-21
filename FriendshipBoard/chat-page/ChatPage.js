ChatPage = function() {
	var my = {};
	var config = {
		secondsSeparatingMessages: 1,
		onMessageUpdate: function(message) {
			console.log("update message ", message.id + ", is complete", message.isComplete, ":", message.text);
			if (message.isComplete) {
				Messages.insert({ name: 'James', message: message.text, time : message.date, timeText : message.dateText})
				Session.set("currentText", "");
			}
			else
				Session.set("currentText", message.text);
		}
	};
	
	my.startup = function() {
		var speechRec = SpeechRecognition(config);
		speechRec.start();
	};
	
	return my;
}