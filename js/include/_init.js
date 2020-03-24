/*
 * This file is part of the QuidPHP package.
 * Website: https://quidphp.com
 * License: https://github.com/quidphp/lemur/blob/master/LICENSE
 */

// variable
const Lemur = {};
Lemur.Component = {};
Lemur.Test = {};

// globale
window.Lemur = Lemur;

// initDoc
const InitDoc = Lemur.InitDoc = function()
{
    document.addEventListener("DOMContentLoaded", function() {
        Lemur.Doc.triggerSetup(Lemur.Component.Doc.call(this));
    });
}

// factory
const Factory = Lemur.Factory = function(prototype)
{
    const r = Object.create((prototype === true)? {}:(prototype || null));
    const args = Array.prototype.slice.call(arguments,1);
    Object.assign.apply(null,[r].concat(args));
    
    return r;
}

// testsuite
const TestSuite = Lemur.TestSuite = function() 
{
    return Pojo.each(Lemur.Test,function(value,key) {
        return value();
    });
}

// alias
const d = console.log;
const dd = console.dir;
const assert = console.assert;
const logError = console.error;