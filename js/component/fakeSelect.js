/*
 * This file is part of the QuidPHP package.
 * Website: https://quidphp.com
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// fakeSelect
// script with some logic for a select replacement component, uses clickOpen
Component.FakeSelect = function()
{
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // components
    Component.ClickOpenTrigger.call(this,{trigger: "> .trigger", target: "> .options", background: "fakeselect"});
    Component.Focusable.call(this,{target: "> .options button"});
    Component.KeyboardEnter.call(this,true);
    Component.KeyboardArrow.call(this,true);
    Component.IndexNode.call(this,{ key: 'indexNodePrevNext', current: 'fakeSelect:getSelected', targets: 'fakeSelect:getChoices' });
    

    // handler
    setHdlrs(this,'fakeSelect:',{
        
        getSelect: function() {
            return Ele.prev(this,'select');
        },
        
        getChoices: function() {
            const target = trigHdlr(this,'clickOpen:getTarget');
            return qsa(target,"li > button");
        },
        
        getChoice: function(value) {
            return Arr.find(trigHdlr(this,'fakeSelect:getChoices'),function(ele) {
                return Str.isEqual(getAttr(ele,'data-value'),value);
            });
        },
        
        getSelected: function() {
            return Arr.find(trigHdlr(this,'fakeSelect:getChoices'),function(ele) {
                return (getAttr(ele,'data-selected','int') === 1);
            });
        },
        
        getTitle: function() {
            const trigger = trigHdlr(this,'clickOpen:getTrigger');
            return qs(trigger,".title");
        },
        
        setTitle: function(value) {
            const title = trigHdlr(this,'fakeSelect:getTitle');
            Ele.setText(title,value);
        },
        
        setPrev: function() {
            choosePrevNext.call(this,'prev');
        },
        
        setNext: function() {
            choosePrevNext.call(this,'next');
        }
    });
    
    
    // event
    ael(this,'keyboardEnter:blocked',function() {
        trigHdlr(this,'clickOpen:toggle');
    });
    
    ael(this,'keyboardArrow:up',function() {
        if(trigHdlr(this,'clickOpen:isOpen'))
        trigHdlr(this,'focusable:prev');
        else
        trigHdlr(this,'fakeSelect:setPrev');
    });
    
    ael(this,'keyboardArrow:down',function() {
        if(trigHdlr(this,'clickOpen:isOpen'))
        trigHdlr(this,'focusable:next');
        else
        trigHdlr(this,'fakeSelect:setNext');
    });
    
    ael(this,'clickOpen:opened',function() {
        const selected = trigHdlr(this,'fakeSelect:getSelected');
        if(selected != null)
        Ele.focus(selected);
    });
    
    ael(this,'clickOpen:closed',function() {
        trigHdlr(this,'absolutePlaceholder:refresh');
    });
    
    
    // setup
    aelOnce(this,'component:setup',function() {
        bindTrigger.call(this);
        bindSelect.call(this);
        bindChoices.call(this);
    });
    
    
    // bindTrigger
    const bindTrigger = function() 
    {
        const trigger = trigHdlr(this,'clickOpen:getTrigger');
        const select = trigHdlr(this,'fakeSelect:getSelect');
        
        ael(trigger,'click',function() {
            trigEvt(select,'validate:valid');
        });
    }
    
    
    // bindSelect
    const bindSelect = function() 
    {
        const $this = this;
        const select = trigHdlr(this,'fakeSelect:getSelect');
        const handleChange = function() {
            const value = trigHdlr(this,'input:getValue');
            const choice = trigHdlr($this,'fakeSelect:getChoice',value);
            
            if(choice != null)
            choose.call($this,choice);
        };
        
        ael(select,'change',handleChange);
        ael(select,'input:change',handleChange);
        
        ael(select,'input:disable',function() {
            trigHdlr($this,'clickOpen:disable');
        });
        
        ael(select,'input:enable',function() {
            trigHdlr($this,'clickOpen:enable');
        });
        
        ael(select,'validate:valid',function() {
            setAttr($this,'data-validate','valid');
        });
        
        ael(select,'validate:invalid',function() {
            setAttr($this,'data-validate','invalid');
        });
    }
    
    
    // bindChoices
    const bindChoices = function() 
    {
        const $this = this;
        const choices = trigHdlr(this,'fakeSelect:getChoices');
        const selected = trigHdlr(this,'fakeSelect:getSelected');
        
        Component.KeyboardEnter.call(choices,true);
        
        ael(choices,'click',function() {
            choose.call($this,this);
            event.stopPropagation();
        });
        
        ael(choices,'keyboardEnter:blocked',function() {
            choose.call($this,this);
        });
        
        if(selected != null)
        choose.call(this,selected);
    }
    
    
    // choosePrevNext
    const choosePrevNext = function(type)
    {
        const newNode = trigHdlr(this,'indexNodePrevNext:find',type);
        
        if(newNode != null)
        choose.call(this,newNode);
    }
    
    
    // choose
    const choose = function(selected)
    {
        const value = getAttr(selected,'data-value');
        const text = Ele.getText(selected);
        const select = trigHdlr(this,'fakeSelect:getSelect');
        const choices = trigHdlr(this,'fakeSelect:getChoices');
        const current = trigHdlr(select,'input:getValue');
        
        Ele.removeAttr(choices,'data-selected');
        toggleAttr(selected,'data-selected',true);
        
        trigHdlr(select,'input:setValue',value);
        trigHdlr(this,'fakeSelect:setTitle',text);
        trigHdlr(this,'absolutePlaceholder:refresh');
        trigEvt(this,'clickOpen:close');
        
        if(!Str.isEqual(value,current))
        trigBubble(select,'change');
    }

    return this;
}