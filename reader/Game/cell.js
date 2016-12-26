function Cell(scene, x, y, type,id) {
    CGFobject.call(this, scene);

    this.scene=scene;
    this.x=x;
    this.y=y;
    this.cell=new Cube(this.scene,1,0.2,1);
    this.material = null;
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
      this.piece=new Piramid(scene,type);
    }
    this.getColorCell(x,y);
    this.id=id;

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
  var angle = Math.PI/2;
  if(this.type == 'queen' || this.type == 'drone' || this.type == 'pawn'){
    this.scene.pushMatrix();
    this.scene.translate(-0.3,0.1,0.3);
    this.scene.scale(0.03,0.03,0.03);
    this.scene.rotate(-angle,1,0,0);
    this.pieceMaterial.apply();
    this.piece.display();
    this.scene.popMatrix();
  }


  this.scene.pushMatrix();
  this.material.apply();
  this.scene.registerForPick(this.id,this.cell);
  this.cell.display();
  this.scene.popMatrix();

};
