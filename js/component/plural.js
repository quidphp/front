/*
 * This file is part of the QuidPHP package.
 * Website: https://quidphp.com
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// plural
// component to manage singular or plural text for a node
Component.Plural = function(option) 
{   
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // option
    const $option = Pojo.replace({
        attrNone: 'data-none',
        attrSingular: 'data-singular',
        attrPlural: 'data-plural',
        pluralDefault: 's'
    },option);
    
    
    // handler
    setHdlrs(this,'plural:',{
        
        getText: function(count) {
            let r = null;
            Integer.check(count);
            const singular = getAttr(this,$option.attrSingular);
            
            if(count === 0)
            r = getAttr(this,$option.attrNone) || singular;
            
            else if(count === 1)
            r = singular;
            
            else if(count > 1)
            {
                r = getAttr(this,$option.attrPlural);
                if(r === '1')
                r = singular+$option.pluralDefault;
            }
            
            return Str.check(r);
        },
        
        set: function(value) {
            const count = getCount.call(this,value);
            const text = trigHdlr(this,'plural:getText',count);
            Ele.replaceHtml(this,text);
        }
    });
    
    
    // getCount
    const getCount = function(value)
    {
        let r = 1;
        
        if(Arr.is(value))
        r = Arr.length(value);
        
        else if(Obj.is(value))
        r = Obj.length(value);
        
        else if(Integer.is(value))
        r = value;
        
        return r;
    }
    
    return this;
}