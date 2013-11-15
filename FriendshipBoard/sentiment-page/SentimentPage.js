SentimentPage = function() {
	var my = {};
	var config = {
		secondsSeparatingMessages: 1,
		onMessageUpdate: function(message) {
			console.log("update message ", message.id + ", is complete", message.isComplete, ":", message.text);
			if (message.isComplete) {
				Messages.insert({
					message: message.text,
					time : message.date,
					timeText : message.dateText 
				});
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

if (Meteor.isClient){
	Template.messageHistory.messages = function () {
		return Messages.find({},{sort: {time: -1}, limit: 10}).fetch().reverse();
	};

	Template.recentMessages.messages = function () {
		var recent = Messages.find({},{sort: {time: -1}, limit: 3}).fetch().reverse();
		recent.push({message: Session.get("currentText")});
		var ids = ["third-most-recent", "second-most-recent", "first-most-recent", "in-progress"];
		for(var i = 0 ; i < recent.length; i++)
			recent[i].id = ids[i];
		return recent;
	};
}