Template.home.events({
    "click #searchSubmit": function(event) {
        var term = $("#searchInput").val();
        Session.set("searchQuery", term);
        Router.go("/search/" + term);
    }
});