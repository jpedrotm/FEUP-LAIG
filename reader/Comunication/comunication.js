/**
 * Sends a string request to prolog
 * @param  {string} requestString string request to be sent to prolog.
 * @param  {callback} onSuccess     callback function that handles prolog's answer.
 * @param  {callback} onError       callback function that deals with .
 * @param  {int} port          port to connect.
 */
function getPrologRequest(requestString, onSuccess, onError, port) {
    var requestPort = port || 8081;
    var request = new XMLHttpRequest();
    var board = this;

    request.open('GET', 'http://localhost:' + requestPort + '/' + requestString, true);

    request.onload = onSuccess;
    request.onerror = onError || function() {
        console.log("Error waiting for response");
        console.log(data.target.response);
    };

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
}
