/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
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
        
        getNone: function() {
            return getAttr(this,$option.attrNone) || trigHdlr(this,'plural:getSingular');
        },
        
        getSingular: function() {
            return getAttr(this,$option.attrSingular);
        },
        
        getPlural: function() {
            let r = null;
            const singular = trigHdlr(this,'plural:getSingular');
            const pluralStr = getAttr(this,$option.attrPlural);
            const pluralInt = getAttr(this,$option.attrPlural,'int');
            
            if(pluralInt === 1)
            {
                if(Str.is(singular))
                r = singular+$option.pluralDefault;
            }
            
            else if(Str.is(pluralStr))
            r = pluralStr;
            
            return r;
        },
        
        getText: function(count) {
            let r = null;
            Integer.typecheck(count);
            
            if(count === 0)
            r = trigHdlr(this,'plural:getNone');
            
            else if(count === 1)
            r = trigHdlr(this,'plural:getSingular');
            
            else if(count > 1)
            r = trigHdlr(this,'plural:getPlural');
            
            return Str.typecheck(r);
        },
        
        set: function(value) {
            const count = getCount.call(this,value);
            const text = trigHdlr(this,'plural:getText',count);
            Ele.replaceHtml(this,text);
        }
    });
    
    
    // setup
    aelOnce(this,'component:setup',function() {
        initialAttr.call(this);
    });
    
    
    // initialAttr
    const initialAttr = function()
    {
        const html = getHtml(this);
        const singular = trigHdlr(this,'plural:getSingular');
        const plural = trigHdlr(this,'plural:getPlural');
        
        if(singular == null)
        setAttr(this,$option.attrSingular,html);
        
        if(plural == null)
        setAttr(this,$option.attrPlural,true);
    }
    
    
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