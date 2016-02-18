require(
    ["GalleryModel", "GalleryView", "HomeView", "ProjectView", "jquery",
	"../../node_modules/underscore/underscore",
	"../../node_modules/backbone/backbone"],

    function(GalleryModel, GalleryView, HomeView, ProjectView, $, _, Backbone) {

        var _ = this._;
        var self = this;

        this.model = new GalleryModel();
        var galleryView = new GalleryView(this);
        var homeView = new HomeView();
        var projectView = new ProjectView(this);

        // Routs
        var Router = Backbone.Router.extend({
            routes: {
                "": "home",
                "project/:id": "project",
                "*contact": "contact"
            },

            home: function() {
                galleryView.render();
                homeView.render();
                projectView.remove();
            },

            project: function(id) {
                $(".top-menu li").removeClass("active");
                galleryView.remove();
                homeView.remove();
                projectView.render(self.router, id);
            },

            contact: function() {
               alert('contact');
            }
        });

        this.router = new Router();

        Backbone.history.start();

        $(".top-menu li").click(function(e) {
            $(".top-menu li").removeClass("active");
            var el = e.currentTarget;
            $(el).addClass("active");
            var pathname = "#" + $(el).find("a").data("pathname");
            $("body,html").animate({
                scrollTop: $(pathname).offset().top
            }, 700);
        });

        $(".back-on-top").click(function(e) {
            $("body,html").animate({
                scrollTop: 0
            }, 700);
        });
    }
);
