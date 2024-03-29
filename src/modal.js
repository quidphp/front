/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// modal
// script for a modal component
Component.Modal = function(option)
{
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // option
    const $option = Pojo.replace({
        background: 'modal',
        attrAnchor: 'data-modal',
        attrAnchorHtml: 'data-modal-html',
        attrAnchorRoute: 'data-modal-route',
        clickOutsidePersistent: true
    },option);
    
    
    // components
    Component.ClickOpenAjax.call(this,$option);
    
    
    // handler
    setHdlrs(this,'modal:',{
        
        getBox: function() {
            return qs(this,'.box',true);
        },
        
        getInner: function() {
            const box = trigHdlr(this,'modal:getBox');
            return qs(box,".inner",true);
        },
        
        getAnchors: function(route) {
            return getData(this,'data-anchor');
        },
        
        getRoute: function() {
            return getAttr(this,'data-route');
        },
        
        getUri: function() {
            return getAttr(this,'data-uri');
        },
        
        anchorBind: function(anchor,click) {
            anchorBind.call(this,anchor,click);
        },
        
        set: function(html,anchors,route,uri) {
            Str.typecheck(html,true);
            
            setModalAttr.call(this,anchors,route,uri);
            trigEvt(this,'clickOpen:open');
            trigHdlr(this,'clickOpen:setTargetContent',html);
            
            return true;
        },
        
        fetch: function(config,anchors,route,uri) {
            let r = false;
            
            if(Str.isNotEmpty(config))
            config = Xhr.configFromString(config);
            
            else if(Ele.is(config))
            {
                if(anchors == null)
                anchors = config;
                
                config = Xhr.configFromNode(config);
            }
            
            if(Pojo.isNotEmpty(config))
            {
                setModalAttr.call(this,anchors,route,uri);
                trigHdlr(this,'ajax:init',config);
                r = true;
            }
            
            return r;
        }
    });
    
        
    setHdlr(this,'clickOpen:getTargetContent',function() {
        return trigHdlr(this,'modal:getInner');
    });
    
    setHdlr(this,'clickOpen:getTargetFocus',function() {
        return trigHdlr(this,'modal:getBox');
    });
    
    
    // event
    ael(this,'clickOpen:opened',function() {
        const route = trigHdlr(this,'modal:getRoute');

        if(Str.isNotEmpty(route))
        {
            const anchors = trigHdlr(this,'modal:getAnchors',route);
            trigHdlrs(anchors,'modal:open');
        }
    });
    
    ael(this,'clickOpen:ajaxSuccess',function() {
        trigEvt(document,'modal:common',this);
        
        const route = trigHdlr(this,'modal:getRoute');
        const uri = trigHdlr(this,'modal:getUri');
        if(Str.isNotEmpty(route))
        trigEvt(document,'modal:'+route,this,uri);
    });
    
    ael(this,'clickOpen:reopen',function() {
        trigHdlr(this,'clickOpen:unsetTargetContent');
        trigEvt(this,'clickOpen:opened',false);
    });
    
    ael(this,'clickOpen:closed',function() {
        const route = trigHdlr(this,'modal:getRoute');
        if(Str.isNotEmpty(route))
        {
            const anchors = trigHdlr(this,'modal:getAnchors',route);
            trigHdlrs(anchors,'modal:close');
        }
        
        resetModalAttr.call(this);
    });
    
    ael(this,'click',function() {
        trigEvt(this,'clickOpen:close');
    });
    
    
    // setup
    aelOnce(this,'component:setup',function() {
        boxBind.call(this);
        documentBind.call(this);
    });
    
    
    // setModalAttr
    const setModalAttr = function(anchors,route,uri)
    {
        if(Ele.is(anchors))
        {
            if(!Str.isNotEmpty(route))
            route = getAttr(anchors,$option.attrAnchor);
            
            if(!Str.isNotEmpty(uri))
            uri = Ele.getUri(anchors);
        }
        
        Str.typecheck(route,true);
        
        anchors = Ele.toArray(anchors,false);
        setData(this,'data-anchor',anchors);
        
        setAttr(this,'data-route',route);
        setAttr(this,'data-uri',uri);
    }
    
    
    // resetModalAttr
    const resetModalAttr = function()
    {
        setData(this,'data-anchor',undefined);
        setAttr(this,'data-route',undefined);
        setAttr(this,'data-uri',undefined);
    }
    
    
    // boxBind
    const boxBind = function() 
    {
        const modal = this;
        const box = trigHdlr(this,'modal:getBox');
        
        ael(box,'click',function(event) {
            event.stopPropagation();
        });
        
        aelDelegate(box,'click','button.close',function(event) {
            trigEvt(modal,'clickOpen:close');
        });
    }
    
    
    // documentBind
    const documentBind = function() 
    {
        const modal = this;
        
        setHdlr(document,'doc:getModal',function() {
            return modal;
        });
        
        ael(document,'doc:mountCommon',function(event,node) {
            const anchor = qsa(node,"["+$option.attrAnchor+"]");
            trigHdlr(modal,'modal:anchorBind',anchor,true);
        });
        
        ael(document,'doc:unmountPage',function() {
            trigEvt(modal,'clickOpen:close');
        });
    }
    
    
    // anchorBind
    const anchorBind = function(anchor,click) 
    {
        const modal = this;
        
        setHdlr(anchor,'modal:open',function() {
            toggleClass(this,'selected',true);
        });
        
        setHdlr(anchor,'modal:close',function() {
            toggleClass(this,'selected',false);
        });
        
        setHdlr(anchor,'modal:getAttrHtml',function() {
            return getAttr(this,$option.attrAnchorHtml);
        });
        
        setHdlr(anchor,'modal:getAttrRoute',function() {
            return getAttr(this,$option.attrAnchorRoute);
        });

        if(click === true)
        {
            ael(anchor,'click',function(event) {
                let r = true;
                let result = false;
                const uri = Ele.getUri(this);
                const attrHtml = trigHdlr(this,'modal:getAttrHtml');
                
                if(Str.isNotEmpty(attrHtml))
                result = trigHdlr(modal, 'modal:set', attrHtml, null, trigHdlr(this,'modal:getAttrRoute'))
                
                else if(Str.isNotEmpty(uri))
                result = trigHdlr(modal,'modal:fetch',this);
                
                if(result === true)
                {
                    Evt.preventStop(event);
                    r = false;
                }
                
                return r;
            });
        }
    }
    
    return this;
}