/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// nav
// component for a document node, binds other components
Component.Nav = function(option)
{
    // document node
    Vari.check(this,document);
    
    
    // components
    Component.Doc.call(this,option);
    Component.KeyboardEscape.call(this);
    Component.Window.call(window);
    
    
    // event
    // trigger un click
    ael(this,'keyboardEscape:catched',function() {
        trigBubble(this,'click');
    });
    
    
    return this;
}

// initDoc
const InitDoc = Quid.InitDoc = function()
{
    document.addEventListener("DOMContentLoaded", function() {
        Component.Nav.call(this)
        Quid.Doc.triggerSetup(this);
    });
}