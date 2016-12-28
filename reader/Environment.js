function Environment(scene) {

	this.scene = scene;
  this.currEnvironment='Menu';

	this.initEnvironment();

};

Environment.prototype.initEnvironment=function(){

  this.backgroundMenu=new Cube(this.scene,10,4,1);

};

/**
 * Display the current environment.
 *
 * @method display
 *
 */
Environment.prototype.display = function () {

	switch (this.currEnvironment) {
		case 'Menu':
			this.displayMenuEnvironment();
			break;
		case 'Game':
			this.displayGameEnvironment();
			break;
		case 'GameOver':
			this.displayGameOverEnvironment();
			break;
	}

};

Environment.prototype.displayMenuEnvironment=function(){

	this.scene.pushMatrix();
	this.backgroundMenu.display();
	this.scene.popMatrix();

};
