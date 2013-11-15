ImagePage = function() {
	var my = {};
	var searcher;
	google.load("search", "1", {callback : onSearchLoad});
	
	
	function onSearchLoad() {
		searcher = new google.search.ImageSearch();
		searcher.setSearchCompleteCallback(this, onImageResult, [searcher]);
		searcher.setRestriction(
			google.search.Search.RESTRICT_SAFESEARCH,
			google.search.Search.SAFESEARCH_STRICT
		);
		searcher.setRestriction(
		  google.search.ImageSearch.RESTRICT_IMAGESIZE,
		  google.search.ImageSearch.IMAGESIZE_MEDIUM
		);
	}
	
	function search(str) {
		if (searcher != null)
			searcher.execute(str);
	}
	
	function onImageResult(searcher) {
		var result = searcher.results[Math.floor(Math.random() * searcher.results.length)];
		var img = document.createElement("img");
		img.src = result.url;
		
		var varyingScale = (Math.random() + Math.random()) * 4 + 1;
		var startMaxDim = 80;
		var width = result.width;
		var height = result.height;
		var scale = (varyingScale * 100) / Math.max(width, height);
		width = Math.round(width * scale);
		height = Math.round(height * scale);
		
		var x = Math.floor((screen.width - width / 3) * Math.random() - width / 3);
		var y = Math.floor((screen.height - height / 3) * Math.random() - height / 3);
		
		var imgData = {
			url: result.url,
			time: Date.now(),
			width: width,
			height: height,
			x:x,
			y:y
		};
		Images.insert(imgData);
		console.log("image data:", imgData);
	}
	
	function onMessageUpdate(message) {
		if (message.isComplete) {
			search(message.text);
			console.log("spoken:", message.text);
			Session.set("currentText", "");
		}
		else
			Session.set("currentText", message.text);
	}
	
	my.startup = function() {
		var config = {
			secondsSeparatingMessages: 0,
			onMessageUpdate: onMessageUpdate
		};
		var speechRec = SpeechRecognition(config);
		speechRec.start();
	};
	
	return my;
}

if (Meteor.isClient) {
	Template.imageHistory.images = function () {
		return Images.find({},{sort: {time: -1}, limit: 10}).fetch().reverse();
		
	};
}