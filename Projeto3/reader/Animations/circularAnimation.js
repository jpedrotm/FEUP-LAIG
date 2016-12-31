/**
* Constructor of the class circularAnimation.
* @param {scene} CGFscene
* @param {string} id
* @param {number} span
* @param {string} type
* @param {Point} center
* @param {number} radius
* @param {number} initialAngle
* @param {number} rotationAngle
*/
function circularAnimation(scene, id, span, type, center, radius, initialAngle, rotationAngle) {
    Animation.call(this, scene, id, span, type);
    this.center = center;
    this.radius = radius;

    this.radAng = Math.PI / 180;

    this.initialAngle = initialAngle * this.radAng;
    this.rotationAngle = rotationAngle * this.radAng;

    this.currTime = 0;
    this.currAngle = 0;
    this.x;
    this.y;
    this.z;

}

circularAnimation.prototype = Object.create(Animation.prototype);
circularAnimation.prototype.constructor = circularAnimation;

/**
* Returns a copy of the animation.
*/
circularAnimation.prototype.getAnimationCopy = function() {
    return new circularAnimation(this.scene, this.id, this.span, this.type, this.center, this.radius, this.initialAngle / this.radAng, this.rotationAngle / this.radAng);
};

/**
* Update the animation.
* @param {number} time
*/
circularAnimation.prototype.updateAnimation = function(time) {

    console.log("AQUI");

    this.currTime += time / 1000;

    console.log("TIME: " + this.currTime);

    if (this.currTime >= this.span) {

        this.inUse = false;

        return;
    } else {

        var percentage = this.currTime / this.span;

        this.currAngle = this.rotationAngle * percentage;

    }

};

/**
* Applys the tranformations in the scene according to the updates made in the animation.
*/
circularAnimation.prototype.displayAnimation = function() {

    var x = this.radius * Math.sin(this.initialAngle + this.currAngle);
    var z = this.radius * Math.cos(this.initialAngle + this.currAngle);

    console.log("VARIAVEIS: " + x + ", " + z);

    this.scene.translate(x + this.center.x, this.center.y, z + this.center.z);
    this.scene.rotate(this.initialAngle + this.currAngle, 0, 1, 0);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);

};

/**
* Reset the values of the animation.
*/
circularAnimation.prototype.resetAnimation = function() {

    this.currTime = 0;
    this.currAngle = 0;

};
