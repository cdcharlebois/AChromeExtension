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

chrome.commands.onCommand.addListener(function(command) {
    console.log('Command:', command);
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { "message": "The command was used" });
    });
});