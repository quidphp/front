/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// inputGroup
// script with behaviours for an input group component (like checkbox and radio)
Component.InputGroup = function() 
{    
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // handler
    setHdlrs(this,'inputGroup:',{
        
        isChecked: function() {
            return getProp(this,'checked') === true;
        },
        
        getValue: function() {
            let r = undefined;
            const group = trigHdlr(this,'inputGroup:getChecked');
            
            if(Arr.isNotEmpty(group))
            {
                r = Arr.accumulate([],group,function(ele) {
                    return trigHdlr(ele,'input:getValue');
                });
            }
            
            return r;
        },
        
        get: function() {
            let r = null;
            const parent = trigHdlr(this,'input:getParent');
            const name = trigHdlr(this,'input:getName');
            const type = trigHdlr(this,'input:getType');
            const tag = trigHdlr(this,'input:getTag');
            
            if(Str.isNotEmpty(name) && Str.isNotEmpty(tag))
            {
                const typeSearch = (Str.isNotEmpty(type))? "[type='"+type+"']":tag;
                r = qsa(parent,typeSearch+"[name='"+name+"']");
            }
            
            return r;
        },
        
        getChecked: function() {
            let r = null;
            const group = trigHdlr(this,'inputGroup:get');
            
            if(Arr.isNotEmpty(group))
            {
                r = Arr.accumulate([],group,function(ele) {
                    return (trigHdlr(ele,'inputGroup:isChecked'))? ele:null;
                });
            }
            
            return r;
        },
        
        setChecked: function(value) {
            Bool.typecheck(value);
            Ele.setProp(this,'checked',value);
        }
    });
    
    return this;
}