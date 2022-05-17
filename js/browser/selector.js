/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// selector
// script with methods related to selecting and matching nodes
const SelectorTarget = {
    
    // scopedQuery
    // méthode utilisé pour faire une recherche et retourner le premier enfant d'une target qui match le selector
    // possible de faire un typecheck (ele non vide) si le dernier argument est true
    scopedQuery: function(node,selector,typecheck)
    {
        let r = null;
        node = this.realNode(node);
        Nod.typecheck(node);
        
        if(node != null)
        {
            selector = (Doc.is(node))? selector:":scope "+selector;
            r = node.querySelector(selector);
        }
        
        if(typecheck === true)
        Ele.typecheck(r);
        
        return r;
    },
    
    
    // scopedQueryAll
    // méthode utilisé pour faire une recherche et retourner les enfants d'une target qui match le selector
    // doit retourner un array, pas une node list
    // possible de faire un typecheck (eles non vide) si le dernier argument est true
    scopedQueryAll: function(node,selector,typecheck)
    {
        let r = null;
        node = this.realNode(node);
        Nod.typecheck(node);
        
        if(node != null)
        {
            selector = (Doc.is(node))? selector:":scope "+selector;
            r = node.querySelectorAll(selector);
            
            if(r instanceof NodeList)
            r = ArrLike.toArray(r);
        }
        
        if(typecheck === true)
        Ele.typechecks(r,true);

        return r;
    },
    
    
    // mergedQsa
    // permet de faire un querySelectorAll sur plusieurs nodes
    // retourne un array avec les résultats merged
    mergedQsa: function(nodes,selector,typecheck)
    {
        let r = null;
        const $inst = this;
        nodes = this.toArray(nodes);
        
        if(nodes != null)
        {
            r = [];
            Arr.each(nodes,function(ele) {
                Arr.mergeRef(r,$inst.scopedQueryAll(ele,selector));
            });
        }
        
        if(typecheck === true)
        Ele.typechecks(r,true);
        
        return r;
    },
    
    
    // closest
    // retourne la node ou le parent le plus proche de la node qui retourne vrai au pattern
    closest: function(node,value)
    {
        node = this.realNode(node);
        this.typecheck(node);
        Str.typecheck(value);
        
        return node.closest(value);
    },
    
    
    // closestParent
    // retourne le parent le plus proche de la node qui retourne vrai au pattern
    closestParent: function(node,value)
    {
        const parent = this.parent(node);
        return (parent != null)? this.closest(parent,value):null;
    },
    
    
    // match
    // retourne vrai si la node match le pattern
    match: function(node,value)
    {
        node = this.realNode(node);
        Nod.typecheck(node);
        Str.typecheck(value);
        
        return (Doc.is(node))? false:node.matches(value);
    },
    
    
    // some
    // retourne vrai si au moins une node retourne vrai au pattern
    some: function(nodes,value)
    {
        Str.typecheck(value);
        nodes = this.toArray(nodes);
        const $inst = this;
        
        return Arr.some(nodes,function(ele) {
            return $inst.match(ele,value);
        });
    },
    
    
    // every
    // retourne vrai si toutes les nodes retournent vrai au pattern
    every: function(nodes,value)
    {
        Str.typecheck(value);
        nodes = this.toArray(nodes);
        const $inst = this;
        
        return Arr.every(nodes,function(ele) {
            return $inst.match(ele,value);
        });
    },
    
    
    // filter
    // permet de filtrer les nodes d'un tableau qui match le pattern
    filter: function(nodes,value)
    {
        Str.typecheck(value);
        nodes = this.toArray(nodes);
        const $inst = this;
        
        return Arr.filter(nodes,function(ele) {
            return $inst.match(ele,value);
        });
    },
    
    
    // find
    // retourne la première valeur d'un tableau qui match le pattern
    find: function(nodes,value)
    {
        Str.typecheck(value);
        nodes = this.toArray(nodes);
        const $inst = this;
        
        return Arr.find(nodes,function(ele) {
            return $inst.match(ele,value);
        });
    },
    
    
    // parent
    // retourne le parent de la node, le parent peut être valider contre un sélecteur
    parent: function(node,value)
    {
        let r = null;
        node = this.realNode(node);
        Nod.typecheck(node);
        const parent = node.parentNode;
        
        if(Nod.is(parent))
        {
            if(value == null || Nod.match(parent,value))
            r = parent;
        }
        
        return r;
    },
    
    
    // parents
    // permet de retourner tous les parents d'une node
    // possible d'arrêter à un point
    parents: function(node,value,until)
    {
        let r = [];
        node = this.realNode(node);
        Nod.typecheck(node);
        
        while (node = Nod.parent(node)) 
        {
            if(until != null && Nod.match(node,until))
            break;
            
            if(value == null || Nod.match(node,value))
            r.push(node);
        }
        
        return r;
    },
    
    
    // prev
    // retourne l'élément précédant la node
    prev: function(node,value)
    {
        let r = null;
        node = this.realNode(node);
        this.typecheck(node);
        const sibling = node.previousElementSibling;
        
        if(this.is(sibling))
        {
            if(value == null || this.match(sibling,value))
            r = sibling;
        }
        
        return r;
    },
    
    
    // prevs
    // retourne tous les éléments précédant la node
    // possible d'arrêter à un point
    prevs: function(node,value,until)
    {
        let r = [];
        node = this.realNode(node);
        this.typecheck(node);
        
        while (node = this.prev(node)) 
        {
            if(until != null && this.match(node,until))
            break;
            
            if(value == null || this.match(node,value))
            r.push(node);
        }
        
        return r;
    },
    
    
    // next
    // retourne l'élément suivant la node
    next: function(node,value)
    {
        let r = null;
        node = this.realNode(node);
        this.typecheck(node);
        const sibling = node.nextElementSibling;
        
        if(this.is(sibling,true))
        {
            if(value == null || this.match(sibling,value))
            r = sibling;
        }
        
        return r;
    },
    
    
    // nexts
    // retourne tous les éléments suivant la node
    // possible d'arrêter à un point
    nexts: function(node,value,until)
    {
        let r = [];
        node = this.realNode(node);
        this.typecheck(node);
        
        while (node = this.next(node)) 
        {
            if(until != null && this.match(node,until))
            break;
            
            if(value == null || this.match(node,value))
            r.push(node);
        }
        
        return r;
    },
    
    
    // children
    // retourne les enfants de la node
    // possible de seulement retourner les enfants valides avec le sélecteur
    // méthode plus complexe pour gérer le fait que document n'a pas de propriété children sur ie11
    children: function(node,value,withTextNodes)
    {
        let r = null;
        node = this.realNode(node);
        Nod.typecheck(node);
        const hasChildren = (node.children != null);
        let childs;
        
        if(withTextNodes === true)
        childs = ArrLike.toArray(node.childNodes);
        
        else
        {
            if(hasChildren === true)
            childs = ArrLike.toArray(node.children);
            
            else
            {
                childs = ArrLike.accumulate([],node.childNodes,function(value) {
                    return (Ele.is(value))? value:null;
                });
            }
        }
        
        if(value == null)
        r = childs;
        
        else
        r = Nod.filter(childs,value);
        
        return r;
    },
    
    
    // realNode
    // permet de remplacer la node pour les méthodes du sélector
    // à étendre
    realNode: function(node)
    {
        return node;
    }
}