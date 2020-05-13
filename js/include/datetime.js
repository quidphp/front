/*
 * This file is part of the QuidPHP package.
 * Website: https://quidphp.com
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// datetime
// script with functions related to date and time
const Datetime = Lemur.Datetime = {
    
    // now
    // retourne le timestamp courant
    now: function() 
    {
        return (new Date).getTime();
    },
    
    
    // toSecond
    // permet de formatter une date jusqu'au seconde
    toSecond: function(date,locale,option)
    {
        date = (Str.isNotEmpty(date))? new Date(date):new Date();
        locale = (Str.isNotEmpty(locale))? locale:'fr-CA';
        option = Pojo.replace({year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'},option);
        const intl = new Intl.DateTimeFormat(locale,option);
        
        return intl.format(date);
    }
}