function Environment(scene) {

	this.scene = scene;
  this.currEnvironment='Menu';

	this.initEnvironment();

};

Environment.prototype.initEnvironment=function(){

	//Texturas e materiais
	this.scene.planeAppearance = new CGFappearance(this.scene);
	this.scene.planeAppearance.setAmbient(1.0,1.0,1.0,1);
	this.scene.planeAppearance.setDiffuse(1.0,1.0,1.0,1);
	this.scene.planeAppearance.setSpecular(1.0,1.0,1.0,1);
	this.scene.planeAppearance.setShininess(20);
	this.scene.planeAppearance.loadTexture('/reader/scenes/img/logo_image.png');

	this.scene.backgroundAppearance= new CGFappearance(this.scene);
	this.scene.backgroundAppearance.setAmbient(0.34,0.18,0.055,0.4);
	this.scene.backgroundAppearance.setDiffuse(1.0,1.0,1.0,0.4);
	this.scene.backgroundAppearance.setSpecular(1.0,1.0,1.0,0.4);
	this.scene.backgroundAppearance.setShininess(1);
	this.scene.backgroundAppearance.loadTexture('/reader/scenes/img/wood1.jpg');


	//Objetos
  this.backgroundMenu=new Cube(this.scene,10,6,0.2);
	this.plane=new Plane(this.scene,1,1,10,10);

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

	this.scene.translate(-15,5,0);
	this.scene.rotate(Math.PI/2,0,1,0);

	this.scene.pushMatrix();
	this.scene.rotate(Math.PI,0,0,1);
	this.scene.translate(0,0,0.11);
	this.scene.scale(9,5,1);
	this.scene.planeAppearance.apply();
	this.plane.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.backgroundAppearance.apply();
	this.backgroundMenu.display();
	this.scene.popMatrix();

	this.scene.popMatrix();

};
