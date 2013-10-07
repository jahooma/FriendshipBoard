Messages = new Meteor.Collection("messages");

if (Meteor.isClient) {
	Template.messages.messages = function () {
		return Messages.find({}, {sort: {time : -1}});
	};
  };