/*
 * This file is part of the QuidPHP package.
 * Website: https://quidphp.com
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// background
// component for a background that can fadein or out
Component.Background = function(option)
{
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // option
    const $option = Pojo.replace({
        attr: 'data-background'
    },option);
    
    
    // handler
    setHdlrs(this,'background:',{
        
        // retourne vrai si le background existe et est présentement actif
        isActive: function() {
            const node = trigHdlr(this,'background:getStatusNode');
            return (getAttr(node,$option.attr) != null);
        },
        
        // permet d'ajouter une attribut data au background
        set: function(value,replace) {
            let r = false;
            
            if(Str.isNotEmpty(value))
            {
                const node = trigHdlr(this,'background:getStatusNode');
                
                if(replace === true || getAttr(node,$option.attr) == null)
                {
                    setAttr(node,$option.attr,value);
                    trigEvt(this,'background:changed',value);
                    r = true;
                }
            }
            
            return r;
        },
        
        // enlève les attributs du background
        unset: function(value) {
            let r = false;
            
            if(trigHdlr(this,'background:isActive'))
            {
                const node = trigHdlr(this,'background:getStatusNode');
                
                if(value == null || value === getAttr(node,$option.attr))
                {
                    Ele.removeAttr(node,$option.attr);
                    trigEvt(this,'background:changed',undefined);
                    r = true;
                }
            }
            
            return r;
        },
        
        // retourne la node ou store l'attribut
        getStatusNode: function() {
            return trigHdlr(document,'doc:getHtml');
        }
    });
    
    
    // setup
    aelOnce(this,'component:setup',function() {
        documentBind.call(this);
    });
    
    
    // documentBind
    const documentBind = function() 
    {
        const background = this;
        
        setHdlr(document,'doc:getBackground',function() {
            return background;
        });
        
        ael(document,'doc:unmountPage',function() {
            trigHdlr(background,'background:unset');
        });

        ael(this,'click',function() {
            trigHdlr(this,'background:unset');
        });
    }
    
    return this;
}