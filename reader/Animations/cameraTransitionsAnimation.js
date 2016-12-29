function cameraTrasitionsAnimation(scene,initialPosition,initialTarget,finalPosition,finalTarget){

  this.scene=scene;
  this.span=3;
  this.x=0;
  this.y=20;
  this.z=0;
  this.initialPosition=initialPosition;
  this.initialTarget=initialTarget;
  this.finalPosition=finalPosition;
  this.finalTarget=finalTarget;

  this.radius=40;
  this.degToRad=Math.PI/180;
  if(finalPerspective.x<initialPerspective.x)
  {
    this.rotationAngle=-Math.PI/2;
  }
  else if(finalPerspective.x>initialPerspective.x)
  {
    this.rotationAngle=Math.PI/2;
  }

  this.currTime=0;
  this.ended=false;

};

cameraTransitionsAnimation.prototype.updateAnimation=function(time){

  this.currTime += time / 1000;

  if (this.currTime >= this.span) {

      this.ended = true;

      return;
  } else {

      var percentage = this.currTime / this.span;

      this.currAngle = this.rotationAngle * percentage;

      this.x = this.radius * Math.sin(this.initialAngle + this.currAngle);
      this.z = this.radius * Math.cos(this.initialAngle + this.currAngle);

      console.log("x,y,z: "+this.x+","+this.y+","+this.z);

      this.scene.camera.setPosition(vec3.fromValues(this.x,this.y,this.z));

  }

};
