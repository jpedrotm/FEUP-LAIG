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

    this.minS = 0;
    this.minT = 0;
    this.maxS = 1;
    this.maxT = 1;

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

    var ab = Math.sqrt(Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2) + Math.pow(this.z2 - this.z1, 2));
    var bc = Math.sqrt(Math.pow(this.x2 - this.x3, 2) + Math.pow(this.y2 - this.y3, 2) + Math.pow(this.z2 - this.z3, 2));
    var ac = Math.sqrt(Math.pow(this.x1 - this.x3, 2) + Math.pow(this.y1 - this.y3, 2) + Math.pow(this.z1 - this.z3, 2));
    var beta = Math.acos((Math.pow(bc, 2) + Math.pow(ab, 2) - Math.pow(ac, 2)) / (2 * ab * bc));

    this.texCoords = [
        this.maxS, this.minT,
        this.minS, this.minT,
        (ab - bc * Math.cos(beta)) / ab, bc * Math.sin(beta) / ab
    ];



    this.initGLBuffers();
};
