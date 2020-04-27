/*
 * This file is part of the QuidPHP package.
 * Website: https://quidphp.com
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
  
// target
// script with basic functions related to event targets elements

// targetRoot
// object for elements, documents and window
const TargetRoot = {
    
    // is
    // retourne vrai si la valeur est une node, un document, un fragment de document ou window
    is: function(value)
    {
        return (Nod.is(value) || Win.is(value));
    },
    
    
    // are
    // retourne vrai si la valeur est une collection de node non vide
    are: function(value)
    {
        const $inst = this;
        value = ArrLike.toArray(value);
        
        return (Arr.is(value))? Arr.every(value,function(v) {
            return $inst.is(v);
        }):false;
    },
    
    
    // typecheck
    // envoie une exception si la valeur n'est pas une node
    typecheck: function(value,type)
    {
        let error = false;
        const is = this.is(value);
        
        if(!(is || (type === false && value == null)))
        error = true; 
        
        if(error === true)
        throw new Error(value);
        
        return value;
    },
    
    
    // typechecks
    // envoie une exception si la valeur n'est pas un tableau de nodes
    typechecks: function(value,type)
    {
        let error = false;
        const are = this.are(value);
        
        if(!are || (are === true && type === true && Arr.isEmpty(value)))
        error = true;
        
        if(error === true)
        throw new Error(value);
        
        return value;
    },
    
    
    // getProp
    // retourne une propriété d'une node
    getProp: function(node,key)
    {
        this.typecheck(node);
        return Obj.get(key,node);
    },
    
    
    // setProp
    // permet de changer la propriété sur une node ou plusieurs node
    setProp: function(nodes,key,value)
    {
        Str.typecheck(key);
        nodes = this.toArray(nodes);
        
        Arr.each(nodes,function(ele) {
            Obj.setRef(key,value,ele);
        });
        
        return;
    },
    
    
    // propStr
    // prend un ensemble de node et retourne une string concatené pour une même prop
    // un séparateur peut être fourni, sinon utilise -
    propStr: function(nodes,prop,separator) 
    {
        nodes = this.toArray(nodes);
        Str.typecheck(prop,true);
        separator = (Str.isNotEmpty(separator))? separator:'-';
        const $inst = this;
        
        return Arr.reduce('',nodes,function(r,ele) {
            r += (r.length)? separator:"";
            return r += $inst.getProp(ele,prop);
        });
    },
    
    
    // propObj
    // permet de retourner un objet à partir de plusieurs nodes
    // il faut spécifier une prop pour clé et une autre pour valeur
    propObj: function(nodes,propKey,propValue)
    {
        const r = {};
        nodes = this.toArray(nodes);
        const $inst = this;
        Str.typecheck(propKey,true);
        Str.typecheck(propValue,true);
        
        Arr.each(nodes,function(ele) {
            const key = $inst.getProp(ele,propKey);
            const value = $inst.getProp(ele,propValue);
            r[key] = value;
        });
        
        return r;
    },
    
    
    // toArray
    // wrap une node ou un node-like dans un array, si ce n'est pas un array
    // transforme une arr like en array
    // transform null en array vide
    // envoie automatiquement dans le typecheck
    // les array vide passent le typecheck
    toArray: function(value)
    {
        if(this.is(value))
        value = [value];
        
        else if(ArrLike.is(value))
        value = ArrLike.toArray(value);
        
        else if(value == null)
        value = [];
        
        return this.typechecks.call(this,value);
    }
}

// doc
const Doc = Lemur.Doc = Factory(TargetRoot,DataTarget,HandlerTarget,ListenerTarget,SelectorTarget,NodTarget,EleDocTarget,DocTarget);

// ele
const Ele = Lemur.Ele = Factory(TargetRoot,DataTarget,HandlerTarget,ListenerTarget,SelectorTarget,NodTarget,EleWinTarget,EleDocTarget,EleTarget,ArrLoop);

// nod
const Nod = Lemur.Nod = Factory(TargetRoot,DataTarget,HandlerTarget,ListenerTarget,SelectorTarget,NodTarget);

// target
const Target = Lemur.Target = Factory(TargetRoot,DataTarget,HandlerTarget,ListenerTarget);