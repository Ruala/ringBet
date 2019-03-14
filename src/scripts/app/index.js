import Hammer from 'hammerjs';

import './jTootip';
import Tooltip from './tooltip';

$(() => {
    //ring
    (function () {

        var $inner = $('.inner'),
            $spin = $('#spin'),
            $reset = $('#reset'),
            $data = $('.data'),
            $mask = $('.mask'),
            maskDefault = `
                <div>
                    <div class="tm-countdown uk-flex uk-flex-middle" uk-countdown="date: 2019-03-21T12:23:45+00:00">
                        <div>
                            <div class="uk-countdown-number uk-countdown-minutes"></div>
                        </div>
                        <div class="uk-countdown-separator">:</div>
                        <div>
                            <div class="uk-countdown-number uk-countdown-seconds"></div>
                        </div>
                    </div>
                    <div class="">place bets</div>
                </div>
            `,
            timer = 9000;

        var red = [32,19,21,25,34,27,36,30,23,5,16,1,14,9,18,7,12,3];

        $reset.hide();

        $mask.html(maskDefault);

        $spin.on('click',function(){

            // get a random number between 0 and 36 and apply it to the nth-child selector
            var  randomNumber = Math.floor(Math.random() * 56),
                color = null;
            $inner.attr('data-spinto', randomNumber).find('li:nth-child('+ randomNumber +') input').prop('checked','checked');
            // prevent repeated clicks on the spin button by hiding it
            $(this).hide();
            // disable the reset button until the ball has stopped spinning
            $reset.addClass('disabled').prop('disabled','disabled').show();

            $('.placeholder').remove();


            setTimeout(function() {
                $mask.text('No More Bets');
            }, timer/2);

            setTimeout(function() {
                $mask.text(maskDefault);
            }, timer+500);



            // remove the disabled attribute when the ball has stopped
            setTimeout(function() {
                $reset.removeClass('disabled').prop('disabled','');

                if($.inArray(randomNumber, red) !== -1){ color = 'red'} else { color = 'black'};
                if(randomNumber == 0){color = 'green'};

                $('.result-number').text(randomNumber);
                $('.result-color').text(color);
                $('.result').css({'background-color': ''+color+''});
                $data.addClass('reveal');
                $inner.addClass('rest');

                $thisResult = '<li class="previous-result color-'+ color +'"><span class="previous-number">'+ randomNumber +'</span><span class="previous-color">'+ color +'</span></li>';

                $('.previous-list').prepend($thisResult);


            }, timer);

        });


        $reset.on('click',function(){
            // remove the spinto data attr so the ball 'resets'
            $inner.attr('data-spinto','').removeClass('rest');
            $(this).hide();
            $spin.show();
            $data.removeClass('reveal');
        });

// so you can swipe it too
        var myElement = document.getElementById('plate');
        var mc = new Hammer(myElement);
        mc.on("swipe", function(ev) {
            if(!$reset.hasClass('disabled')){
                if($spin.is(':visible')){
                    $spin.click();
                } else {
                    $reset.click();
                }
            }
        });
    })();

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
