/**
 * Triangle
 * @constructor
 */
function Triangle(scene, x1, y1, z1, x2, y2, z2, x3, y3, z3) {
    CGFobject.call(this, scene);

    this.x1 = x1;
    this.y1 = y1;
    this.z1 = z1;
    this.x2 = x2;
    this.y2 = y2;
    this.z2 = z2;
    this.x3 = x3;
    this.y3 = y3;
    this.z3 = z3;

    this.initBuffers();
};

Triangle.prototype = Object.create(CGFobject.prototype);
Triangle.prototype.constructor = Triangle;

Triangle.prototype.initBuffers = function() {

    this.vertices = [
        this.x1, this.y1, this.z1,
        this.x2, this.y2, this.z2,
        this.x3, this.y3, this.z3
    ];

    this.indices = [
        0, 1, 2
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;

    this.normals = [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1
    ];

    this.texCoords = [

        this.x1, this.y1, this.z1,
        this.x2, this.y2, this.z2,
        this.x3, this.y3, this.z3

    ];

    this.initialTexCoords=[];
    this.initialTexCoords=this.texCoords;



    this.initGLBuffers();
};

Triangle.prototype.updateTexCoords = function(length_s, length_t) {

  console.log("TRIANGLE");
  if(length_s != 1 || length_t != 1){
    for (let i = 0; i < this.initialTexCoords.length; i += 2) {
        this.texCoords[i] = this.initialTexCoords[i] / length_s;
        this.texCoords[i + 1] = this.initialTexCoords[i + 1] / length_t;
    }
  }

  this.updateTexCoordsGLBuffers();
};
