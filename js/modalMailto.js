/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */

// modalMailto
// script for mailto links opening in a modal for confirmation
Component.ModalMailto = function(option)
{
    // option
    const $option = Pojo.replace({
        query: 'v',
        href: null,
        route: 'email'
    },option);
    
    
    // handler
    setHdlrs(this,'modalMailto:',{
        
        getModal: function() {
            return trigHdlr(document,'doc:getModal');
        },
        
        getAnchors: function() {
            return qsa(this,"a[href^='mailto:']:not([data-mailto='1'])");
        },
        
        getHref: function() {
            const modal = trigHdlr(this,'modalMailto:getModal');
            const href = getAttr(modal,'data-mailto') || $option.href;
            return Str.typecheck(href,true);
        },
        
        getQuery: function() {
            return Str.typecheck($option.query,true);
        }
    });
    
    
    // setup
    aelOnce(this,'component:setup',function() {
        bindAnchors.call(this);
    });
    
    
    // bindAnchors
    const bindAnchors = function()
    {
        const modal = trigHdlr(this,'modalMailto:getModal');
        const anchors = trigHdlr(this,'modalMailto:getAnchors');
        const href = trigHdlr(this,'modalMailto:getHref');
        const query = trigHdlr(this,'modalMailto:getQuery');
        trigHdlr(modal,'modal:anchorBind',anchors,false);
        
        ael(anchors,'click',function(event) {
            const anchorHref = getAttr(this,'href');
            const mailto = Uri.getMailto(anchorHref);
            
            if(Str.isNotEmpty(mailto))
            {
                const config = {};
                config.url = href;
                config.data = {};
                config.data[query] = mailto;
                trigHdlr(modal,'modal:fetch',config,this,$option.route,href);
                Evt.preventStop(event,true);
            }
        });
    }
    
    return this;
}