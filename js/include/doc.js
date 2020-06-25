/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
  
// doc
// object for document and document fragment targets
const DocTarget = {
    
    // is
    // retourne vrai si la valeur est un document, un fragment de document ou un template
    is: function(value)
    {
        return (this.isCurrent(value) || this.isFragment(value) || this.isTemplate(value));
    },
    
    
    // is
    // retourne vrai si la valeur est le document courant
    isCurrent: function(value) 
    {
        return value === document;
    },
    
    
    // isFragment
    // retourne vrai si la valeur est un fragment de document
    isFragment: function(value)
    {
        return value instanceof DocumentFragment;
    },
    

    // getDimension
    // retourne la dimension du document, c'est à dire la dimension des premiers enfants du document
    getDimension: function(value)
    {
        this.typecheck(value);
        const r = { width: 0, height: 0 };
        
        if(this.isCurrent(value))
        {
            r.width = Num.round(document.documentElement.scrollWidth);
            r.height = Num.round(document.documentElement.scrollHeight);
        }
        
        else
        {
            const children = this.children(value);
            
            Arr.each(children,function(ele) {
                const dimension = Ele.getDimension(ele);
                r.width += dimension.width;
                r.height += dimension.height;
            });
        }
        
        return r;
    }
}