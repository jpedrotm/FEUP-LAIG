/**
 * MyInterface
 * @constructor
 */


function MyInterface() {

	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;


MyInterface.prototype.init = function(application) {

	CGFinterface.prototype.init.call(this, application);

	this.gui = new dat.GUI();

	this.lights = this.gui.addFolder("Lights");
  this.lights.open();

  return true;
};


MyInterface.prototype.processKeyDown = function(event) {


	switch (event.keyCode)
	{
    case (86):
      this.scene.switchView();
      break;
		case (118):
	    this.scene.switchView();
			break;

	};
};

MyInterface.prototype.addLight = function(i, id) {

	this.lights.add(this.scene.infoLights, i, this.scene.infoLights[i]).name(id);

};
