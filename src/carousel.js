/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// carousel
// script for a carousel component based on the clickOpen logic
Component.Carousel = function(option)
{
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // option
    const $option = Pojo.replace({
        background: false,
        attr: 'data-carousel',
        clickOutside: false,
        multiple: true
    },option);
    

    // components
    Component.ClickOpen.call(this,$option);
    Component.ClickOpenTriggerBase.call(this,$option);
    
    return this;
}