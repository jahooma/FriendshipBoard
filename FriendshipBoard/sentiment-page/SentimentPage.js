var locationId = 4;
SentimentPage = function() {
	var my = {};
	var config = {
		secondsSeparatingMessages: 1,
		onMessageUpdate: function(message) {
			console.log("New sentiment message:", message.text);
			if (message.isComplete) {
				SentimentMessages.insert({
					message: message.text,
					time : message.date,
					timeText : message.dateText,
					sentimentScore : analyze(message.text).score
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

function changeLocation () {
	LocationId.insert({ id : 0, time : 0});
	locationId = LocationId.findOne({},{sort: {time: -1}}).id;
	console.log(locationId);
	locationId = (locationId + 1)%4;
	LocationId.insert({ id : locationId, time : Date.now()});
	started = true;
}

if (Meteor.isClient){
	var started = false;
	if (!started) {
		setTimeout(changeLocation, 1000);
	}
	
	Template.sentimentMessageHistory.messages = function () {
		return SentimentMessages.find({},{sort: {time: -1}, limit: 10}).fetch().reverse();
	};

	Template.sentimentRecentMessages.messages = function () {
		var recent = SentimentMessages.find({},{sort: {time: -1}, limit: 3}).fetch().reverse();
		recent.push({message: Session.get("currentText")});
		var ids = ["third-most-recent", "second-most-recent", "first-most-recent", "in-progress"];
		for(var i = 0 ; i < recent.length; i++)
			recent[i].id = ids[i];
		return recent;
	};
}
