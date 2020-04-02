# QuidPHP/Front
[![Release](https://img.shields.io/github/v/release/quidphp/front)](https://packagist.org/packages/quidphp/front)
[![License](https://img.shields.io/github/license/quidphp/front)](https://github.com/quidphp/front/blob/master/LICENSE)
[![PHP Version](https://img.shields.io/packagist/php-v/quidphp/front)](https://www.php.net)
[![Style CI](https://styleci.io/repos/246818925/shield)](https://styleci.io)
[![Code Size](https://img.shields.io/github/languages/code-size/quidphp/front)](https://github.com/quidphp/front)

## About
**QuidPHP/Front** contains the JavaScript and CSS front end assets. It is part of the [QuidPHP](https://github.com/quidphp/project) package.

## License
**QuidPHP/Front** is available as an open-source software under the [MIT license](LICENSE).

## Documentation
**QuidPHP/Front** documentation is being written. Once ready, it will be available at https://quidphp.github.io/project.

## Installation
**QuidPHP/Front** can be easily installed with [Composer](https://getcomposer.org). It is available on [Packagist](https://packagist.org/packages/quidphp/front).
``` bash
$ composer require quidphp/front
```

## Included
**QuidPHP/Front** comes bundled with the following front-end polyfills:
- [jonathantneal/element-qsa-scope](https://github.com/jonathantneal/element-qsa-scope) - Qsa Scope - Return elements matching a selector relative to the current node
- [Financial-Times/polyfill-service](https://github.com/Financial-Times/polyfill-service) - Polyfill.io - Automatic polyfill service

## Comment
**QuidPHP/Front** code is commented and all methods are explained. However, most of the comments are currently written in French.

## JS

### Convention
- *ES5*: All code is compatible with ES5, there is no need for any JavaScript transpiler.
- *Strict*: All generated files declare *use strict* on the first line.
- *IE11*: The minimum compatible browser is IE11. Older browsers will fail non-gracefully.
- *Compiling*: The compiling and concatenation of the JS files is done on the PHP side.

### Overview
**QuidPHP/Front** contains 98 JavaScript files. Here is an overview:
- [component](js/component)
    - [absolutePlaceholder.js](js/component/absolutePlaceholder.js) - Script of behaviours for an absolute placeholder component
    - [ajax.js](js/component/ajax.js) - Script to activate ajax with an event on the nodes
    - [ajaxBlock.js](js/component/ajaxBlock.js) - Merges the logic for ajax, block and loading within a component
    - [alert.js](js/component/alert.js) - Component to launch an alert notification when an event is triggered
    - [anchorCorner.js](js/component/anchorCorner.js) - Script of behaviours for an absolute anchorCorner component
    - [backToTop.js](js/component/backToTop.js) - Script for a component which brings back to the top of the page
    - [background.js](js/component/background.js) - Component for a background that can fadein or out
    - [base.js](js/component/base.js) - Base component which allow to activate or deactivate components
    - [blockEvent.js](js/component/blockEvent.js) - Script of behaviours for a component which blocks event propagation
    - [burger.js](js/component/burger.js) - Script for a burger menu component
    - [calendar.js](js/component/calendar.js) - Script for the calendar component
    - [carousel.js](js/component/carousel.js) - Script for a carousel component based on the clickOpen logic
    - [clickOpen.js](js/component/clickOpen.js) - Grants base methods and events for a clickOpen component
    - [clickOpenAjax.js](js/component/clickOpenAjax.js) - Manages a clickOpen component which triggers an ajax request when open
    - [clickOpenAjaxAnchor.js](js/component/clickOpenAjaxAnchor.js) - ClickOpen component which is triggered by an anchor click and dispatches an ajax call
    - [clickOpenInputAjax.js](js/component/clickOpenInputAjax.js) - Component for a one field form which triggers an ajax request that displays in a clickOpen
    - [clickOpenTrigger.js](js/component/clickOpenTrigger.js) - Manages a clickOpen component which has a trigger
    - [clickOpenTriggerBase.js](js/component/clickOpenTriggerBase.js) - Grants base functions for a clickOpen component which has a trigger to open/close
    - [clickOutside.js](js/component/clickOutside.js) - Component to manage click outside a node
    - [confirm.js](js/component/confirm.js) - Component to request a confirmation once an event has triggered
    - [doc.js](js/component/doc.js) - Root component for a document node
    - [fakeSelect.js](js/component/fakeSelect.js) - Script with some logic for a select replacement component, uses clickOpen
    - [feed.js](js/component/feed.js) - Script of behaviours for a feed component with a load-more button
    - [feedSearch.js](js/component/feedSearch.js) - Component for a feed with search and order tools
    - [filter.js](js/component/filter.js) - Component for a clickOpen filter component which has a page feed, search and order tools
    - [focusable.js](js/component/focusable.js) - Component to allow focus navigaton on a set of nodes
    - [form.js](js/component/form.js) - Script with behaviours for a form component
    - [hashChange.js](js/component/hashChange.js) - Script that sends the hash change event back to the nodes
    - [history.js](js/component/history.js) - Component managing site navigation with the HistoryAPI
    - [hrefReplaceChar.js](js/component/hrefReplaceChar.js) - Component to generate a dynamic href with some value replacement
    - [initOpenClose.js](js/component/initOpenClose.js) - Base component used for opening, closing and initializing a container
    - [input.js](js/component/input.js) - Script with behaviours for an input component
    - [inputCalendar.js](js/component/inputCalendar.js) - Script with behaviours for a calendar component and a date input
    - [inputGroup.js](js/component/inputGroup.js) - Script with behaviours for an input group component (like checkbox and radio)
    - [inputMemory.js](js/component/inputMemory.js) - Script with behaviours for an input which has a value in memory
    - [inputNumeric.js](js/component/inputNumeric.js) - Script with logic for an input containing a number
    - [inputNumericHref.js](js/component/inputNumericHref.js) - Script with logic for an input containing a number which triggers a page change
    - [inputNumericRange.js](js/component/inputNumericRange.js) - Script for a numeric input, linked to a range (with plus and minus buttons)
    - [inputSearch.js](js/component/inputSearch.js) - Script containing logic for a search input with a button
    - [inputSearchHref.js](js/component/inputSearchHref.js) - Script containing logic for a search input which triggers a page change
    - [keyboard.js](js/component/keyboard.js) - Component to catch and/or prevent an event related to a key press on the keyboard
    - [keyboardArrow.js](js/component/keyboardArrow.js) - Component to catch or prevent the arrow keys on the keyboard
    - [keyboardEnter.js](js/component/keyboardEnter.js) - Component to catch or prevent the enter key on the keyboard
    - [keyboardEscape.js](js/component/keyboardEscape.js) - Component to catch or prevent the escape key on the keyboard
    - [modal.js](js/component/modal.js) - Script for a modal component
    - [modalMailto.js](js/component/modalMailto.js) - Script for mailto links opening in a modal for confirmation
    - [navHash.js](js/component/navHash.js) - Adds hashchange support to the nav index component
    - [navIndex.js](js/component/navIndex.js) - Base component that manages index navigation for many targets
    - [resizeChange.js](js/component/resizeChange.js) - Component to notify nodes when window size has changed or stopped
    - [scrollChange.js](js/component/scrollChange.js) - Component to notify nodes when window scroll has changed or stopped
    - [scrollDrag.js](js/component/scrollDrag.js) - Component to allow scrolling while dragging with the mouse
    - [scroller.js](js/component/scroller.js) - Component to manage scrolling within a container, allows animating
    - [searchAutoInfo.js](js/component/searchAutoInfo.js) - Script with logic for an auto-complete search component with another info popup when value is empty
    - [searchSlide.js](js/component/searchSlide.js) - Component with a search input, and an info box that slides on focus
    - [tabs.js](js/component/tabs.js) - Script with behaviours for a tabs component
    - [tabsNav.js](js/component/tabsNav.js) - Script with behaviours for a tab component with support for navigation
    - [timeout.js](js/component/timeout.js) - Behaviours for a timeout component, triggers an event once a timeout has completed
    - [tooltip.js](js/component/tooltip.js) - Component to manage tooltip content
    - [validate.js](js/component/validate.js) - Component with functions related to validation (pattern and required)
    - [validatePrevent.js](js/component/validatePrevent.js) - Component that blocks an event if the validation is not successfull
    - [window.js](js/component/window.js) - Behaviours to detect touch devices or responsive resolution on the window node
    - [windowUnload.js](js/component/windowUnload.js) - Component to manage the unload notification with the window object
- [import](js/import)
    - [default.js](js/import/default.js) - Script that imports default variables within the scope
    - [include.js](js/import/include.js) - Script that imports many variables from include within the scope
- [include](js/include)
    - [_init.js](js/include/_init.js)
    - [arr.js](js/include/arr.js) - Script with some objects related to array manipulation
    - [arrLike.js](js/include/arrLike.js) - Script with some functions related to array like management
    - [bool.js](js/include/bool.js) - Methods for bool primitive type
    - [browser.js](js/include/browser.js) - Script with a some functions related to browsers detection
    - [data.js](js/include/data.js) - Script for storing datas within targets
    - [datetime.js](js/include/datetime.js) - Script with functions related to date and time
    - [debug.js](js/include/debug.js) - Script with functions related to debugging
    - [doc.js](js/include/doc.js) - Object for document and document fragment targets
    - [dom.js](js/include/dom.js) - Script with functions related to html and dom
    - [ele.js](js/include/ele.js) - Script with many functions related to element nodes
    - [evt.js](js/include/evt.js) - Script containing event management functions
    - [func.js](js/include/func.js) - Script with methods related to functions
    - [handler.js](js/include/handler.js) - Script for handler management (functions stored in targets)
    - [historyState.js](js/include/historyState.js) - Script with functions related to the history states
    - [integer.js](js/include/integer.js) - Methods related to integer numbers
    - [json.js](js/include/json.js) - Script with methods related to json format
    - [listener.js](js/include/listener.js) - Script containing event listeners functions for target elements
    - [nav.js](js/include/nav.js) - Script with helper functions related to navigation and pagination
    - [nod.js](js/include/nod.js) - Object for element, text and document nodes
    - [num.js](js/include/num.js) - Script with functions related to numbers
    - [obj.js](js/include/obj.js) - Script with a set of helper functions related to objects
    - [pojo.js](js/include/pojo.js) - Script with a set of helper functions related to plain objects
    - [request.js](js/include/request.js) - Script with functions related to the current request
    - [scalar.js](js/include/scalar.js) - Script with functions related to scalar values
    - [selector.js](js/include/selector.js) - Script with methods related to selecting and matching nodes
    - [str.js](js/include/str.js) - Script with a set of helper functions related to strings
    - [target.js](js/include/target.js) - Script with basic functions related to event targets elements
    - [type.js](js/include/type.js) - Script with common methods for all variable types
    - [uri.js](js/include/uri.js) - Script with a set of helper functions related to uri management
    - [validate.js](js/include/validate.js) - Script with behaviours related to validation
    - [vari.js](js/include/vari.js) - Script with a set of general functions related to variables
    - [win.js](js/include/win.js) - Object for window target
    - [xhr.js](js/include/xhr.js) - Script with some logic for ajax calls and xhr object

### Testing
**QuidPHP/Front** contains 2 test scripts:
- [test](js/test)
    - [component.js](js/test/component.js) - Script to test the component files
    - [include.js](js/test/include.js) - Script to test the include files

**QuidPHP/Front** Javascript testsuite can be run by creating a new [quidphp/project](https://github.com/quidphp/project).
    
## CSS

### Convention
- *SCSS*: Nesting, variables and mixins are used within the stylesheets.
- *Compiling*: The compiling and concatenation of the SCSS files is done on the PHP side.

### Overview
**QuidPHP/Front** contains 14 CSS stylesheets. Here is an overview:
- [component](css/component)
    - [absolutePlaceholder.scss](css/component/absolutePlaceholder.scss) - Stylesheet for the absolutePlaceholder component
    - [anchorCorner.scss](css/component/anchorCorner.scss) - Stylesheet for the anchorCorner component
    - [background.scss](css/component/background.scss) - Stylesheet for the background component
    - [calendar.scss](css/component/calendar.scss) - Stylesheet for the calendar component
    - [clickOpen.scss](css/component/clickOpen.scss) - Stylesheet for the base styles of the clickOpen component
    - [document.scss](css/component/document.scss) - Stylesheet for the document component, includes many style reset
    - [fakeSelect.scss](css/component/fakeSelect.scss) - Stylesheet for the base styles of the fakeSelect component
    - [form.scss](css/component/form.scss) - Stylsheet with base styles for form components
    - [inputCalendar.scss](css/component/inputCalendar.scss) - Stylesheet for the input calendar component
    - [inputNumericRange.scss](css/component/inputNumericRange.scss) - Base styles for the inputNumericRange component
    - [modal.scss](css/component/modal.scss) - Stylesheet for the modal component
    - [scrollDrag.scss](css/component/scrollDrag.scss) - Stylesheet for the scrollDrag component
    - [tooltip.scss](css/component/tooltip.scss) - Base styles for the tooltip component
- [include](css/include)
    - [init.scss](css/include/init.scss) - Stylesheet containing default variables and a set of helpers mixins