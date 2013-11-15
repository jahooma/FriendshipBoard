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

SpeechRecognition = function(config) {
	var my = {};
	var currMsgText = "";
	var timeoutId;
	newRecognition();
	
	function newRecognition() {
		console.log("this is working");
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
			text: currMsgText,
			date: Date.now(),
			dateText: getTime(Date.now()),
			isComplete: true
		});
		console.log(getTime(Date.now()));
		currMsgText = "";
	}
	
	return my;
}
