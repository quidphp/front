/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */

// ajax
// script to activate ajax with an event on the nodes
Component.Ajax = function(option) 
{
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // option
    const $option = Pojo.replace({
        ajaxEvent: 'click',
        attrHtml: 'data-ajax'
    },option);
    
    
    // handler
    setHdlrs(this,'ajax:',{
        
        confirm: function() {
            return (trigHdlr(document,'history:isLoading') === true)? false:true;
        },
        
        extraEvents: function() {
            let r = null;
            
            if(Str.isNotEmpty($option.attrHtml))
            {
                r = {
                    before: function() {
                        trigHdlr(document,'doc:setAttr',$option.attrHtml,true);
                    },
                    
                    complete: function() {
                        trigHdlr(document,'doc:removeAttr',$option.attrHtml);
                    }
                }
            }
            
            return r;
        },
        
        config: function(triggerEvent) {
            return this;
        },
        
        init: function(config) {
            trigEvt(this,$option.ajaxEvent,config);
        },
        
        trigger: function(config,triggerEvent) {
            let r = null;
            
            if(trigHdlr(this,'ajax:confirm'))
            {
                if(!Str.is(config) && !Pojo.isNotEmpty(config))
                {
                    config = trigHdlr(this,'ajax:config');
                    
                    if(Ele.is(config))
                    config = Xhr.configFromNode(config);
                }
                
                if(Str.is(config))
                config = Xhr.configFromString(config);
                
                if(Pojo.isNotEmpty(config))
                {
                    Xhr.configNodeEvents(this,config);
                    const extraEvents = trigHdlr(this,'ajax:extraEvents');
                    r = Xhr.trigger(config,extraEvents);
                }
                
                if(r != null && triggerEvent != null)
                Evt.preventStop(triggerEvent,true);
            }
            
            return r;
        }
    });
    
    
    // event
    ael(this,$option.ajaxEvent,function(event,config) {
        trigHdlr(this,'ajax:trigger',config,event);
        Evt.preventStop(event);
    });
    
    return this;
}