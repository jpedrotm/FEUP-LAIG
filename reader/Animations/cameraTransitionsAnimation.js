/**
* Constructor of the class cameraTransitionsAnimation. This class is responsible to animate the camera by receiving the initial and final position
* of the camera, and the initial and final target of the camera.
* @param {CGFscene} scene
* @param {Point} initialPosition
* @param {Point} initialTarget
* @param {Point} finalPosition
* @param {Point} finalTarget
*/
function cameraTransitionsAnimation(scene,initialPosition,initialTarget,finalPosition,finalTarget){

  this.scene=scene;
  this.span=1;
  this.initialPosition=initialPosition;
  this.initialTarget=initialTarget;
  this.finalPosition=finalPosition;
  this.finalTarget=finalTarget;
  this.currTime=0;

  console.log("INIT POSITION: "+this.initialPosition.x+","+this.initialPosition.y+","+this.initialPosition.z);
  console.log("INIT TARGET: "+this.initialTarget.x+","+this.initialTarget.y+","+this.initialTarget.z);

  this.currXPosition;
  this.currYPosition;
  this.currZPosition;

  this.currXTarget;
  this.currYTarget;
  this.currZTarget;

  this.vetorTarget=new Point(this.finalTarget.x-this.initialTarget.x,this.finalTarget.y-this.initialTarget.y,this.finalTarget.z-this.initialTarget.z,null);
  this.vetorPosition=new Point(this.finalPosition.x-this.initialPosition.x,this.finalPosition.y-this.initialPosition.y,this.finalPosition.z-this.initialPosition.z,null);

  console.log("INIT VETOR POSITION: "+this.vetorPosition.x+","+this.vetorPosition.y+","+this.vetorPosition.z);
  console.log("INIT VETOR TARGET: "+this.vetorTarget.x+","+this.vetorTarget.y+","+this.vetorTarget.z);

};

/**
* Update the animation of the camera.
* @param {number} time
*/
cameraTransitionsAnimation.prototype.updateAnimation=function(time){

  this.currTime += time / 1000;

  if (this.currTime >= this.span) {

    this.scene.cameraTransitionsAnimation=null;

      this.ended = true;

      return;
  } else {

      var percentage = this.currTime / this.span;

      this.currXPosition=this.initialPosition.x+percentage*this.vetorPosition.x;
      this.currYPosition=this.initialPosition.y+percentage*this.vetorPosition.y;
      this.currZPosition=this.initialPosition.z+percentage*this.vetorPosition.z;

      this.currXTarget=this.initialTarget.x+percentage*this.vetorTarget.x;
      this.currYTarget=this.initialTarget.y+percentage*this.vetorTarget.y;
      this.currZTarget=this.initialTarget.z+percentage*this.vetorTarget.z;

      //console.log("Position x,y,z: "+this.currXPosition+","+this.currYPosition+","+this.currZPosition);
      //console.log("Target x,y,z: "+this.currXTarget+","+this.currYTarget+","+this.currZTarget);

      this.scene.camera.setPosition(vec3.fromValues(this.currXPosition,this.currYPosition,this.currZPosition));
      this.scene.camera.setTarget(vec3.fromValues(this.currXTarget,this.currYTarget,this.currZTarget));
  }

};
