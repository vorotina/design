define(
    "ProjectView",
    ["jquery",
        "../../node_modules/underscore/underscore",
        "../../node_modules/backbone/backbone",
        "../../node_modules/dot/doT",
        "../../node_modules/text/text!../tpl/project.html"],

    function($, _, Backbone, doT, ProjectView) {

        var _ = this._;

        var View = Backbone.View.extend({

            initialize: function(model) {
                this.model = model;
                this.setElement(this.el);
                _.bindAll(this, "render", "remove");
            },

            render: function(elementId) {
                var about = doT.template(ProjectView);
                $(".main-block").append(about(this.model.thumbs[elementId]));
            },

            remove: function() {
                $(".main-block").find(".project").remove();
            }
        });

        return View;
    }
);

