/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// listener
// script containing event listeners functions for target elements
const ListenerTarget = new function()
{   
    // addListener
    // méthode qui permet d'ajouter un nouveau listener d'événement
    // retourne un tableau avec les paramètres pour retirer le listener
    this.addListener = function(nodes,type,func,register,delegate,option) 
    {
        let r = null;
        Str.typecheck(type,true);
        nodes = this.toArray(nodes);
        const $inst = this;
        
        if(Arr.isNotEmpty(nodes))
        {
            option = Object.assign({capture: false, once: false},option);
            let thirdArg = (Evt.support.once === true)? option:option.capture;
            
            const handler = addListenerHandler.call(this,type,func,delegate,thirdArg,option);
            
            Arr.each(nodes,function(ele) {
                ele.addEventListener(type,handler,thirdArg);
                
                if(Str.isNotEmpty(register) || register === true)
                $inst.registerListener(ele,register,type,handler,thirdArg);
            });
            
            r = [type,handler,thirdArg];
        }
        
        return r;
    }
    
    
    // registerListener
    // permet d'enregistrer un event listener dans la node
    // ceci permet de le retirer par la suite
    this.registerListener = function(node,register,type,handler,option) 
    {
        Str.typecheck(type,true);
        register = (register === true)? type:register;
        Str.typecheck(register,true);
        
        const data = this.getOrSetData(node,'rel',{});
        const entry = [type,handler,option];
        Pojo.setRef(register,entry,data);
    }
    
    
    // addListenerOnce
    // comme ael, mais le listener ne peut être déclenché qu'une seule fois
    this.addListenerOnce = function(node,type,func,register,delegate,option) 
    {
        return this.addListener(node,type,func,register,delegate,Object.assign({},option,{once: true}));
    }
    
    
    // addDelegatedListener
    // permet d'ajouter un event listener qui se trigge seulement selon le delegate
    this.addDelegatedListener = function(node,type,delegate,func,register,option)
    {
        return this.addListener(node,type,func,register,delegate,option);
    }
    
    
    // addPassiveListener
    // permet d'ajouter un event listener passif, utile pour scroll
    this.addPassiveListener = function(node,type,func,register,delegate,option) 
    {
        return this.addListener(node,type,func,register,delegate,Object.assign({},option,{passive: true}));
    }
    
    
    // removeListener
    // permet de retirer un event listener
    // args est le tableau retournée par addListener (contient type, handler et option)
    this.removeListener = function(nodes,args)
    {
        nodes = this.toArray(nodes);
        const $inst = this;
        
        Arr.each(nodes,function(ele) {
            if(Str.isNotEmpty(args))
            {
                const key = args;
                const data = $inst.getData(ele,'rel');
                
                if(Pojo.is(data))
                {
                    args = Pojo.get(key,data);
                    Pojo.unsetRef(key,data);
                }
            }
            
            if(Arr.is(args))
            ele.removeEventListener.apply(ele,args);
        });
    }
    

    // trigger
    // utilisé par triggerBubble et triggerNoBubble pour envoyer des événements
    this.trigger = function(nodes,type,option)
    {
        Str.typecheck(type,true);
        nodes = this.toArray(nodes);
        
        if(Arr.isNotEmpty(nodes))
        {
            const event = Evt.createFromType(type,option);
            
            Arr.each(nodes,function(ele) {
                ele.dispatchEvent(event);
            });
        }
    }
    
    
    // triggerBubble
    // permet de lancer des événements sur chaque node
    // ces événements bubble
    this.triggerBubble = function(nodes,type) 
    {
        const data = ArrLike.sliceStart(2,arguments);
        const option = {bubbles: true, cancelable: true, detail: data};
        
        return this.trigger(nodes,type,option);
    }
    
    
    // triggerNoBubble
    // permet de lancer des événements sur chaque node
    // ces événements ne bubble pas
    this.triggerNoBubble = function(nodes,type) 
    {
        const data = ArrLike.sliceStart(2,arguments);
        const option = {bubbles: false, cancelable: true, detail: data};
        
        return this.trigger(nodes,type,option);
    }
    
    
    // triggerSetup
    // fonction utilisé pour lancer le setup sur un component
    // lance component:ready après le setup
    // ces événements ne bubble pas
    this.triggerSetup = function(nodes) 
    {
        const sliced = ArrLike.sliceStart(1,arguments);
        let args = Arr.merge([nodes,'component:setup'],sliced);
        this.triggerNoBubble.apply(this,args);
        
        args = Arr.merge([nodes,'component:ready'],sliced);
        this.triggerNoBubble.apply(this,args);
    }
    
    
    // triggerTeardown
    // fonction utilisé pour lancer le démontange d'un component
    // ces événements ne bubble pas
    this.triggerTeardown = function(nodes) 
    {
        const args = Arr.merge([nodes,'component:teardown'],ArrLike.sliceStart(1,arguments));
        return this.triggerNoBubble.apply(this,args);
    }
    
    
    // addListenerHandler
    // retourne le handler utilisé par addListener
    // ajoute le support pour once si non supporté par le navigateur
    const addListenerHandler = function(type,func,delegate,thirdArg,option) 
    {
        const $inst = this;
        const handler = function(event) {
            let go = (delegate == null);
            let context = this;
            
            if(option.once === true && Evt.support.once === false)
            $inst.removeListener(event.target,[type,handler,thirdArg]);
            
            if(Str.isNotEmpty(delegate) && event.target != null)
            {
                go = prepareDelegate.call(this,event,delegate);
                context = event.triggerTarget;
            }
            
            if(go === true)
            {
                let args = [event];
                const detail = event.detail;
                args = Arr.merge(args,detail);
                func.apply(context,args);
            }
        };
        
        return handler;
    }
    
    
    // prepareDelegate
    // handlertion protégé
    // gère la délégation et le changement à l'objet event
    const prepareDelegate = function(event,delegate)
    {
        let r = false;
        const context = event.target;
        const nodes = Nod.scopedQueryAll(this,delegate);
        const delegateTarget = this;
        let triggerTarget = context;
        
        if(Arr.in(context,nodes))
        r = true;
        
        else
        {
            r = Arr.some(nodes,function(node) {
                if(node.contains(context))
                {
                    triggerTarget = Nod.closest(context,delegate);
                    return true;
                }
            });
        }
        
        event.delegateTarget = delegateTarget;
        event.triggerTarget = triggerTarget;
        
        return r;
    }
};