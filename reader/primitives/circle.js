/**
 * MyPrism
 * @constructor
 */
 function Circle(scene, slices, size) {
 	CGFobject.call(this,scene);

	this.slices = slices;
  this.size=size;

 	this.initBuffers();
 };

 Circle.prototype = Object.create(CGFobject.prototype);
 Circle.prototype.constructor = Circle;

 Circle.prototype.initBuffers = function() {

 	this.vertices = new Array();
 	this.indices = new Array();
 	this.normals = new Array();

 	var ang=Math.PI*2/this.slices;
	var nSlices=this.slices;


	var count = 0;

	for (var i = 0; i < this.slices; i++) {
		this.vertices.push(Math.cos(ang*i), Math.sin(ang*i), 0);
		count++;
	}

	for (var i = 0; i < this.slices; i++) {
		this.normals.push(0,0, 1);
	}

		this.vertices.push(0,0,0);

	var i = 1;
	for (; i < this.slices -1; i++) {
		this.indices.push(count -1 ,i -1,i);

	}


	this.indices.push( 0,i - 1,count -1);


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
