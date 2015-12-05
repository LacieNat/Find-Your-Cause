Template.career.events({
	"click div.tab-menu>div.list-group>a": function(e) {
        e.preventDefault();
        $(e.target).siblings('a.active').removeClass("active");
        $(e.target).addClass("active");
        var index = $(this).index();
        $("div.tab>div.tab-content").removeClass("active");
        $("div.tab>div.tab-content").eq(index).addClass("active");
    }
});