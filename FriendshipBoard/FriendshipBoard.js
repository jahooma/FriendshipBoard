Messages = new Meteor.Collection("messages");
Stories = new Meteor.Collection("stories");
Images = new  Meteor.Collection("images");
LocationId = new Meteor.Collection("location");

if (Meteor.isClient) {
	var page = StoryBoardPage(); //ChatPage();
	Meteor.startup(function () {
		page.startup();		
	});
}
