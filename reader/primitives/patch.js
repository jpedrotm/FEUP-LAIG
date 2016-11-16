function Patch(scene, degree1, degree2, partsX, partsY, controlPoints) {

    this.scene = scene;

    this.knots1 = this.getKnotsVector(degree1);
    this.knots2 = this.getKnotsVector(degree2);


    this.vertexes = [];
    this.getVertexes(degree1, degree2, controlPoints);
    console.log(degree1);
    console.log(degree2);
    console.log(this.knots1);
    console.log(this.knots2);
    console.log(controlPoints);
    console.log(this.vertexes);
    this.nurbsSurface = new CGFnurbsSurface(degree1, degree2, this.knots1, this.knots2, this.vertexes);

    getSurfacePoint = function(u, v) {
        return this.nurbsSurface.getPoint(u, v);
    };


    CGFnurbsObject.call(this, this.scene, getSurfacePoint, partsX, partsY);
}

Patch.prototype = Object.create(CGFnurbsObject.prototype);
Patch.prototype.constructor = Patch;

Patch.prototype.getVertexes = function(order1, order2, controlPoints) {
    var pos = 0;

    for (var i = 0; i < order1 + 1; i++) {
        var group = [];
        for (var j = 0; j < order2 + 1; j++) {
            group.push(controlPoints[pos]);
            pos++;
        }
        this.vertexes.push(group);
    }
};

Patch.prototype.getKnotsVector = function(degree) {

    var v = new Array();
    for (var i = 0; i <= degree; i++) {
        v.push(0);
    }
    for (var i = 0; i <= degree; i++) {
        v.push(1);
    }
    return v;
};

Patch.prototype.display = function() {
    //this.scene.pushMatrix();
    CGFnurbsObject.prototype.display.call(this);
    //this.scene.popMatrix();
};

Patch.prototype.updateTexCoords = function(length_s, length_t) {

};
