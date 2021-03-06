/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// form
// script with behaviours for a form component
Component.Form = function() 
{   
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // component
    Component.BlockEvent.call(this,'submit');
    
    
    // handler
    setHdlrs(this,'form:',{
        
        isBinded: function() {
            return true;
        },
        
        isSubmitted: function() {
            return getData(this,'form-submitted') === 1;
        },
        
        getFields: function() {
            return qsa(this,Dom.selectorInput(false));
        },
        
        getSystemFields: function() {
            return Arr.filter(trigHdlr(this,'form:getFields'),function(ele) {
                return trigHdlr(ele,'input:isSystem');
            });
        },
        
        getTargetFields: function() {
            return Arr.filter(trigHdlr(this,'form:getFields'),function(ele) {
                return trigHdlr(ele,'input:isTarget');
            });
        },
        
        getSerializeFields: function() {
            return Arr.filter(trigHdlr(this,'form:getFields'),function(ele) {
                return trigHdlr(ele,'input:isSerialize');
            });
        },
        
        getTargetVisibleFields: function() {
            return Arr.filter(trigHdlr(this,'form:getFields'),function(ele) {
                return trigHdlr(ele,'input:isTargetVisible');
            });
        },
        
        getValidateFields: function() {
            return Arr.filter(trigHdlr(this,'form:getFields'),function(ele) {
                return trigHdlr(ele,'input:isValidate');
            });
        },
        
        getFiles: function() {
            return Arr.filter(trigHdlr(this,'form:getFields'),function(ele) {
                return trigHdlr(ele,'input:isFile');
            });
        },
        
        getSubmits: function() {
            return Arr.filter(trigHdlr(this,'form:getFields'),function(ele) {
                return trigHdlr(ele,'input:isSubmit');
            });
        },
        
        getCsrfField: function() {
            return Arr.find(trigHdlr(this,'form:getFields'),function(ele) {
                return trigHdlr(ele,'input:isCsrf');
            });
        },
        
        getGenuineField: function() {
            return Arr.find(trigHdlr(this,'form:getFields'),function(ele) {
                return trigHdlr(ele,'input:isGenuine');
            });
        },
        
        getClickedSubmit: function() {
            return Arr.find(trigHdlr(this,'form:getFields'),function(ele) {
                return trigHdlr(ele,'input:isClickedSubmit');
            });
        },
        
        getValidateField: function() {
            return Arr.valueFirst(trigHdlr(this,'form:getValidateFields'));
        },
        
        getSubmit: function() {
            return Arr.valueFirst(trigHdlr(this,'form:getSubmits'));
        },
        
        hasFiles: function() {
            return Arr.isNotEmpty(trigHdlr(this,'form:getFiles'));
        },
        
        getClickedSubmits: function() {
            let r = trigHdlr(this,'form:getClickedSubmit');
            
            if(r != null)
            {
                const name = trigHdlr(r,'input:getName');
                
                if(Str.isNotEmpty(name))
                {
                    r = Arr.filter(trigHdlr(this,'form:getSubmits'),function(ele) {
                        return Ele.match(ele,"[name='"+name+"']");
                    });
                }
            }
            
            return r;
        },
        
        serialize: function() {
            const target = trigHdlr(this,'form:getSerializeFields');
            return Ele.serialize(target);
        },
        
        serializeStore: function() {
            const serialize = trigHdlr(this,'form:serialize');
            setData(this,'form-serialize',serialize);
        },
        
        hasChanged: function() {
            let r = false;
            const serialize = trigHdlr(this,'form:serialize');
            const original = getData(this,'form-serialize');
            
            if(original != null && serialize !== original)
            r = true;
            
            return r;
        },
        
        focusFirst: function() {
            const target = Arr.find(trigHdlr(this,'form:getTargetVisibleFields'),function(ele) {
                return trigHdlr(ele,'input:isEmpty');
            });

            if(target != null)
            Ele.focus(target);
            
            return this;
        },
        
        enable: function() {
            const fields = trigHdlr(this,'form:getFields');
            trigHdlr(this,'node:enable');
            trigHdlrs(fields,'input:enable');
        },
        
        disable: function() {
            const fields = trigHdlr(this,'form:getFields');
            trigHdlr(this,'node:disable');
            trigHdlrs(fields,'input:disable');
        }
    });
    
    
    // prepare
    aelOnce(this,'form:prepare',function() {
        prepareGenuine.call(this);
        prepareSerialize.call(this);
    });
    
    
    // setup
    aelOnce(this,'component:setup',function() {
        // genuine + hasChanged
        if(!Ele.match(this,"[data-skip-form-prepare='1']"))
        trigEvt(this,'form:prepare');
        
        // submit
        prepareSubmit.call(this);
        
        // validation 
        if(!Ele.match(this,"[data-validation='0']"))
        prepareValidate.call(this);
        
        // confirm
        if(Ele.match(this,"[data-confirm]"))
        prepareConfirm.call(this);
        
        // formUnload
        if(Ele.match(this,"[data-unload]"))
        prepareUnload.call(this);
        
        // submitted
        prepareSubmitted.call(this);

        // block
        if(!Ele.match(this,"[data-block='0']"))
        prepareBlock.call(this);
        
        // setup
        trigSetup(this);
    });
    
    
    // teardown
    aelOnce(this,'component:teardown',function() {
        // formUnload
        if(Ele.match(this,"[data-unload]"))
        removeUnload.call(this);
    });
    
    
    // prepareGenuine
    const prepareGenuine = function() 
    {
        const genuine = trigHdlr(this,'form:getGenuineField');
        if(genuine != null)
        {
            const name = trigHdlr(genuine,'input:getName');
            const newName = name+"2-";
            
            if(!qs(this,"[name="+newName+"]"))
            {
                const newValue = 1;
                const genuine2 = Html.input(newValue,{type: 'hidden', name: newName});
                Ele.prepend(this,genuine2);
            }
        }
    }
    
    
    // prepareSerialize
    const prepareSerialize = function() 
    {
        trigHdlr(this,'form:serializeStore');
    }
    
    
    // prepareSubmit
    // click sur submit, met un attribut data-clicked
    // bind le message de confirmation s'il y a data-confirm
    const prepareSubmit = function() 
    {
        const submits = trigHdlr(this,'form:getSubmits');
        
        ael(submits,'click',function() {
            Ele.removeAttr(submits,'data-submit-click');
            toggleAttr(this,'data-submit-click',true);
        });
        
        const submitsConfirm =  Arr.filter(submits,function(ele) {
            return Ele.match(ele,'[data-confirm]');
        });
        Component.Confirm.call(submitsConfirm,'click');
    }
    
    
    // prepareConfirm
    const prepareConfirm = function() 
    {
        Component.Confirm.call(this,'submit');
    }
    
    
    // prepareValidate
    const prepareValidate = function() 
    {
        Component.ValidatePrevent.call(this,'submit');
        
        setHdlr(this,'validatePrevent:getTargets',function() {
            const targets = trigHdlr(this,'form:getValidateFields');

            Arr.each(targets,function(ele) {
                if(trigHdlr(ele,'input:isValidateSetup') === false)
                trigSetup(ele);
            });
            
            return targets;
        });
    }
    
    
    // prepareUnload
    // permet d'ajouter un message d'alerte si le formulaire a changé et on tente de changer la page (unload)
    const prepareUnload = function()
    {
        const $this = this;
        
        setHdlr(this,'windowUnload:getText',function() {
            if(!trigHdlr(this,'form:isSubmitted') && trigHdlr(this,'form:hasChanged'))
            return getAttr(this,'data-unload');
        });
        
        ael(this,'submit',function() {
            setData(this,'form-submitted',1);
        });
        
        trigHdlr(window,'windowUnload:addNode',this);
        
        aelOnce(document,'doc:unmountPage',function() {
            trigHdlr(window,'windowUnload:removeNode',$this);
        });
    }
    
    
    // prepareSubmitted
    const prepareSubmitted = function()
    {
        ael(this,'submit',function() {
            Func.async(function() {
                trigEvt(this,'form:submitted');
            },this);
        });
    }
    
    
    // prepareBlock
    const prepareBlock = function()
    {
        ael(this,'submit',function() {
            trigHdlr(this,'blockEvent:block','submit');
        });
    }
    
    
    // removeUnload
    // enlève la node de windowUnload
    // le formulaire ne peut plus envoyer de message d'aleter
    const removeUnload = function()
    {
        trigHdlr(window,'windowUnload:removeNode',this);
    }
    
    return this;
}