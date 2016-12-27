function getPrologRequest(requestString, onSuccess, onError, port)
{
  var requestPort = port || 8081;
  var request = new XMLHttpRequest();
  var board = this;

  request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

  request.onload = onSuccess;
  request.onerror = onError || function(){console.log("Error waiting for response"); console.log(data.target.response);};

  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send();
}
