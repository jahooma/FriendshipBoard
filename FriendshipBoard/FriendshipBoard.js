Messages = new Meteor.Collection("messages");

if (Meteor.isClient) {
	Meteor.startup(function () {

		function getTime(x)
		{
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

		var currMsgText = "";

		var SpeechRecognition = function(config) {
			var my = {};
			var currId = 0;
			var timeoutId;
			newRecognition();
			
			function newRecognition() {
				var recognition = new webkitSpeechRecognition();
				recognition.continuous = true;
				recognition.interimResults = true;
				recognition.lang = "en-US";
				
				my.recognition = recognition;
				my.start = function() { my.recognition.start(); };
				my.stop = function() { my.recognition.stop(); };
				my.abort = function() { my.recognition.abort(); };
				my.recognition.onerror = onError;
				my.recognition.onresult = onResult;
				my.recognition.onend = onEnd;
			}
			
			function onError(event) {
				console.log("error:", event.error);
				newRecognition();
			}
			
			function onEnd(event) {
				console.log("end:", event);
				my.start();
			}
			
			function onResult(event) {
				var interim_transcript = "";
				for (var i = event.resultIndex; i < event.results.length; i++) {
					if (event.results[i].isFinal) {
						currMsgText += event.results[i][0].transcript;
					} 
					else {
						interim_transcript += event.results[i][0].transcript;
					}
				}
				config.onMessageUpdate({ 
					id: currId,
					text: currMsgText + " " + interim_transcript,
					date: Date.now(),
					dateText: "",
					isComplete: false
				});
				setUpdateTimeout();
			}
			
			function setUpdateTimeout() {
				clearTimeout(timeoutId);
				timeoutId = setTimeout(completeMessage, config.secondsSeparatingMessages * 1000);
			}
			
			function completeMessage() {
				if (currMsgText == "") return;
				config.onMessageUpdate({
					id: currId,
					text: currMsgText,
					date: Date.now(),
					dateText: getTime(Date.now()),
					isComplete: true
				});
				console.log(getTime(Date.now()));
				currId++;
				currMsgText = "";
			}
			
			return my;
		}
		
		var config = {
			secondsSeparatingMessages: 2,
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

		var speechRec = SpeechRecognition(config);
		speechRec.start();
	});

	Template.messages.messages = function () {
		return Messages.find({},{sort: {time: -1}, limit: 10}).fetch().reverse();
	};

	Template.first.message1 = function () {
		return Messages.findOne({},{sort: {time: -1}});
	};

	Template.second.message2 = function () {
		return Messages.findOne({},{sort: {time: -1}, skip: 1});
	};

	Template.third.message3 = function () {
		return Messages.findOne({},{sort: {time: -1}, skip: 2});
	};

	Template.current.message4 = function () {
		return {message: Session.get("currentText")};
	};
}