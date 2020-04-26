/*
 * This file is part of the QuidPHP package.
 * Website: https://quidphp.com
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// externalBlank
// component to make all child anchors who are external as target _blank
Component.ExternalBlank = function(persistent)
{
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // handler
    setHdlrs(this,'externalBlank:',{
        
        all: function() {
            return qsa(this,'a');
        },
        
        withoutTarget: function() {
            return qsa(this,"a:not([target='_blank'])");
        },
        
        externalWithoutTarget: function() {
            return Arr.filter(trigHdlr(this,'externalBlank:withoutTarget'),function(ele) {
                return (Uri.isExternal(getAttr(ele,"href")) && !Ele.match(ele,"[href^='mailto:']"));
            });
        },
        
        go: function() {
            const anchors = trigHdlr(this,'externalBlank:externalWithoutTarget');
            
            Arr.each(anchors,function(ele) {
                setProp(ele,'target','_blank');
            });
        }
    });
    
    
    // setup
    aelOnce(this,'component:setup',function() {
        trigHdlr(this,'externalBlank:go');
    });
    
    return this;
}