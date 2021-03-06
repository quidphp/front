/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// blockEvent
// script of behaviours for a component which blocks event propagation
// this component can only block events added after the block was registered
Component.BlockEvent = function(type) 
{
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // handler
    setHdlrs(this,'blockEvent:',{
        
        isRegistered: function(type) {
            return Integer.is(getBlock.call(this,type));
        },
        
        isUnblocked: function(type) {
            return getBlock.call(this,type) === 0;
        },
        
        isBlocked: function(type) {
            return getBlock.call(this,type) === 1;
        },
        
        getObj: function() {
            return Pojo.copy(getBlockObj.call(this));
        },
        
        register: function(type) {
            if(!trigHdlr(this,'blockEvent:isRegistered',type))
            {
                const blockObj = getBlockObj.call(this);
                const handler = getFunc.call(this,type);
                Pojo.setRef(type,0,blockObj);
                ael(this,type,handler,'blockEvent-register-'+type);
            }
        },
        
        unregister: function(type) {
            if(trigHdlr(this,'blockEvent:isRegistered',type))
            {
                const blockObj = getBlockObj.call(this);
                Pojo.unsetRef(type,blockObj);
                rel(this,'blockEvent-register-'+type);
            }
        },
        
        block: function(type) {
            Str.typecheck(type,true);
            const blockObj = getBlockObj.call(this);
            
            if(Pojo.keyExists(type,blockObj))
            Pojo.setRef(type,1,blockObj);
        },
        
        blockAll: function() {
            const $this = this;
            const blockObj = getBlockObj.call(this);
            
            Pojo.each(blockObj,function(value,type) {
                trigHdlr($this,'blockEvent:block',type);
            });
        },
        
        unblock: function(type) {
            Str.typecheck(type,true);
            const blockObj = getBlockObj.call(this);
            
            if(Pojo.keyExists(type,blockObj))
            Pojo.setRef(type,0,blockObj);
        },
        
        unblockAll: function() {
            const $this = this;
            const blockObj = trigHdlr(this,'blockEvent:obj');
            
            Pojo.each(blockObj,function(value,type) {
                trigHdlr($this,'blockEvent:unblock',type);
            });
        }
    });
    
    
    // getFunc
    const getFunc = function(type) 
    {
        return function(event) {
            const status = getBlock.call(this,type);
            
            if(status === 1)
            {
                Evt.preventStop(event,true);
                trigEvt(this,'blockEvent:'+type);
                
                return false;
            }
        };
    }
    
    
    // getBlock
    const getBlock = function(type)
    {
        return Pojo.get(type,getBlockObj.call(this));
    }
    
    
    // getBlockObj
    const getBlockObj = function() 
    {
        return Target.getOrSetData(this,'blockEvent-obj',{});
    }


    // register
    if(Str.isNotEmpty(type))
    trigHdlrs(this,'blockEvent:register',type);
    
    return this;
}