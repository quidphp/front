/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// input
// script with behaviours for an input component
Component.Input = function() 
{    
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // components
    Component.Validate.call(this);
    
    
    // handler
    setHdlrs(this,'input:',{
        
        isBinded: function() {
            return true;
        },
        
        isValidateSetup: function() {
            return false;
        },
        
        isControlled: function() {
            return getAttr(this,'data-controlled','int') === 1;
        },
        
        isGroup: function() {
            return trigHdlr(this,'input:isRadioCheckbox');
        },
        
        isEmpty: function() {
            const value = trigHdlr(this,'input:getValue');
            return Str.isEmpty(value,true);
        },
        
        isDisabled: function() {
            return getProp(this,'disabled') === true;
        },
        
        allowMultiple: function() {
            return getProp(this,'multiple') === true;
        },
        
        getValue: function(trim,cast) {
            return Ele.getValue(this,trim,cast);
        },
        
        getValueTrim: function(cast) {
            return trigHdlr(this,'input:getValue',true,cast);
        },

        getValueEncoded: function(trim) {
            let r = trigHdlr(this,'input:getValue',trim);
            
            if(Str.isNotEmpty(r))
            r = encodeURIComponent(r);
            
            return r;
        },
        
        getValueInt: function() {
            return trigHdlr(this,'input:getValue',true,'int');
        },
        
        getValueJson: function() {
            return trigHdlr(this,'input:getValue',null,'json');
        },
        
        getId: function() {
            return getProp(this,'id');
        },
        
        getName: function() {
            return getProp(this,'name');
        },
        
        getType: function() {
            return (Ele.match(this,"input"))? getProp(this,'type'):null;
        },
        
        getTag: function() {
            return Ele.tag(this);
        },
        
        getForm: function() {
            return Ele.closest(this,'form');
        },
        
        getValidateEvent: function() {
            return 'input';
        },
        
        isRadioCheckbox: function() {
            return Arr.in(trigHdlr(this,'input:getType'),['radio','checkbox']);
        },
        
        isSelect: function() {
            return trigHdlr(this,'input:getType') === 'select';
        },
        
        setValue: function(value,fireInput,fireChange) {
            const oldValue = trigHdlr(this,'input:getValue');
            Ele.setValue(this,value);
            const newValue = trigHdlr(this,'input:getValue');
            
            if(oldValue !== newValue)
            {
                trigEvt(this,'input:change');
                
                if(fireInput === true)
                trigEvt(this,'input');
                
                if(fireChange === true)
                trigEvt(this,'change');
            }
        },
        
        setEmpty: function() {
            trigHdlr(this,'input:setValue','');
        },
        
        appendValue: function(value) {
            const current = trigHdlr(this,'input:getVal') || '';
            const newVal = (current + value);
            trigHdlr(this,'input:setValue',newVal);
        },
        
        isSystem: function() {
            return Ele.match(this,"[name^='-']");
        },
        
        isTarget: function() {
            return (!trigHdlr(this,'input:isDisabled') && !trigHdlr(this,'input:isSystem') && Ele.match(this,"[name]"));
        },
        
        isTargetVisible: function() {
            return trigHdlr(this,'input:isTarget') && Ele.isVisible(this);
        },
        
        isSerialize: function() {
            let r = false;
            const isRadioCheckbox = trigHdlr(this,'input:isRadioCheckbox');
            
            if(trigHdlr(this,'input:isTarget'))
            r = (isRadioCheckbox === true)? Ele.match(this,':checked'):true;
            
            return r;
        },
        
        isValidate: function() {
            return trigHdlr(this,'input:isTarget') && Ele.match(this,"[data-required],[data-pattern]");
        },
        
        isFile: function() {
            return Ele.match(this,"input[type='file']");
        },
        
        isCsrf: function() {
            return trigHdlr(this,'input:isSystem') && Ele.match(this,"[data-csrf='1']");
        },
        
        isGenuine: function() {
            return trigHdlr(this,'input:isSystem') && Ele.match(this,"[data-genuine='1']");
        },
        
        isSubmit: function() {
            return Ele.match(this,"[type='submit'],[type='image']");
        },
        
        isClickedSubmit: function() {
            return trigHdlr(this,'input:isSubmit') && Ele.match(this,"[data-submit-click]");
        },
        
        getParent: function() {
            let r = Ele.closest(this,"form");
            
            if(r == null)
            r = document;
            
            return r;
        },
        
        getLabels: function() {
            const parent = trigHdlr(this,'input:getParent');
            const id = trigHdlr(this,'input:getId');
            
            if(Str.isNotEmpty(id))
            return qsa(parent,"label[for='"+id+"']");
        },
        
        // handlers qui renvoie vers event, car ie11 n'envoie pas de custom event aux nodes disabled
        enable: function() {
            setProp(this,'disabled',false);
            trigHdlr(this,'node:enable');
            trigEvt(this,'input:enable');
        },
        
        disable: function() {
            trigEvt(this,'input:disable');
            trigHdlr(this,'node:disable');
            setProp(this,'disabled',true);
        }
    });
    
    setHdlr(this,'validate:getValue',function() {
        return trigHdlr(this,'input:getValue',true);
    });
    
    
    // setup
    aelOnce(this,'input:setupGroup',function() {
        const isGroup = trigHdlr(this,'input:isGroup');
        
        // isGroup
        if(isGroup === true)
        Component.InputGroup.call(this);
        
        // handler
        setHdlr(this,'validate:getValue',function() {
            return (isGroup === true)? trigHdlr(this,'inputGroup:getValue'):trigHdlr(this,'input:getValue',true);
        });
    });
    
    aelOnce(this,'input:setupValidate',function() {
        const validateEvent = Str.typecheck(trigHdlr(this,'input:getValidateEvent'),true);
        
        if(!trigHdlr(this,'validate:isBinded'))
        Component.Validate.call(this);
        
        setHdlr(this,'input:isValidateSetup',function() {
            return true;
        });
        
        ael(this,'focusout',function() {
            trigHdlr(this,'validate:process');
        });
        
        ael(this,'focus',function() {
            trigEvt(this,"validate:valid");
        });
                
        ael(this,validateEvent,function() {
            const isGroup = trigHdlr(this,'input:isGroup');
            const target = (isGroup === true)? trigHdlr(this,'inputGroup:get'):this;
            trigHdlrs(target,(isGroup === true)? 'validate:trigger':'validate:process');
        });
    });
    
    aelOnce(this,'component:setup',function() {
        trigEvt(this,'input:setupGroup');
        trigEvt(this,'input:setupValidate');
    });
    
    return this;
}