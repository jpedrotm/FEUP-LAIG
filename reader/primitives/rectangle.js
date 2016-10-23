/**
 * MyObject
 * @constructor
 */
function Rectangle(scene, minX, minY, maxX, maxY) {
    CGFobject.call(this, scene);

    this.minS = 0;
    this.maxS = 1;
    this.minT = 0;
    this.maxT = 1;

    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;

    this.initBuffers();
};

Rectangle.prototype = Object.create(CGFobject.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.initBuffers = function() {

    this.vertices = [
        this.minX, this.minY, 0,
        this.maxX, this.minY, 0,
        this.minX, this.maxY, 0,
        this.maxX, this.maxY, 0
    ];

    this.indices = [
        0, 1, 2,
        3, 2, 1
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;

    this.normals = [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1
    ];

    this.texCoords = [
        this.maxS, this.minT,
        this.maxS, this.maxT,
        this.minS, this.minT,
        this.minS, this.maxT
    ];



    this.initGLBuffers();

};