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