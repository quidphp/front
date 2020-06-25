/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// ajaxTimeout
// merges the logic for ajax, block, loading and timeout within a component
Component.AjaxTimeout = function(option)
{
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // option
    const $option = Pojo.replace({
        timeout: 1000,
        timeoutEvent: 'ajaxTimeout:setTimeout',
        ajaxEvent: 'ajaxTimeout:refresh',
        setupStart: true,
        attrHtml: null
    },option);
    
    
    // component
    Component.Timeout.call(this, $option.timeoutEvent, $option.timeout);
    Component.AjaxBlock.call(this, $option);
    
    
    // handler
    setHdlrs(this,'ajaxTimeout:',{
        
        start: function() {
            trigEvt(this, $option.ajaxEvent);
        },
        
        stop: function() {
            trigHdlr(this,'timeout:clear',$option.timeoutEvent);
        }
    });
    
    
    // event
    ael(this, 'ajaxBlock:complete', function () {
        trigEvt(this, $option.timeoutEvent);
    });

    ael(this, 'timeout:' + $option.timeoutEvent, function () {
        trigHdlr(this,'ajaxTimeout:start');
    });


    // setup
    aelOnce(this, 'component:setup', function () {
        if($option.setupStart)
        trigHdlr(this,'ajaxTimeout:start');
    });
    
    
    // teardown
    aelOnce(this, 'component:teardown', function() {
        trigHdlr(this,'ajaxTimeout:stop');
    });
    
    return this;
}