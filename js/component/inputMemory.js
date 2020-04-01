/*
 * This file is part of the QuidPHP package.
 * Website: https://quidphp.com
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// inputMemory
// script with behaviours for an input which has a value in memory
Component.InputMemory = function() 
{    
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // handler
    setHdlrs(this,'inputMemory:',{
        
        hasChanged: function() {
            const value = trigHdlr(this,'input:getValue');
            const memory = trigHdlr(this,'inputMemory:get');

            return (Str.isEqual(value,memory)) ? false:true;
        },
        
        get: function(cast) {
            let r = getData(this,'input-memory');
            
            if(r != null && cast != null)
            r = Scalar.cast(r,cast);
            
            return r;
        },
        
        set: function() {
            const value = trigHdlr(this,'inputMemory:get');
            trigHdlr(this,'input:setValue',value);
        },
        
        remember: function() {
            const value = trigHdlr(this,'input:getValue');
            setData(this,'input-memory',value);
        } 
    });
    
    return this;
}