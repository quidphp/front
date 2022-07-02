/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// keyboardEnter
// component to catch or prevent the enter key on the keyboard
Component.KeyboardEnter = function(prevent,type)
{
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // keyboard
    Component.Keyboard.call(this,'enter',[10,13],type);
    
    
    // handler
    setHdlr(this,'keyboardEnter:prevent',function() {
        return prevent === true;
    });        
    
    return this;
}