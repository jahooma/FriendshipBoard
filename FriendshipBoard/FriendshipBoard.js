//To test friendshipboard on windows, go to http://127.0.0.1:3000/ instead of localhost
Messages = new Meteor.Collection("messages");

if (Meteor.isClient) {
	Template.messages.messages = function () {
		return Messages.find({}, {limit: 10}, {sort: {time : -1}});
	};
  };