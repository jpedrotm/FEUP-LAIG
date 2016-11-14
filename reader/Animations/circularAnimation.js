function circularAnimation() {

}

circularAnimation.prototype.constructor = circularAnimation;

circularAnimation.prototype.init = function(center, radius, initialAngle, rotationAngle) {
	this.center=center;
  this.radius=radius;
  this.initialAngle=initialAngle;
  this.rotationAngle=rotationAngle;

}
