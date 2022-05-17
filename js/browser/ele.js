/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */

// eleTarget
// script with many functions related to element nodes
const EleTarget = {

    // is
    // retourne vrai si la valeur est une node
    is: function(value) 
    {
        return value instanceof HTMLElement;
    },
    

    // isVisible
    // retourne vrai si la node est visible
    isVisible: function(value)
    {
        return (this.is(value))? !!(value.offsetWidth || value.offsetHeight):false;
    },
    
    
    // isHidden
    // retourne vrai si la node est invisible
    isHidden: function(value)
    {
        return (this.is(value))? !(this.isVisible(value)):false;
    },


    // isTag
    // retourne vrai si la tag est celle donnée en argument
    isTag: function(node,value)
    {
        return (this.is(node) && this.tag(node) === value);
    },
    
    
    // isFocused
    // retourne vrai si la node a présentement le focus
    isFocused: function(node)
    {
        return node === document.activeElement;
    },
    
    
    // isFocusable
    // retourne vrai si la node peut recevoir le focus
    isFocusable: function(node)
    {
        let r = false;
        
        if(this.is(node))
        {
            const tag = this.tag(node);
            const tags = ['input','textarea','select','a','button'];
            const dimension = this.getDimension(node);
            
            if(this.match(node,'[tabindex]') || Arr.in(tag,tags))
            {
                if(dimension.width > 0 && dimension.height > 0)
                r = true;
            }
        }
        
        return r;
    },
    
    
    // isScrollable
    // retourne vrai si la node est scrollable dans un axis ou n'importe quel axis
    // retourne toujours faux si overflow est visible
    isScrollable: function(node,axis)
    {
        let r = false;
        
        if(this.is(node))
        {
            const overflow = this.getCss(node,'overflow');
            
            if(overflow !== 'visible')
            {
                const scroll = this.getScroll(node);
                
                if(Arr.in(axis,['x','horizontal']))
                r = scroll.scrollableX;
                
                else if(Arr.in(axis,['y','vertical']))
                r = scroll.scrollableY;
                
                else
                r = (scroll.scrollableX === true)? scroll.scrollableX:scroll.scrollableY;
            }
        }
        
        return r;
    },
    
    
    // hasAttr
    // retourne vrai si la node a l'attribut
    hasAttr: function(node,value)
    {
        return (this.is(node) && Str.is(value))? node.hasAttribute(value):false;
    },
    
    
    // hasClass
    // retourne vrai si la node a la classe
    hasClass: function(node,value)
    {
        return (this.is(node) && Str.is(value))? node.classList.contains(value):false;
    },
    
    
    // tag
    // retourne le nom de la tag en lowerCase
    tag: function(node) 
    {
        let r = null;
        const tag = this.getProp(node,'tagName');
        
        if(Str.is(tag))
        r = tag.toLowerCase();
        
        return r;
    },

    
    // css
    // retourne un objet contenant toutes les règles css
    css: function(node,start,pseudo)
    {
        const r = {};
        this.typecheck(node);
        const style = window.getComputedStyle(node,pseudo);

        for (var i = 0; i < style.length; i++) {
            let value = style.item(i);
            
            if(start == null || Str.isStart(start,value))
            r[value] = style.getPropertyValue(value);
        }
        
        return r;
    },
    
    
    // getCss
    // permet de retourner une valeur css
    getCss: function(node,key,cast,pseudo)
    {
        let r = undefined;
        this.typecheck(node);
        Str.typecheck(key);
        
        // fix pour ie11 qui retourne mauvais computed style pour width/height (box-model)
        if(Browser.isIe11() && Arr.in(key,['width','height']))
        {
            const dimension = this.getDimension(node);
            r = Num.ceil(dimension[key])+"px";
        }
        
        else
        {
            const style = window.getComputedStyle(node,pseudo);
            r = style.getPropertyValue(key);
        }
        
        r = Scalar.cast(r,cast);
        
        return r;
    },
    
    
    // attr
    // retourne un objet contenant tous les attributs d'une balise
    attr: function(node,start)
    {
        const r = {};
        this.typecheck(node);
        const attr = node.attributes;
        
        ArrLike.each(attr,function(value) {
            const name = value.name;
            if(start == null || Str.isStart(start,name))
            r[name] = value.value;
        });
        
        return r;
    },

    
    // attrStr
    // retourne les attributs d'une node sous forme de string
    attrStr: function(node,start)
    {
        let r = null;
        const attr = this.attr(node,start);
        
        if(attr != null)
        r = Obj.str(attr,'=',' ',true);
        
        return r;
    },
    
    
    // getAttr
    // retourne un attribut
    // possible de retourner la valeur json décodé, ou forcer un int/bool
    getAttr: function(node,key,cast)
    {
        let r = undefined;
        this.typecheck(node);
        
        if(this.hasAttr(node,key))
        {
            r = node.getAttribute(key);
            r = Scalar.cast(r,cast);
        }
        
        return r;
    },
    
    
    // dataAttr
    // retourne un objet contenant tous les data-attributs d'une balise
    dataAttr: function(node)
    {
        return this.attr(node,'data-');
    },
    
    
    // getValue
    // retourne la valeur pour une node, surtout pour les formulaires
    // la valeur retourné peut être trim
    getValue: function(node,trim,cast)
    {
        let r = undefined;
        this.typecheck(node);
        
        r = node.value;
        r = Str.cast(r);
        
        if(trim === true)
        r = Str.trim(r);
        
        if(cast != null)
        r = Scalar.cast(r,cast);
        
        return r;
    },
    
    
    // getDimension
    // retourne la dimension de la node
    // il est possible de retourner la dimension si on change de façon temporaire le display
    getDimension: function(node,display)
    {
        this.typecheck(node);
        display = (display === true)? 'block':display;
        const displayToggle = Str.isNotEmpty(display);
        let currentDisplay, currentWidth, currentHeight;
        
        if(displayToggle)
        {
            currentDisplay = node.style.display;
            currentWidth = node.style.width;
            currentHeight = node.style.height;
            node.style.display = display;
            node.style.width = 'auto';
            node.style.height = 'auto';
        }
        
        const rect = this.getBoundingRect(node);
        
        if(displayToggle)
        {
            node.style.display = currentDisplay;
            node.style.width = currentWidth;
            node.style.height = currentHeight;
        }
        
        return {
            width: Num.ceil(rect.width),
            height: Num.ceil(rect.height)
        }
    },
    
    
    // getBoundingRect
    // retourne l'objet bounding rect pour la node
    getBoundingRect: function(node)
    {
        this.typecheck(node);
        return node.getBoundingClientRect();
    },
    
    
    // getScroll
    // retourne un object avec les données pour le scroll
    // retourne aussi les dimensions externes et internes, ainsi qu'un bool indiquant si une direction est scrollable
    getScroll: function(node)
    {
        let r = null;
        this.typecheck(node);
        const tag = this.tag(node);
        
        // scrollTop n'est pas sur la tag HTML dans IE
        if(Arr.in(tag,['html','body']))
        r = Win.getScroll();
        
        else
        {
            const rect = this.getBoundingRect(node);
            
            r = {
                top: Num.ceil(node.scrollTop),
                left: Num.ceil(node.scrollLeft),
                width: Num.ceil(node.scrollWidth),
                height: Num.ceil(node.scrollHeight),
                innerWidth: Num.ceil(rect.width),
                innerHeight: Num.ceil(rect.height),
                scrollableX: false,
                scrollableY: false
            };
            
            if(r.innerWidth > 0 && r.innerHeight > 0)
            {
                if(r.width > r.innerWidth)
                r.scrollableX = true;
                
                if(r.height > r.innerHeight)
                r.scrollableY = true;
            }
        }
        
        return r;
    },
    
    
    // getOffset
    // retourne tous les offsets de la node (par rapport au parent, au document et à la window)
    getOffset: function(node) 
    {
        return {
            parent: this.getOffsetParent(node),
            doc: this.getOffsetDoc(node),
            win: this.getOffsetWin(node)
        }
    },
    
    
    // getOffsetParent
    // retourne un objet avec les données pour le offset de la node (par rapport à son parent scrollable)
    getOffsetParent: function(node)
    {
        this.typecheck(node);
        
        return {
            top: Num.ceil(node.offsetTop),
            left: Num.ceil(node.offsetLeft)
        };
    },
    
    
    // getOffsetDoc
    // retourne un objet avec les données pour le offset de la node (par rapport au document)
    getOffsetDoc: function(node)
    {
        const rect = this.getBoundingRect(node);
        const scroll = Win.getScroll();
        
        return {
            top: Num.ceil(rect.top + scroll.top),
            left: Num.ceil(rect.left + scroll.left)
        };
    },
    
    
    // getOffsetWin
    // retourne un objet avec les données pour le offset de la node (par rapport à la window)
    getOffsetWin: function(node)
    {
        const rect = this.getBoundingRect(node);
        
        return {
            top: Num.ceil(rect.top),
            left: Num.ceil(rect.left)
        };
    },
    
    
    // setAttr
    // change un attribut sur une ou plusieurs nodes
    // si undefined, efface l'attribut
    setAttr: function(nodes,key,value)
    {
        nodes = this.toArray(nodes);
        Str.typecheck(key,true);
        
        if(Obj.is(value))
        value = Json.encode(value);
        
        if(Bool.is(value))
        value = Bool.toInt(value);
        
        Arr.each(nodes,function(ele) {
            if(value === undefined)
            ele.removeAttribute(key);
            else
            ele.setAttribute(key,value);
        });
    },
    
    
    // removeAttr
    // enlève un attribut sur une ou plusieurs nodes
    removeAttr: function(nodes,key)
    {
        return this.setAttr(nodes,key,undefined);
    },
    
    
    // toggleAttr
    // permet d'ajouter ou enlever un attribut sur une ou plusieurs nodes
    // l'atttribut est toujours présent, si true ou inexistant valeur est 1, sinon valeur est 0
    toggleAttr: function(nodes,key,bool)
    {
        nodes = this.toArray(nodes);
        Str.typecheck(key,true);
        const $inst = this;
        const defaultValue = (Bool.is(bool))? Bool.toInt(bool):null;
        
        Arr.each(nodes,function(ele) {
            let value = defaultValue;
            
            if(value == null)
            {
                value = $inst.getAttr(ele,key,'int');
                value = (value === 1)? false:true;
            }
            
            $inst.setAttr(ele,key,value);
        });
    },
    
    
    // setsAttr
    // remplace tous les attributs d'une ou plusieurs nodes, il faut fournir un plain object
    // possible de retirer les attributs existants
    setsAttr: function(nodes,value)
    {
        nodes = this.toArray(nodes);
        Pojo.typecheck(value);
        const $inst = this;
        
        Arr.each(nodes,function(ele) {            
            Pojo.each(value,function(v,k) {
                $inst.setAttr(ele,k,v);
            });
        });
    },


    // emptyAttr
    // permet de retirer tous les attributs à une ou plusieurs nodes
    emptyAttr: function(nodes)
    {
        nodes = this.toArray(nodes);
        const $inst = this;
        
        Arr.each(nodes,function(ele) {
            ArrLike.each(ele.attributes,function(value) {
                if(value != null)
                $inst.removeAttr(ele,value.name);
            });
        });
    },
    
    
    // addId
    // ajoute un id aux éléments contenus dans l'objet qui n'en ont pas
    addId: function(nodes,value)
    {
        nodes = this.toArray(nodes);
        Str.typecheck(value);
        const $inst = this;
        
        Arr.each(nodes,function(ele) {
            if(!$inst.match(ele,"[id]"))
            {
                const newId = value+Integer.unique();
                $inst.setProp(ele,'id',newId);
            }
        });
    },
    

    // setCss
    // permet de changer une valeur inline du css
    setCss: function(node,key,value)
    {
        this.typecheck(node);
        Str.typecheck(key);
        key = Str.toCamelCase('-',key);
        
        if(value == null)
        value = '';
        
        node.style[key] = value;
    },
    
    
    // setValue
    // permet de changer la valeur d'une node
    // si la valeur est un objet, encode en json
    setValue: function(node,value)
    {
        this.typecheck(node);
        value = Str.cast(value,true);
        node.value = value;
    },
    
    
    // toggleClass
    // permet d'ajouter ou enlever une classe sur une ou plusieurs nodes
    toggleClass: function(nodes,value,bool)
    {
        nodes = this.toArray(nodes);
        Str.typecheck(value,true);
        
        Arr.each(nodes,function(ele) {
            ele.classList.toggle(value,bool);
        });
    },
    
    
    // setDimension
    // permet de changer la largeur et hauteur de la node
    setDimension: function(node,width,height)
    {
        this.typecheck(node);
        
        if(Scalar.is(width))
        {
            width = (width === true)? this.getDimension(node,width).width:width;
            width = (width === false)? undefined:width;
            width = (Num.is(width))? width+"px":width;
            this.setCss(node,'width',width);
        }
        
        if(Scalar.is(height))
        {
            height = (height === true)? this.getDimension(node,height).height:height;
            height = (height === false)? undefined:height;
            height = (Num.is(height))? height+"px":height;
            this.setCss(node,'height',height);
        }
    },
    
    
    // setScroll
    // permet de changer les valeurs du scroll
    setScroll: function(node,top,left)
    {
        this.typecheck(node);
        
        if(Num.is(top))
        node.scrollTop = (top > 0)? top:0;
        
        if(Num.is(left))
        node.scrollLeft = (left > 0)? left:0;
    },
    

    // focus
    // permet de mettre le focus sur une node
    // possible de tenter de prevent le scroll
    focus: function(node,preventScroll)
    {
        this.typecheck(node);
        
        if(preventScroll === true)
        {
            const scroll = Win.getScroll();
            node.focus();
            Func.timeout(0,function() {
                Win.setScroll(scroll.top,scroll.left);
            });
        }
        
        else
        node.focus();
    },
    
    
    // getUri
    // retourne l'uri à partir d'une node
    getUri: function(node)
    {
        let r = undefined;
        const tag = this.tag(node);
        
        if(tag === 'form')
        r = this.getAttr(node,"action");
        
        else
        r = this.getAttr(node,"href") || this.getAttr(node,'data-href');
        
        return r;
    },
    

    // serialize
    // permet de serializer une ou plusieurs nodes
    // il faut spécifier la prop pour clé et celle pour value
    serialize: function(nodes,keyProp,valueProp)
    {
        let r = '';
        nodes = this.toArray(nodes);
        const query = Uri.makeQuery();
        keyProp = (Str.is(keyProp))? keyProp:'name';
        valueProp = (Str.is(valueProp))? valueProp:'value';
        const $inst = this;
        
        Arr.each(nodes,function(ele) {
            const key = $inst.getProp(ele,keyProp);
            const value = $inst.getProp(ele,valueProp);
            query.append(key,value);
        });
        
        r = query.toString();

        return r;
    },
    
    
    // prepend
    // ajout une ou plusieurs nodes comme premiers enfant de la node
    prepend: function(node,value)
    {
        this.typecheck(node);
        value = Dom.htmlNodes(value);
        node.prepend.apply(node,value);
    },
    
    
    // append
    // ajoute du contenu html comme dernier enfant de la node
    append: function(node,value)
    {
        this.typecheck(node);
        value = Dom.htmlNodes(value);
        node.append.apply(node,value);
    },
        

    // insertBefore
    // permet d'insérer une ou plusieurs node avant une autre
    insertBefore: function(node,value)
    {
        this.typecheck(node);
        value = Dom.htmlNodes(value);
        
        return Arr.accumulate([],value,function(ele) {
            return node.insertAdjacentElement('beforebegin',ele);
        });
    },


    // insertAfter
    // permet d'insérer une ou plusieurs node après une autre
    insertAfter: function(node,value)
    {
        this.typecheck(node);
        value = Dom.htmlNodes(value);
        
        return Arr.accumulate([],value,function(ele) {
            return node.insertAdjacentElement('afterend',ele);
        });
    },


    // wrapAll
    // permet d'enrobber un groupe de node dans une une nouvelle balise html
    wrapAll: function(nodes,value)
    {
        let r = null;
        nodes = this.toArray(nodes,true);
        value = Dom.htmlNodes(value);
        
        if(Arr.isNotEmpty(value))
        {
            r = Arr.valueFirst(value);
            const firstNode = Arr.valueFirst(nodes);
            this.insertBefore(firstNode,value);
            this.append(r,nodes);
        }
        
        return r;
    }
}