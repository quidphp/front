/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */

// clickOpenAjaxAnchor
// clickOpen component which is triggered by an anchor click and dispatches an ajax call
Component.ClickOpenAjaxAnchor = function(option) 
{
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // components
    Component.ClickOpenTriggerBase.call(this,option);
    Component.ClickOpenAjax.call(this,option);
    
    
    // handler
    setHdlr(this,'ajax:config',function() {
        return trigHdlr(this,'clickOpen:getTrigger');
    });
    
    setHdlr(this,'clickOpen:triggerClickOpen',function() {
        trigHdlr(this,'ajax:init');
    });
    
    return this;
}