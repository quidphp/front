/*
 * This file is part of the QuidPHP package.
 * Website: https://quidphp.com
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// uri
// script with a set of helper functions related to uri management
const Uri = Lemur.Uri = {
    
    // isInternal
    // retourne vrai si l'uri et la comparaison ont le même scheme et host
    isInternal: function(uri,compare)
    {
        let r = false;
        
        if(Str.is(uri))
        {
            compare = (Str.is(compare))? this.parse(compare):Request.parse();			
            const parse = this.parse(uri);
            
            if(parse.protocol === compare.protocol && parse.host === compare.host)
            r = true;
        }
        
        return r;
    },


    // isExternal
    // retourne vrai si l'uri et la comparaison n'ont pas le même scheme et host
    isExternal: function(uri,compare)
    {
        return (this.isInternal(uri,compare))? false:true;
    },


    // hasExtension
    // retourne vrai si l'uri a une extension
    hasExtension: function(uri)
    {
        return this.extension(uri) != null;
    },


    // hasFragment
    // retourne vrai si l'uri a un hash
    hasFragment: function(uri)
    {
        let r = false;
        
        if(Str.is(uri))
        {
            const parse = this.parse(uri);
            
            if(Str.isNotEmpty(parse.hash))
            r = true;
        }
        
        return r;
    },

    
    // isOnlyHash
    // retourne vrai si l'uri est seulement un hash
    isOnlyHash: function(value)
    {
        return (Str.length(value) > 1 && Str.isStart('#',value));
    },
    
    
    // isSamePathQuery
    // retourne vrai si l'uri est la même que la comparaison
    // compare path et query
    isSamePathQuery: function(uri,compare)
    {
        let r = false;
        
        if(Str.is(uri))
        {
            compare = (Str.is(compare))? this.parse(compare):Request.parse();			
            const parse = this.parse(uri);

            if(parse.pathname === compare.pathname && parse.search === compare.search)
            r = true;
        }
        
        return r;
    },


    // isSamePathQueryHash
    // retourne vrai si l'uri est la même que la comparaison
    // compare path, query et hash
    isSamePathQueryHash: function(uri,compare)
    {
        let r = false;
        
        if(Str.is(uri))
        {
            compare = (Str.is(compare))? this.parse(compare):Request.parse();			
            const parse = this.parse(uri);
            
            if(parse.pathname === compare.pathname && parse.search === compare.search && parse.hash === compare.hash)
            r = true;
        }
        
        return r;
    },


    // isHashChange
    // retourne vrai si l'uri est la même que la comparaison mais que le hash change
    isHashChange: function(uri,compare)
    {
        let r = false;
        
        if(Str.is(uri))
        {
            compare = (Str.is(compare))? this.parse(compare):Request.parse();
            const parse = this.parse(uri);
            
            if(parse.protocol === compare.protocol && parse.host === compare.host && parse.pathname === compare.pathname && parse.search === compare.search)
            {
                if((Str.isNotEmpty(parse.hash) || Str.isNotEmpty(compare.hash)) && parse.hash !== compare.hash)
                r = true;
            }
        }
        
        return r;
    },


    // isSameWithHash
    // retourne vrai si l'uri est la même que la comparaison, que l'uri a un hash et que le hash est identique
    isSameWithHash: function(uri,compare)
    {
        return this.hasFragment(uri) && uri === compare;
    },


    // relative
    // retourne une uri relative
    relative: function(uri,hash)
    {
        return this.build(this.parse(uri),false,hash);
    },

    
    // absolute
    // retourne une uri absolute
    absolute: function(uri,hash)
    {
        return this.build(this.parse(uri),true,hash);
    },
    
    
    // path
    // retourne le pathname de l'uri
    path: function(uri)
    {
        return this.parse(uri).pathname;
    },
    
    
    // query
    // retourne le query de l'uri sans le ?
    query: function(uri)
    {
        return this.makeQuery(this.parse(uri).search).toString();
    },
    
    
    // fragment
    // retourne le hash de l'uri sans le symbole
    fragment: function(uri)
    {
        return this.makeHash(this.parse(uri).hash,false);
    },
    
    
    // extension
    // retourne l'extension du path de l'uri
    extension: function(uri)
    {
        let r = null;
        const parse = this.parse(uri);
        const regex = /(?:\.([^.]+))?$/;
        const result = regex.exec(parse.pathname);
        
        if(Arr.is(result) && result.length === 2)
        r = result[1];
        
        return r;
    },


    // parse
    // retourne un objet avec les différentes parties d'une uri séparés
    // ne marche pas bien sur ie11
    parse: function(uri)
    {
        Str.typecheck(uri);
        const schemeHost = Request.schemeHost();
        
        if(Str.isStart("#",uri))
        uri = Request.relative()+uri;
        
        return new URL(uri,schemeHost);
    },

    
    // build
    // prend un objet parse et retourne une string uri
    // possible de retourner une string relative ou absolute
    // possible d'inclure ou non le hash
    build: function(parse,absolute,hash)
    {
        let r = '';
        Obj.typecheck(parse);
        
        if(absolute === true)
        {
            r += (Str.is(parse.protocol))? parse.protocol:Request.scheme(true);
            r += "//";
            r += (Str.is(parse.host))? parse.host:Request.host();
        }
        
        r += parse.pathname;
        
        if(parse.search)
        {
            const searchParams = (parse.search instanceof URLSearchParams)? parse.search:this.makeQuery(parse.search);
            const query = searchParams.toString();
            
            if(Str.isNotEmpty(query))
            r += "?"+query;
        }

        if(parse.hash && hash === true)
        r += this.makeHash(parse.hash,true);

        return r;
    },
    
    
    // makeQuery
    // permet de retourner un objet urlSearchParams à partir d'une string ou un object
    makeQuery: function(value)
    {
        const r = (Str.is(value))? new URLSearchParams(value):new URLSearchParams();
        
        if(Pojo.is(value))
        {
            Pojo.each(value,function(value,key) {
                value = (value == null)? '':value;
                r.append(key,value);
            });
        }
        
        return r;
    },
    
    
    // makeHash
    // permet de faire une hash avec ou sans le hash
    makeHash: function(value,symbol)
    {
        let r = '';
        
        if(Str.isNotEmpty(value))
        {
            r = value;
            const hasHash = Str.isStart('#',r);
            
            if(symbol === true)
            r = (!hasHash)? "#"+r:r;
            
            else if(hasHash)
            r = Str.sub(1,true,r);
        }
        
        else if(symbol === true)
        r = '#';
        
        return r;
    },
    
    
    // getMailto
    // permet d'obtenir un email à partir d'un mailto (comme dans un href)
    getMailto: function(value)
    {
        let r = null;
        Str.typecheck(value);
        
        if(Str.isNotEmpty(value))
        {
            const email = value.replace(/mailto:/,'');
            
            if(Validate.isEmail(email))
            r = email;
        }
        
        return r;
    }
}