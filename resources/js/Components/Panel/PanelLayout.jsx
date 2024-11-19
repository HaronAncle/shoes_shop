import React, { useEffect } from "react";
import PanelHeader from "./PanelHeader";
import PanelFooter from "./PanelFooter";
import $ from "jquery";
import "jquery.easing";
import "./../../../../node_modules/bootstrap/dist/js/bootstrap";
import "./../../../../node_modules/bootstrap/dist/js/bootstrap.bundle";

import PanelLeft from "./PanelLeft";

import "./PanelLayout.css";

const PanelLayout = ({ children, user = null, ...props }) => {
    useEffect(() => {
        "use strict";
        $("#sidebarToggle, #sidebarToggleTop").on("click", function (e) {
            $("body").toggleClass("sidebar-toggled");
            $(".sidebar").toggleClass("toggled");
            if ($(".sidebar").hasClass("toggled")) {
                $(".sidebar .collapse").collapse("hide");
            }
        });

        $(window).resize(function () {
            if ($(window).width() < 768) {
                $(".sidebar .collapse").collapse("hide");
            }

            if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
                $("body").addClass("sidebar-toggled");
                $(".sidebar").addClass("toggled");
                $(".sidebar .collapse").collapse("hide");
            }
        });
        $("body.fixed-nav .sidebar").on(
            "mousewheel DOMMouseScroll wheel",
            function (e) {
                if ($(window).width() > 768) {
                    var e0 = e.originalEvent,
                        delta = e0.wheelDelta || -e0.detail;
                    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
                    e.preventDefault();
                }
            }
        );

        $(document).on("scroll", function () {
            var scrollDistance = $(this).scrollTop();
            if (scrollDistance > 100) {
                $(".scroll-to-top").fadeIn();
            } else {
                $(".scroll-to-top").fadeOut();
            }
        });

        $(document).on("click", "a.scroll-to-top", function (e) {
            var $anchor = $(this);
            $("html, body")
                .stop()
                .animate(
                    {
                        scrollTop: $($anchor.attr("href")).offset().top,
                    },
                    1000,
                    "easeInOutExpo"
                );
            e.preventDefault();
        });
        return () => {
            $("#sidebarToggle, #sidebarToggleTop").off("click");
            $(window).off("resize");
            $("body.fixed-nav .sidebar").off("mousewheel DOMMouseScroll wheel");
            $(document).off("scroll");
            $(document).off("click", "a.scroll-to-top");
        };
    }, []);

    return (
        <div>
            <div id="wrapper">
                <PanelLeft user={user} />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <PanelHeader />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PanelLayout;
