/*
 * This file is part of the QuidPHP package.
 * Website: https://quidphp.com
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// ajaxBlock
// merges the logic for ajax, block and loading within a component
Component.AjaxBlock = function(option)
{
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // option
    const $option = Pojo.replace({
        ajaxEvent: 'click',
        mount: true,
        unmount: false
    },option);
    
    
    // components
    Component.BlockEvent.call(this,$option.ajaxEvent);
    Component.Ajax.call(this,$option);
    
    
    // handler
    setHdlrs(this,'ajaxBlock:',{
        
        isReady: function() {
            const node = trigHdlr(this,'ajaxBlock:getStatusNode');
            return getAttr(node,"data-status") === 'ready';
        },
        
        shouldSetContent: function() {
            return true;
        },
        
        isEmptyContentNode: function() {
            const node = trigHdlr(this,'ajaxBlock:getContentNode');
            return Ele.match(node,":empty");
        },
        
        getStatusNode: function() {
            return this;
        },
        
        getContentNode: function() {
            return trigHdlr(this,'ajaxBlock:getStatusNode');
        },
        
        parseContent: function(html) {
            return html
        },
        
        setContent: function(html,isError) {
            html = trigHdlr(this,'ajaxBlock:parseContent',html);
            const node = trigHdlr(this,'ajaxBlock:getContentNode');
            setHtml(node,html);
        },
        
        unsetContent: function() {
            const node = trigHdlr(this,'ajaxBlock:getContentNode');
            trigEvt(this,'ajaxBlock:unmountContent');
            setHtml(node,null);
        }
    });
    
    setHdlrs(this,'ajax:',{
        
        before: function(xhr) {
            const node = trigHdlr(this,'ajaxBlock:getStatusNode');
            setAttr(node,'data-status','loading');
            trigHdlr(this,'blockEvent:block',$option.ajaxEvent);
            trigEvt(this,'ajaxBlock:before',xhr);
        },
        
        error: function(parsedError,xhr) {
            if(trigHdlr(this,'ajaxBlock:shouldSetContent'))
            {
                const node = trigHdlr(this,'ajaxBlock:getStatusNode');
                setAttr(node,"data-status",'error');
                
                trigEvt(this,'ajaxBlock:unmountContent');
                trigHdlr(this,'ajaxBlock:setContent',parsedError,true);
                trigEvt(this,'ajaxBlock:beforeMount',parsedError,true);
                trigEvt(this,'ajaxBlock:mountContent');
                trigEvt(this,'ajaxBlock:error',parsedError,xhr);
            }
        },
        
        success: function(data,xhr) {
            if(trigHdlr(this,'ajaxBlock:shouldSetContent'))
            {
                const node = trigHdlr(this,'ajaxBlock:getStatusNode');
                setAttr(node,"data-status",'ready');
                
                trigEvt(this,'ajaxBlock:unmountContent');
                trigHdlr(this,'ajaxBlock:setContent',data,false);
                trigEvt(this,'ajaxBlock:beforeMount',data,false);
                trigEvt(this,'ajaxBlock:mountContent');
                trigEvt(this,'ajaxBlock:success',data,xhr);
            }
        },
        
        complete: function(xhr) {
            trigHdlr(this,'blockEvent:unblock',$option.ajaxEvent);
            
            if(trigHdlr(this,'ajaxBlock:shouldSetContent'))
            trigEvt(this,'ajaxBlock:complete',xhr);
        }
    });
    
    
    // event
    ael(this,'ajaxBlock:mountContent',function() {
        if($option.mount === true)
        {
            const node = trigHdlr(this,'ajaxBlock:getContentNode');
            if(node != null)
            trigEvt(document,'doc:mountCommon',node);
        }
        
    });
    
    ael(this,'ajaxBlock:unmountContent',function() {
        if($option.unmount === true && !trigHdlr(this,'ajaxBlock:isEmptyContentNode'))
        {
            const node = trigHdlr(this,'ajaxBlock:getContentNode');
            if(node != null)
            trigEvt(document,'doc:unmountCommon',node);
        }
    });
    
    return this;
}