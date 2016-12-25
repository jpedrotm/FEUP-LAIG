Board.prototype.getPrologRequest = function(requestString, onSuccess, onError, port)
{
  var requestPort = port || 8081
  var request = new XMLHttpRequest();
  var board = this;

  request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

  request.onload = function(data){

    console.log("Request successful. Reply: " + data.target.response);

    var response = data.target.response;

    if (response != 'Bad Request') {
      var obj = JSON.parse(response);
      console.log(obj);
      board.setBoard(obj);
    }

  };
  request.onerror = onError || function(){console.log("Error waiting for response");};

  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send();
}

Board.prototype.makeRequest = function(request)
{
  var board = this.getBoard();
  console.log(board);
  // Get Parameter Values
  var requestString = 'botPlay([' + board + '],' + 'player1,0,0)';
  // Make Request
  this.getPrologRequest(requestString);

  board = this.getBoard();
  console.log(board);
  // Get Parameter Values
  requestString = 'botPlay([' + board + '],' + 'player2,0,0)';
  // Make Request
  this.getPrologRequest(requestString);

}

//Handle the Reply
Board.prototype.handleReply = function(data)
{
  this.board=data.target.response;
  console.log(this.board);
}
