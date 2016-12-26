/**
 * Piramid.
 * @constructor
 */
function Piramid(scene, type) {
    CGFobject.call(this, scene);
    this.scene = scene;
    this.type=type;
    if (type == 'queen') {
        this.height = 1;
        this.side = 0.5;
        this.material=this.scene.queenMaterial;
    } else if (type == 'drone') {
        this.height = 0.75;
        this.side = 0.25;
        this.material=this.scene.droneMaterial;
    } else if (type == 'pawn') {
        this.height = 0.5;
        this.side = 0.1;
        this.material=this.scene.pawnMaterial;
    }
    this.side1 = new Triangle(scene, -this.side, this.side, 0, -this.side, -this.side, 0, 0, 0, this.height);
    this.side5 = new Rectangle(scene, -this.side, -this.side, this.side, this.side);
    this.initBuffers();
};

Piramid.prototype = Object.create(CGFobject.prototype);
Piramid.prototype.constructor = Piramid;

Piramid.prototype.display = function() {

  this.scene.pushMatrix();

  this.scene.rotate(-Math.PI/2,1,0,0);

  if(this.material)
  {
    this.material.apply();
  }

    this.side1.display();
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.side1.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.side1.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI / 2, 0, 0, 1);
    this.side1.display();
    this.scene.popMatrix();
    this.side5.display();

    this.scene.popMatrix();
};

Piramid.prototype.updateTexCoords = function(length_s, length_t) {

    if (length_s != 1 || length_t != 1) {
        this.side1.updateTexCoords(length_s, length_t);
        this.side5.updateTexCoords(length_s, length_t);
    }

};;
