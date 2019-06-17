import $ from 'jquery';
import 'what-input';

// Foundation JS relies on a global varaible. In ES6, all imports are hoisted
// to the top of the file so if we used`import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
// require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
import './lib/foundation-explicit-pieces';

import './lib/slick.min.js';
import  "nouislider";
import  noUiSlider from "nouislider";

$(document).foundation();
let priceSlider = document.getElementById('price-range');

if(priceSlider !== null){
    let priceInputs = {
        min: $('[name="price_min"]'),
        max: $('[name="price_max"]')
    }
    
    noUiSlider.create(priceSlider, {
        start:[+priceInputs.min.val(), +priceInputs.max.val()],
        connect: true,
        step:1,
        range: {
            'min': +priceInputs.min.val(), 
            'max': +priceInputs.max.val()
        }
    });
    
    priceSlider.noUiSlider.on('update', function(values){
        priceInputs.min.val(Math.round(values[0]));
        priceInputs.max.val(Math.round(values[1]));
    });
    //On change inputs mave slider
    function updatePriceSlider(){
        let min = priceInputs.min.val();
        let max = priceInputs.max.val();
    
        priceSlider.noUiSlider.set([min,max]);
    }
    priceInputs.min.on('input', updatePriceSlider);
    priceInputs.max.on('input', updatePriceSlider);
}


