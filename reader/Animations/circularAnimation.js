function circularAnimation(id, span, center, radius, initialAngle, rotationAngle) {
    animation.call(this, id, span);
}

circularAnimation.prototype.constructor = circularAnimation;

circularAnimation.prototype.init = function() {
    this.center = center;
    this.radius = radius;
    this.initialAngle = initialAngle;
    this.rotationAngle = rotationAngle;

}
