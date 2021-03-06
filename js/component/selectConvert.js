/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/front/blob/master/LICENSE
 */
 
// selectConvert
// script to convert a select menu to a fakeSelect component
Component.SelectConvert = function()
{
    // not empty
    if(Vari.isEmpty(this)) 
    return null;
    
    
    // handler
    setHdlr(this,'selectConvert:isBindable',function() {
        let r = false;
        
        if(trigHdlr(this,'input:getTag') === 'select')
        {
            if(trigHdlr(this,'input:allowMultiple') === false && trigHdlr(this,'input:isControlled') === false)
            r = true;
        }
        
        return r;
    });
    
    
    // setup
    aelOnce(this,'component:setup',function() {
        if(trigHdlr(this,'selectConvert:isBindable'))
        createFakeSelect.call(this);
    });
    
    
    // createFakeSelect
    const createFakeSelect = function()
    {
        const html = htmlFromSelect.call(this);
        let node = Ele.insertAfter(this,html);
        node = Arr.valueFirst(node);
        trigSetup(Component.FakeSelect.call(node));
        toggleAttr(this,'data-controlled',true);
    }
    
    
    // htmlFromSelect
    const htmlFromSelect = function() 
    {
        let r = '';
        const name = getProp(this,'name');
        const required = getAttr(this,'data-required');
        const disabled = getProp(this,'disabled');
        const selected = qs(this,"option:checked");
        const selectedText = (selected != null)? Ele.getText(selected):null;
        const title = (Str.isNotEmpty(selectedText))? selectedText:"&nbsp;";
        const options = qsa(this,'option');
        const value = trigHdlr(this,'input:getValue');
        
        const currentAttr = Ele.attr(this,'data-');
        const dataAttr = { fakeInput: 1, anchorCorner: 1, absolutePlaceholder: 1};
        if(disabled)
        dataAttr.disabled = 1;
        const attr = Pojo.replace(currentAttr,{class: 'fakeselect', data: dataAttr });
        
        r += Html.start('div',null,attr);
        r += Html.start('button',null,{type: 'button',class: 'trigger'});
        r += Html.span(title,{dataTitle: title, class: "title"});
        r += Html.span(null,{class: "ico"});
        r += Html.end('button');
        r += Html.start('div',null,{class: 'options', tabindex: 0});
        r += Html.start('ul');
        
        r = Arr.accumulate(r,options,function(ele) {
            let html = '';
            const val = Str.cast(getProp(ele,'value'));
            const text = Ele.getText(ele) || "&nbsp;";
            
            const currentAttr = Ele.attr(ele,'data-');
            const dataAttr = {};
            if(val != null)
            {
                dataAttr.value = val;
                
                if(val === value)
                dataAttr.selected = 1;
            }
            const attr = Pojo.replace(currentAttr,{data: dataAttr});
            
            html += Html.start('li');
            html += Html.button(text,attr);
            html += Html.end('li');
            
            return html;
        });
        
        r += Html.end('ul');
        r += Html.end('div');
        r += Html.end('div');
        
        return r;
    }

    return this;
}