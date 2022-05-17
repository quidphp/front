/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// browser
// script to test the include files
Test.Browser = function()
{   
    let r = true;
    
    try 
    {
        // prepare
        let newHtml = Html.start('form',null,{action: '/ok', method: 'post'});
        newHtml += Html.input(2,{type: 'text', name: 'test-suite', data: { required: true, pattern: '^[0-9\-]+$' }});
        newHtml += Html.input(null,{type: 'submit', name: 'test-submit3' });
        newHtml += Html.input(null,{type: 'submit', name: 'test-submit2' });
        newHtml += Html.input(null,{type: 'submit', name: 'test-submit' });
        newHtml += Html.div("test <span>what</span>",{class: "ok"});
        newHtml += Html.end("form");
        newHtml += Html.div(null,{class: 'content', style: 'width: 25px; height: 25px; margin: 10px; padding: 5px; border: 5px solid green; box-sizing: content-box; border-image: none;' });
        newHtml += Html.div(null,{class: 'border', style: 'width: 25px; height: 25px; margin: 10px; padding: 5px; border: 5px solid green; box-sizing: border-box; border-image: none;' });
        newHtml += Html.div('LOL',{class: 'hidden', myattr: "L'article", style: "display: none; padding: 3px;" });
        const htmlNode = Doc.scopedQuery(document,'html');
        const selectorOne = htmlNode.querySelector("body");
        const selectorAll = htmlNode.querySelectorAll("body");
        const htmlStr = Ele.getOuterHtml(htmlNode);
        const isEmpty = Str.isEmpty.bind(Str);
        const bodyNode = Ele.scopedQuery(htmlNode,'body');
        Ele.prepend(bodyNode,newHtml);
        const formNode = Ele.scopedQuery(bodyNode,"> form");
        const formInput = Ele.scopedQueryAll(formNode,Dom.selectorInput());
        const divNode = Ele.scopedQuery(formNode,"> div");
        const inputNode = Ele.scopedQuery(formNode,"> input[type='text']");
        const submitNode = Ele.scopedQuery(formNode,"> input[name='test-submit']");
        const textNode = divNode.firstChild;
        const contentBox = Ele.scopedQuery(bodyNode,"> div.content");
        const borderBox = Ele.scopedQuery(bodyNode,"> div.border");
        const fragment = document.createDocumentFragment();
        const template = document.createElement('template');
        const hiddenNode = Ele.scopedQuery(bodyNode,".hidden");
        Ele.setHtml(template,newHtml);
        Doc.setHtml(fragment,newHtml);
        const formTemplate = Doc.children(template.content,'form');
        
        // browser
        assert(Bool.is(Browser.isOldIe()));
        assert(Bool.is(Browser.isIe11()));
        assert(Bool.is(Browser.isIe()));
        assert(Bool.is(Browser.isUnsupported()));
        assert(Bool.is(Browser.allowsCookie()));

        // data
        
        // doc
        assert(Doc.is(document));
        assert(Doc.is(fragment));
        assert(Doc.isCurrent(document));
        assert(!Doc.is(window));
        assert(!Doc.is(htmlNode));
        assert(!Doc.isFragment(document));
        assert(Doc.isFragment(fragment));
        assert(Doc.isFragment(Ele.parent(formTemplate[0])));
        assert(Doc.isTemplate(template));
        assert(Num.is(Doc.getDimension(document).width));
        assert(Num.is(Doc.getDimension(document).height));
        assert(Doc.realNode(document) === document);
        assert(Doc.realNode(fragment) === fragment);
        assert(Doc.realNode(template) === template.content);
        assert(Pojo.isEqual(Doc.getDimension(fragment),{width:0,height:0}));
        assert(Str.isStart('<html',Doc.getHtml(document)));
        assert(Str.isStart('<form',Doc.getHtml(fragment)));
        assert(Doc.setHtml(fragment,'<div>ok</div>') === undefined);
        assert(Doc.getHtml(fragment) === '<div>ok</div>');
        assert(Str.isStart('<form',Doc.getHtml(template)));
        assert(Doc.setHtml(template,'<div>ok</div>') === undefined);
        assert(Doc.getHtml(template) === '<div>ok</div>');
        Doc.setHtml(template,newHtml);
        assert(Str.isStart('<form',Doc.getHtml(template)));
        assert(Doc.getHtml(fragment) === '<div>ok</div>');
        Doc.setHtml(template,fragment,true);
        assert(Doc.getHtml(template) === '<div>ok</div>');
        Doc.setHtml(template,newHtml,true);
        assert(Doc.getHtml(fragment) === '<div>ok</div>');
        Doc.setHtml(fragment,template,true);
        assert(Str.isStart('<form',Doc.getHtml(fragment)));
        assert(Str.isStart('<form',Doc.getHtml(template)));
        assert(Doc.typecheck(document) === document);
        assert(Doc.are([document,fragment]));
        assert(Arr.length(Doc.scopedQueryAll(fragment,"input")) === 4);
        assert(Arr.length(Doc.scopedQueryAll(template,"input")) === 4);
        assert(Arr.length(Doc.scopedQueryAll(document,"input")) === 4);
        Doc.setHtml(template,Html.div('<span>OK</span>'));
        Doc.setHtml(fragment,Html.div('<span>OK</span>'));
        assert(Arr.length(Doc.scopedQueryAll(fragment,"div")) === 1);
        assert(Arr.length(Doc.scopedQueryAll(template,"span")) === 1);
        assert(Ele.tag(Doc.children(template)[0]) === 'div');
        assert(Ele.tag(Doc.children(fragment)[0]) === 'div');
        assert(Ele.tag(Doc.children(document)[0]) === 'html');
        assert(Doc.parent(template) === null);
        assert(Doc.parent(fragment) === null);
        assert(Arr.isNotEmpty(Ele.children(template)));
        Doc.setHtml(template,newHtml);
        
        // dom
        assert(Dom.htmlStr(2) === '2');
        assert(Dom.htmlStr(htmlNode) === Dom.htmlStr([htmlNode]));
        assert(Arr.is(Dom.parse(htmlStr)));
        assert(Ele.is(Dom.parseOne(htmlStr)));
        assert(Dom.querySelector("div[data-success]",htmlStr) === Html.span("JavaScript: </span><span>Idle"));
        assert(Obj.length(Dom.doc(htmlStr)) === 11);
        assert(Dom.selectorInput() === "input,select,textarea,button[type='submit']");
        assert(Dom.selectorInput(true) === "input,select,textarea,button");
        
        // ele
        assert(Arr.isEqual(Ele.typechecks([]),[]));
        assert(Ele.hasData(divNode,'what') === false);
        assert(Ele.getData(divNode,'what') === undefined);
        assert(Ele.allData(divNode) === undefined);
        assert(!Ele.is(textNode));
        assert(!Ele.is(window));
        assert(!Ele.is(document));
        assert(!Ele.is(window));
        assert(!Ele.is(document));
        assert(Ele.is(htmlNode));
        assert(Ele.are([selectorOne]));
        assert(Ele.are(selectorAll));
        assert(!Ele.are([htmlNode,true]));
        assert(!Ele.are(htmlNode));
        assert(!Ele.isEmpty(selectorOne));
        assert(!Ele.isEmpty(window));
        assert(Ele.isNotEmpty(selectorOne));
        assert(Ele.isVisible(htmlNode));
        assert(Ele.isVisible(borderBox));
        assert(!Ele.isHidden(htmlNode));
        assert(Ele.isTag(htmlNode,'html'));
        assert(!Ele.isFocused(htmlNode));
        assert(!Ele.isFocusable(htmlNode));
        assert(Ele.isFocusable(inputNode));
        assert(Ele.some([htmlNode,divNode],'html'));
        assert(!Ele.some([htmlNode,divNode],'body'));
        assert(!Ele.every([htmlNode,divNode],'html'));
        assert(Ele.every(htmlNode,'html'));
        assert(Ele.tag(htmlNode) === 'html');
        assert(Str.isNotEmpty(Ele.getOuterHtml(htmlNode)));
        assert(Obj.isNotEmpty(Ele.getBoundingRect(htmlNode)));
        assert(Num.is(Ele.getDimension(htmlNode).width));
        assert(Num.is(Ele.getDimension(htmlNode).height));
        assert(Ele.getDimension(contentBox).width > 40);
        assert(Ele.getDimension(borderBox).width === 25);
        assert(Pojo.length(Ele.getScroll(htmlNode)) === 8);
        assert(Pojo.is(Ele.attr(htmlNode)));
        assert(Ele.hasAttr(htmlNode,'data-error'));
        assert(!Ele.hasAttr(htmlNode,'data-errorz'));
        assert(Ele.getAttr(htmlNode,'data-error') === 'none');
        assert(Ele.getAttr(htmlNode,'data-errorz') == null);
        assert(Num.isNan(Ele.getAttr(htmlNode,'data-error','int')));
        assert(Ele.getAttr(htmlNode,'data-error','bool') === null);
        assert(Str.isNotEmpty(Ele.attrStr(htmlNode)));
        assert(Pojo.is(Ele.dataAttr(htmlNode)));
        assert(Ele.getAttr(htmlNode,'data-error') === 'none');
        assert(Str.isNotEmpty(Ele.getHtml(htmlNode)));
        assert(Str.isNotEmpty(Ele.getHtml(selectorOne)));
        assert(Ele.getHtml(divNode) === 'test <span>what</span>');
        assert(Ele.getText(divNode) === 'test what');
        assert(Ele.getProp(divNode,'textContent') === 'test what');
        assert(Ele.getProp(divNode,'textContent') === 'test what');
        assert(!Ele.hasClass(divNode,'test'));
        assert(Pojo.length(Ele.getOffset(divNode)) === 3);
        assert(Ele.getOffsetParent(divNode).left === 8);
        assert(Ele.getOffsetDoc(divNode).left === 8);
        assert(Ele.getOffsetWin(divNode).left === 8);
        assert(Pojo.length(Ele.getOffsetDoc(divNode)) === 2);
        Ele.setHandler(htmlNode,'what',function(value) { setData(this,'OK',value); return true; });
        assert(Ele.getData(htmlNode,'OK') == null);
        assert(!Ele.hasData(htmlNode,'test'));
        assert(Ele.setData(htmlNode,'test',2) === undefined);
        assert(Ele.hasData(htmlNode,'test'));
        assert(Ele.getData(htmlNode,'test') === 2);
        assert(Ele.flashData(htmlNode,'test') === 2);
        assert(!Ele.hasData(htmlNode,'test'));
        assert(Ele.flashData(htmlNode,'test',2) === undefined);
        assert(Pojo.isNotEmpty(Ele.allData(htmlNode)));
        assert(Func.is(Ele.getHandler(htmlNode,'what')));
        assert(Ele.isTriggerHandlerEqual([htmlNode],'what',true,'james'));
        assert(Ele.isTriggerHandlerEqual(htmlNode,'what',true,'james'));
        assert(!Ele.isTriggerHandlerEqual(htmlNode,'what',false,'james'));
        assert(Ele.getData(htmlNode,'OK') == 'james');
        assert(Ele.triggerHandler(htmlNode,'what','no') === true);
        assert(Ele.triggerHandler(htmlNode,'what','yes') === true);
        assert(Ele.getData(htmlNode,'OK') === 'yes');
        Ele.setHandler(htmlNode,'what',function() { return false; });
        assert(Ele.triggerHandler(htmlNode,'what') === false);
        Ele.removeHandler(htmlNode,'what');
        assert(Ele.getHandler(htmlNode,'what') === undefined);
        assert(Ele.is(Ele.scopedQuery(htmlNode,"body")));
        assert(Ele.scopedQuery(htmlNode,"james") == null);
        assert(Arr.isNotEmpty(Ele.scopedQueryAll(htmlNode,"body")));
        assert(Arr.isEmpty(Ele.scopedQueryAll(htmlNode,"james")));
        assert(Ele.closest(bodyNode,'html') === htmlNode);
        assert(Arr.isEqual(Ele.filter([htmlNode,bodyNode],"body"),[bodyNode]));
        assert(Ele.parent(bodyNode) === htmlNode);
        assert(Ele.parent(htmlNode) === document);
        assert(Arr.isEqual(Ele.children(htmlNode,'body'),[bodyNode]));
        assert(Arr.isEmpty(Ele.children(htmlNode,'div')));
        assert(Ele.next(submitNode,'div') === divNode);
        assert(Ele.prev(divNode) === submitNode);
        assert(Ele.prev(divNode,'span') === null);
        assert(Arr.length(Ele.nexts(submitNode)) === 1);
        assert(Arr.isEmpty(Ele.nexts(divNode)));
        assert(Arr.length(Ele.prevs(divNode)) === 4);
        assert(Arr.length(Ele.prevs(divNode,"input[type='submit']")) === 3);
        assert(Arr.length(Ele.prevs(divNode,"input[type='text']")) === 1);
        assert(Arr.length(Ele.prevs(divNode,'input',"input[type='text']")) === 3);
        Ele.replaceHtml(divNode,'text ok bla <span>what</span>');
        assert(Arr.length(Ele.children(divNode)) === 1);
        assert(Arr.length(Doc.children(document)) === 1); // ie va avoir besoin d'un polyfill
        assert(Arr.length(Ele.parents(divNode)) === 4);
        assert(Arr.length(Ele.parents(divNode,'body')) === 1);
        assert(Arr.length(Ele.parents(divNode,'body','html')) === 1);
        assert(Arr.isEmpty(Ele.parents(divNode,'html','body')));
        assert(Arr.isEmpty(Ele.parents(divNode,'html','html')));
        assert(Ele.is(Doc.scopedQuery(template.content,'input')));
        assert(Arr.length(formTemplate) === 1);
        assert(Pojo.length(Ele.css(borderBox,'position')) === 1);
        assert(Pojo.length(Ele.css(borderBox)) > 250);
        assert(Ele.getCss(borderBox,'height') === '25px');
        assert(Ele.getCss(borderBox,'height','int') === 25);
        assert(Ele.getCss(borderBox,'height','bool') === null);
        assert(Ele.getCss(borderBox,'margin-top') === '10px');
        assert(!Ele.hasAttr(divNode,'what'));
        Ele.setAttr(divNode,'what','ok');
        assert(Ele.hasAttr(divNode,'what'));
        assert(Ele.getAttr(divNode,'what') === 'ok');
        Ele.removeAttr(divNode,'what');
        assert(!Ele.hasAttr(divNode,'what'));
        assert(!Ele.hasAttr(divNode,'toggle'));
        Ele.toggleAttr(divNode,'toggle');
        assert(Ele.hasAttr(divNode,'toggle'));
        assert(Ele.getAttr(divNode,'toggle') === '1');
        assert(Ele.getAttr(divNode,'toggle','int') === 1);
        Ele.toggleAttr(divNode,'toggle');
        assert(Ele.getAttr(divNode,'toggle','int') === 0);
        Ele.toggleAttr(divNode,'toggle',false);
        assert(Ele.getAttr(divNode,'toggle','int') === 0);
        assert(Ele.getAttr(hiddenNode,'myattr') === "L'article");
        Ele.toggleAttr(divNode,'toggle',true);
        assert(Ele.getAttr(divNode,'toggle','int') === 1);
        Ele.setHtml(divNode,'what <span>ok</span>');
        assert(Ele.getHtml(divNode) === 'what <span>ok</span>');
        Ele.setText(divNode,'what <span>ok</span>');
        assert(Ele.getHtml(divNode) === 'what <span>ok</span>');
        assert(Ele.setValue(inputNode,[1,2,3]) === undefined);
        assert(inputNode.value === Ele.getValue(inputNode));
        assert(Ele.getValue(inputNode) === '[1,2,3]');
        assert(Ele.toggleClass(divNode,'test',true) === undefined);
        assert(Ele.hasClass(divNode,'test'));
        Ele.toggleClass(divNode,'test',false);
        assert(!Ele.hasClass(divNode,'test'));
        Ele.toggleClass(divNode,'test');
        assert(Ele.hasClass(divNode,'test'));
        Ele.toggleClass(divNode,'test');
        assert(!Ele.hasClass(divNode,'test'));
        assert(Ele.getHtml(template) !== newHtml);
        assert(Str.length(Ele.getHtml(template)) === 726); // ie11 ajoute border-image: none pour une raison
        assert(Ele.getCss(divNode,'margin-top') === '0px');
        Ele.setCss(divNode,'margin-top','10px');
        assert(Ele.getCss(divNode,'margin-top') === '10px');
        assert(Ele.getCss(divNode,'margin-top','int') === 10);
        assert(Ele.getCss(borderBox,'height') === '25px');
        Ele.setDimension(borderBox,20,40);
        assert(!Ele.isScrollable(htmlNode));
        assert(Ele.getDimension(borderBox).height === 40);
        assert(Ele.getCss(borderBox,'height') === '40px');
        assert(Ele.setScroll(htmlNode,0,0) === undefined);
        Ele.setHtml(divNode,'OK');
        assert(Ele.getHtml(divNode) === 'OK');
        Ele.append(divNode,'<div>test</div>');
        assert(Ele.getHtml(divNode) === 'OK<div>test</div>');
        assert(Ele.getUri(formNode) === '/ok');
        assert(Pojo.length(Ele.propObj(formInput,'name','value')) === 4);
        assert(Ele.propStr(formInput,'name') === 'test-suite-test-submit3-test-submit2-test-submit');
        assert(Ele.propStr(formInput,'name','|') === 'test-suite|test-submit3|test-submit2|test-submit');
        assert(Ele.serialize(formInput) === 'test-suite=%5B1%2C2%2C3%5D&test-submit3=&test-submit2=&test-submit=');
        assert(Ele.getDimension(hiddenNode).width === 0);
        assert(Ele.getDimension(hiddenNode,true).width > 0);
        assert(Pojo.isEqual(Ele.getDimension(hiddenNode,'block'),Ele.getDimension(hiddenNode,true)));
        assert(Ele.getDimension(hiddenNode,'inline').width < Ele.getDimension(hiddenNode,true).width);
        assert(Ele.getDimension(hiddenNode).width === 0);
        assert(Ele.oddEven([hiddenNode],function(value) {
            assert(value === hiddenNode);
        }));
        
        // evt
        assert(Evt.nameFromType('ok') === 'event');
        assert(Evt.nameFromType('ok:what') === 'customEvent');
        assert(Evt.createFromType('ok') instanceof Event);
        assert(Evt.createFromType('ok:what') instanceof CustomEvent);

        // handler
        
        // historyState
        assert(HistoryState.is({ url: 'test', timestamp: 1234 }));
        assert(HistoryState.isChangeValid({ url: 'test', timestamp: 1234 },HistoryState.make('what','bleh')));
        assert(Obj.length(HistoryState.make('what','bleh')) === 3);
        assert(Str.isEnd("/#what",HistoryState.make('#what','bleh').url));
        assert(HistoryState.make('http://google.com/ok#','bleh').url === 'http://google.com/ok#');
        assert(HistoryState.make('http://google.com/ok#','bleh',true).url === 'http://google.com/ok');
        assert(Str.isEnd('/#',HistoryState.make("#").url));
        assert(!Str.isEnd('/#',HistoryState.make("#",null,true).url));
        
        // listener
        
        // nod
        assert(Nod.is(document));
        assert(!Nod.is(window));
        assert(Nod.is(textNode));
        assert(Nod.are([document,htmlNode]));
        assert(!Nod.are([document,window]));
        assert(Nod.getText(textNode) === 'test ');
        
        // request
        assert(Str.isNotEmpty(Request.relative()));
        assert(Str.isNotEmpty(Request.relative(true)));
        assert(Request.absolute() !== Request.relative());
        assert(Str.isNotEmpty(Request.scheme()));
        assert(Request.scheme() !== Request.scheme(true));
        assert(Str.is(Request.fragment()) || Request.fragment() === null);
        assert(Obj.is(Request.parse()));
        assert(Str.isNotEmpty(Request.parse().hostname));
        assert(Str.isNotEmpty(Request.schemeHost()));
        
        // selector
        
        // target
        assert(Target.is(document));
        assert(Target.is(fragment));
        assert(Target.is(window));
        assert(Target.is(divNode));
        assert(Target.are([window,document]));
        assert(Target.is(textNode));
        assert(Target.typecheck(fragment) === fragment);
        const arrFragment = [fragment];
        assert(Target.typechecks(arrFragment) === arrFragment);
        assert(Arr.length(Target.toArray(selectorAll)) === 1);
        assert(Target.toArray(arrFragment) === arrFragment);
        assert(Arr.length(Target.toArray(htmlNode)) === 1);
        assert(Integer.is(Target.getProp(window,'outerHeight')));
        
        // uri
        assert(Uri.isInternal("http://google.com/test","http://google.com/test2"));
        assert(Uri.isInternal("/test","/test2"));
        assert(!Uri.isInternal("http://google.com/test","/test2"));
        assert(Uri.isExternal("http://googlez.com/test","http://google.com/test2"));
        assert(!Uri.isExternal("/test","/test2"));
        assert(!Uri.hasExtension("http://googlez.com/test"));
        assert(Uri.hasExtension("http://googlez.com/test.jpg"));
        assert(!Uri.hasFragment("http://googlez.com/test.jpg"));
        assert(Uri.hasFragment("http://googlez.com/test.jpg#james"));
        assert(Uri.hasFragment("/test.jpg#james"));
        assert(!Uri.isOnlyHash('what'));
        assert(Uri.isOnlyHash('#what'));
        assert(!Uri.isOnlyHash('#'));
        assert(Uri.isSamePathQuery("/test.jpg?v=2","http://google.com/test.jpg?v=2#ok"));
        assert(!Uri.isSamePathQuery("/test.jpg?v=2","http://google.com/test.jpg?v=3#ok"));
        assert(Uri.isSamePathQueryHash("/test.jpg?v=2#ok","http://google.com/test.jpg?v=2#ok"));
        assert(!Uri.isSamePathQueryHash("/test.jpg?v=2#ok","http://google.com/test.jpg?v=3#ok1"));
        assert(Uri.isHashChange("/test.jpg?v=2#ok","/test.jpg?v=2#ok2"));
        assert(!Uri.isHashChange("/test.jpg?v=2#ok","/testz.jpg?v=2#ok2"));
        assert(!Uri.isHashChange("/test.jpg?v=2#ok","/test.jpg?v=2#ok"));
        assert(!Uri.isHashChange("/test.jpg?v=2","/test.jpg?v=2"));
        assert(Uri.isSameWithHash("http://goog.com/test.jpg?v=2#ok","http://goog.com/test.jpg?v=2#ok"));
        assert(!Uri.isSameWithHash("/test.jpg?v=2","/test.jpg?v=2"));
        assert(Uri.relative("http://google.com/ok?v=2#what") === '/ok?v=2');
        assert(Uri.relative("http://google.com/ok?v=2#what",true) === '/ok?v=2#what');
        assert(Str.isEnd("#james",Uri.absolute("#james",true)));
        assert(Str.isEnd("/testok.php",Uri.absolute("testok.php")));
        assert(!Str.isEnd("#james",Uri.absolute("testok.php#james")));
        assert(Str.isEnd("#james",Uri.absolute("testok.php#james",true)));
        assert(Uri.absolute("http://google.com/testok.php") === "http://google.com/testok.php");
        assert(Uri.path("http://google.com/testok.php?ok=2#meh") === '/testok.php');
        assert(Uri.query("http://google.com/testok.php?ok=2#meh") === 'ok=2');
        assert(Uri.query("http://google.com/testok.php") === '');
        assert(Uri.fragment("http://google.com/testok.php?ok=2#meh") === 'meh');
        assert(Uri.fragment("http://google.com/testok.php") === '');
        assert(Uri.extension("http://google.com/ok.jpg?v=2#what") === 'jpg');
        assert(Uri.basename("http://ok.com/james.jpg") === 'james.jpg');
        assert(Uri.basename("james.jpg") === 'james.jpg');
        assert(Uri.basename("/james.jpg") === 'james.jpg');
        assert(Uri.filename("http://ok.com/james.jpg") === 'james');
        assert(Uri.filename("/james.jpg") === 'james');
        assert(Uri.build(Uri.parse("/test.ok?t=2#hash"),false,true) === '/test.ok?t=2#hash');
        assert(Uri.build(Uri.parse("hash"),false,true) === '/hash');
        assert(Uri.build(Uri.parse("https://google.com/ok?v=2#what"),true,true) === "https://google.com/ok?v=2#what");
        assert(Uri.build(Uri.parse("https://google.com/ok?v=2#what"),true,false) === "https://google.com/ok?v=2");
        assert(Uri.build(Uri.parse("https://google.com/ok?v=2#what"),false,false) === "/ok?v=2");
        assert(Uri.build(Uri.parse("https://google.com/ok?v=2#what"),false,true) === "/ok?v=2#what");
        assert(Uri.build({pathname: "/testd", search: { james: "OKé", test: 3}}) === '/testd?james=OK%C3%A9&test=3');
        assert(Uri.build({pathname: "/testd", search: "james=OKé&test=3"}) === '/testd?james=OK%C3%A9&test=3');
        assert(Uri.build({pathname: "/testd", search: Uri.makeQuery({ james: "OKé", test: 3})}) === '/testd?james=OK%C3%A9&test=3');
        assert(Uri.build({pathname: "/meh", hash: "OK"},true,true) !== '/meh#OK');
        assert(Uri.build({pathname: "/meh", hash: "OK"},false,true) === '/meh#OK');
        const query = Uri.makeQuery('?q=URLUtils.searchéParams&topic=api');
        const query2 = Uri.makeQuery({q: 'oké', what: 2});
        const query3 = Uri.makeQuery({q: "la vi+e est bèlle"});
        assert(query instanceof URLSearchParams);
        assert(query.toString() === 'q=URLUtils.search%C3%A9Params&topic=api');
        assert(query2.toString() === 'q=ok%C3%A9&what=2');
        assert(query3.toString() === 'q=la+vi%2Be+est+b%C3%A8lle');
        assert(Uri.makeHash(undefined,true) === '#');
        assert(Uri.makeHash(undefined,false) === '');
        assert(Uri.makeHash("james",true) === '#james');
        assert(Uri.makeHash("#james",true) === '#james');
        assert(Uri.makeHash("james") === 'james');
        assert(Uri.makeHash("#james") === 'james');
        assert(Uri.getMailto('mailto:test@test.com') === 'test@test.com');
        assert(Uri.getMailto('test@test.com') === 'test@test.com');
        assert(Uri.getMailto('mailto:testtest.com') === null);
        
        // win
        assert(Win.hasHistoryApi());
        assert(Win.is(window));
        assert(!Win.is(document));
        assert(Win.isCurrent(window));
        assert(!Win.isProxy(window));
        assert(Bool.is(Win.isScrollable()));
        assert(Bool.is(Win.isScrollable('x')));
        assert(Pojo.length(Win.getScroll()) === 8);
        assert(Win.getDimension().width > 0);
        assert(Win.getDimension().height > 0);
        assert(Win.are([window,window]));
        
        // xhr
        const formData = new FormData(formNode);
        assert(Xhr.isStatusSuccess(200));
        assert(!Xhr.isStatusSuccess(404));
        assert(!ArrLike.is(formData));
        assert(Pojo.length(Xhr.configFromNode(htmlNode)) === 4);
        assert(Pojo.length(Xhr.configFromNode(htmlNode,null,true)) === 9);
        assert(Xhr.pojoToFormData({ test: "ok", hjames: 3}) instanceof FormData);
        assert(Xhr.parseError('<html><body><div>TEST</div></body></html>','error') === '<div>TEST</div>');
        assert(Xhr.parseError('<html><body><div class="ajax-parse-error"><div>TEST</div></div></body></html>','error') === '<div class="ajax-parse-error"><div>TEST</div></div>');
        assert(Xhr.parseError('') === '');
        assert(Pojo.length(Xhr.configFromString("/test/ok")) === 1);
        
        // cleanup
        Ele.remove([formNode,contentBox,contentBox,borderBox]);
    } 
    
    catch (e) 
    {
        r = false;
        logError(e);
    } 
    
    return r;
}