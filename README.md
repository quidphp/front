# QuidPHP/Front
[![Release](https://img.shields.io/github/v/release/quidphp/front)](https://packagist.org/packages/quidphp/front)
[![License](https://img.shields.io/github/license/quidphp/front)](https://github.com/quidphp/front/blob/master/LICENSE)
[![Code Size](https://img.shields.io/github/languages/code-size/quidphp/front)](https://github.com/quidphp/front)

## About
**QuidPHP/Front** contains JavaScript and CSS assets for basic components. It is part of the [QuidPHP](https://github.com/quidphp/project) package.

## License
**QuidPHP/Front** is available as an open-source software under the [MIT license](LICENSE).

## Documentation
**QuidPHP/Front** documentation is available at [QuidPHP/Docs](https://github.com/quidphp/docs).

## Installation
**QuidPHP/Front** can be easily installed with [Composer](https://getcomposer.org). It is available on [Packagist](https://packagist.org/packages/quidphp/front).
``` bash
$ composer require quidphp/front
```
Once installed, the package will be available within your *vendor* folder.

## Requirement
**QuidPHP/Front** requires any modern browser (not Internet Explorer).

## Comment
**QuidPHP/Front** code is commented and all methods are explained (in French).

## Convention
**QuidPHP/Front** is built on the following conventions:
- *ES5*: All JavaScript code is compatible with ES5, there is no need for any transpiler.
- *Strict*: All generated JavaScript files declare *use strict* on the first line.
- *SCSS*: Nesting, variables and mixins are used within the SCSS stylesheets.
- *Compiling*: The concatenation of the JS and SCSS files is done on the PHP side.

## Overview
**QuidPHP/Front** contains 67 JavaScript files. Here is an overview:
- [absolutePlaceholder](src/absolutePlaceholder.js) - Script of behaviours for an absolute placeholder component
- [ajax](src/ajax.js) - Script to activate ajax with an event on the nodes
- [ajaxBlock](src/ajaxBlock.js) - Merges the logic for ajax, block and loading within a component
- [ajaxTimeout](src/ajaxTimeout.js) - Merges the logic for ajax, block, loading and timeout within a component
- [alert](src/alert.js) - Component to launch an alert notification when an event is triggered
- [anchorCorner](src/anchorCorner.js) - Script of behaviours for an absolute anchorCorner component
- [backToTop](src/backToTop.js) - Script for a component which brings back to the top of the page
- [background](src/background.js) - Component for a background that can fadein or out
- [base](src/base.js) - Base component which allow to activate or deactivate components
- [blockEvent](src/blockEvent.js) - Script of behaviours for a component which blocks event propagation
- [burger](src/burger.js) - Script for a burger menu component
- [calendar](src/calendar.js) - Script for the calendar component
- [carousel](src/carousel.js) - Script for a carousel component based on the clickOpen logic
- [clickOpen](src/clickOpen.js) - Grants base methods and events for a clickOpen component
- [clickOpenAjax](src/clickOpenAjax.js) - Manages a clickOpen component which triggers an ajax request when open
- [clickOpenAjaxAnchor](src/clickOpenAjaxAnchor.js) - ClickOpen component which is triggered by an anchor click and dispatches an ajax call
- [clickOpenInputAjax](src/clickOpenInputAjax.js) - Component for a one field form which triggers an ajax request that displays in a clickOpen
- [clickOpenTrigger](src/clickOpenTrigger.js) - Manages a clickOpen component which has a trigger
- [clickOpenTriggerBase](src/clickOpenTriggerBase.js) - Grants base functions for a clickOpen component which has a trigger to open/close
- [clickOutside](src/clickOutside.js) - Component to manage click outside a node
- [clickPrint](src/clickPrint.js) - Component that triggers a window print on click
- [confirm](src/confirm.js) - Component to request a confirmation once an event has triggered
- [externalBlank](src/externalBlank.js) - Component to make all child anchors who are external as target _blank
- [fakeSelect](src/fakeSelect.js) - Script with some logic for a select replacement component, uses clickOpen
- [feed](src/feed.js) - Script of behaviours for a feed component with a load-more button
- [feedFilter](src/feedFilter.js) - Script of behaviours for a filter which updates a feed, can include a reset button
- [feedSearch](src/feedSearch.js) - Component for a feed with search and order tools
- [filter](src/filter.js) - Component for a clickOpen filter component which has a page feed, search and order tools
- [focusable](src/focusable.js) - Component to allow focus navigaton on a set of nodes
- [form](src/form.js) - Script with behaviours for a form component
- [hashChange](src/hashChange.js) - Script that sends the hash change event back to the nodes
- [hrefReplaceChar](src/hrefReplaceChar.js) - Component to generate a dynamic href with some value replacement
- [indexNode](src/indexNode.js) - Component to find a node within a set according to an index
- [initOpenClose](src/initOpenClose.js) - Base component used for opening, closing and initializing a container
- [input](src/input.js) - Script with behaviours for an input component
- [inputCalendar](src/inputCalendar.js) - Script with behaviours for a calendar component and a date input
- [inputGroup](src/inputGroup.js) - Script with behaviours for an input group component (like checkbox and radio)
- [inputMemory](src/inputMemory.js) - Script with behaviours for an input which has a value in memory
- [inputNumeric](src/inputNumeric.js) - Script with logic for an input containing a number
- [inputNumericHref](src/inputNumericHref.js) - Script with logic for an input containing a number which triggers a page change
- [inputNumericRange](src/inputNumericRange.js) - Script for a numeric input, linked to a range (with plus and minus buttons)
- [inputSearch](src/inputSearch.js) - Script containing logic for a search input with a button
- [inputSearchHref](src/inputSearchHref.js) - Script containing logic for a search input which triggers a page change
- [keyboard](src/keyboard.js) - Component to catch and/or prevent an event related to a key press on the keyboard
- [keyboardArrow](src/keyboardArrow.js) - Component to catch or prevent the arrow keys on the keyboard
- [keyboardEnter](src/keyboardEnter.js) - Component to catch or prevent the enter key on the keyboard
- [keyboardEscape](src/keyboardEscape.js) - Component to catch or prevent the escape key on the keyboard
- [modal](src/modal.js) - Script for a modal component
- [modalMailto](src/modalMailto.js) - Script for mailto links opening in a modal for confirmation
- [nav](src/nav.js) - Component for a document node, binds other components
- [navHash](src/navHash.js) - Adds hashchange support to the nav index component
- [navIndex](src/navIndex.js) - Base component that manages index navigation for many targets
- [plural](src/plural.js) - Component to manage singular or plural text for a node
- [resizeChange](src/resizeChange.js) - Component to notify nodes when window size has changed or stopped
- [scrollChange](src/scrollChange.js) - Component to notify nodes when window scroll has changed or stopped
- [scrollDrag](src/scrollDrag.js) - Component to allow scrolling while dragging with the mouse
- [scroller](src/scroller.js) - Component to manage scrolling within a container, allows animating
- [searchAutoInfo](src/searchAutoInfo.js) - Script with logic for an auto-complete search component with another fallback popup
- [searchSlide](src/searchSlide.js) - Component with a search input, and an info box that slides on focus
- [selectConvert](src/selectConvert.js) - Script to convert a select menu to a fakeSelect component
- [tabs](src/tabs.js) - Script with behaviours for a tabs component
- [tabsNav](src/tabsNav.js) - Script with behaviours for a tab component with support for navigation
- [timeout](src/timeout.js) - Behaviours for a timeout component, triggers an event once a timeout has completed
- [tooltip](src/tooltip.js) - Component to manage tooltip content
- [validate](src/validate.js) - Component with functions related to validation (pattern and required)
- [validatePrevent](src/validatePrevent.js) - Component that blocks an event if the validation is not successfull
- [window](src/window.js) - Behaviours to detect touch devices or responsive resolution on the window node

### Styling
**QuidPHP/Front** contains 12 SCSS stylesheets. Here is an overview:
- [absolutePlaceholder](css/absolutePlaceholder.scss) - Stylesheet for the absolutePlaceholder component
- [anchorCorner](css/anchorCorner.scss) - Stylesheet for the anchorCorner component
- [background](css/background.scss) - Stylesheet for the background component
- [calendar](css/calendar.scss) - Stylesheet for the calendar component
- [clickOpen](css/clickOpen.scss) - Stylesheet for the base styles of the clickOpen component
- [fakeSelect](css/fakeSelect.scss) - Stylesheet for the base styles of the fakeSelect component
- [form](css/form.scss) - Stylsheet with base styles for form components
- [inputCalendar](css/inputCalendar.scss) - Stylesheet for the input calendar component
- [inputNumericRange](css/inputNumericRange.scss) - Base styles for the inputNumericRange component
- [modal](css/modal.scss) - Stylesheet for the modal component
- [scrollDrag](css/scrollDrag.scss) - Stylesheet for the scrollDrag component
- [tooltip](css/tooltip.scss) - Base styles for the tooltip component

### Testing
**QuidPHP/Front** contains 1 test script:
- [front](test/front.js) - Script to test the front files

**QuidPHP/Front** testsuite can be run by creating a new [QuidPHP/Assert](https://github.com/quidphp/assert) project.