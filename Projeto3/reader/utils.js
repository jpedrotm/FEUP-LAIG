/**
* Point.
* @constructor
*/
class Point2D{
  constructor(x,y){
    this.x=x;
    this.y=y;
  }

  resetPoints(){
    this.x=-1;
    this.y=-1;
  }

};

class playersPoints{

  constructor(pointsP1,pointsP2){
    this.p1=pointsP1;
    this.p2=pointsP2;
  }

};

class Moves{
  constructor(initial,final){
    this.initial=initial;
    this.final=final;
  }
};

class Point{
  constructor(x,y,z,w){
    this.x=x;
    this.y=y;
    this.z=z;
    this.w=w;
  }
};
/**
* RGBA.
* @constructor
*/
class RGBA{
  constructor(r,g,b,a){
    this.r=r;
    this.g=g;
    this.b=b;
    this.a=a;
  }
};
/**
* Omni.
* @constructor
*/
class Omni{
  constructor(id,location,ambient,diffuse,specular,enable){
    this.id=id;
    this.location=location;
    this.ambient=ambient;
    this.diffuse=diffuse;
    this.specular=specular;
    this.enable=enable;
  }
};
/**
* Spot.
* @constructor
*/
class Spot{
  constructor(id,enable,exponent,angle,target,location,ambient,diffuse,specular){
    this.id=id;
    this.enable=enable;
    this.target=target;
    this.location=location;
    this.ambient=ambient;
    this.diffuse=diffuse;
    this.specular=specular;
    this.exponent=exponent;
  }
};
/**
* GraphView.
* @constructor
*/
class GraphView{
  constructor(id,camera){
    this.id=id;
    this.camera=camera;
  }
};
