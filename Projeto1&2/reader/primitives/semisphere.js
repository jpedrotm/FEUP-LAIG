/**
 * Semisphere
 * @constructor
 */
function Semisphere(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;
    this.Tinc = 1 / stacks;
    this.Sinc = 1 / slices;
    this.initBuffers();
};

Semisphere.prototype = Object.create(CGFobject.prototype);
Semisphere.prototype.constructor = Semisphere;

Semisphere.prototype.initBuffers = function() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];
    this.initialTexCoords = [];

    var ang = 2 * Math.PI / this.slices;
    var vert = 2 * Math.PI / (this.stacks);


    for (var i = 0; i <= this.stacks; i++) {

        for (var m = 0; m < this.slices; m++) {
            this.vertices.push(Math.cos(ang * m) * Math.sin(Math.PI / 2 - vert * i),
                Math.sin(ang * m) * Math.sin(Math.PI / 2 - vert * i), Math.sin(vert * i));
            this.normals.push(Math.cos(ang * m) * Math.sin(Math.PI / 2 - vert * i),
                Math.sin(ang * m) * Math.sin(Math.PI / 2 - vert * i), Math.sin(vert * i));
        }
    }

    //Indices
    for (var j = 0; j < this.stacks; j++) {
        for (var i = 0; i < (this.slices); i += 1) {
            this.indices.push((i + 1) % (this.slices) + j * this.slices,
                i % (this.slices) + (j + 1) * this.slices,
                i % (this.slices) + j * this.slices);

            this.indices.push(i % (this.slices) + (j + 1) * this.slices,
                (i + 1) % (this.slices) + j * this.slices,
                (i + 1) % (this.slices) + (j + 1) * this.slices);
        }

    }

    var s = 0;
    var t = 1;


    for (var i = 0; i <= this.stacks; i++) {
        for (var m = 0; m < this.slices; m++) {
            this.texCoords.push(s, t);
            s += this.Sinc;
        }
        s = 0;
        t -= this.Tinc;
    }

    this.initialTexCoords = this.texCoords;

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

Semisphere.prototype.updateTexCoords = function(length_s, length_t) {

    if (length_s != 1 || length_t != 1) {
        for (let i = 0; i < this.initialTexCoords.length; i += 2) {
            this.texCoords[i] = this.initialTexCoords[i] / length_s;
            this.texCoords[i + 1] = this.initialTexCoords[i + 1] / length_t;
        }
    }


    this.updateTexCoordsGLBuffers();
};
