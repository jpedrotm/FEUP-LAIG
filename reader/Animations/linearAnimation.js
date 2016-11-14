function linearAnimation(scene, id, span, controlPoints) {

    animation.call(this, scene, id, span);

    this.currTime = 0;
    this.currDistance = 0;
    this.totalDistance = 0;
    this.Indice = 0;
    this.distanceEachPoints = [];
    this.timeEachPoints = [];
    this.vectors = [];
    this.lastTime;

    this.subtractTime = 0;

    this.initVariables();

    this.ang = Math.atan(this.vectors[this.Indice].x / this.vectors[this.Indice].z);



    this.speed = this.totalDistance / span;


}

linearAnimation.prototype = Object.create(animation.prototype);
linearAnimation.prototype.constructor = linearAnimation;

linearAnimation.prototype.initVariables(lastTime) {

    var tmpDis = 0;
    var tmpVec;

    this.lastTime = lastTime;

    for (var i = 0; i < this.controlPoints.length - 1; i++) {

        tmpDis += sqrt(Math.pow(this.controlPoints[i + 1].x - this.controlPoints[i].x) + Math.pow(this.controlPoints[i + 1].x - this.controlPoints[i].x) + Math.pow(this.controlPoints[i + 1].x - this.controlPoints[i].x));
        tmpVec = new Point(this.controlPoints[i + 1].x - this.controlPoints[i].x, this.controlPoints[i + 1].y - this.controlPoints[i].y, this.controlPoints[i + 1].z - this.controlPoints[i].z, null);
        this.distanceEachPoints.push(tmpDis);
        this.vectors.push(tmpVec);
        this.totalDistance += tmpDis;

    }

    for (var i = 0; i < this.distanceEachPoints.length; i++) {
        this.timeEachPoints.push(this.distanceEachPoints[i] * this.totalDistance / this.span);
    }

};

linearAnimation.prototype.animate(time) {

    var difTime = (time - this.lastTime);

    this.lastTime = time;

    this.currTime += difTime;

    if (this.currTime >= this.span) {
        return;
    } else {
        if (this.currTime >= this.timeEachPoints[this.Indice]) {
            this.Indice++;
            this.subtractTime = this.timeEachPoints[this.Indice - 1];

            this.ang = Math.atan(this.vectors[this.Indice].x / this.vectors[this.Indice].z);
        }

        var minTime;
        var maxTime;

        if (this.Indice == 0) {
            maxTime = this.timeEachPoints[this.Indice];
            minTime = 0;
        } else {
            maxTime = this.timeEachPoints[this.Indice];
            minTime = this.timeEachPoints[this.Indice - 1];
        }

        var percentage = (this.currTime - minTime) / maxTime;


        var x = this.vectors[this.Indice].x * percentage;
        var y = this.vectors[this.Indice].y * percentage;
        var z = this.vectors[this.Indice].z * percentage;

        this.scene.translate(this.controlPoints[this.Indice].x + x, this.controlPoints[this.Indice].y + y, this.controlPoints[this.Indice].z + z);

        this.scene.rotate(this.ang, 0, 1, 0);

    }

};
