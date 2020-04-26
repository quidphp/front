/*
 * This file is part of the QuidPHP package.
 * Website: https://quidphp.com
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// nod
// object for element, text and document nodes
const NodTarget = {
    
    // is
    // retourne vrai si la valeur est un element, un textNode ou un document
    is: function(value)
    {
        return (Ele.is(value) || Doc.is(value) || this.isText(value) || this.isDoctype(value));
    },
    
    
    // isText
    // retourne vrai si c'est une texte node
    isText: function(value)
    {
        return (value != null && value.nodeType === Node.TEXT_NODE);
    },
    
    
    // isDoctype
    // retourne vrai si c'est une node doctype
    isDoctype: function(value)
    {
        return (value != null && value.nodeType === Node.DOCUMENT_TYPE_NODE);
    },
    
    
    // isTemplate
    // retourne vrai si la valeur est un élément template
    isTemplate: function(value)
    {
        return value instanceof HTMLTemplateElement;
    },
    
    
    // realNode
    // retourne la vrai node
    // utilisé pour les méthodes du sélecteur
    realNode: function(value)
    {
        let r = value;
        
        if(this.isTemplate(value))
        r = value.content;
        
        return r;
    },
    
    
    // getText
    // retourne le text contenu dans une node et ses enfants
    // ne retourne aucune balise html
    getText: function(node)
    {
        this.typecheck(node);
        return (node.textContent != null)? node.textContent:undefined;
    },
    
    
    // setText
    // permet de changer contenu texte d'une balise
    setText: function(node,value)
    {
        this.typecheck(node);
        Str.typecheck(value,false);
        
        if(node.textContent != null)
        {
            value = (value == null)? '':value;
            node.textContent = value;
        }
        
        return;
    },
    
    
    // clone
    // clone une node ou un document
    clone: function(value)
    {
        this.typecheck(value);
        return value.cloneNode(true);
    },
    
    
    // clones
    // permet de cloner un tableau de nodes ou document
    clones: function(value)
    {
        const r = [];
        const $inst = this;
        const nodes = this.toArray(value,false);
        
        Arr.each(value,function() {
            r.push($inst.clone(this));
        });
        
        return r;
    },
    
    
    // remove
    // permet d'effacer une ou plusieurs nodes du dom
    // utilise arguments
    remove: function(value) 
    {
        const nodes = this.toArray(value,false);
        
        Arr.each(nodes,function() {
            this.remove();
        });
        
        return;
    }
}


// eleDocTarget
// objet pour les nodes qui contiennent du html (element + doc seulement)
const EleDocTarget = {
    
    // isEmpty
    // retourne vrai si la valeur est une node et qu'elle est vide
    isEmpty: function(value)
    {
        return (this.is(value))? Str.isEmpty(this.getHtml(value)):false;
    },


    // isNotEmpty
    // retourne vrai si la valeur est une node et qu'elle n'est pas vide
    isNotEmpty: function(value)
    {
        return (this.is(value))? Str.isNotEmpty(this.getHtml(value)):false;
    },
    
    
    // getHtml
    // retourne le html dans la node ou le document
    getHtml: function(value)
    {
        let r = '';
        const children = Nod.children(value,null,true);
        r = Ele.getOuterHtml(children);
        
        return r;
    },
    
    
    // setHtml
    // permet de changer le html dans la node ou le document
    // efface tous les enfants et ajoute la ou les nouvelles nodes
    setHtml: function(node,value,clone)
    {
        this.typecheck(node);
        node = this.realNode(node);
        const children = Nod.children(node,null,true);
        value = Dom.htmlNodes(value,clone);
        Nod.remove(children);
        
        Arr.each(value,function() {
            node.appendChild(this);
        });
        
        return;
    },
    
    
    // replaceHtml
    // comme setHtml, mais le html est seulement remplacer si différent
    // utilise une balise pour avoir le même encodage que la string
    // il faut absolument fournir une string
    replaceHtml: function(node,value)
    {
        Str.typecheck(value);
        const current = this.getHtml(node);
        
        const newElement = document.createElement('div');
        this.setHtml(newElement,value);
        const newValue = this.getHtml(newElement);
        
        if(current !== newValue)
        this.setHtml(node,value);
        
        return;
    },
    
    
    // getOuterHtml
    // retourne le outerHtml d'une ou plusieurs nodes
    getOuterHtml: function(nodes)
    {
        let r = '';
        nodes = Nod.toArray(nodes,false);
        
        Arr.each(nodes,function() {
            let content = '';
            
            if(this.outerHTML != null)
            content = this.outerHTML;
            
            else if(this.textContent != null)
            content = this.textContent;
            
            r += content;
        });

        return r;
    }
}


// eleWinTarget 
// objet pour les méthodes communes entre node et window
const EleWinTarget = {
    
    // blur
    // permet de retirer le focus d'une node ou window
    blur: function(node)
    {
        this.typecheck(node);
        node.blur();
        
        return;
    }
}