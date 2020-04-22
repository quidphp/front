/*
 * This file is part of the QuidPHP package.
 * Website: https://quidphp.com
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// indexNode
// component to find a node within a set according to an index
Component.IndexNode = function(option)
{
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // option
    const $option = Pojo.replace({
        key: 'indexNode',
        current: null,
        targets: null,
        loop: false
    },option);
    
    
    // handler
    setHdlrs(this,$option.key+':',{
        
        current: function() {
            return (Str.isNotEmpty($option.current))? trigHdlr(this,$option.current):null;
        },
        
        targets: function() {
            return (Str.isNotEmpty($option.targets))? trigHdlr(this,$option.targets):null;
        },
        
        find: function(type) {
            let r = null;
            const current = trigHdlr(this,$option.key+':current');
            const targets = trigHdlr(this,$option.key+':targets');
            
            if(targets != null)
            r = Nav.indexNode(type,current,targets,$option.loop);
            
            return r;
        }
    });
    
    return this;
}