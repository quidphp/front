/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */

// type
// script with common methods for all variable types
const Type = {  
    
    // is
    // retourne vrai si c'est une variable du type
    is: function(value)
    {
        return Vari.type(value) !== 'object';
    },

    
    // are
    // retourne vrai si la valeur est un tableau contenant des variables du type
    are: function(value)
    {
        const $inst = this;
        
        return (Arr.is(value))? Arr.each(value,function(v) {
            return $inst.is(v);
        }):false;
    },
    
    
    // isEmpty
    // retourne vrai si c'est une variable du type vide
    isEmpty: function(value)
    {
        return (this.is(value))? Vari.isEmpty(value):false;
    },
    
    
    // isNotEmpty
    // retourne vrai si c'est une variable du type non-vide
    isNotEmpty: function(value)
    {
        return (this.is(value))? Vari.isNotEmpty(value):false;
    },
    
    
    // typecheck
    // envoie une erreur si la valeur n'est pas du type
    // si type est true, doit être du type et non vide
    // si type est false, accepte null + undefined
    typecheck: function(value,type)
    {
        if(((type === true && !this.isNotEmpty(value)) || (type !== true && !this.is(value))) && !(type === false && value == null))
        throw new Error(value);
        
        return value;
    },
    
    
    // typechecks
    // envoie une exception si la valeur n'est pas un tableau contenant des valeurs du type
    typechecks: function(value,type)
    {
        if(Arr.is(value))
        {
            const $inst = this;
            
            Arr.each(value,function(ele) {
                $inst.typecheck(ele,type);
            });
        }
        
        else
        throw new Error(value);
        
        return value;
    }
}

// arr
const Arr = Quid.Arr = Factory(Type,ObjBase,ObjKeyValue,ObjEach,ObjCopyFilterMap,ObjWrite,ObjWriteSelf,ArrBase,ArrWriteSelf,ArrLoop);

// arrLike
const ArrLike = Quid.ArrLike = Factory(Type,ObjBase,ObjKeyValue,ObjEach,ObjCopyFilterMap,ArrBase,ArrLikeRead,ArrLoop);

// bool
const Bool = Quid.Bool = Factory(Type,BoolPrimitive);

// evt
const Evt = Quid.Evt = Factory(Type,EvtPrimitive);

// func
const Func = Quid.Func = Factory(Type,ObjBase,FuncObj);

// integer
const Integer = Quid.Integer = Factory(Type,NumPrimitive,IntegerPrimitive);

// num
const Num = Quid.Num = Factory(Type,NumPrimitive,NumFormat);

// obj
const Obj = Quid.Obj = Factory(Type,ObjBase,ObjKeyValue,ObjEach,ObjCopyFilterMap,ObjWrite,ObjWriteSelf,ObjProto);

// pojo
const Pojo = Quid.Pojo = Factory(Type,ObjBase,ObjKeyValue,ObjEach,ObjCopyFilterMap,ObjWrite,ObjWriteSelf,PojoObj);

// scalar
const Scalar = Quid.Scalar = Factory(Type,ScalarPrimitive);

// str
const Str = Quid.Str = Factory(Type,ObjBase,ObjKeyValue,ObjEach,StrPrimitive);