function Cell(scene, x, y, type,id) {
    CGFobject.call(this, scene);

    this.scene=scene;
    this.x=x;
    this.y=y;
    this.cell=new Cube(this.scene,1,0.2,1);
    this.material = null;
    this.piece=new Piramid(scene,type);
    this.id=id;
    this.type=type;
    this.animate=false;
    this.animation=null;

    if (type == 'queen') {
        this.piece = new Obj(this.scene, 'scenes/queen.obj');
        this.pieceMaterial = this.scene.queenMaterial;
    } else if (type == 'drone') {
        this.piece = new Obj(this.scene, 'scenes/drone.obj');
        this.pieceMaterial = this.scene.droneMaterial;
    } else if (type == 'pawn') {
        this.piece = new Obj(this.scene, 'scenes/pawn.obj');
        this.pieceMaterial = this.scene.pawnMaterial;
    }else{
      this.piece=new Piramid(this.scene,this.type);
    }
    this.getColorCell(x,y);
    this.selectedMaterial = this.scene.selectedMaterial;
    this.selected=0;

};

Cell.prototype = Object.create(CGFobject.prototype);
Cell.prototype.constructor = Cell;

Cell.prototype.getColorCell=function(x,y){

  if(x%2==y%2)
  {
    this.material=this.scene.woodMaterial;
  }
  else {
    this.material=this.scene.whiteWoodMaterial;
  }

};

Cell.prototype.display=function(){

  this.scene.pushMatrix();
  if(this.selected)
    this.selectedMaterial.apply();
    else
      this.material.apply();
  this.scene.registerForPick(this.id,this.cell);
  this.cell.display();
  this.scene.popMatrix();

    var angle = Math.PI/2;
    if(this.type == 'queen' || this.type == 'drone' || this.type == 'pawn'){
    this.scene.pushMatrix();
    if(this.animate)
    {
    this.animation.displayAnimation();
    console.log("A DAR DISPLAY");
    }
    this.scene.translate(-0.3,0.1,0.3);
    this.scene.scale(0.03,0.03,0.03);
    this.scene.rotate(-angle,1,0,0);
    this.pieceMaterial.apply();
    this.piece.display();
    this.scene.popMatrix();

  }


};

Cell.prototype.update=function(time){

  if(this.animate)
  {
    console.log("ANIMATED");
    if(this.animation.ended){
      console.log("FIM ANIMATION");
      this.scene.game.switchTurn=true;
      this.animate=false;
      this.animation=null;
      this.scene.switchTurn=true;
    }else{
      this.animation.updateAnimation(time);
    }
  }
};

Cell.prototype.updatePiece=function(type){

  this.type=type;
  if (type == 'queen') {
      this.piece = new Obj(this.scene, 'scenes/queen.obj');
      this.pieceMaterial = this.scene.queenMaterial;
  } else if (type == 'drone') {
      this.piece = new Obj(this.scene, 'scenes/drone.obj');
      this.pieceMaterial = this.scene.droneMaterial;
  } else if (type == 'pawn') {
      this.piece = new Obj(this.scene, 'scenes/pawn.obj');
      this.pieceMaterial = this.scene.pawnMaterial;
  }else{
    this.piece=new Piramid(this.scene,this.type);
  }

};

Cell.prototype.setSelected=function(){
  this.selected=1;
};

Cell.prototype.unsetSelected=function(){
  this.selected=0;
  this.getColorCell(this.x, this.y);
};
