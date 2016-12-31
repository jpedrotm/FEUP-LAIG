/**
 * Plane calss
 * @param {CGFscene} scene
 * @param {int} dimX   Dimension on x
 * @param {int} dimY   Dimension on Y
 * @param {int} partsX number of parts on X
 * @param {int} partsY number of parts on y
 */
function Plane(scene, dimX, dimY, partsX, partsY) {

    var knots1 = this.getKnotsVector(1);
    var knots2 = this.getKnotsVector(1);
    xMin = -dimX / 2;
    yMin = -dimY / 2;
    xMax = dimX / 2;
    yMax = dimY / 2;
    this.controlvertexes = [ // U = 0
        [ // V = 0..1;
            [xMin, yMin, 0, 1],
            [xMin, yMax, 0, 1]
        ],
        // U = 1
        [ // V = 0..1
            [xMax, yMin, 0, 1],
            [xMax, yMax, 0, 1]
        ]
    ];

    this.nurbsSurface = new CGFnurbsSurface(1, 1, knots1, knots2, this.controlvertexes);
    getSurfacePoint = function(u, v) {
        return this.nurbsSurface.getPoint(u, v);
    };
    CGFnurbsObject.call(this, scene, getSurfacePoint, partsX, partsY);
}

Plane.prototype = Object.create(CGFnurbsObject.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.getKnotsVector = function(degree) {

    var v = new Array();
    for (var i = 0; i <= degree; i++) {
        v.push(0);
    }
    for (var i = 0; i <= degree; i++) {
        v.push(1);
    }
    return v;
}

Plane.prototype.display = function() {
    this.scene.pushMatrix();
    CGFnurbsObject.prototype.display.call(this);
    this.scene.popMatrix();
}

Plane.prototype.updateTexCoords = function(length_s, length_t) {

};
