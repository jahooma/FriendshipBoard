Messages = new Meteor.Collection("messages");
SentimentMessages = new Meteor.Collection("sentiment-messages");
Stories = new Meteor.Collection("stories");
Images = new  Meteor.Collection("images");
LocationId = new Meteor.Collection("location");

if (Meteor.isClient) {
	var page = SentimentPage(); //ChatPage();
	Meteor.startup(function () {
		page.startup();		
	});

	setInterval(1000,function(){
							Session.set("currentTime",Date.now())}
							);
}
