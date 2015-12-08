Template.career.events({
	"click div.tab-menu>div.list-group>a": function(e) {
        e.preventDefault();
        var element;
        if($(e.target).siblings('a').length>0) {
        	element = $(e.target);
        } else {
        	element = $(e.target).parent();
        }
        element.siblings('a.active').removeClass("active");
        element.addClass("active");
        var index = element.index();
        $("div.tab>div.tab-content").removeClass("active");
        $("div.tab>div.tab-content").eq(index).addClass("active");
    }
});