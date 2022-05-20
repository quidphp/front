/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// backToTop
// script for a component which brings back to the top of the page
Component.BackToTop = function(option)
{
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // option
    const $option = Pojo.replace({
        attr: 'data-active',
        trigger: 'button',
        smooth: true
    },option);
    
    
    // components
    Component.Scroller.call(this);
    
    
    // handler
    setHdlrs(this,'backToTop:',{
        
        getTrigger: function() {
            return qs(this,$option.trigger,true);
        },
        
        show: function() {
            toggleAttr(this,$option.attr,true);
        },
        
        hide: function() {
            toggleAttr(this,$option.attr,false);
        },
        
        refresh: function() {
            const scrollTop = trigHdlr(this,'scroller:getCurrentScroll').top;
            trigHdlr(this,(scrollTop === 0)? 'backToTop:hide':'backToTop:show');
        }
    });
    

    // event
    ael(this,'scroll:change',function() {
        trigHdlr(this,'backToTop:refresh');
    });
    
    
    // setup
    aelOnce(this,'component:setup',function() {
        bindTrigger.call(this);
        trigHdlr(this,'backToTop:refresh');
    });
    
    
    // bindTrigger
    const bindTrigger = function()
    {
        const $this = this;
        const trigger = trigHdlr(this,'backToTop:getTrigger');
        
        ael(trigger,'click',function() {
            trigHdlr($this,'scroller:go',0,null,$option.smooth);
        });
    }
    
    return this;
}