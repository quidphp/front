/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// doc
// root component for a document node
Component.Doc = function(option)
{
    // document node
    Vari.check(this,document);
    

    // option
    const $option = Pojo.replace({
        mountTimeout: 0,
        routeWrap: "> .route-wrap",
        scrollTop: true,
        contentType: 'html'
    },option);
    
    
    // components
    Component.History.call(this,$option);
    
    
    // handler
    setHdlrs(this,'doc:',{
        
        // retourne la node html
        getHtml: function() {
            return qs(this,'html',true);
        },
        
        // retourne la node head
        getHead: function() {
            return qs(this,'head',true);
        },
        
        // retourne la node body
        getBody: function() {
            return qs(this,'body',true);
        },
        
        // retourne un tableau avec les nodes html et body
        getHtmlBody: function() {
            return [trigHdlr(this,'doc:getHtml'),trigHdlr(this,'doc:getBody')]
        },
        
        // retourne la node du route wrap
        // seul le contenu dans cette node est remplacé au chargement d'une nouvelle page
        getRouteWrap: function() {
            let r = trigHdlr(this,'doc:getBody');

            if($option.routeWrap)
            r = qs(r,$option.routeWrap);
            
            return r;
        },
        
        // getAttr
        // permet d'obtenir un attribut de la balise html
        getAttr: function(key,cast) {
            const html = trigHdlr(this,'doc:getHtml');
            return getAttr(html,key,cast);
        },
        
        // setAttr
        // permet de changer un attribut de la balise html
        setAttr: function(key,value) {
            const html = trigHdlr(this,'doc:getHtml');
            setAttr(html,key,value);
        },
        
        // removeAttr
        // permet de retirer un attribut de la balise html
        removeAttr: function(key) {
            const html = trigHdlr(this,'doc:getHtml');
            Ele.removeAttr(html,key);
        },
        
        // setError
        // permettre de mettre un type d'erreur dans l'attribut
        setError: function(value) {
            trigHdlr(this,'doc:setAttr','data-error',value);
        },
        
        // getTitle
        // retourne le titre courant en string
        getTitle: function() {
            return this.title;
        },
        
        // setTitle
        // permet de changer le titre de la page
        setTitle: function(value) {
            value = (Str.is(value))? value:'';
            const node = qs(this,'head title');
            document.title = value;

            // node
            if(node != null)
            setHtml(node,value);
        },
        
        // getData
        // retourne le dernier objet de data
        getData: function() {
            return getData(this,'data-doc');
        },
        
        // met le statut de la balise html à loading
        setStatusLoading: function() {
            trigHdlr(this,'doc:setAttr','data-status','loading');
        },
        
        // met le statut de la balise html à ready
        setStatusReady: function() {
            trigHdlr(this,'doc:setAttr','data-status','ready');
        },
        
        // désactive le scrollTop lors du prochain chargement de page seulement
        skipNextScrollTop: function() {
            $option.scrollTop = null;
        },
                
        // lance les évènements pour monter le document dans le bon order
        mount: function(initial,isError) {
            trigEvt(this,'doc:mountImmediate',initial,isError);
            Func.timeout($option.mountTimeout,function() {
                docMount.call(this,initial,isError);
                trigHdlr(this,'doc:setStatusReady');
            },this);
        },

        // lance les évènements pour démonter le document dans le bon order
        unmount: function() {
            docUnmount.call(this);
        },
        
        // permet de faire les bindings common sur une node
        mountNodeCommon: function(node) {
            trigEvt(this,'doc:mountNode',node);
            trigEvt(this,'doc:mountCommon',node);
        },
        
        // prépare le document, les attributs de html, le head, les attributs de body
        makeMeta: function(htmlAttr,title,meta,bodyAttr,routeWrapAttr) {
            docMetaMake.call(this,htmlAttr,title,meta,bodyAttr,routeWrapAttr);
        },
        
        // prépare le document à paritr d'un objet doc
        makeMetaFromDoc: function(doc) {
            Pojo.typecheck(doc);
            docMetaMake.call(this,doc.htmlAttr,doc.title,doc.meta,doc.bodyAttr,doc.routeWrapAttr);
        },
        
        // crée le document à partir d'un objet doc, passé dans dom.parse
        makeHtml: function(doc) {
            return docMakeHtml.call(this,doc);
        },
        
        // démonte la page courante, crée et monte la nouvelle page html
        makeHtmlMount: function(doc,isError) {
            docMakeMount.call(this,'html','doc:makeHtml',doc,isError);
        },
        
        // crée le document à partir d'un objet json
        makeJson: function(json) {
            return docMakeJson.call(this,json);
        },
        
        // démonte la page courante, crée et monte la nouvelle page json
        makeJsonMount: function(json,isError) {
            docMakeMount.call(this,'json','doc:makeJson',json,isError);
        }
    });
    
    
    // event
    ael(this,'doc:initAjax',function() {
        trigHdlr(this,'doc:setStatusLoading');
    });
    
    
    // setup
    aelOnce(this,'component:setup',function() {
        trigHdlr(this,'doc:mount',true);
    });
    
    
    // manageScrollTop
    const manageScrollTop = function()
    {
        if($option.scrollTop === true)
        Win.setScroll(0);
        
        if($option.scrollTop == null)
        $option.scrollTop = true;
    }
    
    
    // docMakeMount
    const docMakeMount = function(type,handler,parsedData,isError)
    {
        Str.typecheck(handler,true);
        Pojo.typecheck(parsedData);
        
        if($option.contentType === true || $option.contentType === type)
        {
            trigHdlr(this,'doc:unmount');
            trigHdlr(this,handler,parsedData);
            setData(this,'data-doc',parsedData);
            trigHdlr(this,'doc:mount',false,isError);
            manageScrollTop.call(this);
        }
        
        else
        {
            trigHdlr(this,'doc:setError','content-type');
            trigHdlr(this,'doc:setStatusReady');
            throw new Error($option.contentType);
        }
    }
    
    
    // docMakeHtml
    const docMakeHtml = function(doc)
    {
        Pojo.typecheck(doc);
        
        // routeWrapAttr
        const routeWrapAttr = getRouteWrapAttr.call(this,doc.body);
        
        // metaMake
        trigHdlr(this,'doc:makeMetaFromDoc',doc);
        
        // routeWrap
        docRouteWrapMake.call(this,doc.body);
    }
    
    
    // docMakeJson
    const docMakeJson = function(json)
    {
        Pojo.typecheck(json);
        
        // metaMake
        trigHdlr(this,'doc:makeMetaFromDoc',json.doc);
        
        // emit
        trigEvt(this,'doc:makeJsonResponse',json);
    }
    
    
    // docMetaMake
    const docMetaMake = function(htmlAttr,title,meta,bodyAttr,routeWrapAttr)
    {
        const html = trigHdlr(this,'doc:getHtml');
        const head = trigHdlr(this,'doc:getHead');
        const body = trigHdlr(this,'doc:getBody');
        const routeWrap = trigHdlr(this,'doc:getRouteWrap');
        
        // htmlAttr
        // les attributs de html sont remplacés (les attributs existants ne sont pas effacés)
        if(Pojo.isNotEmpty(htmlAttr))
        Ele.setsAttr(html,htmlAttr);
        
        // title
        if(!Str.is(title) || !title)
        title = '?';
        trigHdlr(this,'doc:setTitle',title);
        
        // meta
        if(meta != null)
        {
            const oldMeta = qsa(head,'meta');
            Ele.remove(oldMeta);
            
            if(Str.isNotEmpty(meta))
            meta = Dom.parse(meta);
            
            if(Arr.isNotEmpty(meta))
            Ele.prepend(head,meta);
        }
        
        // body
        // les attributs de body sont effacés et remplacés
        Ele.emptyAttr(body);
        if(Pojo.isNotEmpty(bodyAttr))
        Ele.setsAttr(body,bodyAttr);
        
        // routeWrap
        if(routeWrapAttr != null)
        {
            Ele.emptyAttr(routeWrap);
            Ele.setsAttr(routeWrap,routeWrapAttr);
        }
    }
    
    
    // getRouteWrapTarget
    const getRouteWrapTarget = function(contentTarget)
    {
        let r = null;
        const routeWrap = trigHdlr(this,'doc:getRouteWrap');
        
        if($option.routeWrap && !Ele.match(routeWrap,"body") && contentTarget != null)
        {
            const routeWrapTarget = qs(contentTarget,$option.routeWrap);
            
            if(routeWrapTarget != null)
            r = routeWrapTarget;
        }
        
        return r;
    }
    
    
    // getRouteWrapAttr
    const getRouteWrapAttr = function(contentTarget)
    {
        let r = null;
        contentTarget = getRouteWrapTarget.call(this,contentTarget);
        
        if(contentTarget != null)
        r = Ele.attr(contentTarget);
        
        return r;
    }
    
    
    // docRouteWrapMake
    const docRouteWrapMake = function(contentTarget)
    {
        const routeWrap = trigHdlr(this,'doc:getRouteWrap');
        contentTarget = getRouteWrapTarget.call(this,contentTarget);
        let contentHtml = '';
        
        if(contentTarget != null)
        contentHtml = getHtml(contentTarget);
        
        setHtml(routeWrap,contentHtml);
    }
    
    
    // docMount
    const docMount = function(initial,isError)
    {
        const routeWrap = trigHdlr(this,'doc:getRouteWrap');
        const body = trigHdlr(this,'doc:getBody');
        
        if(body != null && initial === true)
        trigEvt(this,'doc:mountInitial',body,isError);
        
        if(routeWrap != null)
        {
            trigEvt(this,'doc:mountCommon',routeWrap,isError);
            trigEvt(this,'doc:mountPage',routeWrap,isError,initial);
            
            if(isError !== true)
            {
                const uri = trigHdlr(this,'doc:getAttr',"data-uri");
                
                const group = trigHdlr(this,'doc:getAttr',"data-group");
                if(Str.isNotEmpty(group))
                trigEvt(this,'group:'+group,routeWrap,uri);
                
                const route = trigHdlr(this,'doc:getAttr',"data-route");
                if(Str.isNotEmpty(route))
                trigEvt(this,'route:'+route,routeWrap,uri);
            }
            
            trigEvt(this,'doc:mountedPage',routeWrap,isError);
        }
    }
    
    
    // docUnmount
    const docUnmount = function()
    {
        const body = trigHdlr(this,'doc:getBody');
        const routeWrap = trigHdlr(this,'doc:getRouteWrap');
        
        if(routeWrap != null)
        {
            trigEvt(this,'doc:unmountCommon',routeWrap);
            trigEvt(this,'doc:unmountPage',routeWrap);
            
            const uri = trigHdlr(this,'doc:getAttr',"data-uri");
            const group = trigHdlr(this,'doc:getAttr',"data-group");
            if(Str.isNotEmpty(group))
            trigEvt(this,'group:'+group+':unmount',routeWrap,uri);
            
            const route = trigHdlr(this,'doc:getAttr',"data-route");
            if(Str.isNotEmpty(route))
            trigEvt(this,'route:'+route+':unmount',routeWrap,uri);
                    
            trigEvt(this,'doc:unmounted',routeWrap);
        }
    }
    
    return this;
}