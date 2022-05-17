/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */

// import
// script that imports many variables from include within the scope

// default
const dd = console.dir;
const $$ = alert;

// node
const d = Quid.d;
const assert = Quid.assert;
const logError = Quid.logError;
const Arr = Quid.Arr;
const ArrLike = Quid.ArrLike;
const Bool = Quid.Bool;
const Datetime = Quid.Datetime;
const Debug = Quid.Debug;
const Func = Quid.Func;
const Html = Quid.Html;
const Integer = Quid.Integer;
const Json = Quid.Json;
const Nav = Quid.Nav;
const Num = Quid.Num;
const Obj = Quid.Obj;
const Pojo = Quid.Pojo;
const Scalar = Quid.Scalar;
const Str = Quid.Str;
const Validate = Quid.Validate;
const Vari = Quid.Vari;
const Component = Quid.Component;
const Factory = Quid.Factory;
const Test = Quid.Test;

// browser
const Browser = Quid.Browser;
const Doc = Quid.Doc;
const Dom = Quid.Dom;
const Ele = Quid.Ele;
const Evt = Quid.Evt;
const HistoryState = Quid.HistoryState;
const Nod = Quid.Nod;
const Request = Quid.Request;
const Selector = Quid.Selector;
const Target = Quid.Target;
const Uri = Quid.Uri;
const Win = Quid.Win;
const Xhr = Quid.Xhr;

// ele
const getAttr = Ele.getAttr.bind(Ele);
const setAttr = Ele.setAttr.bind(Ele);
const toggleAttr = Ele.toggleAttr.bind(Ele);
const setCss = Ele.setCss.bind(Ele);
const toggleClass = Ele.toggleClass.bind(Ele);
const getHtml = Ele.getHtml.bind(Ele);
const setHtml = Ele.setHtml.bind(Ele);

// nod
const qs = Nod.scopedQuery.bind(Nod);
const qsa = Nod.scopedQueryAll.bind(Nod);

// target
const getProp = Target.getProp.bind(Target);
const setProp = Target.setProp.bind(Target);
const getData = Target.getData.bind(Target);
const setData = Target.setData.bind(Target);
const setHdlr = Target.setHandler.bind(Target);
const setHdlrs = Target.setsHandler.bind(Target);
const allHdlr = Target.allHandler.bind(Target);
const trigHdlr = Target.triggerHandler.bind(Target);
const trigHdlrs = Target.triggersHandler.bind(Target);
const ael = Target.addListener.bind(Target);
const aelDelegate = Target.addDelegatedListener.bind(Target);
const aelPassive = Target.addPassiveListener.bind(Target);
const aelOnce = Target.addListenerOnce.bind(Target);
const rel = Target.removeListener.bind(Target);
const trigEvt = Target.triggerNoBubble.bind(Target);
const trigBubble = Target.triggerBubble.bind(Target);
const trigSetup = Target.triggerSetup.bind(Target);
const trigTeardown = Target.triggerTeardown.bind(Target);