$(() => {
    //toggler aadon
    (function () {
        const $togglers = $('[uk-toggle]');

        $togglers.each(function () {
            const $toggler = $(this);
            const $target = $(getTarget($toggler));
            const activeClassName = 'tm-toggle-active';

            $target.on({
                'shown': function () {
                    $toggler.addClass(activeClassName);
                },
                'hidden': function () {
                    $toggler.removeClass(activeClassName);
                }
            });

        });

        function getTarget($toggler) {
            const patern = 'target:';
            const str = $toggler.attr('uk-toggle') || $toggler.attr('href');

            if (!str) return null;

            if (str.indexOf(patern) === -1) {
                return str;
            }

            const reg = /target:(.+)\;/i;
            const match = str.match(reg);

            if (!match || !match[1]) return null;

            return match[1];
        }
    })();
});
