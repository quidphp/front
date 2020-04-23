/*
 * This file is part of the QuidPHP package.
 * Website: https://quidphp.com
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// initOpenClose
// base component used for opening, closing and initializing a container
Component.InitOpenClose = function(option)
{
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // option
    const $option = Pojo.replace({
        type: null,
        attr: null,
        attrInit: 'data-init',
        transitionTimeout: false
    },option);
    
    
    // check
    const type = $option.type;
    Str.check(type);
    Str.check($option.attr);
    Str.check($option.attrInit);
    
    
    // handler
    setHdlrs(this,type+':',{
        
        isBinded: function() {
            return true;
        },
        
        isInit: function() {
            return (getData(this,type+'-init') === true);
        },
        
        isDisabled: function() {
            return getAttr(this,'data-disabled','int') === 1;
        },
        
        isOpen: function() {
            return (getAttr(this,$option.attr,'int') === 1);
        },
        
        canOpen: function() {
            return (!trigHdlr(this,type+':isOpen') && !trigHdlr(this,type+':isDisabled') && Ele.getData(this,'clickOpen-transitionTimeout') == null);
        },
        
        canClose: function() {
            return (trigHdlr(this,type+':isOpen') && !trigHdlr(this,type+':isDisabled') && Ele.getData(this,'clickOpen-transitionTimeout') == null);
        },
        
        disable: function() {
            toggleAttr(this,'data-disabled',true);
        },
        
        enable: function() {
            toggleAttr(this,'data-disabled',false);
        }
    });
    
    
    // event
    ael(this,type+':open',function() {
        
        if(trigHdlr(this,type+':canOpen') === true)
        {
            let isInit = false;
            
            if(trigHdlr(this,type+':isInit') !== true)
            {
                isInit = true;
                trigEvt(this,type+':init');
                setData(this,type+'-init',true);
                toggleAttr(this,$option.attrInit,true);
            }
            
            trigHdlr(this,type+':willOpen',isInit);
            toggleAttr(this,$option.attr,true);
            trigEvt(this,type+':opened',isInit);
            
            if(Integer.is($option.transitionTimeout))
            setTransitionTimeout.call(this,$option.transitionTimeout);
        }
        
        else if(trigHdlr(this,type+':isOpen'))
        trigEvt(this,type+':reopen');
    });
    
    ael(this,type+':close',function() {
        if(trigHdlr(this,type+':canClose') === true)
        {
            toggleAttr(this,$option.attr,false);
            trigEvt(this,type+':closed');
            
            if(Integer.is($option.transitionTimeout))
            setTransitionTimeout.call(this,$option.transitionTimeout);
        }
    });
    
    
    // setTransitionTimeout
    const setTransitionTimeout = function(timeout)
    {
        Integer.check(timeout);
        const key = 'clickOpen-transitionTimeout';
        
        const func = Func.timeout(timeout,function() {
            Ele.removeData(this,key);
        },this);
        
        Ele.setData(this,key,func);
    }
    
    return this;
}