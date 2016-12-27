function moveAnimation(scene,initialPoint,finalPoint,xi,yi) {

  this.scene=scene;

  this.initialPoint=initialPoint;
  this.finalPoint=finalPoint;

  this.center = new Point2D((this.initialPoint.x+this.finalPoint.x)/2,(this.initialPoint.y+this.finalPoint.y)/2);
  this.height = Math.sqrt(Math.pow(this.initialPoint.x-this.finalPoint.x,2) + Math.pow(this.initialPoint.y-this.finalPoint.y,2));
  this.vector=[this.finalPoint.x-this.initialPoint.x,this.finalPoint.y-this.initialPoint.y];

  this.up=true;

  this.ended=false;

  this.span=this.height*2;
  this.halfSpan=this.span/2;

  this.currTime = 0;
  this.distXi=1.1*xi;
  this.distYi=1.1*yi;

  this.x;
  this.y;
  this.z;

}

moveAnimation.prototype.updateAnimation = function(time) {

    this.currTime += time / 1000;



    if (this.currTime >= this.span) {

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

          console.log("HEIGHT:"+this.height);
          console.log("PERCENTAGE: "+percentage);
          console.log("HALF PERCENTAGE: "+percentageHalf);

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

moveAnimation.prototype.displayAnimation = function() {

  var x=this.initialPoint.x+this.x;
  var z=this.initialPoint.y+this.z;
  var y=this.y;
  console.log("POINTS: "+x+","+y+","+z);

  this.scene.translate(x-this.distXi,y,z-this.distYi);

};

moveAnimation.prototype.resetAnimation = function() {

    this.currTime = 0;
    this.currAngle = 0;

};
