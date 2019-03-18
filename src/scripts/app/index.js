import './jTootip';

$(() => {

    //jTooltip
    (function() {
        const $tooltips = $('.js__jTooltip');
        // debugger;

        $tooltips.each(function () {
            const $tooltip = $(this);
            const className = {
                positionTop: 'js__jTooltip-t',
                positionRight: 'js__jTooltip-r',
                positionBottom: 'js__jTooltip-b',
                positionLeft: 'js__jTooltip-l'
            };
            const options = {};

            if ($tooltip.hasClass(className.positionTop)) {
                options.position = 'top';
            } else if ($tooltip.hasClass(className.positionRight)) {
                options.position = 'right';
            } else if ($tooltip.hasClass(className.positionBottom)) {
                options.position = 'bottom';
            } else if ($tooltip.hasClass(className.positionLeft)) {
                options.position = 'left';
            }

            $tooltip.jTooltip(options);
        });
    })();
});
