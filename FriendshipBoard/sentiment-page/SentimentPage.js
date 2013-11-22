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

if (Meteor.isClient) {
	var started = false;
	if (!started) {
		setTimeout(changeLocation, 1000);
	}
	
	function addIconAndDescription(message) {
		message.iconDescription = "Friendly";
		message.imgUrl = "/resources/icons/happy-cloud-icon.png";
	}
	
	Template.sentimentMessageHistory.messages = function () {
		var msgs = SentimentMessages.find({},{sort: {time: -1}, limit: 10}).fetch().reverse();
		msgs.forEach(addIconAndDescription);
		return msgs;
	};

	Template.sentimentRecentMessages.messages = function () {
		var recent = SentimentMessages.find({},{sort: {time: -1}, limit: 3}).fetch().reverse();
		recent.push({message: Session.get("currentText")});
		var ids = ["third-most-recent", "second-most-recent", "first-most-recent", "in-progress"];
		for(var i = 0 ; i < recent.length; i++)
			recent[i].id = ids[i];
		recent.forEach(addIconAndDescription);
		return recent;
	};
	
	Template.puppy.puppyInfo = function () {
		var messages = SentimentMessages.find({},{sort: {time: -1}, limit: 5});
		var globalScore = 0;
		for(var i = 0; i < messages.length; i++) {
			globalScore += messages[i].sentimentScore;
		}
		return [{ url: "http://sitmeanssit.com/dog-training-mu/houston-dog-training/files/2013/03/puppy.jpeg", info: "This is a happy puppy." }];
	};
}
