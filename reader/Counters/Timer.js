/**
 *  Class Timer, displays player score
 *  @param CGFscene
 */
function Timer(scene) {

    CGFobject.call(this, scene);
    this.scene = scene;

    this.secondsUnits = 0;
    this.secondsDozens = 0;
    this.minutesUnits = 0;
    this.minutesDozens = 0;

    this.secondsUnitsObj = new Obj(scene, 'scenes/3dObjects/numbers/0.obj');
    this.secondsDozensObj = new Obj(scene, 'scenes/3dObjects/numbers/0.obj');
    this.minutesUnitsObj = new Obj(scene, 'scenes/3dObjects/numbers/0.obj');
    this.minutesDozensObj = new Obj(scene, 'scenes/3dObjects/numbers/0.obj');
    this.board = new Cube(scene, 24, 35, 4);

    this.scene.backgroundAppearance = new CGFappearance(this.scene);
    this.scene.backgroundAppearance.setAmbient(0.34, 0.18, 0.055, 0.4);
    this.scene.backgroundAppearance.setDiffuse(1.0, 1.0, 1.0, 0.4);
    this.scene.backgroundAppearance.setSpecular(1.0, 1.0, 1.0, 0.4);
    this.scene.backgroundAppearance.setShininess(1);
    this.scene.backgroundAppearance.loadTexture('/reader/scenes/img/wood1.jpg');

    this.secondsUnitsAngle = 0;
    this.secondsDozensAngle = 0;
    this.minutesUnitsAngle = 0;
    this.minutesDozensAngle = 0;


    this.secondsAnimateUnits = false;
    this.secondsAnimateDozens = false;
    this.minutesAnimateUnits = false;
    this.minutesAnimateDozens = false;

}

Timer.prototype = Object.create(CGFobject.prototype);
Timer.prototype.constructor = Timer;

/**
 * Updates the dozens and units Timer
 * @param {int} points amount of points to be added
 */
Timer.prototype.increase = function() {

    if(this.secondsUnits + 1 < 10){
      this.secondsUnits++;
      this.secondsAnimateUnits=true;
    }else if(this.secondsDozens+1<6){
      this.secondsDozens++;
      this.secondsUnits=0;
      this.secondsAnimateUnits=true;
      this.secondsAnimateDozens=true;
    }else if(this.minutesUnits+1<10){
      this.secondsUnits=0;
      this.secondsDozens=0;
      this.minutesUnits++;
      this.secondsAnimateUnits=true;
      this.secondsAnimateDozens=true;
      this.minutesAnimateUnits=true;
    }else{
      this.secondsUnits=0;
      this.secondsDozens=0;
      this.minutesUnits=0;
      this.minutesDozens++;
      this.secondsAnimateUnits=true;
      this.secondsAnimateDozens=true;
      this.minutesAnimateUnits=true;
      this.minutesAnimateDozens=true;
    }

    this.secondsUnitsObj = new Obj(this.scene, 'scenes/3dObjects/numbers/' + this.secondsUnits + '.obj');
    this.secondsDozensObj = new Obj(this.scene, 'scenes/3dObjects/numbers/' + this.secondsDozens + '.obj');
    this.minutesUnitsObj = new Obj(this.scene, 'scenes/3dObjects/numbers/' + this.minutesUnits + '.obj');
    this.minutesDozensObj = new Obj(this.scene, 'scenes/3dObjects/numbers/' + this.minutesDozens + '.obj');

};

/**
 * displays the Timers and deals with their animation
 */
Timer.prototype.display = function() {

    if (this.secondsAnimateUnits === true) {
        this.secondsUnitsAngle += 20;
    }
    if (this.secondsAnimateDozens === true)
        this.secondsDozensAngle += 20;

    if (this.secondsDozensAngle > 350) {
        this.secondsAnimateDozens = false;
        this.secondsDozensAngle = 0;
    }
    if (this.secondsUnitsAngle > 350) {
        this.secondsAnimateUnits = false;
        this.secondsUnitsAngle = 0;
    }
    if (this.minutesAnimateUnits === true) {
        this.minutesUnitsAngle += 20;
    }
    if (this.minutesAnimateDozens === true)
        this.minutesDozensAngle += 20;

    if (this.minutesDozensAngle > 350) {
        this.minutesAnimateDozens = false;
        this.minutesDozensAngle = 0;
    }
    if (this.minutesUnitsAngle > 350) {
        this.minutesAnimateUnits = false;
        this.minutesUnitsAngle = 0;
    }

    this.scene.pushMatrix();
    this.scene.backgroundAppearance.apply();
    this.scene.scale(0.05, 0.05, 0.05);

    this.scene.pushMatrix();
    this.scene.rotate(this.secondsDozensAngle * Math.PI / 180, 1, 0, 0);
    this.secondsDozensObj.display();
    this.scene.pushMatrix();
    this.scene.translate(8, 13, 0);
    this.board.display();
    this.scene.popMatrix();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(this.secondsUnitsAngle * Math.PI / 180, 1, 0, 0);
    this.scene.translate(26, 0, 0);
    this.secondsUnitsObj.display();
    this.scene.pushMatrix();
    this.scene.translate(8, 13, 0);
    this.board.display();
    this.scene.popMatrix();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-50,0,0);
    this.scene.pushMatrix();
    this.scene.rotate(this.minutesDozensAngle * Math.PI / 180, 1, 0, 0);
    this.minutesDozensObj.display();
    this.scene.pushMatrix();
    this.scene.translate(8, 13, 0);
    this.board.display();
    this.scene.popMatrix();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(this.minutesUnitsAngle * Math.PI / 180, 1, 0, 0);
    this.scene.translate(26, 0, 0);
    this.minutesUnitsObj.display();
    this.scene.pushMatrix();
    this.scene.translate(8, 13, 0);
    this.board.display();
    this.scene.popMatrix();
    this.scene.popMatrix();
    this.scene.popMatrix();

    this.scene.popMatrix();



};
