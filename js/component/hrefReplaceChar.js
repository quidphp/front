/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// hrefReplaceChar
// component to generate a dynamic href with some value replacement
Component.HrefReplaceChar = function()
{
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    setHdlrs(this,'hrefReplaceChar:',{
        
        getHref: function() {
            return Ele.getAttr(this,'data-href');
        },
        
        getChar: function() {
            return Ele.getAttr(this,'data-char');
        },
        
        make: function(replace,replace2) {
            let r = null;
            const href = trigHdlr(this,'hrefReplaceChar:getHref');
            const char = trigHdlr(this,'hrefReplaceChar:getChar');
            replace = (Num.is(replace))? Str.cast(replace):replace
            replace2 = (Num.is(replace2))? Str.cast(replace2):replace2;
            
            if(Str.isNotEmpty(replace) && Str.isNotEmpty(href) && Str.isNotEmpty(char))
            {
                const replacePojo = {};
                replacePojo[char] = replace;
                r = Str.replace(replacePojo,href);
                
                if(Str.isNotEmpty(replace2))
                {
                    const replacePojo2 = {};
                    replacePojo2[char] = replace2;
                    r = Str.replace(replacePojo2,r);
                }
            }
            
            return r;
        }
    });
    
    return this;
}