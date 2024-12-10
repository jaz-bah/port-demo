// Smooth scroll for the main section
if ($(".scrollsmoother_main").height() > window.innerHeight) {
    var locoScrollMain = new LocomotiveScroll({
        el: document.querySelector(".scrollsmoother_main"),
        smooth: true,
        lerp: 0.05,
        tablet: { smooth: true },
        smartphone: { smooth: true },
    });

    // Update ScrollTrigger when Locomotive Scroll triggers a scroll event
    locoScrollMain.on("scroll", ScrollTrigger.update);

    // Proxy Locomotive Scroll to ScrollTrigger for .scrollsmoother_main
    ScrollTrigger.scrollerProxy(".scrollsmoother_main", {
        scrollTop(value) {
            return arguments.length
                ? locoScrollMain.scrollTo(value, 0, 0)
                : locoScrollMain.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        pinType: document.querySelector(".scrollsmoother_main").style.transform
            ? "transform"
            : "fixed",
    });

    // Progress bar logic for the main section
    locoScrollMain.on("scroll", (obj) => {
        let percentage = (100 * obj.delta.y) / obj.limit.y;
        $(".main_content_scroller .scroll_progress_bar .progress_thumb").css("height", percentage + "%");
    });
}


// header start

$(".header_section .menu li").click(function (e) {
    e.preventDefault();
    $(".header_section .menu li").removeClass("active");
    $(this).addClass("active");

    let target = $(this).attr("target");
    const section = document.querySelector(target);
    locoScrollMain.scrollTo(section);


    let index = $(this).attr("index");

    if (Desktop) {
        $(".header_section .menu .active_bar").css("top", `calc(100% / 5 * ${index})`);
    } else {
        $(".header_section .menu .active_bar").css("left", `calc((100% / 5 * ${index}))`);
    }

    window.addEventListener("resize", () => {
        $(".header_section .menu .active_bar").removeAttr("style");
        if (Desktop) {
            $(".header_section .menu .active_bar").css("top", `calc(100% / 5 * ${index})`);
        } else {
            $(".header_section .menu .active_bar").css("left", `calc((100% / 5 * ${index}))`);
        }
    });
});

//header end

// Smooth scroll for the toolbox
const locoScrollToolBox = new LocomotiveScroll({
    el: document.querySelector(".scrollsmoother_toolbox"),
    smooth: true,
    lerp: 0.05,
    tablet: { smooth: true },
    smartphone: { smooth: true },
});

// Update ScrollTrigger when Locomotive Scroll triggers a scroll event for toolbox
locoScrollToolBox.on("scroll", ScrollTrigger.update);

// Proxy Locomotive Scroll to ScrollTrigger for .scrollsmoother_toolbox
ScrollTrigger.scrollerProxy(".scrollsmoother_toolbox", {
    scrollTop(value) {
        return arguments.length
            ? locoScrollToolBox.scrollTo(value, 0, 0)
            : locoScrollToolBox.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
        };
    },
    pinType: document.querySelector(".scrollsmoother_toolbox").style.transform
        ? "transform"
        : "fixed",
});

// Refresh ScrollTrigger and update Locomotive Scroll after layout changes
ScrollTrigger.addEventListener("refresh", () => {
    if (typeof locoScrollMain !== 'undefined') {
        locoScrollMain.update();
    }
    locoScrollToolBox.update();
});

// Initial refresh to set everything up correctly
ScrollTrigger.refresh();
