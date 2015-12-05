Template.about.helpers({
	'jobResult': function() {
		return Jobs.findOne({title: "Software Engineer"});
	}
})