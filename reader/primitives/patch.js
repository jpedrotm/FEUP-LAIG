function Patch(scene, degree1, degree2, dimX, dimY, partsX, partsY, controlPoints) {

    var knots1 = this.getKnotsVector(degree1);
    var knots2 = this.getKnotsVector(degree2);
    xMin = -dimX / 2;
    yMin = -dimY / 2;
    xMax = dimX / 2;
    yMax = dimY / 2;

    getSurfacePoint = function(u, v) {
        return nurbsSurface.getPoint(u, v);
    };
    this.nurbSurface = new CGFnurbSurface(degree1, degree2, knots1, knots2, controlPoints);

    CGFnurbsObject.call(this, getSurfacePoint, partsX, partsY);
}
