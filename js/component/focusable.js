/*
 * This file is part of the QuidPHP package.
 * Website: https://quidphp.com
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// focusable
// component to allow focus navigaton on a set of nodes
Component.Focusable = function(option)
{
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // option
    const $option = Pojo.replace({
        target: "a,button",
        loop: false
    },option);
    
    
    // component
    Component.IndexNode.call(this,{ current: 'focusable:getCurrent', targets: 'focusable:getTargets', loop: $option.loop });

    
    // handler
    setHdlrs(this,'focusable:',{
        
        getTargets: function() {
            return qsa(this,$option.target);
        },
        
        getCurrent: function() {
            const targets = trigHdlr(this,'focusable:getTargets');

            let r = Arr.find(targets,function(ele) {
                return Ele.match(ele,":focus");
            });
            
            if(r == null)
            r = trigHdlr(this,'focusable:getCurrentFallback');
            
            return r;
        },
        
        getCurrentFallback: function() {
            return null;
        },
        
        focus: function(node) {
            if(Ele.is(node))
            Ele.focus(node);
        },
        
        prev: function() {
            trigHdlr(this,'focusable:focus',trigHdlr(this,'indexNode:find','prev'));
        },
        
        next: function() {
            trigHdlr(this,'focusable:focus',trigHdlr(this,'indexNode:find','next'));
        }
    });
    
    return this;
}