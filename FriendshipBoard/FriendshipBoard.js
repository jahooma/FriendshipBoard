Messages = new Meteor.Collection("messages");
Stories = new Meteor.Collection("stories");

if (Meteor.isClient) {
	var page = StoryBoardPage(); //ChatPage();
	Meteor.startup(function () {
		page.startup();		
	});
}
