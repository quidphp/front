/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// datetime
// script with functions related to date and time
const Datetime = Quid.Datetime = {
    
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
    },
    
    
    // year
    // retourne l'année courante
    year: function()
    {
        return (new Date).getFullYear();
    },
    
    
    // ymd
    // retourne le format en ymd
    // possible de spécifier le year, month et day
    ymd: function(timestamp,year,month,day) {
        let r = (Integer.is(timestamp))? new Date(timestamp*1000):new Date;
        
        if(Integer.is(year))
        r.setFullYear(year);
        
        if(Integer.is(month))
        r.setMonth(month + 1);
        
        if(Integer.is(day))
        r.setDate(day);
        
        return r.toISOString().substr(0, 10);
    }
}