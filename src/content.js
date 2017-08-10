// runs in the client, has access to the dom but not JS
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';

// alert(`Hello from your Chrome Extension on page: ${document.title}`)

// content.js
console.log('running content script HELLO WORLD')
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(`message received: ${request.message}`)
    }
);
var el = document.createElement('div');
el.id = 'root';

document.body.insertBefore(el, document.body.childNodes[0]);

ReactDOM.render(
  <Header name='Conner'/>,
  document.getElementById('root')
);