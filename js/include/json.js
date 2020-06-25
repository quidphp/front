/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// json
// script with methods related to json format
const Json = Lemur.Json = {
    
    // encode
    // encode une valeur en json
    encode: function(value) 
    {
        return JSON.stringify(value);
    },
    
    
    // decode
    // decode une valeur à partir d'un json
    decode: function(value) 
    {
        return JSON.parse(Str.typecheck(value));
    }
}