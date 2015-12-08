Router.configure({
  layoutTemplate: 'appBody'
});

Router.route('home', {
  path: '/'
});

Router.route('/search/:term', {
	template: 'career',
	data: function() {
		var term = this.params.term;
		return Jobs.findOne({title: term});
	}
});

Router.route('/search/courses/:term', {
	template: 'courses',
	data: function() {
		var term = this.params.term;
		return Courses.find({title: {$regex: ".*" + term + ".*", $options: 'i'}}).fetch();
	}
});