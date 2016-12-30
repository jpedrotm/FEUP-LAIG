/**
 * XMLscene.
 * @constructor
 */
function XMLscene(myInterface) {
    CGFscene.call(this);

    this.interface = myInterface;
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.initLights();

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0)

    this.woodMaterial=new CGFappearance(this);
    this.woodMaterial.setAmbient(0.4,0.2,0,0.8);
    this.woodMaterial.setDiffuse(0.4,0.2,0,0.8);
    this.woodMaterial.setSpecular(0.4,0.2,0,0.8);
    this.woodMaterial.setShininess(10);

    this.whiteWoodMaterial= new CGFappearance(this);
    this.whiteWoodMaterial.setAmbient(0.71,0.61,0.29,0.8);
    this.whiteWoodMaterial.setDiffuse(0.71,0.61,0.29,0.8);
    this.whiteWoodMaterial.setSpecular(0.71,0.61,0.29,0.8);
    this.whiteWoodMaterial.setShininess(10);

    this.queenMaterial = new CGFappearance(this);
    this.queenMaterial.setAmbient(0.8,0,0,1);
    this.queenMaterial.setDiffuse(0.8,0,0,1);
    this.queenMaterial.setSpecular(0.8,0,0,1);
    this.queenMaterial.setShininess(20);

    this.droneMaterial = new CGFappearance(this);
    this.droneMaterial.setAmbient(0,0.8,0,1);
    this.droneMaterial.setDiffuse(0,0.8,0,1);
    this.droneMaterial.setSpecular(0,0.8,0,1);
    this.droneMaterial.setShininess(20);

    this.pawnMaterial = new CGFappearance(this);
    this.pawnMaterial.setAmbient(0,0,0.8,1);
    this.pawnMaterial.setDiffuse(0,0,0.8,1);
    this.pawnMaterial.setSpecular(0,0,0.8,1);
    this.pawnMaterial.setShininess(20);

    this.pickedMaterial = new CGFappearance(this);
    this.pickedMaterial.setAmbient(0,0,0.0,1);
    this.pickedMaterial.setDiffuse(0,0,0.0,1);
    this.pickedMaterial.setSpecular(0,0,0.0,1);
    this.pickedMaterial.setShininess(20);


    this.selectedMaterial = new CGFappearance(this);
    this.selectedMaterial.setAmbient(0.1,0.1,0.1,1);
    this.selectedMaterial.setDiffuse(0.1,0.1,0.1,1);
    this.selectedMaterial.setSpecular(0.1,0.1,0.1,1);
    this.selectedMaterial.setShininess(20);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.enableTextures(true);
    this.infoLights=[];
    this.lastTime=(new Date()).getTime();
    this.axis = new CGFaxis(this)
    this.setUpdatePeriod(30);

    //animações das camaras
    this.gameCameraAnimation=null;
    this.initialPosition;
    this.finalPosition;
    this.initialTarget;
    this.finalTarget;
    this.cameraTransitionsAnimation=null;

    //Variaveis para estado do jogo
    this.gameMode=false;
    this.replayHistory=null;

    this.gameDifficulty= new gameDifficulty();
    this.gameDifficultyList=new Array();

    this.gameDifficultyList["Easy"]=1;
    this.gameDifficultyList["Hard"]=2;

    //ambiente de jogo
    this.environment=new Environment(this);

    this.game = null;
    this.setPickEnabled(true);
};

XMLscene.prototype.makeTransition=function(){

  console.log("ENTROU MAKE");

  if(this.gameMode)
  {
    if(this.game.playing==='player2')
    {
      this.initialPosition=new Point(0,30,35,null);
    }
    else if(this.game.playing==='player1')
    {
      this.initialPosition=new Point(0,30,-35,null);
    }

    this.initialTarget=new Point(0,0,0,null);
    this.finalPosition=new Point(40,5,0,null);
    this.finalTarget=new Point(-15,5,0,null);
  }
  else {
    this.initialPosition=new Point(40,5,0,null);
    this.finalPosition=new Point(0,30,-35,null);
    this.initialTarget=new Point(-15,5,0,null);
    this.finalTarget=new Point(0,0,0,null);
  }

  this.cameraTransitionsAnimation=new cameraTransitionsAnimation(this,this.initialPosition,this.initialTarget,this.finalPosition,this.finalTarget);

};

XMLscene.prototype.initLights = function() {

    this.lights[0].setPosition(10, 10, 10, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].update();

};
/**
 * Function that loads the lights from the graph to XMLscene and the interface.
 */
XMLscene.prototype.graphLights = function() {

    var lightsIndice = 0;

    for (var i = 0; i < this.graph.omniLights.length; i++) {

        var omniLight = this.graph.omniLights[i];

        this.lights[i].setPosition(omniLight.location.x, omniLight.location.y, omniLight.location.z, omniLight.location.w);
        this.lights[i].setAmbient(omniLight.ambient.r, omniLight.ambient.g, omniLight.ambient.b, omniLight.ambient.a);
        this.lights[i].setDiffuse(omniLight.diffuse.r, omniLight.diffuse.g, omniLight.diffuse.b, omniLight.diffuse.a);
        this.lights[i].setSpecular(omniLight.specular.r, omniLight.specular.g, omniLight.specular.b, omniLight.specular.a);

        console.log(omniLight.location.x + "," + omniLight.location.y + "," + omniLight.location.z + "," + omniLight.location.w)

        console.log("ENABLE: " + omniLight.enable);

        if (omniLight.enable) {
            this.lights[i].enable();
        } else if (omniLight.enable) {
            this.lights[i].disable();
        }


        this.lights[i].setVisible(true);
        this.lights[i].update();

        this.infoLights.push(omniLight.enable);
        this.interface.addLight(i, omniLight.id);

        lightsIndice++;

    }

    for (var i = 0; i < this.graph.spotLights.length; i++) {
        var spotLight = this.graph.spotLights[i];

        this.lights[lightsIndice].setPosition(spotLight.location.x, spotLight.location.y, spotLight.location.z, 1);
        this.lights[lightsIndice].setSpotExponent(spotLight.exponent);
        this.lights[lightsIndice].setSpotDirection(spotLight.target.x - spotLight.location.x, spotLight.target.y - spotLight.location.y, spotLight.target.z - spotLight.location.z);
        this.lights[lightsIndice].setAmbient(spotLight.ambient.r, spotLight.ambient.g, spotLight.ambient.b, spotLight.ambient.a);
        this.lights[lightsIndice].setDiffuse(spotLight.diffuse.r, spotLight.diffuse.g, spotLight.diffuse.b, spotLight.diffuse.a);
        this.lights[lightsIndice].setSpecular(spotLight.specular.r, spotLight.specular.g, spotLight.specular.b, spotLight.specular.a);


        if (spotLight.enable) {
            this.lights[lightsIndice].enable();
        } else if (spotLight.enable) {
            this.lights[lightsIndice].disable();
        }


        this.lights[lightsIndice].setVisible(true);
        this.lights[lightsIndice].update();

        this.infoLights.push(spotLight.enable);
        this.interface.addLight(lightsIndice, spotLight.id);

        console.log("UPDATE LIGHTS");

        lightsIndice++;

    }



};
/**
 * Function called in display to verify if a light should be on or off.
 */
XMLscene.prototype.updateLights = function() {

    for (var i = 0; i < this.infoLights.length; i++) {
        if (this.infoLights[i])
            this.lights[i].enable();
        else
            this.lights[i].disable();

        this.lights[i].update();
    }

};
/**
 * Function called every time that the keys m/M are pressed, to switch the material of each component.
 */
XMLscene.prototype.switchMaterials = function() {

    for (component in this.graph.composedObjects) {
        var matsLength = this.graph.composedObjects[component].materials.length;
        var currI = this.graph.composedObjects[component].currMatIndice;

        console.log("COMPONENT: " + this.graph.composedObjects[component].materials.length);


        if (currI === matsLength - 1) {
            currI = 0;
        } else {
            currI++;
        }

        this.graph.composedObjects[component].currMatIndice = currI;

        console.log("INDICE: " + this.graph.composedObjects[component].currMatIndice);

    }

};

XMLscene.prototype.initCameras = function() {
    this.camera = new CGFcamera(60*Math.PI/180, 0.1, 500, vec3.fromValues(150, 150, 150), vec3.fromValues(0, 0, 0));
};

XMLscene.prototype.setDefaultAppearance = function() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
};

// Handler called when the graph is finally loaded.
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.clearColor(this.graph.background.r, this.graph.background.g, this.graph.background.b, this.graph.background.a);
    this.setGlobalAmbientLight(this.graph.ambient.r, this.graph.ambient.g, this.graph.ambient.b, this.graph.ambient.a);
    this.axis = new CGFaxis(this, this.graph.axis_length, 0.2);
    this.graphViews();
    this.graphLights();
    this.camera.setPosition(vec3.fromValues(40,5,0));
    this.camera.setTarget(vec3.fromValues(-15,5,0));
};
/**
 * Function that loads the initial camera to XMLscene.
 */
XMLscene.prototype.graphViews = function() {

    var tempIndice = this.graph.viewsIndice;

    this.camera = this.graph.perspectives[tempIndice].camera;
    this.interface.setActiveCamera(this.camera);

};
/**
 * Switch the view every time the keys v/V are pressed.
 */
XMLscene.prototype.switchView = function() {

    var tempIndice = this.graph.viewsIndice;
    var numCameras = this.graph.perspectives.length;

    if (tempIndice == numCameras - 1) {
        this.graph.viewsIndice = 0;
    } else {
        this.graph.viewsIndice++;
    }

    tempIndice = this.graph.viewsIndice;

    this.camera = this.graph.perspectives[tempIndice].camera;
    this.interface.setActiveCamera(this.camera);

};

XMLscene.prototype.undo=function(){

  if(this.gameMode){
    this.game.undo();
  }

};

XMLscene.prototype.replay=function(){

};

XMLscene.prototype.stopReplay=function(){

};

XMLscene.prototype.quitGame=function(){

  //Colocar aqui a tabuleta a dizer o vencedor em vez dos prints por a tabuleta a dizer o vencedor e a mostrar os pontos

  if(this.gameMode){
    if(this.game.playing==='player1')
    {
      console.log('Player 2 Win !');
    }
    else if(this.game.playing==='player2')
    {
      console.log('Player 1 Win !');
    }

    this.makeTransition();

    this.gameMode=false;

    this.replayHistory=this.game.gameHistory;

    this.game=null;

  }

};

XMLscene.prototype.display = function() {

  this.clearPickRegistration();

    // ---- BEGIN Background, camera and axis setup

    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    this.axis.display();


    this.setDefaultAppearance();

    // ---- END Background, camera and axis setup

    // it is important that things depending on the proper loading of the graph
    // only get executed after the graph has loaded correctly.
    // This is one possible way to do it
    if (this.graph.loadedOk) {
        this.lights[0].update();
        this.updateLights();
        //this.graph.display();
    }

    this.environment.display();

    if(this.gameMode)
    {
      this.pushMatrix();
      this.game.display();
      this.popMatrix();
    }

};

XMLscene.prototype.updateCameras=function(time){

  if(this.gameMode){
    if(this.game.switchTurn)
    {
      this.gameCameraAnimation=new cameraAnimation(this,this.game.playing);
      this.game.switchTurn=false;
    }

    if(this.gameCameraAnimation!=null)
    {
      console.log("Updating");
      this.gameCameraAnimation.updateAnimation(time);
    }
  }

  if(this.cameraTransitionsAnimation!=null)
  {
    console.log("Transition");
    this.cameraTransitionsAnimation.updateAnimation(time);
  }

};

XMLscene.prototype.update = function(currTime) {

  if(this.gameMode){
    this.game.update(currTime-this.lastTime);
  }

  this.updateCameras(currTime-this.lastTime);

  //this.moveAnimation.updateAnimation(currTime-this.lastTime);

    /*if (this.graph.isValid) {
        this.graph.updateAnimation(this.graph.root, currTime - this.lastTime);
    }*/

    this.lastTime = currTime;
};

var gameDifficulty=function(){
	this.difficulty = "Easy";
};
