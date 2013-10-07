/* Example usage:

var config = {
	secondsSeparatingMessages: 1,
	onMessageUpdate: function(message) {
		console.log("update message ", message.id + ", is complete", message.isComplete, ":", message.text);
		if (message.isComplete)
			document.writeln(message.text);
	}
};

var speechRec = SpeechRecognition(config);
speechRec.start();


*/
var SpeechRecognition = function(config) {
	var my = {};
	var currMsgText = "";
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
			text: currMsgText + ", " + interim_transcript,
			date: Date.now(),
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
			isComplete: true
		});
		currId++;
		currMsgText = "";
	}
	
	return my;
}
