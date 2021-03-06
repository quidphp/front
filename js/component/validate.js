/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// validation
// component with functions related to validation (pattern and required)
Component.Validate = function() 
{    
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // handler
    setHdlrs(this,'validate:',{
        
        isBinded: function() {
            return true;
        },
        
        getValue: function() {
            return Ele.getValue(this,true);
        },
        
        isRequired: function() {
            const dataRequired = trigHdlr(this,'validate:getRequired');
            return Num.isPositive(dataRequired);
        },
        
        getRequired: function() {
            return getAttr(this,"data-required");
        },
        
        getPattern: function() {
            return getAttr(this,"data-pattern");
        },
        
        isEmpty: function() {
            return Vari.isEmpty(trigHdlr(this,'validate:getValue'));
        },
        
        isEmptyAndRequired: function() {
            return (trigHdlr(this,'validate:isRequired') && trigHdlr(this,'validate:isEmpty'));
        },
        
        validEmptyArray: function(type) {
            let r = [];
            let validate = null;
            const value = trigHdlr(this,'validate:getValue');
            const empty = Vari.isEmpty(value);
            const required = trigHdlr(this,'validate:getRequired');
            const pattern = trigHdlr(this,'validate:getPattern');
            
            if(type === 'required')
            validate = Validate.required(value,required);
            
            else if(type === 'pattern')
            validate = Validate.pattern(value,pattern);
            
            else
            validate = Validate.trigger(value,required,pattern);
            
            return [validate,empty];
        },
        
        isValid: function(type) {
            return Arr.valueFirst(trigHdlr(this,'validate:validEmptyArray',type));
        },
        
        isNotEmptyAndValid: function(type) {
            return !trigHdlr(this,'validate:isEmpty') && trigHdlr(this,'validate:isValid',type);
        },
        
        process: function() {
            return trigHdlr(this,trigHdlr(this,'validate:isEmpty')? 'validate:pattern':'validate:trigger');
        },
        
        required: function() {
            return trigHdlr(this,'validate:trigger','required');
        },
        
        pattern: function() {
            return trigHdlr(this,'validate:trigger','pattern');
        },
        
        trigger: function(type) {
            const validEmpty = trigHdlr(this,'validate:validEmptyArray',type);
            const r = validEmpty[0];
            const empty = validEmpty[1];
            
            trigEvt(this,(r === true)? 'validate:valid':'validate:invalid');
            trigEvt(this,(empty === true)? 'validate:empty':'validate:notEmpty');
            
            return r;
        }
    });
    
    
    // event
    ael(this,'validate:valid',function() {
        setAttr(this,'data-validate','valid');
    });
    
    ael(this,'validate:invalid',function() {
        setAttr(this,'data-validate','invalid');
    });
    
    ael(this,'validate:empty',function() {
        toggleAttr(this,'data-empty',true);
    });
    
    ael(this,'validate:notEmpty',function() {
        toggleAttr(this,'data-empty',false);
    });
    
    return this;
}