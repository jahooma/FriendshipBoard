StoryBoardPage = function() {
	var my = {};
	maxSentences = 10;
	
	function newStory() {
		var topic = "Topic: " + Math.round(500 * Math.random());
		return {topic: topic, text: "", sentencesRemaining: maxSentences, timeCreated: Date.now()};
	}
	
	function getCurrentStory() {
		var curr = Stories.findOne({},{sort: {timeCreated: -1}});
		if (curr == undefined) curr = newStory();
		return curr;
	}
	
	function makeProperSentence(text) {
		return text.charAt(0).toUpperCase() + text.slice(1) + ".";
	}
	
	function onMessageUpdate(message) {
		console.log("update story message ", message.id + ", is complete", message.isComplete, ":", message.text);
		if (message.isComplete) {
			var currStory = getCurrentStory();
			console.log("curr story", currStory);
			var theText = message.text;
			currStory.text += makeProperSentence(theText) + " ";
			currStory.sentencesRemaining--;
			console.log("updated curr story", currStory);
			Stories.update(currStory._id, currStory); //update this story in database, or insert it
			
			if (currStory.sentencesRemaining <= 0) {
				Stories.insert(newStory());
			}
			
			Session.set("currentText", "");
		}
		else
			Session.set("currentText", message.text);
	}
	
	my.startup = function() {
		var config = {
			secondsSeparatingMessages: 1,
			onMessageUpdate: onMessageUpdate
		};
		var speechRec = SpeechRecognition(config);
		speechRec.start();
	};
	
	return my;
}

if (Meteor.isClient) {
	Template.currentStory.story1 = function () {
		var curr = Stories.findOne({},{sort: {timeCreated: -1}});
		if (curr != undefined) curr.id = "current-story";
		var inProgressSentence = {
			sentencesRemaining: curr == undefined ? 0 : curr.sentencesRemaining,
			text: Session.get("currentText")
		};
		console.log("currentStory temp", { story: curr, inProgressSentence: inProgressSentence });
		return { story: curr, inProgressSentence: inProgressSentence };
	};

	Template.recentStories.stories = function () {
		var recent = Stories.find({},{sort: {timeCreated: -1}, limit: 3}).fetch().reverse();
		recent.pop(); //remove current
		for(var i = 0 ; i < recent.length; i++)
			recent[i].extraClasses = " recent";
		return recent;
	};
}