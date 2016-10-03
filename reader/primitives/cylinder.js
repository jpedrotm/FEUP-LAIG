/**
 * Cylinder
 * @constructor
 */
function Cylinder(scene, base, top, height, slices, stacks) {
    CGFobject.call(this, scene);

    //if slices not define, set to 6
    slices = typeof slices !== 'undefined' ? slices : 6;

    //if stacks not define, set to 5
    stacks = typeof stacks !== 'undefined' ? stacks : 5;

    this.slices = parseInt(slices);
    this.stacks = parseInt(stacks);
    this.base = parseInt(base);
    this.top = parseInt(top);
    this.height = parseInt(height);
    this.deltaHeight = this.height / this.stacks;
    this.delta = (this.top - this.base) / this.stacks;

    this.initBuffers();
};

Cylinder.prototype = Object.create(CGFobject.prototype);
Cylinder.prototype.constructor = Cylinder;

Cylinder.prototype.initBuffers = function() {

    //TODO: add top and bottom face

    //Sets the number os sides;
    var sides = this.slices;
    var stacks = this.stacks;

    var n = 2 * Math.PI / sides;

    this.vertices = [];
    this.normals = [];
    this.indices = [];
    this.texCoords = [];

    for (var q = 0; q < this.stacks + 1; q++) {

        var z = (q * this.deltaHeight / this.stacks);
        var inc = ((q + 1) * this.delta) + this.base;

        for (var i = 0; i < sides; i++) {
            this.vertices.push(inc * Math.cos(i * n), inc * Math.sin(i * n), q * this.deltaHeight);
            this.normals.push(Math.cos(i * n), Math.sin(i * n), 0);
            this.texCoords.push(0.5 * i / sides, 0.5 * i / sides, 0);
            this.texCoords.push(0.5 * i / sides, 0.5 * i / sides, z);
        }

    }


    for (var q = 0; q < this.stacks; q++) {
        for (var i = 0; i < sides; i++) {
            this.indices.push(this.slices * q + i, this.slices * q + i + 1, this.slices * (q + 1) + i);
            this.indices.push(this.slices * q + i + 1, this.slices * q + i, this.slices * (q + 1) + i);
            if (i != (this.slices - 1)) {
                this.indices.push(this.slices * (q + 1) + i + 1, this.slices * (q + 1) + i, this.slices * q + i + 1);
                this.indices.push(this.slices * (q + 1) + i, this.slices * (q + 1) + i + 1, this.slices * q + i + 1);
            } else {
                this.indices.push(this.slices * q, this.slices * q + i + 1, this.slices * q + i);
                this.indices.push(this.slices * q + i + 1, this.slices * q, this.slices * q + i);
            }


        }

    }






    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
};
