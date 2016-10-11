/**
 * Torus
 * @constructor
 */
 function Torus(scene, inner, outter, slices, loops) {
   CGFobject.call(this, scene);

   this.r=inner;
   this.R=outter;
   this.slices=slices;
   this.loops=loops;

   this.initBuffers();
};


Torus.prototype = Object.create(CGFobject.prototype);
Torus.prototype.constructor = Torus;

Torus.prototype.initBuffers = function(){

  this.vertices = new Array();
	this.indices = new Array();
	this.normals = new Array();
	this.texCoords = new Array();

  var ang_circle=(2*Math.PI)/this.slices;
  var ang_between_circles=(2*Math.PI)/this.loops;

	for(var i=0;i<=this.loops;i++)
  {
    for(var j=0;j<=this.slices;j++)
    {
      var v=i*ang_between_circles;//theta
      var u=j*ang_circle;//phi

      var x=(this.R+this.r*Math.cos(v))*Math.cos(u);
      var y=(this.R+this.r*Math.cos(v))*Math.sin(u);
      var z=this.r*Math.sin(v);

      this.vertices.push(x,y,z);
      this.normals.push(x,y,z);

    }

  }

  for(var i=0;i<this.loops;i++)
  {
    for(var j=0;j<this.slices;j++)
    {
      var first = i*(this.slices+1)+j;
      var second = first + this.slices;

      this.indices.push(first, second+2, second+1);
      this.indices.push(first, first + 1, second + 2);
    }
  }

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();

};
