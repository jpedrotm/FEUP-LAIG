/**
 * MyInterface
 * @constructor
 */
function MyInterface() {

	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * initialize the interface.
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {

	CGFinterface.prototype.init.call(this, application);

	this.gui = new dat.GUI();

	this.lights = this.gui.addFolder("Lights");
  this.lights.open();

  return true;
};

/**
* Function that receives the inputs of the keyboard.
* @param {Event} event
*/
MyInterface.prototype.processKeyDown = function(event) {


	switch (event.keyCode)
	{
		case(77):
			this.scene.switchMaterials();
			break;
    case (86):
      this.scene.switchView();
      break;
		case(109):
			this.scene.switchMaterials();
			break;
		case (118):
	    this.scene.switchView();
			break;

	};
};

/**
* Adds the lights to the interface by receiving the indice and the id of the light to be added.
* @param {number} i
* @param {number} id
*/
MyInterface.prototype.addLight = function(i, id) {

	this.lights.add(this.scene.infoLights, i, this.scene.infoLights[i]).name(id);

};
