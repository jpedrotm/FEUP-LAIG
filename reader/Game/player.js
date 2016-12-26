function Player(id){

  this.id=id;

  this.firstCell=new Point2D(-1,-1);
  this.secondCell=new Point2D(-1,-1);

  this.readToMakeAMove=0; //quando já temos as coordenadas iniciais e finais fica a 1. Quando esta variável fica a 1 manda-se para o prolog as coordenadas
                         // e sabemos assim se o movimento é possível ou não.

  this.move='firstCell'; // Saber que movimento vamos registar, a seleção da célula inicial ou final

}

Player.prototype.getPoint=function(id){

  if(this.move==='firstCell')
  {
    this.firstCell.x=id%4;
    this.firstCell.y=Math.floor(id/4);

    this.move='secondCell';

    return 1;
  }
  else if(this.move==='secondCell')
  {
    this.secondCell.x=id%4;
    this.secondCell.y=Math.floor(id/4);

    this.readyToMakeAMove=1;

    this.move='firstCell';

    return 2;
  }

  return 0;
}

Player.prototype.resetPoints=function(){ //Por cada vez que é feito um movimento válido ou não válido é feito reset as coordenadas
  this.firstCell.resetPoints();
  this.secondCell.resetPoints();
}
