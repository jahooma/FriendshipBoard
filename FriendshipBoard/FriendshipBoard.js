Messages = new Meteor.Collection("messages");

if (Meteor.isClient) {
	Meteor.startup(function () {
		chatPage = ChatPage();
		chatPage.startup();		
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