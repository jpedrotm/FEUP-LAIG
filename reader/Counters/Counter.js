/**
 *  Class counter, displays player score
 *  @param CGFscene
 */

function Counter(scene) {

    CGFobject.call(this, scene);
    this.scene = scene;

    this.units = 0;
    this.dozens = 0;

    this.unitsObj = new Obj(scene, 'scenes/3dObjects/numbers/0.obj');
    this.dozensObj = new Obj(scene, 'scenes/3dObjects/numbers/0.obj');
    this.board = new Cube(scene, 24, 35, 4);

    this.scene.backgroundAppearance = new CGFappearance(this.scene);
    this.scene.backgroundAppearance.setAmbient(0.34, 0.18, 0.055, 0.4);
    this.scene.backgroundAppearance.setDiffuse(1.0, 1.0, 1.0, 0.4);
    this.scene.backgroundAppearance.setSpecular(1.0, 1.0, 1.0, 0.4);
    this.scene.backgroundAppearance.setShininess(1);
    this.scene.backgroundAppearance.loadTexture('/reader/scenes/img/wood1.jpg');

    this.unitsAngle = 0;
    this.dozensAngle = 0;

    this.animateUnits = false;
    this.animateDozens = false;

}

Counter.prototype = Object.create(CGFobject.prototype);
Counter.prototype.constructor = Counter;

/**
 * Updates the dozens and units counter
 * @param {int} points amount of points to be added
 */

Counter.prototype.add = function(points) {

    if ((this.units + points) < 10 && points > 0) {
        this.units += points;
        this.animateUnits = true;
    } else if (points > 0) {
        var rest = this.units + points - 10;
        this.units = rest;
        this.dozens++;
    }

    this.unitsObj = new Obj(this.scene, 'scenes/3dObjects/numbers/' + this.units + '.obj');
    this.dozensObj = new Obj(this.scene, 'scenes/3dObjects/numbers/' + this.dozens + '.obj');

};


/**
 * displays the counters and deals with their animation
 */
Counter.prototype.display = function() {

    if (this.animateUnits === true) {
        this.unitsAngle += 20;
    }
    if (this.animateDozens === true)
        this.dozensAngle += 20;

    if (this.dozensAngle > 350) {
        this.animateDozens = false;
        this.dozensAngle = 0;
    }
    if (this.unitsAngle > 350) {
        this.animateUnits = false;
        this.unitsAngle = 0;
    }

    this.scene.pushMatrix();
    this.scene.backgroundAppearance.apply();
    this.scene.scale(0.05, 0.05, 0.05);

    this.scene.pushMatrix();
    this.scene.rotate(this.dozensAngle * Math.PI / 180, 1, 0, 0);
    this.dozensObj.display();
    this.scene.pushMatrix();
    this.scene.translate(8, 13, 0);
    this.board.display();
    this.scene.popMatrix();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(this.unitsAngle * Math.PI / 180, 1, 0, 0);
    this.scene.translate(26, 0, 0);
    this.unitsObj.display();
    this.scene.pushMatrix();
    this.scene.translate(8, 13, 0);
    this.board.display();
    this.scene.popMatrix();
    this.scene.popMatrix();

    this.scene.popMatrix();



};
