function vehicle(scene) {
    CGFobject.call(this, scene);

    var droneTopVertexes = [
        [
            [-3.0, 0, 0.0, 1],
            [-2, 1, 0.0, 1],
            [-1.5, -.5, 0.0, 1],
            [2.5, .5, 0.0, 1],
            [3, 0, 0.0, 1]

        ],
        [
            [-3, 0, 0, 1],
            [-2, 0.25, 2, 1],
            [-1.5, 0.25, -1, 1],
            [2.5, 0.25, 1.5, 1],
            [3, 0, 0.0, 1]
        ],
        [
            [-3, 0, 0, 1],
            [-2, -0.25, 2, 1],
            [-1.5, -0.25, -1, 1],
            [2.5, -0.25, 1.5, 1],
            [3, 0, 0.0, 1]
        ],
        [
            [-3.0, 0, 0.0, 1],
            [-2, -1, 0.0, 1],
            [-1.5, .5, 0.0, 1],
            [2.5, -.5, 0.0, 1],
            [3, 0, 0.0, 1]
        ]
    ]

    this.droneTop = new Patch(scene, 3, 4, 20, 20, droneTopVertexes);

    this.initBuffers();
};

vehicle.prototype = Object.create(CGFobject.prototype);
vehicle.prototype.constructor = vehicle;

vehicle.prototype.display = function() {

    this.pushMatrix();
    this.droneTop.display();
    this.popMatrix();

};

vehicle.prototype.updateTexCoords = function(length_s, length_t) {

    if (length_s != 1 || length_t != 1) {
        this.droneTop.updateTexCoords(length_s, length_t);
    }

};
