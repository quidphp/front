/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */

// import
// script that imports many variables within the scope

// node
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

// shortcut
const d = Quid.Shortcut.d;
const assert = Quid.Shortcut.assert;
const logError = Quid.Shortcut.logError;
const getAttr = Quid.Shortcut.getAttr;
const setAttr = Quid.Shortcut.setAttr;
const toggleAttr = Quid.Shortcut.toggleAttr;
const setCss = Quid.Shortcut.setCss;
const toggleClass = Quid.Shortcut.toggleClass;
const getHtml = Quid.Shortcut.getHtml;
const setHtml = Quid.Shortcut.setHtml;
const qs = Quid.Shortcut.qs;
const qsa = Quid.Shortcut.qsa;
const getProp = Quid.Shortcut.getProp;
const setProp = Quid.Shortcut.setProp;
const getData = Quid.Shortcut.getData;
const setData = Quid.Shortcut.setData;
const setHdlr = Quid.Shortcut.setHdlr;
const setHdlrs = Quid.Shortcut.setHdlrs;
const allHdlr = Quid.Shortcut.allHdlr;
const trigHdlr = Quid.Shortcut.trigHdlr;
const trigHdlrs = Quid.Shortcut.trigHdlrs;
const ael = Quid.Shortcut.ael;
const aelDelegate = Quid.Shortcut.aelDelegate;
const aelPassive = Quid.Shortcut.aelPassive;
const aelOnce = Quid.Shortcut.aelOnce;
const rel = Quid.Shortcut.rel;
const trigEvt = Quid.Shortcut.trigEvt;
const trigBubble = Quid.Shortcut.trigBubble;
const trigSetup = Quid.Shortcut.trigSetup;
const trigTeardown = Quid.Shortcut.trigTeardown;