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

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.enableTextures(true);
    this.infoLights=[];
    this.axis = new CGFaxis(this);
};

XMLscene.prototype.initLights = function() {

  this.lights[0].setPosition(10, 10, 10, 1);
  this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
  this.lights[0].update();

};

XMLscene.prototype.graphLights = function(){

  console.log("GRAPH LIGHTS: "+this.graph.omniLights.length);

  console.log("AQUIIIIII: "+this.lights.length);

  var lightsIndice=0;

  for(var i=0;i<this.graph.omniLights.length;i++)
  {

    var omniLight=this.graph.omniLights[i];

    this.lights[i].setPosition(omniLight.location.x, omniLight.location.y, omniLight.location.z, omniLight.location.w);
    this.lights[i].setAmbient(omniLight.ambient.r, omniLight.ambient.g, omniLight.ambient.b, omniLight.ambient.a);
    this.lights[i].setDiffuse(omniLight.diffuse.r, omniLight.diffuse.g, omniLight.diffuse.b, omniLight.diffuse.a);
    this.lights[i].setSpecular(omniLight.specular.r, omniLight.specular.g, omniLight.specular.b, omniLight.specular.a);

    console.log(omniLight.location.x+","+omniLight.location.y+","+omniLight.location.z+","+omniLight.location.w)

    console.log("ENABLE: "+omniLight.enable);

    if (omniLight.enable){
      this.lights[i].enable();
    }
    else if(omniLight.enable){
      this.lights[i].disable();
    }


      this.lights[i].setVisible(true);
      this.lights[i].update();

      this.infoLights.push(omniLight.enable);
      this.interface.addLight(i,omniLight.id);

      lightsIndice++;

  }

  for(var i=0;i<this.graph.spotLights.length;i++)
  {
    var spotLight=this.graph.spotLights[i];

    this.lights[lightsIndice].setPosition(spotLight.location.x,spotLight.location.y,spotLight.location.z,1);
    this.lights[lightsIndice].setSpotExponent(spotLight.exponent);
    this.lights[lightsIndice].setSpotDirection(spotLight.target.x, spotLight.target.y, spotLight.target.z);
    this.lights[lightsIndice].setAmbient(spotLight.ambient.r,spotLight.ambient.g,spotLight.ambient.b,spotLight.ambient.a);
    this.lights[lightsIndice].setDiffuse(spotLight.diffuse.r, spotLight.diffuse.g, spotLight.diffuse.b, spotLight.diffuse.a);
    this.lights[lightsIndice].setSpecular(spotLight.specular.r, spotLight.specular.g, spotLight.specular.b, spotLight.specular.a);

    console.log("ENABLED: "+spotLight.enable);

    if (spotLight.enable){
      console.log("ENTROU SPOT");
      this.lights[lightsIndice].enable();
    }
    else if(spotLight.enable){
      this.lights[lightsIndice].disable();
    }


      this.lights[lightsIndice].setVisible(true);
      this.lights[lightsIndice].update();

      this.infoLights.push(spotLight.enable);
      this.interface.addLight(lightsIndice,spotLight.id);

      console.log("UPDATE LIGHTS");

      lightsIndice++;

  }



};

XMLscene.prototype.updateLights = function () {

  for (var i = 0; i < this.infoLights.length; i++) {
    if(this.infoLights[i])
      this.lights[i].enable();
    else
      this.lights[i].disable();

      this.lights[i].update();
  }

};


XMLscene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(150, 150, 150), vec3.fromValues(0, 0, 0));
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
    this.lights[0].setVisible(true);
    this.lights[0].enable();

    this.graphLights();
};

XMLscene.prototype.updateView = function() {

    console.log("VIEW: " + this.graph.viewDefault + ", ENTROU: " + this.graph.perspectives.length);
    this.camera = new CGFCamera(0.4, 0.1, 500, vec3.fromValues(15, 0, 0), vec3.fromValues(0, 0, 0));
    this.interface.setActiveCamera(this.camera);

    /*var length=this.graph.perspectives.length;
  var tempViewDefault=this.graph.viewDefault;

  if(tempViewDefault>=length){
    this.graph.viewDefault=1;
  }
else if(tempViewDefault<1){
  this.graph.viewDefault=1;
}
else{
  this.graph.viewDefault=this.graph.viewDefault+1;
}*/

};

XMLscene.prototype.display = function() {
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
        this.graph.display();
    };
};
