/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
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
    
    
    // localeFormat
    // méthode de base pour formatter une date
    // locale doit être fourni en premier argumnet
    localeFormat: function(locale,date,option)
    {
        Str.typecheck(locale);
        date = (Str.isNotEmpty(date))? new Date(date):new Date();
        
        return date.toLocaleString(locale,option);
    }
}