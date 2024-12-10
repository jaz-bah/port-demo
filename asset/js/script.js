// theme card
const themes = $(".customizer_wrapper .customizer_toolbox .theme_box .theme_card");
themes.click(function () {
    themes.removeClass("active");
    $(this).addClass("active");
});

// font selector
const fontInputs = $(".customizer_wrapper .customizer_toolbox .font_box .font_input");

fontInputs.focus(function () {
    const fontBox = $(this).closest(".font_box");
    fontBox.addClass("active");
});

fontInputs.focusout(function () {
    const fontBox = $(this).closest(".font_box");
    fontBox.removeClass("active");
});
