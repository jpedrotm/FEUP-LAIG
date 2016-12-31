/**
 * Cylinder class
 * @param {CGFScene} scene  CGFScene
 * @param {int} base   base radious
 * @param {int} top    top radious
 * @param {int} height
 * @param {int} slices
 * @param {int} stacks
 */
function Cylinder(scene, base, top, height, slices, stacks) {
    CGFobject.call(this, scene);

    //if slices not define, set to 6
    slices = typeof slices !== 'undefined' ? slices : 6;

    //if stacks not define, set to 5
    stacks = typeof stacks !== 'undefined' ? stacks : 5;

    this.base = base;
    this.top = top;
    this.height = height;

    this.noBasesCylinder = new noBasesCylinder(scene, base, top, height, slices, stacks);

    this.baseCircle = new Circle(scene, slices, base);
    this.topCirlce = new Circle(scene, slices, top);

    this.initBuffers();
};

Cylinder.prototype = Object.create(CGFobject.prototype);
Cylinder.prototype.constructor = Cylinder;

Cylinder.prototype.display = function() {

    //Desenhar o cilindro sem bases
    this.scene.pushMatrix();
    this.noBasesCylinder.display();
    this.scene.popMatrix();

    //Desenhar a base
    this.scene.pushMatrix();
    this.scene.scale(this.base, this.base, 1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.baseCircle.display();
    this.scene.popMatrix();

    //Desenhar o topo
    this.scene.pushMatrix();
    this.scene.scale(this.top, this.top, 1);
    this.scene.translate(0, 0, this.height);
    this.topCirlce.display();
    this.scene.popMatrix();

};

Cylinder.prototype.updateTexCoords = function(length_s, length_t) {

    if (length_s != 1 || length_t != 1) {
        this.noBasesCylinder.updateTexCoords(length_s, length_t);
        this.baseCircle.updateTexCoords(length_s, length_t);
        this.topCirlce.updateTexCoords(length_s, length_t);
    }

};
