/*
 * This file is part of the QuidPHP package.
 * Website: https://quidphp.com
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// base
// base component which allow to activate or deactivate components
Component.Base = function()
{
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // handler
    setHdlr(this,'base:getInputs',function() {
        return qsa(this,Dom.selectorInput(true));
    });
    
    
    // event
    ael(this,'component:enable',function() {
        const inputs = trigHdlr(this,'base:getInputs');
        
        Arr.each(inputs,function(ele) {
            if(trigHdlr(ele,'input:isBinded'))
            trigHdlrs(inputs,'input:enable');
            else
            setProp(ele,'disabled',false)
        });
    });
    
    ael(this,'component:disable',function() {
        const inputs = trigHdlr(this,'base:getInputs');
        
        Arr.each(inputs,function(ele) {
            if(trigHdlr(ele,'input:isBinded'))
            trigHdlr(ele,'input:disable');
            else
            setProp(ele,'disabled',true);
        });
    });
    
    return this;
}