/*
 * This file is part of the QuidPHP package.
 * Website: https://quidphp.com
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// inputSearchHref
// script containing logic for a search input with a button
Component.InputSearch = function(option)
{
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // option
    const $option = Pojo.replace({
        timeout: 500,
        keyEvent: 'keydown',
        useCurrent: false,
        keypressTrigger: true,
        button: "button[type='button']"
    },option);
    
    
    // components
    Component.KeyboardEnter.call(this,true,$option.keyEvent);
    Component.ValidatePrevent.call(this,'inputSearch:change');
    Component.InputMemory.call(this);
    
    
    // handler
    setHdlrs(this,'inputSearch:',{
        
        shouldDebounce: function() {
            const r = shouldDebounce;
            trigHdlr(this,'inputSearch:setDebounce',true);
            return r;
        },
        
        setDebounce: function(value) {
            shouldDebounce = Bool.typecheck(value);
        },
        
        getCurrent: function() {
            return getAttr(this,'data-current');
        },
        
        setCurrent: function(value) {
            setAttr(this,"data-current",value);
        },
        
        unsetCurrent: function() {
            Ele.removeAttr(this,"data-current");
        },
        
        getButton: function() {
            return (Str.is($option.button))? Ele.next(this,$option.button):undefined;
        },
        
        validate: function() {
            let r = trigHdlr(this,'validate:process');
            const val = trigHdlr(this,'input:getValueTrim');
            const current = trigHdlr(this,'inputSearch:getCurrent');
            
            if(r === true && ($option.useCurrent && Str.isEqual(val,current)))
            {
                r = false;
                trigEvt(this,'validate:invalid');
            }
            
            return r;
        },
        
        process: function() {
            const validate = trigHdlr(this,'inputSearch:validate');
            
            if(validate === true)
            {
                trigHdlr(this,'inputMemory:remember');
                trigEvt(this,'inputSearch:change');
            }
        },
        
        success: function() {
            const value = trigHdlr(this,'input:getValueTrim');
            
            if($option.useCurrent === true)
            trigHdlr(this,'inputSearch:setCurrent',value);
            
            trigHdlr(this,'inputSearch:clearTimeout');
        },
        
        buttonClick: function() {
            trigHdlr(this,'inputSearch:setDebounce',false);
            trigHdlr(this,'inputSearch:process');
        }
    });
    
    // event
    ael(this,$option.keyEvent,function(event) {
        if(!Evt.isSpecialKeyCode(event))
        keyboardDebouce.call(this,event);
    });
    
    ael(this,'keyboardEnter:blocked',function() {
        trigHdlr(this,'inputSearch:buttonClick');
    });
    
    ael(this,'click',function(event) {
        event.stopPropagation();
    });
    
    ael(this,'change',function() {
        if(trigHdlr(this,'inputMemory:hasChanged'))
        trigHdlr(this,'inputSearch:process');
    });
    
    ael(this,'inputSearch:change',function() {
        trigHdlr(this,'inputSearch:clearTimeout');
    });
    
    
    // setup
    aelOnce(this,'component:setup',function() {
        bindButton.call(this);
    });
    
    
    // keyboardDebouce
    let shouldDebounce = true;
    const keyboardDebouce = Func.debounce($option.timeout,function() 
    {
        if(trigHdlr(this,'inputSearch:shouldDebounce') && Ele.match(this,":focus"))
        {
            const validate = trigHdlr(this,'inputSearch:validate');
            
            if((validate === false || $option.keypressTrigger))
            {
                trigHdlr(this,'inputMemory:remember');
                trigHdlr(this,'inputSearch:process');
            }
        }
    });
    
    
    // bindButton
    const bindButton = function() 
    {
        const $this = this;
        const button = trigHdlr(this,'inputSearch:getButton');

        ael(button,'click',function(event) {
            trigHdlr($this,'inputSearch:buttonClick');
            Evt.preventStop(event);
        });
    }
    
    return this;
}