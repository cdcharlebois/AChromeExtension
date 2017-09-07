// runs in the client, has access to the dom but not JS
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';

// content.js
console.log('>>>> RUNNING CONTENT')

window.addEventListener('getChromeData', function(msg) {
    console.log('C/ received the following message via event...')
    console.log(msg.data)
}, false);
window.addEventListener('message', function(msg) {
    console.log('C/ received a message...')
    console.log(msg)
    var data = JSON.parse(msg.data)
    console.log(data)
        // handle message
    if (data.to === 'content' && data.from === 'inject') {
        console.log('C/ relaying data to background')
        chrome.runtime.sendMessage({ greeting: "data", data: data.data }, function(response) {
            console.log('C/ message received by background');
        });
    }
}, false);

// resgister the tab as a content script
chrome.runtime.sendMessage({
    greeting: "register",
    tabType: "content"
}, function(response) {
    console.log('registered');
});

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         console.log(sender.tab ?
//             "from a content script:" + sender.tab.url :
//             "from the extension");
//         if (request.greeting == "this is a query") {
//             // var name = FUNCS.getWindowData();
//             sendResponse({ greeting: "result", data: window.conner });
//         }
//     });
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('C/ I received a chrome runtime message...')
    console.log(request);
    console.log('C/ relaying message to inject')
    window.postMessage(JSON.stringify({ from: 'content', to: 'inject', data: request.data }), '*')
    console.log('C/ message sent to inject')
});


// add listener for client messages
// window.addEventListener('message', function(data) {
//     // forward the messge to the background script
//     chrome.extension.getBackgroundPage().processWindowResponse(data);
// }, false);
// inject the client script in the webpage (to access JS)
var script = document.createElement('script');
script.setAttribute('src', chrome.extension.getURL('bundle-inject.js'));
document.body.appendChild(script);