function Cell(scene, x, y, type,id) {
    CGFobject.call(this, scene);

    this.scene=scene;
    this.x=x;
    this.y=y;
    this.cell=new Cube(this.scene,1,0.2,1);
    this.material = null;
    this.piece=new Piramid(scene,type);
    this.id=id;

    this.getColorCell(x,y);

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
  this.material.apply();
  this.scene.registerForPick(this.id,this.cell);
  this.cell.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.piece.display();
  this.scene.popMatrix();

};
