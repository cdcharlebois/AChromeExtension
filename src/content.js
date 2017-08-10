// runs in the client, has access to the dom but not JS
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';

// content.js
console.log('running content script HELLO WORLD')

const FUNCS = {
    getWindowData: function () {
        return window.conner;
    }
}

chrome.runtime.sendMessage({
    greeting: "register",
    tabType: "content"
}, function (response) {
    console.log('registered');
});
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "this is a query") {
            var name = FUNCS.getWindowData();
            sendResponse({ greeting: "result", data: name });
        }
    });
// var el = document.createElement('div');
// el.id = 'root';

// document.body.insertBefore(el, document.body.childNodes[0]);


// ReactDOM.render(
//   <Header name='Conner'/>,
//   document.getElementById('root')
// );

