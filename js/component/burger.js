/*
 * This file is part of the QuidPHP package.
 * Website: https://quidphp.com
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// burger
// script for a burger menu component
Component.Burger = function(persistent)
{
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // component
    Component.ResizeChange.call(this,{persistent: persistent});
    
    
    // nodes
    const $nodes = this;
    
    
    // handler
    setHdlrs(this,'burger:',{
        
        isOpen: function() {
            return trigHdlr(document,'doc:getAttr','data-burger') === 'open';
        },
        
        toggle: function() {
            trigEvt(this,trigHdlr(this,'burger:isOpen')? 'burger:close':'burger:open');
        }
    });
    
    
    // event
    ael(this,'click',function() {
        trigHdlr(this,'burger:toggle');
    });
    
    ael(this,'burger:open',function() {
        trigHdlr(document,'doc:setAttr','data-burger','open');
    });
    
    ael(this,'burger:close',function() {
        trigHdlr(document,'doc:setAttr','data-burger','close');
    });
    
    const escapeHandler = ael(document,'keyboardEscape:catched',function() {
        trigEvt($nodes,'burger:close');
    });
    
    
    // teardown
    const teardown = function()
    {
        trigEvt(this,'burger:close');
        rel(document,escapeHandler);
    }
    
    
    // setup
    aelOnce(this,'component:setup',function() {
        trigEvt(this,'burger:close');
    })
    
    
    // teardown
    aelOnce(this,'component:teardown',function() {
        teardown.call(this);
    });
    
    
    // persistent
    if(persistent !== true)
    {
        aelOnce(document,'doc:unmountPage',function() {
            teardown.call($nodes);
        });
    }
    
    return this;
}