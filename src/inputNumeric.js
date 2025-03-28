/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// inputNumeric
// script with logic for an input containing a number
Component.InputNumeric = function(option)
{
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // option
    const $option = Pojo.replace({
        timeout: 500
    },option);
    
    
    // bindings
    Component.ValidatePrevent.call(this,'inputNumeric:change');
    Component.KeyboardArrow.call(this,'vertical');
    Component.InputMemory.call(this);
    

    // handler
    setHdlrs(this,'inputNumeric:',{
        
        shouldDebounce: function() {
            let r = Ele.getData(this,'shouldDebounce');
            r = (r == null)? true:r;
            trigHdlr(this,'inputNumeric:setDebounce',true);
            return r;
        },
        
        setDebounce: function(value) {
            Ele.setData(this,'shouldDebounce',Bool.typecheck(value));
        },
        
        getValueRestore: function() {
            let r = trigHdlr(this,'inputMemory:get','int');
            
            if(!Num.is(r))
            r = trigHdlr(this,'input:getValueInt');
            
            return r;
        },
        
        setValue: function(value,change) {
            trigHdlr(this,'input:setValue',value);
            
            if(change === true)
            trigEvt(this,'inputNumeric:change');
            
            else
            trigHdlr(this,'inputMemory:remember');
        },
        
        getMin: function() {
            const min = getAttr(this,'data-min','int');
            return min == null ? 1: min;
        },
        
        getMax: function() {
            return getAttr(this,'data-max','int');
        },
        
        getPrev: function() {
            let r = null;
            const val = trigHdlr(this,'inputMemory:get','int');
            const min = trigHdlr(this,'inputNumeric:getMin');
            
            if(Integer.is(val))
            {
                const newVal = (val-1);
                if(newVal >= min)
                r = newVal;
            }
            
            return r;
        },
        
        getNext: function() {
            let r = null;
            const val = trigHdlr(this,'inputMemory:get','int');
            const max = trigHdlr(this,'inputNumeric:getMax');
            
            if(Integer.is(val))
            {
                const newVal = (val+1);
                if(newVal <= max)
                r = newVal;
            }
            
            return r;
        },
        
        setPrev: function(change) {
            const value = trigHdlr(this,'inputNumeric:getPrev');
            if(value != null)
            trigHdlr(this,'inputNumeric:setValue',value,change);
        },
        
        setNext: function(change) {
            const value = trigHdlr(this,'inputNumeric:getNext');
            if(value != null)
            trigHdlr(this,'inputNumeric:setValue',value,change);
        },
        
        validateReplace: function(val) {
            let r = null;
            const min = trigHdlr(this,'inputNumeric:getMin');
            const max = trigHdlr(this,'inputNumeric:getMax');
            
            if(val > max)
            r = max;
            
            else if(val < min)
            r = min;
            
            return r;
        },
        
        validate: function() {
            let r = false;
            let val = trigHdlr(this,'input:getValue');
            
            if(Num.is(val))
            {
                val = Integer.cast(val);
                const newVal = trigHdlr(this,'inputNumeric:validateReplace',val);
                
                if(newVal != null)
                trigHdlr(this,'inputNumeric:setValue',newVal);
                
                if(trigHdlr(this,'validate:isValid'))
                r = true;
            }
            
            else
            trigEvt(this,'validate:invalid');
            
            return r;
        },
        
        shouldChange: function() {
            return true;
        },
        
        process: function(noCompareValue) {
            const value = trigHdlr(this,'inputNumeric:getValueRestore');
            const validate = trigHdlr(this,'inputNumeric:validate');
            const shouldChange = trigHdlr(this,'inputNumeric:shouldChange');
            const newValue = trigHdlr(this,'input:getValueInt');
            let r = (validate === true && shouldChange === true);
            
            if(r === true && value === newValue && noCompareValue !== true)
            r = false;
            
            if(r === true)
            trigEvt(this,'inputNumeric:change');
            
            return r;
        }
    });
    

    // event
    ael(this,'input',function(event) {
        processDebounce.call(this,event);
    });
    
    ael(this,'validate:invalid',function() {
        const value = trigHdlr(this,'inputNumeric:getValueRestore');
        trigHdlr(this,'inputNumeric:setValue',value);
        trigEvt(this,'validate:valid');
    });
    
    ael(this,'focus',function() {
        trigHdlr(this,'inputMemory:remember');
        trigHdlr(this,'input:setEmpty');
    });
    
    ael(this,'focusout',function() {
        processChange.call(this);
    });
    
    ael(this,'inputNumeric:change',function() {
        trigHdlr(this,'inputMemory:remember');
    });
    
    ael(this,'keyboardArrow:up',function() {
        trigHdlr(this,'inputNumeric:setNext');
        processDebounce.call(this,null,true);
    });
    
    ael(this,'keyboardArrow:down',function() {
        trigHdlr(this,'inputNumeric:setPrev');
        processDebounce.call(this,null,true);
    });
    
    
    // processChange
    const processChange = function() 
    {
        if(trigHdlr(this,'inputMemory:hasChanged'))
        trigHdlr(this,'inputNumeric:process');
    }
    
    
    // processDebounce
    const processDebounce = Func.debounce($option.timeout,function(event,noCompareValue) 
    {
        if(trigHdlr(this,'inputNumeric:shouldDebounce') && Ele.match(this,":focus"))
        {
            const result = trigHdlr(this,'inputNumeric:process',noCompareValue);
            
            if(result === false)
            trigEvt(this,'inputNumeric:processFailed');
        }
    });
    
    return this;
}