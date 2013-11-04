Messages = new Meteor.Collection("messages");
Stories = new Meteor.Collection("stories");
LocationId = new Meteor.Collection("location");

if (Meteor.isClient) {
	var page = ChatPage(); //StoryBoardPage(); //ChatPage();
	Meteor.startup(function () {
		page.startup();		
	});
}
