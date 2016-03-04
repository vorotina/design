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
            initialize: function(scope) {
                this.model = scope.model;
                this.setElement(this.el);
                _.bindAll(this, "render", "remove");
            },

            render: function(router, elementId) {
                this.router = router;
                this.remove();
                var about = doT.template(ProjectView);
                var obj = this.model.attributes.thumbs[elementId];
                obj.prev = (parseInt(elementId) !== 0) ? parseInt(elementId) - 1 : 0;
                obj.next = (parseInt(elementId) !== 31) ? parseInt(elementId) + 1 : 31;
                $(".main-block").append(about(obj));
            },

            remove: function() {
                $(".main-block").find(".project").remove();
            }
        });

        return View;
    }
);

