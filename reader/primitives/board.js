function Board(scene,height,width) {

  CGFobject.call(this, scene);

  this.scene=scene;

  this.height=height;
  this.width=width;
  this.board=[];

  this.initBoard();

  this.initBuffers();

};

Board.prototype = Object.create(CGFobject.prototype);
Board.prototype.constructor = Board;

Board.prototype.initBoard=function(board){

  var tmpId=1;

  for(var i=0;i<this.height;i++)
  {
    this.board.push([]);

    for(var j=0;j<this.width;j++)
    {
      tmpId++;
      var piece= this.verifyPiece(j,i);
      console.log("Piece("+j+","+i+"): "+piece);
      this.board[i].push(new Cell(this.scene,i,j,piece,tmpId));
    }
  }

};

Board.prototype.setBoard=function(board){

  var tmpId=1;
  var tmpBoard=[];
  for(var i=0;i<this.height;i++)
  {
    tmpBoard.push([]);

    for(var j=0;j<this.width;j++)
    {
      tmpId++;
      var piece = board[i][j];
      console.log("Piece("+j+","+i+"): "+piece);
      tmpBoard[i].push(new Cell(this.scene,i,j,piece,tmpId));
    }
  }
  this.board=tmpBoard;

};

Board.prototype.getBoard=function(){

  var tmpBoard=[];
  for(var i=0;i<this.height;i++)
  {
    tmpBoard.push([]);

    for(var j=0;j<this.width;j++)
    {
      tmpBoard[i].push(this.board[i][j].piece.type);
    }
  }
  return tmpBoard;

};

Board.prototype.display=function(){

  var dist=1.1;
  var divDist=0.4;

  this.scene.pushMatrix();

  for(var i=0;i<this.height;i++)
  {
    this.scene.translate(0,0,dist);

    if(i===4)
    {
      this.scene.translate(0,0,divDist);
    }

    for(var j=0;j<this.board[i].length;j++)
    {
      this.scene.pushMatrix();
      this.scene.translate(dist*j,0,0);
      this.board[i][j].display();

      this.scene.popMatrix();
    }
  }

  this.scene.popMatrix();

};

Board.prototype.verifyPiece=function(x,y){

  if((x==0 && y==0) || (x==1 && y==0) || (x==0 && y==1) || (x==this.width-1 && y==this.height-1) || (x==this.width-1 && y==this.height-2) || (x==this.width-2 && y==this.height-1))
  {
    return 'queen';
  }
  else if((x==2 && y==0) || (x==1 && y==1) || (x==0 && y==2))
  {
    return 'drone';
  }
  else if((x==this.width-3 && y==this.height-1) || (x==this.width-1 && y==this.height-3) || (x==this.width-2 && y==this.height-2))
  {
    return 'drone';
  }
  else if((x==1 && y==2) || (x==2 && y==2) || (x==2 && y==1))
  {
    return 'pawn';
  }
  else if((x==this.width-2 && y==this.height-3) || (x==this.width-3 && y==this.height-3) || (x==this.width-3 && y==this.height-2))
  {
    return 'pawn';
  }

  return 'empty';

};

Board.prototype.registerForPickBoard = function(){

  var tmpId=1;

  for(var i=0;i<this.height;i++)
  {

    for(var j=0;j<this.width;j++)
    {
      tmpId++;
      this.scene.registerForPick(tmpId,this.board[i][j].cell);
    }
  }

};

Board.prototype.verifyMovementBoard=function(){

  if (this.scene.pickMode == false) {
		if (this.scene.pickResults != null && this.scene.pickResults.length > 0) {
      console.log("size: "+this.scene.pickResults.length);
			for (var i=0; i< this.scene.pickResults.length; i++) {
				var obj = this.scene.pickResults[i][0];
				if (obj)
				{
					var customId = this.scene.pickResults[i][1];
					console.log("Picked object: " + obj + ", with pick id " + customId);
				}
			}
			this.scene.pickResults.splice(0,this.scene.pickResults.length);
		}
	}

};
