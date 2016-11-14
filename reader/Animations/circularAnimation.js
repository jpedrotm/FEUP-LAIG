function circularAnimation(scene, id, span, center, radius, initialAngle, rotationAngle) {
    animation.call(this, id, span);
    this.center = center;
    this.radius = radius;
    this.initialAngle = initialAngle;
    this.rotationAngle = rotationAngle;
    this.previousTime = 0;
    this.deltaTime = 0;
    this.rotation = 0;
}

circularAnimation.prototype = Object.create(animation.prototype);

circularAnimation.prototype.animate = function(currtime) {
    this.scene.pushMatrix();
    this.scene.translate(radius, 0, 0);
    if (this.deltaTime >= this.span)
        this.previousTime = 0;
    if (this.previousTime == 0) {
        this.rotation = this.initialAngle;
        this.previousTime = currtime;
    } else {
        this.deltaTime = this.previousTime - currtime;
        this.rotation += this.rotationAngle * (this.deltaTime / this.span);
        this.previousTime = currtime;
    }
    this.scene.rotate(this.rotation, 0, y, 0);
    this.scene.translate(center[0], center[1], center[2]);
    this.scene.popMatrix();
}
