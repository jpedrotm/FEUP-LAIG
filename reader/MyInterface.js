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

  return true;
};


MyInterface.prototype.processKeyDown = function(event) {


	switch (event.keyCode)
	{
    case (86):
      this.scene.updateView();
      break;
		case (118):
	    this.scene.updateView();
			break;

	};
};
