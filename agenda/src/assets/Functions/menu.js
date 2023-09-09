var despliegue = 1;
$(window).resize(function() {
    if ($(this).width() > 1140 && despliegue % 2 == 0) {
        $("#desplegar").click();
    }
});
$("#desplegar").click(function() {
    $(".menu-desplegable").slideToggle('fast');
    despliegue++;

    if (despliegue % 2 == 0) {
        $("#desplegar").css('background', 'linear-gradient(70deg, #8CB026, #066C34)');
        $("#desplegar").off('mouseenter mouseleave');
    } else {
        $("#desplegar").css('background', 'black');
        $("#desplegar").hover(function() {
                $("#desplegar").css('background', 'linear-gradient(70deg, #8CB026, #066C34)')
            },
            function() {
                $("#desplegar").css('background', 'black')
            });
    }
});