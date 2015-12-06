var currentShownId = "";
var currentShownIdProj = "";
Template.showcase.onRendered(function() {
	// $(".notablePeopleDetails")[0].removeClass("hidden");
	// currentShownId = $(".notablePeopleDetails")[0].prop('id');
});

Template.showcase.helpers({
	'notablePeople': function() {
		return People.find().fetch();
	},

	'notableProjects': function() {
		return Projects.find().fetch();
	}
});


Template.showcase.events({
	'mouseenter .peopleImg': function(e) {
		var id = $(e.target).prop('id');
		$("#" + currentShownId).addClass("hidden");
		$("#div-"+id).removeClass("hidden");

		currentShownId = "div-"+id;
	},

	'mouseenter .projectImg': function(e) {
		var id = $(e.target).prop('id');
		$("#" + currentShownIdProj).addClass("hidden");
		$("#div-"+id).removeClass("hidden");

		currentShownIdProj = "div-"+id;
	}
});

