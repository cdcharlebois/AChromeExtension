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
var active_tabs = [];

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
            active_tabs.push({
                id: sender.tab.id,
                tabType: request.tabType
            });
        } else if (request.greeting == "query") {
            var content = active_tabs.find((t) => { return t.tabType == 'content' });
            chrome.tabs.sendMessage(content.id, { greeting: "this is a query" }, function(response) {
                console.log(`Thanks: ${response.data}`);
                var extension = active_tabs.find((t) => { return t.tabType == 'extension' });
                chrome.tabs.sendMessage(extension.id, { greeting: "result", result: response.data });
            });
        }

    });