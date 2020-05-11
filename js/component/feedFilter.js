/*
 * This file is part of the QuidPHP package.
 * Website: https://quidphp.com
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// feedFilter
// script of behaviours for a filter which updates a feed, can include a reset button
Component.FeedFilter = function(option)
{
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // option
    const $option = Pojo.replaceRecursive({
        anchorsClass: '.feed-anchor',
        resetClass: ".feed-reset",
        classSelected: "selected",
        attrSelected: "data-selected",
        attrBind: "data-bind",
        trigger: ".trigger",
        target: ".popup",
        background: "tableRelation",
        parse: null,
        closeUnsetContent: false
    },option);
    
    
    // component
    Component.Filter.call(this,$option);
    
    
    // handler
    setHdlrs(this,'feedFilter:',{
        
        // il faut spécifier le target feed
        getTargetFeed: function() {
            return Ele.typecheck(null); 
        },
        
        getAnchors: function() {
            const result = trigHdlr(this,'feedSearch:getResult');
            return qsa(result,$option.anchorsClass);
        },
        
        getUnboundAnchors: function() {
            return Arr.filter(trigHdlr(this,'feedFilter:getAnchors'),function(ele) {
                return !Ele.match(ele,"["+$option.attrBind+"]");
            });
        },
        
        getSelected: function() {
            return Arr.find(trigHdlr(this,'feedFilter:getAnchors'),function(ele) {
                return Ele.hasClass(ele,$option.classSelected);
            });
        },
        
        setSelected: function(isReset) {
            toggleAttr(this,$option.attrSelected,!isReset);
        },
        
        getTitle: function() {
            const trigger = trigHdlr(this,'clickOpen:getTrigger');
            return qs(trigger,".title");
        },
        
        setTitle: function(text) {
            const title = trigHdlr(this,'feedFilter:getTitle');
            text = (Str.isNotEmpty(text))? text:getAttr(title,'data-title');
            Ele.setText(title,text);
            
            const absolutePlaceholder = Ele.closest(this,"[data-absolute-placeholder]");
            trigHdlr(absolutePlaceholder,'absolutePlaceholder:refresh');
        },
        
        getReset: function() {
            return qs(this,$option.resetClass);
        }
    });
    
    
    // event
    ael(this,'feed:bind',function() {
        const anchors = trigHdlr(this,'feedFilter:getUnboundAnchors');
        bindAnchor.call(this,anchors);
    });
    
    ael(this,'clickOpen:opened',function() {
        const selected = trigHdlr(this,'feedFilter:getSelected');
        if(selected != null)
        Ele.focus(selected);
    });
    
    
    // setup
    aelOnce(this,'component:setup',function() {
        const reset = trigHdlr(this,'feedFilter:getReset');
        
        if(reset != null)
        bindAnchor.call(this,[reset]);
    });
    
    
    // bindAnchor
    const bindAnchor = function(anchor)
    {
        const $this = this;
        const feed = trigHdlr(this,'feedFilter:getTargetFeed');
        Component.AjaxBlock.call(anchor,{unmount: true});
        
        setHdlr(anchor,'ajaxBlock:getStatusNode',function(event) {
            return feed;
        });
        
        ael(anchor,'ajaxBlock:before',function() {
            const anchors = trigHdlr($this,'feedFilter:getAnchors');
            trigEvt(feed,'ajaxBlock:unmountContent');
            toggleClass(anchors,$option.classSelected,false);
            
            if(Arr.in(this,anchors))
            toggleClass(this,$option.classSelected,true);
            
            trigEvt($this,'clickOpen:close');
            const text = Ele.getText(this);
            trigHdlr($this,'feedFilter:setTitle',text);
        });
        
        ael(anchor,'ajaxBlock:success',function() {
            trigEvt(feed,'feed:bind');
            
            const anchors = trigHdlr($this,'feedFilter:getAnchors');
            const isReset = !Arr.in(this,anchors);
            trigHdlr($this,'feedFilter:setSelected',isReset);
        });
        
        setAttr(anchor,$option.attrBind,true);
    }
    
    return this;
}