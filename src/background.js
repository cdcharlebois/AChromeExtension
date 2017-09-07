// background.js

// chrome.browserAction.onClicked.addListener(function(tab) {
//     // No tabs or host permissions needed!
//     console.log('Turning ' + tab.url + ' red!');
//     chrome.tabs.executeScript({
//         code: 'document.body.style.backgroundColor="red"'
//     });
// });

// Called when the user clicks on the browser action.
// chrome.browserAction.onClicked.addListener(function(tab) {
//     // Send a message to the active tab
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//         var activeTab = tabs[0];
//         chrome.tabs.sendMessage(activeTab.id, { "message": "clicked_browser_action" });
//     });
// });

// chrome.commands.onCommand.addListener(function(command) {
//     console.log('Command:', command);
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//         var activeTab = tabs[0];
//         chrome.tabs.sendMessage(activeTab.id, { "message": "The command was used" });
//     });
// });
console.log('>>>> RUNNING BACKGROUND')
var active_tab_content,
    active_tab_extension;

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.windows.create({
        url: 'popup.html',
        type: 'popup'
    }, function(window) {});
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "hello") {
            sendResponse({ farewell: "goodbye" });
        } else if (request.greeting == "register") {
            console.log(sender.tab.id)
            switch (request.tabType) {
                case 'content':
                    active_tab_content = {
                        id: sender.tab.id,
                        url: sender.tab.url
                    }
                    break;
                case 'extension':
                    active_tab_extension = {
                        id: sender.tab.id,
                        url: sender.tab.url
                    }
                    break;
            }
        } else if (request.greeting == "query") {
            // var content = active_tabs.find((t) => { return t.tabType == 'content' });
            chrome.tabs.sendMessage(active_tab_content.id, { greeting: "this is a query" }, function(response) {
                // console.log(`Thanks: ${response.data}`);
                // var extension = active_tabs.find((t) => { return t.tabType == 'extension' });
                // var data = { activeTabId: active_tab_content.id }
                chrome.tabs.sendMessage(active_tab_extension.id, { greeting: "result", result: response.data });
            });
        }
        /**
         * TEST: sending data back from the content script
         */
        else if (request.greeting == 'data') {
            console.log('B/ I received a message...')
            console.log(request);
            console.log('B/ relaying message to popup')
            chrome.tabs.sendMessage(active_tab_extension.id, request.data)
            console.log('B/ message sent to popup')
        }

    });

function processWindowResponse(data) {
    console.log(`Message received from window: ${JSON.stringify(data)}`);
}