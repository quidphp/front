/*
 * This file is part of the QuidPHP package.
 * Website: https://quidphp.com
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// event
// script containing event management functions
const EvtPrimitive = {
    
    // specialKeyCode
    // code de clavier spécial
    specialKeyCode: [10,13,27,37,38,39,40],
    
    
    // support
    // retourne un objet indiquant si le browser support passive et once
    support: (function() {
        const support = { passive: false, once: false};
        
        try 
        {
            const options = {
                get passive() { 
                    support.passive = true;
                    return false;
                },
                get once() { 
                    support.once = true;
                    return false;
                }
            };

            window.addEventListener("test-support", null, options);
            window.removeEventListener("test-support", null, options);
        } 
        
        catch(err) 
        {
            support.passive = false;
            support.once = false;
        }
        
        return support;
    })(),
    
    
    // is
    // retourne vrai si la valeur est un événement
    is: function(value) {
        return value instanceof Event;
    },
    
    
    // isSpecialKeyCode
    // retourne vrai si l'event a un keyCode et que celui-ci est tab, enter, escape, ou arrow
    isSpecialKeyCode: function(event)
    {
        let r = false;
        this.typecheck(event);
        
        if(Integer.is(event.keyCode) && Arr.in(event.keyCode,this.specialKeyCode))
        r = true;
        
        return r;
    },
    
    
    // preventStop
    // permet de faire un prevent default et stop propagation à un événement
    preventStop: function(event,immediate)
    {
        this.typecheck(event);
        
        event.preventDefault();
        
        if(immediate === true)
        event.stopImmediatePropagation();
        
        else
        event.stopPropagation();
        
        return false;
    },
    
    
    // nameFromType
    // retourne event ou custom event selon le type
    // un nom de type avec un . ou : est custom
    nameFromType: function(type)
    {
        Str.typecheck(type,true);
        let r = 'event';
        
        if(Str.in('.',type) || Str.in(':',type))
        r = 'customEvent';
        
        return r;
    },
    
    
    // createFromType
    // crée l'objet event à partir d'un type
    createFromType: function(type,option)
    {
        let r = null;
        const name = this.nameFromType(type);
        
        if(name === 'customEvent')
        r = new CustomEvent(type,option);
        
        else if(name === 'event')
        r = new Event(type,option);
        
        return r;
    },
    
    
    // getTriggerTarget
    // retourne la trigger target, en lien avec les bindings delegate
    // créés la propirété triggerTarget sur l'objet event
    getTriggerTarget: function(event)
    {
        let r = null;
        this.typecheck(event);
        
        if(event.target)
        {
            if(event.triggerTarget != null)
            r = event.triggerTarget;
            
            else
            r = event.target;
        }
        
        return r;
    }
};