function Vehicle(scene) {
    CGFobject.call(this, scene);
    this.scene = scene;
    var droneTopVertexes = [
        [-3.0, 0, 0.0, 1],
        [-2, 1.25, 0.0, 1],
        [-1.5, -.75, 0.0, 1],
        [2.5, 0.75, 0.0, 1],
        [3, 0, 0.0, 1],
        [-3, 0, 0, 1],
        [-2, 0.5, 2.5, 1],
        [-1.5, 0.5, -1.5, 1],
        [2.5, 0.5, 1.5, 1],
        [3, 0, 0.0, 1],
        [-3, 0, 0, 1],
        [-2, -0.5, 2.5, 1],
        [-1.5, -0.5, -1.5, 1],
        [2.5, -0.5, 1.5, 1],
        [3, 0, 0.0, 1],
        [-3.0, 0, 0.0, 1],
        [-2, -1.25, 0.0, 1],
        [-1.5, .75, 0.0, 1],
        [2.5, -0.75, 0.0, 1],
        [3, 0, 0.0, 1]
    ];

    this.droneTop = new Patch(scene, 3, 4, 20, 20, droneTopVertexes);
    this.droneBottom = new Patch(scene, 3, 4, 20, 20, droneTopVertexes);
    this.wing = new Cylinder(scene, 3, 1, 10, 20, 20);
    this.initBuffers();
};

Vehicle.prototype = Object.create(CGFobject.prototype);
Vehicle.prototype.constructor = Vehicle;

Vehicle.prototype.display = function() {

    this.scene.pushMatrix();
    this.droneTop.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI, -1, 0, 0);
    this.scene.scale(1, 1, 0.5);
    this.droneTop.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI / 2, -1, 0, 0);
    this.scene.rotate(Math.PI / 40, 1, 0, 0);
    this.scene.scale(0.15, 0.025, 0.4);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.rotate(Math.PI / 40, -1, 0, 0);
    this.scene.scale(0.15, 0.025, 0.4);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI / 2, -1, 0, 0);
    this.scene.rotate(Math.PI / 4, 1, 0, 0);
    this.scene.scale(0.05, 0.025, 0.15);
    this.scene.translate(45, 0, 0);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.rotate(Math.PI / 4, -1, 0, 0);
    this.scene.scale(0.05, 0.025, 0.15);
    this.scene.translate(45, 0, 0);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.scale(0.05, 0.025, 0.07);
    this.scene.translate(45, 0, 0);
    this.wing.display();
    this.scene.popMatrix();

};

Vehicle.prototype.updateTexCoords = function(length_s, length_t) {

    if (length_s != 1 || length_t != 1) {
        this.droneTop.updateTexCoords(length_s, length_t);
    }

};;
