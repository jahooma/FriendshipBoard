StoryBoardPage = function() {
	var my = {};
	var topics = ["You become a character in your favorite video game, and...", "Your grandma comes to town and brings an unexpected surprise...", "You are an astronaut who finds something strange on the moon...", "Your parents tell you that you're moving across the country.", "An alien comes to Earth, and...", "At the beach, you find a special seashell...", "At summer camp, the boys and girls wage a prank war against one another.", "Every time a dog barks, something unusual happens...", "You learn that you are heir to a throne...", "At the library, you find a photo in a book.", "The last seconds on the clock are ticking, and the ball is in your hands. What happens next?", "You get stuck in an elevator with...", "In the backyard, your dog finds a mysterious necklace...", "Your best friend is elected President.", "At the mall, you walk by a mannequin that looks just like you. Something odd is happening...", "You find an old photo of your grandmother, and see that she was a famous actress...", "You receive a letter in the mail saying that you've won $10,000. What do you do?", "Your favorite athlete shows up at one of your games—but as a player on the other team!", "You discover a magic button that will...", "You suspect the school library might be haunted...", "On Halloween, you discover that someone is handing out haunted pieces of candy...", "You come home to find your cat eating a bowl of ice cream. What happens next?", "You win a contest on the radio for...", "Three kids get locked in the mall. What do they decide to do?", "You travel to the prairie and see...", "You switch places for a day with your favorite celebrity.", "You're a race car driver with an embarrassing secret.", "Your favorite singer agrees to perform an exclusive show in your basement.", "You come home from school to find a box on your porch. What's inside?", "At your birthday party, you receive a very special present...", "Your luggage gets lost at the airport and you accidentally open the wrong bag.", "Your class gets snowed in at school. What do you do?", "You show up at school, but you can't remember where of your classes are or who anyone is.", "You switch places for a day with your dad.", "In the back of your closet, you find a basketball jersey...", "You find out that your teacher used to be...", "The pizza delivery person brings you something you didn't order. What is it?", "You find $1000 on the ground, and...", "Your family wins the lottery, and...", "You discover your parents are spies...", "You become the youngest person ever to set a world record for...", "You and your best friend end up on the set of your favorite TV show. What happens?", "You take a ride on a tornado, and...", "You run into some trouble while camping...", "There is a magic swing at the park that will take you to...", "The power goes out, and you're home alone...", "One day, there is a very strange weather report that says...", "Everywhere you go, you keep hearing a song that no one else can hear...", "You find a map leading to buried treasure, but it's buried under the principal's house!", "You hear an ad on the radio for a magic product that will...", "You stumble upon a cure for...", "On Christmas Eve, you hear a strange noise on the roof...", "You're in the school play and worried about forgetting your lines.", "You get home from the zoo and find a baby monkey in your trunk! What do you do?", "You win a cooking contest for your famous recipe..."];
	var maxSentences = 10;
	var defaultInProgressText = "Say something!"
	Session.set("currentText", defaultInProgressText);
	
	function newStory() {
		var topic = topics[Math.floor(topics.length * Math.random())];
		var now = Date.now();
		return {topic: topic, text: "", sentencesRemaining: maxSentences, timeCreated: now, timeModified: timeToString(now) };
	}
	
	function getCurrentStory() {
		var curr = Stories.findOne({},{sort: {timeCreated: -1}});
		if (curr == undefined) curr = newStory();
		return curr;
	}
	
	function makeProperSentence(text) {
		return text.charAt(0).toUpperCase() + text.slice(1) + ".";
	}
	function timeToString(x) {
		var date = new Date(x);
		var hours = date.getHours();
		var minutes = date.getMinutes();
		if (minutes < 10)
		{
			minutes = "0" + minutes;
		}
		var ampm = "am";
		if (hours > 12)
		{
			ampm = "pm";
			hours = hours % 12;
		}

		return hours + ':' + minutes + " " + ampm;
	}
	
	function onMessageUpdate(message) {
		if (message.isComplete) {
			var currStory = getCurrentStory();
			var theText = message.text;
			currStory.text += makeProperSentence(theText) + " ";
			currStory.sentencesRemaining--;
			currStory.timeModified = timeToString(Date.now());
			Stories.update(currStory._id, currStory);
			
			if (currStory.sentencesRemaining <= 0) {
				Stories.insert(newStory());
			}
			
			Session.set("currentText", defaultInProgressText);
		}
		else
			Session.set("currentText", message.text);
	}
	
	my.startup = function() {
		var config = {
			secondsSeparatingMessages: 2,
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