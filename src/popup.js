// runs in the client, has access to the dom but not JS
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';

// content.js
console.log('>>> Running Popup Scrfdsaf')

chrome.runtime.sendMessage({
    greeting: "register",
    tabType: "extension"
}, function(response) {
    console.log('registered');
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('P/ I received a message...')
    console.log(request)
    if (request.greeting === 'data') {
        ReactDOM.render( < Header name = { 'Found '+request.data.length+' objects' }  /> ,
            document.getElementById('root')
        );
    }
});

var el = document.createElement('div');
el.id = 'root';
document.body.insertBefore(el, document.body.childNodes[0]);
ReactDOM.render( < Header name = 'Whoever you Are' /> ,
    document.getElementById('root')
);