/**
 * sphere
 * @constructor
 */
 function Sphere(scene,radius,slices, stacks) {
 	CGFobject.call(this,scene);

  this.radius=radius;
  this.topSphere=new Semisphere(scene,slices,stacks);
  this.bottomSphere=new Semisphere(scene,slices,stacks);

 	this.initBuffers();
 };

 Sphere.prototype = Object.create(CGFobject.prototype);
 Sphere.prototype.constructor = Sphere;

 Sphere.prototype.display=function(){

   this.scene.pushMatrix();
   this.scene.scale(this.radius,1,this.radius);
   this.scene.rotate(-Math.PI/2,1,0,0);
   this.topSphere.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.scale(this.radius,1,this.radius);
   this.scene.rotate(Math.PI/2,1,0,0);
   this.bottomSphere.display();
   this.scene.popMatrix();

 };
