/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// feed
// script of behaviours for a feed component with a load-more button
Component.Feed = function()
{
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // components
    Component.AjaxBlock.call(this,{ajaxEvent: 'ajax:init'});
    
    
    // handler
    setHdlrs(this,'feed:',{
        
        getTarget: function() {
            return this;
        },
        
        getAppendTarget: function() {
            return this;
        },
        
        loadMore: function() {
            return qs(this,'.load-more');
        },
        
        loadMoreRemove: function() {
            return trigHdlr(this,'feed:loadMore');
        },
        
        append: function(data) {
            feedSet.call(this,data,'append');
        },
        
        overwrite: function(data) {
            feedSet.call(this,data,'overwrite');
        }
    });
    
    // event
    ael(this,'feed:bind',function() {
        bindLoadMore.call(this);
    });
    
    
    // setup
    aelOnce(this,'component:setup',function() {
        trigEvt(this,'feed:bind');
    });

    
    // feedSet
    const feedSet = function(data,type)
    {
        Str.typecheck(data);
        data = trigHdlr(this,'ajaxBlock:parseContent',data,type);
        
        if(type === 'append')
        {
            const target = trigHdlr(this,'feed:getAppendTarget');
            Ele.append(target,data);
        }
        
        else
        {
            const target = trigHdlr(this,'feed:getTarget');
            setHtml(target,data);
        }
        
        trigEvt(this,'feed:bind');
    }
    
    
    // bindLoadMore
    const bindLoadMore = function()
    {
        const $this = this;
        const loadMore = trigHdlr(this,'feed:loadMore');
        
        if(loadMore != null)
        {
            Component.AjaxBlock.call(loadMore,{ajaxEvent: 'ajax:init'});
            Component.KeyboardEnter.call(loadMore,true);
            
            setHdlr(loadMore,'ajaxBlock:setContent',function(html,isError) {
                removeLoadMore.call($this);
                trigHdlr($this,(isError === true)? 'feed:overwrite':'feed:append',html);
            });
            
            ael(loadMore,'keyboardEnter:blocked',function() {
                trigEvt(this,'ajax:init');
            });
            
            aelOnce(loadMore,'click',function(event) {
                trigEvt(this,'ajax:init');
                Evt.preventStop(event);
            });
        }
        
        // removeLoadMore
        const removeLoadMore = function()
        {
            const node = trigHdlr(this,'feed:loadMoreRemove');
            Ele.remove(node);
        }
    }
    
    return this;
}