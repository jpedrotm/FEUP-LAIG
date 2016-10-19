class Point{
  constructor(x,y,z,w){
    this.x=x;
    this.y=y;
    this.z=z;
    this.w=w;
  }
};

class RGBA{
  constructor(r,g,b,a){
    this.r=r;
    this.g=g;
    this.b=b;
    this.a=a;
  }
};

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

class GraphView{
  constructor(id,camera){
    this.id=id;
    this.camera=camera;
  }
};
