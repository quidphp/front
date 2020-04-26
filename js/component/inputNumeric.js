/*
 * This file is part of the QuidPHP package.
 * Website: https://quidphp.com
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
        timeout: 500,
        keyEvent: 'keydown'
    },option);
    
    
    // bindings
    Component.ValidatePrevent.call(this,'inputNumeric:change');
    Component.KeyboardArrow.call(this,'vertical');
    Component.InputMemory.call(this);
    

    // handler
    setHdlrs(this,'inputNumeric:',{
        
        getValueRestore: function() {
            return trigHdlr(this,'inputMemory:get','int') || trigHdlr(this,'input:getValueInt');
        },
        
        setValue: function(value,change) {
            trigHdlr(this,'input:setValue',value);
            
            if(change === true)
            trigEvt(this,'inputNumeric:change');
            
            else
            trigHdlr(this,'inputMemory:remember');
        },
        
        getMin: function() {
            return getAttr(this,'data-min','int') || 1;
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
        
        process: function() {
            const value = trigHdlr(this,'inputNumeric:getValueRestore');
            const validate = trigHdlr(this,'inputNumeric:validate');
            const shouldChange = trigHdlr(this,'inputNumeric:shouldChange');
            const newValue = trigHdlr(this,'input:getValueInt');
            
            if(validate === true && shouldChange === true && value !== newValue)
            trigEvt(this,'inputNumeric:change');
        }
    });
    

    // event
    ael(this,$option.keyEvent,function(event) {
        if(!Evt.isSpecialKeyCode(event))
        keyboardDebouce.call(this,event);
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
        processOnChange.call(this);
    });
    
    ael(this,'change',function() {
        processOnChange.call(this);
    });
    
    ael(this,'inputNumeric:change',function() {
        trigHdlr(this,'inputMemory:remember');
    });
    
    ael(this,'keyboardArrow:up',function() {
        trigHdlr(this,'inputNumeric:setNext');
        keyboardDebouce.call(this);
    });
    
    ael(this,'keyboardArrow:down',function() {
        trigHdlr(this,'inputNumeric:setPrev');
        keyboardDebouce.call(this);
    });
    
    
    // keyboardDebouce
    const keyboardDebouce = Func.debounce($option.timeout,function() 
    {
        if(Ele.match(this,":focus"))
        trigEvt(this,'inputNumeric:change');
    });
    
    
    // processOnChange
    const processOnChange = function() 
    {
        if(trigHdlr(this,'inputMemory:hasChanged'))
        trigHdlr(this,'inputNumeric:process');
    }
    
    return this;
}