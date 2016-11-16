function linearAnimation(scene, id, span, type, controlPoints) {

    Animation.call(this, scene, id, span, type);

    this.currTime = 0;
    this.currDistance = 0;
    this.totalDistance = 0;
    this.Indice = 0;
    this.distanceEachPoints = [];
    this.timeEachPoints = [];
    this.vectors = [];
    this.controlPoints = controlPoints;
    this.x;
    this.y;
    this.z;
    this.ang;

    this.initVariables();



    this.speed = this.totalDistance / span;


}

linearAnimation.prototype = Object.create(Animation.prototype);
linearAnimation.prototype.constructor = linearAnimation;

linearAnimation.prototype.initVariables = function() {

    var tmpDis = 0;
    var tmpVec;

    for (var i = 0; i < this.controlPoints.length - 1; i++) {

      console.log('POINTS: '+this.controlPoints[i].x+","+this.controlPoints[i].y+","+this.controlPoints[i].z);

      console.log('POINTS: '+this.controlPoints[i+1].x+","+this.controlPoints[i + 1].y+","+this.controlPoints[i + 1].z);

        tmpDis += Math.sqrt(Math.pow(this.controlPoints[i + 1].x - this.controlPoints[i].x,2) + Math.pow(this.controlPoints[i + 1].y - this.controlPoints[i].y,2) + Math.pow(this.controlPoints[i + 1].z - this.controlPoints[i].z,2));
        tmpVec = new Point(this.controlPoints[i + 1].x - this.controlPoints[i].x, this.controlPoints[i + 1].y - this.controlPoints[i].y, this.controlPoints[i + 1].z - this.controlPoints[i].z, null);
        this.distanceEachPoints.push(tmpDis);
        this.vectors.push(tmpVec);
        this.totalDistance += tmpDis;

    }

    for (var i = 0; i < this.distanceEachPoints.length; i++) {
        this.timeEachPoints.push(this.distanceEachPoints[i]/ this.totalDistance * this.span);
        console.log("DISTANCE: "+this.distanceEachPoints[i]);
        console.log("TOTAL DISTANCE: "+this.totalDistance);
        console.log("SPAN: "+this.span);
        console.log("TIME:"+i+": "+this.timeEachPoints[i]);
    }

    this.ang=Math.atan(this.vectors[this.Indice].x/this.vectors[this.Indice].z);

};

linearAnimation.prototype.getAnimationCopy = function(){
  return new linearAnimation(this.scene,this.id,this.span,this.type,this.controlPoints);
};

linearAnimation.prototype.updateAnimation = function(time) {

  if(!this.inUse)
  {
    return;
  }

    this.currTime += time/1000;

    console.log(this.currTime);
    console.log(this.span);

    if (this.currTime >= this.span) {

      this.inUse=false;

        return;
    } else {
        if (this.currTime >= this.timeEachPoints[this.Indice]) {
          console.log("MUDOU: "+this.Indice);

          if(this.Indice != this.timeEachPoints.length-1)
          {
            this.Indice++;
          }

            this.subtractTime = this.timeEachPoints[this.Indice - 1];

            this.ang = Math.atan(this.vectors[this.Indice].x / this.vectors[this.Indice].z);
        }

        var minTime;
        var maxTime;

        if (this.Indice == 0) {
          console.log("ZERO");
            maxTime = this.timeEachPoints[this.Indice];
            minTime = 0;
        } else {
            maxTime = this.timeEachPoints[this.Indice];
            minTime = this.timeEachPoints[this.Indice - 1];
        }

        if(this.Indice==2)
        {
          console.log("ERROOOOOOOOOOOOO");
        }

        console.log("MIN TIME: "+minTime);
        console.log("MAX TIME: "+maxTime);

        var percentage = (this.currTime - minTime) / maxTime;

        console.log("PERCENTAGE: "+percentage);

        this.x = this.vectors[this.Indice].x * percentage;
        this.y = this.vectors[this.Indice].y * percentage;
        this.z = this.vectors[this.Indice].z * percentage;


        console.log("xp: "+this.vectors[this.Indice].x+"yp: "+this.vectors[this.Indice].y+"zp: "+this.vectors[this.Indice].z);
        console.log("x: "+this.x+"y: "+this.y+"z: "+this.z);
        console.log("ang: "+this.ang);

    }

};

linearAnimation.prototype.displayAnimation = function(){

  if(!this.inUse)
  {
    return;
  }

  var x=this.controlPoints[this.Indice].x+this.x;
  var y=this.controlPoints[this.Indice].y+this.y;
  var z=this.controlPoints[this.Indice].z+this.z;
  console.log("POINTS: "+x+","+y+","+z);
  console.log("ANG: "+this.ang);

  this.scene.translate(this.controlPoints[this.Indice].x+this.x,this.controlPoints[this.Indice].y+this.y,this.controlPoints[this.Indice].z+this.z);
  this.scene.rotate(this.ang,0,1,0);

};

linearAnimation.prototype.resetAnimation = function(){

  this.currTime=0;
  this.currDstance=0;
  this.Indice=0;

};
