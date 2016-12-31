/**
* Constructor of moveAnimation class that receives the scene and the points of the initial and final cell of the move in the board. The animation makes
* the piece do like a triangle movement. Th height and the span of the animation depends of the distance between th cells.
* @param {CGFscene} scene
* @param {Point2D} initialPoint
* @param {Point2D} finalPoint
* @param {number} xi
* @param {number} yi
* @param {number} span
*/
function moveAnimation(scene,initialPoint,finalPoint,xi,yi,span) {

  this.scene=scene;

  this.initialPoint=initialPoint;
  this.finalPoint=finalPoint;

  console.log("XI,YI: "+xi+","+yi);

  if(this.finalPoint.y>=4 && this.initialPoint.y<4)
  {
    this.finalPoint.y+=0.4;
  }

  this.center = new Point2D((this.initialPoint.x+this.finalPoint.x)/2,(this.initialPoint.y+this.finalPoint.y)/2);
  this.height = Math.sqrt(Math.pow(this.initialPoint.x-this.finalPoint.x,2) + Math.pow(this.initialPoint.y-this.finalPoint.y,2));
  this.vector=[this.finalPoint.x-this.initialPoint.x,this.finalPoint.y-this.initialPoint.y];

  this.up=true;

  this.ended=false;

  if(span===null){
    this.span=this.height;
  }
  else{
    this.span=span;
  }

  this.halfSpan=this.span/2;

  this.currTime = 0;
  this.distXi=1.1*xi;
  this.distYi=1.1*yi;

  this.x;
  this.y;
  this.z;

};

/**
* Update the animation.
* @param {number} time
*/
moveAnimation.prototype.updateAnimation = function(time) {

    this.currTime += time / 1000;


    if (this.currTime >= this.span) {

      console.log("ACABOU ANIMAÇÃO");

      this.animate=false;

      this.ended=true;

        return;
    } else {

        var percentage = this.currTime / this.span;

        this.x = this.vector[0]*percentage;
        this.z = this.vector[1]*percentage;

        if(this.up)
        {

          var percentageHalf=this.currTime/this.halfSpan;

          this.y=this.height*percentageHalf;

          //console.log("HEIGHT:"+this.height);
          //console.log("PERCENTAGE: "+percentage);
          //console.log("HALF PERCENTAGE: "+percentageHalf);

          if(percentageHalf>=1){
            this.up=false;
          }

        }
        else {

          var percentageHalf=(this.currTime-this.halfSpan)/this.halfSpan;

          this.y=this.height-this.height*percentageHalf;

        }

    }

};

/**
* Applys the tranformations in the scene according to the updates made in the animation.
*/
moveAnimation.prototype.displayAnimation = function() {

  var x=this.initialPoint.x+this.x;
  var z=this.initialPoint.y+this.z;
  var y=this.y;
  //console.log("POINTS: "+x+","+y+","+z);

  this.scene.translate(x-this.distXi,y,z-this.distYi);

};

/**
* Reset the variables of the animation.
*/
moveAnimation.prototype.resetAnimation = function() {

    this.currTime = 0;
    this.currAngle = 0;

};
