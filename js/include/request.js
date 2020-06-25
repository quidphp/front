/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// request
// script with functions related to the current request
const Request = Lemur.Request = {
    
    // relative
    // retourne l'uri relative courante
    relative: function() 
    {
        return window.location.pathname + window.location.search;
    },

    
    // absolute
    // retourne l'uri absolute courante
    absolute: function()
    {
        return window.location.href;
    },
    
    
    // scheme
    // retourne le scheme courant
    // possible de retourne avec ou sans le :
    scheme: function(twoDot)
    {
        let r = location.protocol;
        
        if(twoDot !== true)
        r = r.substring(0, Str.pos(':',r));
        
        return r;
    },

    
    // host
    // retourne le host courante
    host: function()
    {
        return location.hostname;
    },
    
    
    // schemeHost
    // retourne le schemeHost courant
    schemeHost: function()
    {
        return location.origin;
    },
    
    
    // fragment
    // retourne le fragment de l'uri sans le hash
    fragment: function() 
    {
        return Uri.makeHash(window.location.hash);
    },


    // parse
    // retourne un objet avec les différentes parties de l'uri courante séparés
    parse: function()
    {
        return new URL(this.absolute());
    }
}