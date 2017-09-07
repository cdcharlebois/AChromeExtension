console.log('>>>> RUNNING INJECT')
console.log('I/ I behave just like normal JS and should have access to any window variables.')
console.log(window);
// console.log(mx);
/**
 * mx.data.get({
    xpath: "//System.User",
    callback: function(objs) {
        console.log("Received " + objs.length + " MxObjects");
    }
});
 */
var mx_data_get = {
    xpath: "//System.User",
}
mx_data_get.callback = function(result) {
    console.log('I/ got result')
    console.log(result)
    window.postMessage(JSON.stringify({ to: 'content', from: 'inject', data: result }), "*")
        // window.dispatchEvent(new CustomEvent("getChromeData", { to: 'content', from: 'inject', data: result }));
        // window.postMessage('Hello', '*');

};

mx.data.get(mx_data_get);




// Run query and pass result to content script, which will then relay to background and then to popup


// var sendMessageToContentScript = function(data) {
//     window.postMessage(data, '*');
// }

// sendMessageToContentScript({ greeting: 'test', data: 'Some data' });