function Board(scene,height,width) {

  CGFobject.call(this, scene);

  this.scene=scene;

  this.height=height;
  this.width=width;
  this.board=[];
  this.move='firstCell'; //para saber que célula está a selecionar (primeira ou segunda)
  this.firstCell=new Point2D(-1,-1);
  this.secondCell=new Point2D(-1,-1);

  this.currX=-1; //Último x e y escolhidos
  this.currY=-1;

  this.initBoard();

};

Board.prototype.update=function(time){

  for(var i=0;i<this.height;i++)
  {
    for(var j=0;j<this.board[i].length;j++)
    {
      this.board[i][j].update(time);
    }
  }

}

Board.prototype.initBoard=function(){

  var tmpId=1;

  for(var i=0;i<this.height;i++)
  {
    this.board.push([]);

    for(var j=0;j<this.width;j++)
    {
      var piece= this.verifyPiece(j,i);
      console.log("Piece("+j+","+i+"): "+piece);
      this.board[i].push(new Cell(this.scene,i,j,piece,tmpId));
      tmpId++;
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
    }
  }

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


Board.prototype.movePiece = function(validMoves){

  var validPlay=0;
  for(var i =0; i<validMoves.length; i++){
    if(validMoves[i][2]==this.secondCell.x && validMoves[i][3]==this.secondCell.y){
      validPlay=1;
    }
  }

  if(validPlay==1){
    this.board[this.secondCell.y][this.secondCell.x].updatePiece(this.board[this.firstCell.y][this.firstCell.x].type);
    this.board[this.firstCell.y][this.firstCell.x].updatePiece('empty');
    this.cleanSelections();

    var initialPointAnimation=new Point2D(this.firstCell.x*1.1,this.firstCell.y*1.1);
    var finalPointAnimation=new Point2D(this.secondCell.x*1.1,this.secondCell.y*1.1);

    this.board[this.firstCell.y][this.firstCell.x].animation=new moveAnimation(this.scene,initialPointAnimation,finalPointAnimation,this.firstCell.x,this.firstCell.y);
    this.board[this.firstCell.y][this.firstCell.x].animate=true;
  }


};

Board.prototype.cleanSelections = function(){

  for(var i = 0; i<this.board.length; i++){
    for(var j = 0; j<this.board[0].length; j++){
      this.board[i][j].unsetSelected();
    }
  }

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
    var selection = 0;
		if (this.scene.pickResults != null && this.scene.pickResults.length > 0) {
      console.log("size: "+this.scene.pickResults.length);
			for (var i=0; i< this.scene.pickResults.length; i++) {
				var obj = this.scene.pickResults[i][0];
				if (obj)
				{
					var customId = this.scene.pickResults[i][1];

          this.currX=customId%4;
          if(this.currX===0)
          {
            this.currX=3;
            this.currY=Math.floor(customId/4)-1;
          }
          else{
            this.currX--;
            this.currY=Math.floor(customId/4);
          }

          console.log('X,Y: '+this.currX+','+this.currY);

          this.verifyIfSameCell();
          selection = this.getCoordsToMove(customId);

          console.log(this.move);

					console.log("Picked object: " + obj + ", with pick id " + customId);
				}
			}
			this.scene.pickResults.splice(0,this.scene.pickResults.length);
      return selection;
		}
	}

  return 0;

};

Board.prototype.getCoordsToMove=function(id){

  if(this.move==='notAMove')
    return;

  if(this.move==='firstCell' && this.board[this.currY][this.currX].type!='empty')
  {
    this.firstCell.x=this.currX;
    this.firstCell.y=this.currY;


    this.move='secondCell';
    return 1;
  }
  else if(this.move==='secondCell')
  {
    this.secondCell.x=this.currX;
    this.secondCell.y=this.currY;

    console.log('Movimento a realizar: \n'+'Fx,Fy: '+this.firstCell.x+','+this.firstCell.y+'\nSx,Sy: '+this.secondCell.x+','+this.secondCell.y);

    this.move='firstCell';

    return 2;
  }

  return 0;

};

Board.prototype.getFirstCell = function(){

  return this.firstCell;

};

Board.prototype.getSecondCell = function(){

  return this.secondCell;

};

Board.prototype.verifyIfSameCell=function(){

  if(this.firstCell.x===this.currX && this.firstCell.y===this.currY)
  {

    if(this.firstCell.x%2==this.firstCell.y%2)
    {
      this.board[this.currY][this.currX].material=this.scene.woodMaterial;
    }
    else {
      this.board[this.currY][this.currX].material=this.scene.whiteWoodMaterial;
    }

    this.move='notAMove';

    this.firstCell.x=-1;
    this.firstCell.y=-1;

  }
  else {
    this.board[this.currY][this.currX].material=this.scene.pickedMaterial;

    if(this.move==='notAMove')
    {
      this.move='firstCell';
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
      tmpBoard[i].push(this.board[i][j].type);
    }
  }
  return tmpBoard;

};
