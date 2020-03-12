/*
 * This file is part of the QuidPHP package.
 * Website: https://quidphp.com
 * License: https://github.com/quidphp/lemur/blob/master/LICENSE
 */
  
// win
// object for window target
const WinTarget = {
    
    // is
    // retourne vrai si la valeur est une window ou une window proxy
    is: function(value) 
    {
        return this.isCurrent(value) || this.isProxy(value)
    },
    
    
    // isCurrent
    // retourne vrai si la valeur est la window courante
    isCurrent: function(value)
    {
        return value instanceof Window;
    },
    
    
    // isProxy
    // retourne vrai si la valeur est une window proxy
    isProxy: function(value)
    {
        return (Obj.is(value) && !(value instanceof Window) && value.window === value);
    },
    
    
    // hasHistoryApi
    // retourne vrai si le navigateur courant supporte history API
    hasHistoryApi: function()
    {
        let r = false;
        
        if(window.history && window.history.pushState && window.history.replaceState)
        {
            if(!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/))
            r = true;
        }
        
        return r;
    },
    
    
    // isScrollable
    // retourne vrai si la fenêtre est scrollable dans un axis, ou n'importe quel axis
    isScrollable: function(axis)
    {
        let r = false;
        const scroll = this.getScroll();
        
        if(Arr.in(axis,['x','horizontal']))
        r = scroll.scrollableX;
        
        else if(Arr.in(axis,['y','vertical']))
        r = scroll.scrollableY;
        
        else
        r = (scroll.scrollableX === true)? scroll.scrollableX:scroll.scrollableY;
        
        return r;
    },
    
    
    // getScroll
    // retourne le scroll de la window
    // retourne aussi les dimensions externes et internes, ainsi qu'un bool indiquant si une direction est scrollable
    getScroll: function()
    {
        const r = Pojo.replace({
            top: Num.round(window.pageYOffset),
            left: Num.round(window.pageXOffset),
            width: Num.round(document.documentElement.scrollWidth),
            height: Num.round(document.documentElement.scrollHeight),
            innerWidth: Num.round(window.innerWidth),
            innerHeight: Num.round(window.innerHeight),
            scrollableX: false,
            scrollableY: false
        });
        
        if(r.innerWidth > 0 && r.innerHeight > 0)
        {
            // ajout de 1px à cause d'un problème sur Safari
            
            if(r.width > (r.innerWidth + 1))
            r.scrollableX = true;
            
            if(r.height > (r.innerHeight + 1))
            r.scrollableY = true;
        }
        
        return r;
    },
    
    
    // getDimension
    // retourne la dimension interne de la fênetre
    getDimension: function()
    {
        return {
            width: Num.round(window.innerWidth),
            height: Num.round(window.innerHeight)
        }
    }
}

// win
const Win = Lemur.Win = Factory(TargetRoot,DataTarget,HandlerTarget,ListenerTarget,EleWinTarget,WinTarget);