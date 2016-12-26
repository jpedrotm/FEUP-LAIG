Board.prototype.getPrologRequest = function(requestString, onSuccess, onError, port)
{
  var requestPort = port || 8081
  var request = new XMLHttpRequest();
  var board = this;

  request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

  request.onload = function(data){

    console.log("Request successful. Reply: " + data.target.response);

    var response = data.target.response;

    if(response == 'EndGame'){

    }else if (response != 'Bad Request') {
      return response;

    }

  };
  request.onerror = onError || function(){console.log("Error waiting for response");};

  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send();
}

Board.prototype.makeRequest = function(request)
{
  return this.getPrologRequest(request);

}

//Handle the Reply
Board.prototype.handleReply = function(data)
{
  this.board=data.target.response;
  console.log(this.board);
}
