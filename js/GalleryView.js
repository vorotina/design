define(
    "GalleryView",
    ["jquery",
        "../../node_modules/underscore/underscore",
        "../../node_modules/backbone/backbone",
        "../../node_modules/dot/doT",
        "../../node_modules/text/text!../tpl/gallery-item.html"],

    function($, _, Backbone, doT, galleryTemplate) {

        var _ = this._;

        var View = Backbone.View.extend({
            el: $("#gallery"),

            events: {
                "click .load-more": "render",
                "click .load-less": "hideItems",
                "click .load-full": "showItems",
                "click .view-more": "onViewMoreClicked"
            },

            initialize: function(scope) {
                this.model = scope.model;
                this.setElement(this.el);
                _.bindAll(this, "render", "remove");
            },

            render: function() {
                var j = 0,
                    thumbs = this.model.get("thumbs"),
                    last = false;

                this.removeLoadMoreButton();
                for (var i = 0; i < thumbs.length; i++) {
                    if (j < 4 && !thumbs[i].rendered) {
                        var compiled = doT.template(galleryTemplate);
                        this.model.attributes.thumbs[i].rendered = true;
                        $(this.el).append(compiled({id: i, path: thumbs[i].thumb, title: thumbs[i].title, description: thumbs[i].description}));
                        j++;
                    }
                }
                this.addLoadMoreButton(last);
            },

            addLoadMoreButton: function() {
                $(this.el).append("<div class='load-more'><span class='ico'></span></div>");
            },

            removeLoadMoreButton: function() {
                $(".load-more").remove();
            },

            remove: function() {
                $(this.el).find("figure").remove();
                this.removeLoadMoreButton();
                for (var i = 0; i < this.model.get("thumbs").length; i++) {
                    this.model.attributes.thumbs[i].rendered = false;
                }
            }
        });

        return View;
    }
);

