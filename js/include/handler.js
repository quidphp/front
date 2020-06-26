/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// handler
// script for handler management (functions stored in targets)
const HandlerTarget = {    

    // isTriggerHandlerEqual
    // retourne vrai si la handler de chaque node retourne la valeur donné en argument
    isTriggerHandlerEqual: function(nodes,type,equal)
    {
        nodes = this.toArray(nodes);
        const args = Arr.merge([type],ArrLike.sliceStart(3,arguments));
        const $inst = this;
        
        return Arr.every(nodes,function(ele) {
            const funcArgs = Arr.merge([ele],args);
            const result = $inst.triggerHandler.apply($inst,funcArgs);
            return (result === equal);
        });
    },
    
    
    // allHandler
    // retourne de l'objet avec toutes les handler lié à la node
    // possible de créer l'objet si non existant
    // envoie une erreur si plusieurs nodes
    allHandler: function(node,create)
    {
        this.typecheck(node);
        return this.getOrSetData(node,'_handler_',(create === true)? {}:undefined);
    },
    
    
    // getHandler
    // méthode qui retourne un handler emmagasiné dans une node
    // envoie une erreur si plusieurs nodes
    getHandler: function(node,type) 
    {
        Str.typecheck(type);
        const handlers = this.allHandler(node);
        
        return (handlers != null)? Pojo.get(type,handlers):undefined;
    },
    
    
    // setHandler
    // permet d'emmagasiné une handler dans chaque node fournit en argument
    setHandler: function(nodes,type,handler) 
    {
        Str.typecheck(type,true);
        Func.typecheck(handler);
        nodes = this.toArray(nodes);
        const $inst = this;
        
        Arr.each(nodes,function(ele) {
            const all = $inst.allHandler(ele,true);
            Pojo.setRef(type,handler,all);
        });
    },
    
    
    // setsHandler
    // permet d'ajouter plusieurs handlers à partir d'un objet
    setsHandler: function(nodes,typeStart,obj)
    {
        Str.typecheck(typeStart,true);
        Pojo.typecheck(obj);
        const $inst = this;
        
        Pojo.each(obj,function(value,key) {
            let type = typeStart+key;
            $inst.setHandler(nodes,type,value);
        });
    },
    
    
    // removeHandler
    // permet de retirer un handler emmagasiné dans une ou plusiuers node
    removeHandler: function(nodes,type) 
    {
        Str.typecheck(type,true);
        nodes = this.toArray(nodes);
        const $inst = this;
        
        Arr.each(nodes,function(ele) {
            const all = $inst.allHandler(ele,true);
            Pojo.unsetRef(type,all);
        });
    },
    
    
    // triggerHandler
    // permet de lancer le handler sur la première node donnée en argument
    // retourne le résultat de la méthode ou undefined
    triggerHandler: function(node,type) 
    {
        let r = undefined;
        this.typecheck(node);
        Str.typecheck(type,true);
        const handler = this.getHandler(node,type);
        
        if(Func.is(handler))
        {
            const args = ArrLike.sliceStart(2,arguments);
            r = handler.apply(node,args);
        }
        
        return r;
    },
    
    
    // triggersHandler
    // permet de lancer un handler sur plusieurs nodes
    // retorne un tableau avec tous les résultats
    triggersHandler: function(nodes,type)
    {
        nodes = this.toArray(nodes);
        const $inst = this;
        const args = ArrLike.sliceStart(2,arguments);
        
        return Arr.accumulate([],nodes,function(ele) {
            return $inst.triggerHandler.apply($inst,Arr.merge([ele,type],args));
        });
    }
}