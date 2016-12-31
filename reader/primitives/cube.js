/**
 * Cube class
 * @param {CGFscene} scene CGFscene
 * @param {int} l1    length on X
 * @param {int} l2    length on Y
 * @param {int} l3    length on Z
 */
function Cube(scene, l1, l2, l3) {

    CGFobject.call(this, scene);

    this.scene = scene;

    this.l1 = l1;
    this.l2 = l2;
    this.l3 = l3;

    this.superficie = new Rectangle(this.scene, -0.5, -0.5, 0.5, 0.5);

    this.initBuffers();

};

Cube.prototype = Object.create(CGFobject.prototype);
Cube.prototype.constructor = Cube;


/**
 * displays cube
 */
Cube.prototype.display = function() {

    this.scene.pushMatrix();

    this.scene.scale(this.l1, this.l2, this.l3);

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.5);
    this.superficie.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.5, 0, 0);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.superficie.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, -0.5);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.superficie.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.5, 0, 0);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.superficie.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, -0.5, 0);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.superficie.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0.5, 0);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.superficie.display();
    this.scene.popMatrix();

    this.scene.popMatrix();

};
