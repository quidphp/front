/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */

// variable
const Quid = {};
Quid.Component = {};
Quid.Test = {};

// globale
window.Quid = Quid;

// initDoc
const InitDoc = Quid.InitDoc = function()
{
    document.addEventListener("DOMContentLoaded", function() {
        Quid.Doc.triggerSetup(Quid.Component.Doc.call(this));
    });
}

// factory
const Factory = Quid.Factory = function(prototype)
{
    const r = Object.create((prototype === true)? {}:(prototype || null));
    const args = Array.prototype.slice.call(arguments,1);
    Object.assign.apply(null,[r].concat(args));
    
    return r;
}

// testsuite
const TestSuite = Quid.TestSuite = function() 
{
    return Pojo.each(Quid.Test,function(suite,key) {
        return suite();
    });
}

// alias
const d = console.log;
const dd = console.dir;
const assert = console.assert;
const logError = console.error;