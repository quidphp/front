/*
 * This file is part of the QuidPHP package.
 * Website: https://quidphp.com
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// feedSearch
// component for a feed with search and order tools
Component.FeedSearch = function(option)
{
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // option
    const $option = Pojo.replaceRecursive({
        appendTarget: "ul:last-of-type",
        focusableTarget: "button",
        parse: null,
        result: '.results',
        search: "input[type='text']",
        order: ".order select",
        keyboardArrow: true,
        inputSearch: {}
    },option);
    
    
    // components
    Component.Feed.call(this);
    Component.HrefReplaceChar.call(this);
    Component.Focusable.call(this);
    Component.KeyboardArrow.call(this,$option.keyboardArrow);
    
    
    // handler
    setHdlrs(this,'feedSearch:',{
        
        getResult: function() {
            return qs(this,$option.result,true);
        },
        
        getSearch: function() {
            return qs(this,$option.search);
        },
        
        getSearchValue: function() {
            const search = trigHdlr(this,'feedSearch:getSearch');
            return (search != null)? trigHdlr(search,'input:getValueTrim'):null;
        },
        
        getOrder: function() {
            return qs(this,$option.order);
        },
        
        getOrderValue: function() {
            const order = trigHdlr(this,'feedSearch:getOrder');
            return (order != null)? trigHdlr(order,'input:getValueInt'):null;
        }
    });
    
    setHdlrs(this,'feed:',{
        
        getTarget: function() {
            return trigHdlr(this,'feedSearch:getResult');
        },
        
        getAppendTarget: function() {
            const target = trigHdlr(this,'feed:getTarget');
            return qs(target,$option.appendTarget,true);
        },
        
        loadMoreRemove: function() {
            const loadMore = trigHdlr(this,'feed:loadMore');
            return Ele.closest(loadMore,'li');
        }
    });
    
    setHdlr(this,'focusable:getTargets',function() {
        const result = trigHdlr(this,'feedSearch:getResult');
        return qsa(result,$option.focusableTarget);
    });
    
    setHdlr(this,'ajaxBlock:setContent',function(html,isError) {
        trigHdlr(this,'feed:overwrite',html);
    });
    
    setHdlr(this,'ajaxBlock:parseContent',function(data,type) {
        if(type === 'append')
        {
            data = Dom.parseOne(data);
            
            if($option.parse)
            data = qs(data,$option.parse);
            
            data = getHtml(data);
        }
        
        return data;
    });
    
    setHdlr(this,'ajax:config',function() {
        const separator = getAttr(this,'data-separator');
        const query = getAttr(this,'data-query');
        const search = trigHdlr(this,'feedSearch:getSearchValue');
        const order = trigHdlr(this,'feedSearch:getOrderValue') || separator;
        const data = {};
        data[query] = search;
        
        return {
            url: trigHdlr(this,'hrefReplaceChar:make',order),
            data: data
        }
    });
    
    
    // event
    ael(this,'keyboardArrow:down',function() {
        trigHdlr(this,'focusable:next');
    });
    
    ael(this,'keyboardArrow:up',function() {
        trigHdlr(this,'focusable:prev');
    });
    
    
    // setup
    aelOnce(this,'component:setup',function() {
        const search = trigHdlr(this,'feedSearch:getSearch');
        if(search != null)
        bindSearch.call(this,search);
        
        const order = trigHdlr(this,'feedSearch:getOrder');
        if(order != null)
        bindOrder.call(this,order);
    });
    
    
    // bindSearch
    const bindSearch = function(search)
    {
        const $this = this;
        
        // components
        Component.InputSearch.call(search,$option.inputSearch);
        
        // event
        ael(search,'inputSearch:change',function() {
            trigEvt($this,'ajax:init');
        });
        
        ael(this,'feed:bind',function() {
            trigHdlr(search,'inputSearch:success');
        });
        
        trigSetup(search);
    }
    
    
    // bindOrder
    const bindOrder = function(order)
    {
        const $this = this;
        
        // event
        ael(order,'change',function() {
            trigEvt($this,'ajax:init');
        });
    }
    
    return this;
}