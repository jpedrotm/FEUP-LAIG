function circularAnimation(scene, id, span, type, center, radius, initialAngle, rotationAngle) {
    Animation.call(this, id, span, type);
    this.center = center;
    this.radius = radius;
    this.initialAngle = initialAngle;
    this.rotationAngle = rotationAngle;
    this.previousTime = 0;
    this.deltaTime = 0;
    this.rotation = 0;
}

circularAnimation.prototype = Object.create(Animation.prototype);
linearAnimation.prototype.constructor = circularAnimation;

circularAnimation.prototype.animate = function(currtime) {
    this.scene.pushMatrix();
    this.scene.translate(radius, 0, 0);
    if (this.deltaTime >= this.span) {
        this.previousTime = 0;
        this.currentAnimation = false;
    }

    if (this.previousTime == 0) {
        this.rotation = this.initialAngle;
        this.previousTime = currtime;
    } else {
        this.deltaTime = this.previousTime - currtime;
        this.rotation += this.rotationAngle * (this.deltaTime / this.span);
        this.previousTime = currtime;
    }
    this.scene.rotate(this.rotation, 0, y, 0);
    this.scene.translate(center.x, 0, center.z);
    this.scene.popMatrix();
}
