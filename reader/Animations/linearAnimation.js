function linearAnimation() {
    animation.call(this);
}

linearAnimation.prototype = Object.create(animation.prototype);
linearAnimation.prototype.constructor = linearAnimation;

linearAnimation.prototype.init = function(controlPoints) {
	this.controlPoints=controlPoints;
  this.totalDistance=calculateTotalDistance();
  this.velocity = calculateVelocity();


}

linearAnimation.prototype.calculateTotalDistance(){
  let distance;

  for(let i=1; i<this.controlPoints.length;i++){
    distance+=Math.sqrt(Math.pow(this.controlPoints[i-1][0]-this.controlPoints[i-1][1])+Math.pow(this.controlPoints[i][0]-this.controlPoints[i][1]));
  }

  return distance;
}


linearAnimation.prototype.calculateVelocity(){
  return this.totalDistance/this.duration;
}
