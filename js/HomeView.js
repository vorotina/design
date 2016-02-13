define(
    "HomeView",
    ["jquery",
        "../../node_modules/underscore/underscore",
        "../../node_modules/backbone/backbone",
        "../../node_modules/dot/doT",
        "../../node_modules/text/text!../tpl/contacts.html",
        "../../node_modules/text/text!../tpl/about.html"],

    function($, _, Backbone, doT, contactsTemplate, aboutTemplate) {

        var _ = this._;

        var View = Backbone.View.extend({

            initialize: function() {
                this.setElement(this.el);
                _.bindAll(this, "render", "remove");
            },

            render: function() {
                var about = doT.template(aboutTemplate);
                $(".main-block").append(about({}));

                var contacts = doT.template(contactsTemplate);
                $(".main-block").append(contacts({}));

                $(document).ready(function() {
                    fadeMenuWrap();
                    $(window).scroll(fadeMenuWrap);
                });

                function fadeMenuWrap() {
                    var scrollPos = window.pageYOffset || document.documentElement.scrollTop;
                    if (scrollPos > 300) {
                        $(".back-on-top").fadeIn(300);
                    } else {
                        $(".back-on-top").fadeOut(300);
                    }
                }
            },

            remove: function() {
                $(".main-block").find("#about").remove();
                $(".main-block").find("#contacts").remove();
            }
        });

        return View;
    }
);

