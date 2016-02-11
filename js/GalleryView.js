define(
    "GalleryView",
    ["jquery",
        "../../node_modules/underscore/underscore",
        "../../node_modules/backbone/backbone",
        "../../node_modules/dot/doT",
        "../../node_modules/text/text!../tpl/gallery_item.html"],

    function($, _, Backbone, doT, galleryTemplate) {

        var _ = this._;

        var View = Backbone.View.extend({
            el: $("#gallery"),

            events: {
                "click .load-more": "render",
                "click .load-less": "hideItems",
                "click .load-full": "showItems"
            },

            initialize: function(model) {
                this.model = model;
                this.setElement(this.el);
                _.bindAll(this, "render", "remove");
            },

            render: function() {
                var j = 0,
                    thumbs = this.model.thumbs,
                    last = false;

                debugger;
                this.removeLoadMoreButton();
                for (var i = 0; i < thumbs.length; i++) {
                    if (j < 4 && !thumbs[i].rendered) {
                        var compiled = doT.template(galleryTemplate);
                        this.model.thumbs[i].rendered = true;
                        $(this.el).append(compiled({id: i, path: thumbs[i].thumb, title: thumbs[i].title, description: thumbs[i].description}));
                        j++;
                    }
                }
                this.addLoadMoreButton(last);
            },

            addLoadMoreButton: function() {
                $(this.el).append("<div class='load-more'></div>");
            },

            removeLoadMoreButton: function() {
                $(".load-more").remove();
            },

            remove: function() {
                $(this.el).find("figure").remove();
                this.removeLoadMoreButton();
                for (var i = 0; i < this.model.thumbs.length; i++) {
                    this.model.thumbs[i].rendered = false;
                }
            }
        });

        return View;
    }
);

