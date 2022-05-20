/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// validatePrevent
// component that blocks an event if the validation is not successfull
Component.ValidatePrevent = function(type) 
{
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // handler
    setHdlr(this,'validatePrevent:getTargets',function() {
        return [this];
    });
    
    setHdlr(this,'validatePrevent:trigger',function() {
        let r = true;
        const targets = trigHdlr(this,'validatePrevent:getTargets');
        
        if(Vari.isNotEmpty(targets))
        {
            Arr.each(targets,function(ele) {
                const val = trigHdlr(ele,"validate:trigger");
                
                if(val === false)
                r = val;
            });
        }
        
        return r;
    });
    
    
    // event
    ael(this,type,function(event) {
        let r = trigHdlr(this,'validatePrevent:trigger')
        
        if(r !== true)
        {
            Evt.preventStop(event,true);
            trigEvt(this,'validatePrevent:deny',event);
        }
        
        else
        trigEvt(this,'validatePrevent:allow',event);
        
        return r;
    });
    
    
    // setup
    aelOnce(this,'component:setup',function() {
        trigHdlr(this,'validatePrevent:getTargets');
    });
    
    return this;
}