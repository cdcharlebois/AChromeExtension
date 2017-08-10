// runs in the client, has access to the dom but not JS
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';

// content.js
console.log('running popup script HELLO WORLD')

chrome.runtime.sendMessage({
    greeting: "register",
    tabType: "extension"
}, function (response) {
    console.log('registered');
});
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "hello") {
            sendResponse({ farewell: "goodbye" });
        }
        else if (request.greeting == "result") {
            ReactDOM.render(<Header name={request.result} />,
                document.getElementById('root')
            );
        }
            
    });





var el = document.createElement('div');
el.id = 'root';
document.body.insertBefore(el, document.body.childNodes[0]);
ReactDOM.render( <Header name = 'Whoever you Are' /> ,
    document.getElementById('root')
);