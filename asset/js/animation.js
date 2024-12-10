// device
var Desktop = true;

window.addEventListener("load", () => {
    if (screen.width > 992) {
        Desktop = true;
    } else {
        Desktop = false;
    }
});

window.addEventListener("resize", () => {
    if (screen.width > 992) {
        Desktop = true;
    } else {
        Desktop = false;
    }
});

// anm button 1
$(".anm_button_1")
    .on("mouseenter", function (e) {
        var parentOffset = $(this).offset(),
            relX = e.pageX - parentOffset.left,
            relY = e.pageY - parentOffset.top;
        $(this).css("--before-top", relY + "px");
        $(this).css("--before-left", relX + "px");
        console.log("in");
    })
    .on("mouseout", function (e) {
        var parentOffset = $(this).offset(),
            relX = e.pageX - parentOffset.left,
            relY = e.pageY - parentOffset.top;
        $(this).css("--before-top", relY + "px");
        $(this).css("--before-left", relX + "px");
    });

// customizer content
const customizerContent = $(".customizer_wrapper .customizer_contentbox");
const customizerToolBox = $(".customizer_wrapper .customizer_toolbox.mobile");
const settingsBtn = $(".floting_button_box .settings_button");

const customizerContentTl = gsap.timeline({
    paused: true,
    duration: 1,
    ease: "power1.in",
});

const customizerToolboxTl = gsap.timeline({
    paused: true,
    duration: 1,
    ease: "power1.inOut",
});

customizerContentTl
    .fromTo(
        customizerContent,
        {
            width: "100%",
            left: 0,
        },
        {
            width: "calc(100% - 400px - 40px)",
            left: "20px",
        }
    )
    .fromTo(
        customizerContent,
        {
            height: "100vh",
            top: "0vh",
        },
        {
            height: "80vh",
            top: "10vh",
        }
    );

customizerToolboxTl.fromTo(
    customizerToolBox,
    {
        left: "-100%",
    },
    {
        left: 0,
    }
);

settingsBtn.click(() => {
    if (Desktop) {
        if (settingsBtn.attr("open")) {
            settingsBtn.attr("open", false);
            customizerContentTl.reverse();
        } else {
            settingsBtn.attr("open", true);
            customizerContentTl.play();
        }
    } else {
        if (settingsBtn.attr("open")) {
            settingsBtn.attr("open", false);
            customizerToolboxTl.reverse();
        } else {
            settingsBtn.attr("open", true);
            customizerToolboxTl.play();
        }
    }
});

window.addEventListener("load", () => {
    if (!Desktop) {
        settingsBtn.attr("open", false);
        customizerContentTl.reverse();
    } else {
        settingsBtn.attr("open", false);
        customizerToolboxTl.reverse();
    }
});

window.addEventListener("resize", () => {
    if (!Desktop) {
        settingsBtn.attr("open", false);
        customizerContentTl.reverse();
    } else {
        settingsBtn.attr("open", false);
        customizerToolboxTl.reverse();
    }
});

// customizer end

// home section start

gsap.from(".home_section .profile_image", {
    scrollTrigger: {
        trigger: ".home_section",
        toggleActions: "restart none none none",
    },
    x: "-50%",
    duration: 1.2,
    ease: "power2.outIn",
});

const homeTitle = document.querySelector(".home_section .title");
const homeTitleSplit = splitText(homeTitle, { chars: 1 });

gsap.from(homeTitleSplit.chars, {
    scrollTrigger: {
        trigger: ".home_section",
        toggleActions: "restart none none none",
    },
    y: "-100%",
    opacity: 0,
    stagger: 0.1,
    delay: "random(0, 1)",
    duration: 1.2,
    ease: "bounce.out",
});

const homeSubTitle = document.querySelector(".home_section .subtitle");
const homeSubTitleSplit = splitText(homeSubTitle, { words: 1, chars: false });

gsap.from(homeSubTitleSplit.words, {
    scrollTrigger: {
        trigger: ".home_section",
        toggleActions: "restart none none none",
    },
    x: 20,
    opacity: 0,
    stagger: 0.1,
    duration: 1.2,
    ease: "ease.in",
});

$(".home_section .social_media li").each(function (index) {
    gsap.from($(this), {
        scrollTrigger: {
            trigger: ".home_section",
            toggleActions: "restart none none none",
        },
        y: 20,
        delay: index * 0.2,
        duration: 1,
        ease: "back.inOut",
    });
});

const homeTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".home_section",
        scroller: ".scrollsmoother_main",
        scrub: 1,
        start: "top top",
        end: "bottom center",
        pin: false,
    },
});

homeTimeline
    .to(".home_section .profile_image", {
        y: "70%",
        duration: 10,
        ease: "power1.in",
    })
    .to(
        homeTitleSplit.chars,
        {
            y: "random(-500,0)",
            x: "random(-100,100)",
            opacity: 0,
            duration: 10,
            ease: "power1.in",
        },
        "<"
    )
    .to(
        homeSubTitleSplit.words,
        {
            x: -10,
            opacity: 0,
            stagger: 0.5,
            duration: 5,
            ease: "power1.in",
        },
        "<"
    )
    .to(
        ".home_section .social_media li",
        {
            x: -10,
            opacity: 0,
            stagger: 0.5,
            duration: 5,
            ease: "power1.in",
        },
        "<"
    );

// home section end

// about section start

const aboutPrallaxTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".about_section .pralax_image",
        scroller: ".scrollsmoother_main",
        start: "top bottom",
        scrub: true,
        pin: false,
    },
});

aboutPrallaxTimeline
    .from(".about_section .pralax_image .imgbox img", {
        yPercent: -30,
        ease: "none",
    })
    .to(".about_section .pralax_image .imgbox img", {
        yPercent: 30,
        ease: "none",
    });

const aboutTextTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".about_section .first_text_content",
        scroller: ".scrollsmoother_main",
        start: "top bottom",
        end: "top center",
        scrub: 2,
        pin: false,
    },
});

const aboutText = document.querySelector(".about_section .first_text_content .text_box");
const aboutTextSplit = splitText(aboutText, { words: false, chars: 1 });

aboutTextTimeline.from(aboutTextSplit.chars, {
    opacity: 0.5,
    stagger: 0.5,
    duration: 1,
    ease: "power1.in",
});

const aboutStickyScrollTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".about_section .sticky_scroll_content .count_content",
        scroller: ".scrollsmoother_main",
        start: "top center",
        scrub: true,
        pin: true,
    },
});

aboutStickyScrollTimeline
    .to(".about_section .sticky_scroll_content .count_list .one", {
        y: "-100%",
        duration: 0.1,
        ease: "power1.in",
    })
    .from(
        ".about_section .sticky_scroll_content .count_list .two",
        {
            y: "100%",
            duration: 0.1,
            ease: "power1.in",
        },
        "<"
    )
    .to(".about_section .sticky_scroll_content .count_list .two", {
        y: "-100%",
        duration: 0.1,
        ease: "power1.in",
    })
    .from(
        ".about_section .sticky_scroll_content .count_list .three",
        {
            y: "100%",
            duration: 0.1,
            ease: "power1.in",
        },
        "<"
    )

// about section end
