StoryBoardPage = function() {
	var my = {};
	var topics = ['A memorable wedding or funeral', 'One minute of a football game', 'Your first day at a new school or college', 'Your first day at a new job', 'Your last day on a job', 'A disastrous date', 'A moment of failure or success', 'An encounter that changed your life', 'An experience that led to renewed faith', 'A strange job interview', "Labor-saving devices can be more trouble than they're worth", 'An experience that left you disillusioned', 'An embarrassing experience', 'A frightening experience', 'A memorable journey', 'An encounter with someone or something you were afraid of', 'An occasion when you experienced rejection', 'Your first visit to the country', 'The breakup of a friendship', 'An experience that showed how we should be careful of what we wish for', 'A significant misunderstanding', 'A dangerous experience', 'An experience that showed how appearances can be deceiving', 'An account of a difficult decision that you had to make', 'An event that marked a turning point in your life', 'A historic event', 'A memorable encounter with someone in authority', 'An act of heroism or cowardice', 'An imaginary encounter with a real person', 'A rebellious act', 'A brush with greatness', 'A brush with death', 'A time that you took a stand on an important issue', 'An experience that altered your view of someone', 'A trip that you would like to take', 'A vacation trip from your childhood', 'An account of a visit to a fictional place', 'Your first time away from home', 'Two different versions of the same event', 'A traffic accident', 'A day when everything went right', 'An experience that made you laugh until you cried', 'The day you decided to change your life', 'The experience of being lost', 'An unexpected encounter', 'Surviving a hurricane or a tornado (or other natural disaster)', 'An experience that taught you a lesson', 'An important discovery', 'An eyewitness account of an important event', 'An experience that helped you grow up', 'A waiting room', 'A basketball, baseball glove, or tennis racket', 'A cell phone', 'A treasured belonging', 'A laptop computer', 'A favorite restaurant', 'Your dream house', 'Your ideal roommate', 'A closet', 'Your memory of a place that you visited as a child', 'A locker', 'An accident scene', 'A city bus or subway train', 'An unusual room', "A child's secret hiding place", 'A bowl of fruit', 'An item left too long in your refrigerator', 'Backstage during a play or a concert', 'A vase of flowers', 'A rest room in a service station', 'A street that leads to your home or school', 'Your favorite food', 'The inside of a spaceship', 'The scene at a concert or athletic event', 'An art exhibit', 'An ideal apartment', 'Your old neighborhood', 'A small town cemetery', 'A pizza', 'A pet', 'A photograph', 'A hospital emergency room', 'A particular friend or family member', 'A painting', 'A storefront window', 'An inspiring view', 'A work table', 'A character from a book, movie, or television program', 'A refrigerator or washing machine', 'A Halloween costume', 'How to lose weight without losing your mind', "How to win at Texas hold 'em", 'How to choose a major', 'How to find the perfect roommate', 'How to get rid of a roommate--without committing a crime', 'How to flunk out of college', 'How to pitch a knuckleball', 'How to plan the perfect party', 'How to survive a night of babysitting', 'How to pitch a tent in the rain', 'How to housebreak your dog', 'How to kick a bad habit', 'How to overcome insomnia', 'How to stay sober on a Saturday night', 'How to rent your first apartment', 'How to avoid a nervous breakdown during exams', 'How to enjoy the weekend for under $20', 'How to make the perfect brownies', 'How to keep peace with a spouse or a roommate', 'How to bathe a cat', 'How to complain effectively', 'How to survive a recession', 'How to toilet train a baby', 'How to develop self-confidence', 'How to use Twitter', 'How to wash a sweater', 'How to build a great music collection--cheaply and legally', 'How to get along with an instructor without sucking up', 'How to give yourself a haircut', 'How to plan the perfect class schedule', 'How to apply the Heimlich maneuver', 'How to end a relationship', 'How to select the best portable media player', 'How to take decent photographs with your cell phone', 'How to quit smoking', 'How to survive without a car', 'How to make the perfect cup of tea', 'How to save money while saving the environment', 'How to build a great sandcastle', 'How to edit a video', 'How to make (and keep) friends on Facebook', 'How to insert a contact lens', 'How teachers make up exams', 'How parents (or children) make us feel guilty', 'How an iPod works', 'How ice cream is made', 'How a cell phone takes pictures', 'How a magician saws a woman in half', 'How a pocket calculator works', 'On-campus jobs for students', 'Roommates', 'Music on your MP3 player', 'Study habits', 'Stand-up comedians', 'Self-centered people', 'Online educational resources', 'Gardeners', 'Drivers', 'Reality shows on television', 'Sales clerks', 'Television detectives', 'Road trips', 'Dancing styles', 'Video games', 'Customers at your work place', 'Ways of boring people', 'Cheaters', 'Visitors to a museum', 'Rides at an amusement park', 'First dates', 'Videos on YouTube', 'Stores in the mall', 'People waiting in line', 'Churchgoers', 'Attitudes toward exercising', 'Reasons for not attending college', 'Baseball pitchers, football quarterbacks, or soccer goalies', 'Styles of eating in the cafeteria', 'Ways of saving money', 'Talk-show hosts', 'Vacations', 'Methods of studying for a final examination', 'Ways of quitting smoking', 'Attitudes toward money', 'Television comedies', 'Diets', 'Sports fans', 'Attitudes toward politics', 'Ways of coping with a cold', 'Note-taking strategies', 'Attitudes toward tipping in restaurants', 'Political activists', 'Different uses of social networking sites (such as Facebook)', 'High school teachers or college professors', 'Ways of protecting the environment', 'The effect of a parent, teacher, or friend on your life', 'Why you selected your major', 'The effects of cramming for an examination', 'The effects of peer pressure', 'Why some students cheat', 'The effects of growing up with a personal computer', 'The effects of poverty on an individual', 'Why one college course is more rewarding than another', "Why many people don't bother to vote in local elections", 'Why more and more students are taking online classes', 'The effects of racial, sexual, or religious discrimination', 'Why people exercise', 'Why people keep pets', 'The effects of computers on our everyday lives', 'Why some people choose not to carry a cell phone', 'The environmental effects of bottled water', 'Why reality shows are so popular', 'The effects of pressures on students to get good grades', 'The effects of a coach or teammate on your life', 'The effects of not keeping a personal budget', 'The causes of noise pollution', 'The effects of noise pollution', 'Why so few students read newspapers', 'Why many Americans prefer foreign-built cars', 'Why many adults enjoy animated movies', 'Why baseball is no longer the national pastime', 'The effects of stress on students in high school or college', 'The effects of moving to a new town or city', 'Why sales of DVDs are declining', 'Why growing numbers of people shop online', 'The effects of the steady increase in the cost of going to college', 'Why students drop out of high school or college', 'Why college mathematics (or any other subject) is so difficult', "Why some roommates don't get along", 'Why adults have more fun than children on Halloween', 'Why so many people eat junk food', 'Why many children run away from home', 'The long-term effects of unemployment on a person', 'The influence of a book or a movie on your life', 'The effects of music downloading on the music industry', 'Dieting makes people fat', 'Romantic love is a poor basis for marriage', 'High school graduates should take a year off before entering college', 'All citizens should be required by law to vote', 'All forms of government welfare should be abolished', 'Both parents should assume equal responsibility in raising a child', 'Americans should have more holidays and longer vacations', 'Participating in team sports helps to develop good character', 'The production and sale of cigarettes should be made illegal', 'People have become overly dependent on technology', 'Censorship is sometimes justified', 'Privacy is not the most important right', 'Drunk drivers should be imprisoned on the first offense', 'The lost art of letter-writing deserves to be revived', 'Government and military personnel should have the right to strike', 'College students should have complete freedom to choose their own courses', 'College athletes should be exempted from regular class-attendance policies', 'Students should not be required to take physical education courses', 'Freshmen should not be required to purchase a meal plan from the college', 'Zoos are internment camps for animals and should be shut down', 'Government financial aid for students should be based solely on merit'];
	var maxSentences = 10;
	
	function newStory() {
		var topic = topics[Math.floor(topics.length * Math.random())];
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
			
			Session.set("currentText", "");
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