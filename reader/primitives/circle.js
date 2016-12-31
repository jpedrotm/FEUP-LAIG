/**
 * Circle class
 * @param {CGFscene} scene  CGFscene
 * @param {int} slices number of slices
 * @param {int} size
 */
function Circle(scene, slices, size) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.size = size;

    this.initBuffers();
};

Circle.prototype = Object.create(CGFobject.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.initBuffers = function() {

    this.vertices = new Array();
    this.indices = new Array();
    this.normals = new Array();
    this.texCoords = new Array();
    this.initialTexCoords = new Array();

    var ang = Math.PI * 2 / this.slices;
    var nSlices = this.slices;


    var count = 0;

    for (var i = 0; i < this.slices; i++) {
        this.vertices.push(Math.cos(ang * i), Math.sin(ang * i), 0);
        this.texCoords.push(-.5 * Math.cos((i) * ang) + .5, .5 * Math.sin((i) * ang) + .5);
        this.texCoords.push(-.5 * Math.cos((i + 1) * ang) + .5, .5 * Math.sin((i + 1) * ang) + .5);
        count++;
    }

    for (var i = 0; i < this.slices; i++) {
        this.normals.push(0, 0, 1);
    }

    this.vertices.push(0, 0, 0);

    var i = 1;
    for (; i < this.slices - 1; i++) {
        this.indices.push(count - 1, i - 1, i);

    }


    this.indices.push(0, i - 1, count - 1);

    this.initialTexCoords = this.texCoords;


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

/**
 * Updates circle texture coordinates
 * @param  {int} length_s
 * @param  {int} length_t 
 */
Circle.prototype.updateTexCoords = function(length_s, length_t) {

    if (length_s != 1 || length_t != 1) {
        for (let i = 0; i < this.initialTexCoords.length; i += 2) {
            this.texCoords[i] = this.initialTexCoords[i] / length_s;
            this.texCoords[i + 1] = this.initialTexCoords[i + 1] / length_t;
        }
    }

    this.updateTexCoordsGLBuffers();
};
