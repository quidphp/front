/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// browser
// script with a some functions related to browsers detection
const Browser = Quid.Browser = {
    
    // isOldIe
    // retourne vrai si le navigateur est une vieille version de IE (IE 10 ou moins)
    isOldIe: function() 
    {
        return Str.in('MSIE ',window.navigator.userAgent);
    },

    
    // isIe11
    // retourne vrai si le navigateur est ie11
    isIe11: function()
    {
        return Str.in('Trident/',window.navigator.userAgent);
    },
    
    
    // isIe
    // retourne vrai si le navigateur est internet explorer
    isIe: function()
    {
        return this.isOldIe() || this.isIe11();
    },
    
    
    // isUnsupported
    // retourne vrai si le navigateur est insupporté (donc vieux ie11)
    // si onlyEdge est true alors IE11 est aussi non supporté
    isUnsupported: function(onlyEdge) 
    {
        return (onlyEdge === true && this.isIe11())? true:this.isOldIe();
    },


    // allowsCookie
    // retourne vrai si les cookies sont activés
    allowsCookie: function()
    {
        return navigator.cookieEnabled;
    }
}