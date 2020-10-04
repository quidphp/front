/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */

// import
// script that imports many variables from include within the scope

// default
const d = console.log;
const dd = console.dir;
const backtrace = console.trace;
const $$ = alert;

// include
const Arr = Quid.Arr;
const ArrLike = Quid.ArrLike;
const Bool = Quid.Bool;
const Browser = Quid.Browser;
const Datetime = Quid.Datetime;
const Debug = Quid.Debug;
const Doc = Quid.Doc;
const Dom = Quid.Dom;
const Ele = Quid.Ele;
const Evt = Quid.Evt;
const Func = Quid.Func;
const HistoryState = Quid.HistoryState;
const Html = Quid.Html;
const Integer = Quid.Integer;
const Json = Quid.Json;
const Nav = Quid.Nav;
const Nod = Quid.Nod;
const Num = Quid.Num;
const Obj = Quid.Obj;
const Pojo = Quid.Pojo;
const Request = Quid.Request;
const Scalar = Quid.Scalar;
const Selector = Quid.Selector;
const Str = Quid.Str;
const Target = Quid.Target;
const Uri = Quid.Uri;
const Validate = Quid.Validate;
const Vari = Quid.Vari;
const Win = Quid.Win;
const Xhr = Quid.Xhr;

// debug
const debug = Debug.status.bind(Debug);
const assert = Debug.assertThrow.bind(Debug);
const logError = Debug.logError.bind(Debug);

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

// component
const Component = Quid.Component;

// factory
const Factory = Quid.Factory;

// test
const Test = Quid.Test;