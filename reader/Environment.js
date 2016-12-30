function Environment(scene) {

	this.scene = scene;
  this.currEnvironment='Menu';

	this.initEnvironment();

}

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

	this.scene.wallsAppearance=new CGFappearance(this.scene);
	this.scene.wallsAppearance.setAmbient(1.0,1.0,1.0,1);
	this.scene.wallsAppearance.setDiffuse(1.0,1.0,1.0,1);
	this.scene.wallsAppearance.setSpecular(1.0,1.0,1.0,1);
	this.scene.wallsAppearance.setShininess(20);
	this.scene.wallsAppearance.loadTexture('/reader/scenes/img/game_wall_image.jpg');

	this.scene.groundAppearance=new CGFappearance(this.scene);
	this.scene.groundAppearance.setAmbient(1.0,1.0,1.0,1);
	this.scene.groundAppearance.setDiffuse(1.0,1.0,1.0,1);
	this.scene.groundAppearance.setSpecular(1.0,1.0,1.0,1);
	this.scene.groundAppearance.setShininess(20);
	this.scene.groundAppearance.loadTexture('/reader/scenes/img/gym_ground.jpg');

	this.scene.ringueMaterialGround = new CGFappearance(this.scene);
  this.scene.ringueMaterialGround.setAmbient(225/255, 225/255, 225/255,0.8);
  this.scene.ringueMaterialGround.setDiffuse(225/255, 225/255, 225/255,0.8);
  this.scene.ringueMaterialGround.setSpecular(225/255, 225/255, 225/255,0.8);
  this.scene.ringueMaterialGround.setShininess(20);

  this.scene.ringueMaterialNets = new CGFappearance(this.scene);
  this.scene.ringueMaterialNets.setAmbient(225/255, 225/255, 225/255,0.8);
  this.scene.ringueMaterialNets.setDiffuse(225/255, 225/255, 225/255,0.8);
  this.scene.ringueMaterialNets.setSpecular(225/255, 225/255, 225/255,0.8);
  this.scene.ringueMaterialNets.setShininess(20);

  this.scene.ringueMaterialPosts = new CGFappearance(this.scene);
  this.scene.ringueMaterialPosts.setAmbient(150/255, 0.04, 0.04,0.8);
  this.scene.ringueMaterialPosts.setDiffuse(150/255, 0.04, 0.04,0.8);
  this.scene.ringueMaterialPosts.setSpecular(150/255, 0.04, 0.04,0.8);
  this.scene.ringueMaterialPosts.setShininess(20);

	this.scene.groundRingueAppearance = new CGFappearance(this.scene);
  this.scene.groundRingueAppearance.setAmbient(0,0,205/255,0.8);
  this.scene.groundRingueAppearance.setDiffuse(0,0,205/255,0.8);
  this.scene.groundRingueAppearance.setSpecular(0,0,205/255,0.8);
  this.scene.groundRingueAppearance.setShininess(20);


	//Objetos
	this.wall=new Plane(this.scene,1,1,20,20);
  this.backgroundMenu=new Cube(this.scene,10,6,0.2);
	this.plane=new Plane(this.scene,1,1,20,20);
	this.ground=new Plane(this.scene,1,1,20,20);
	this.groundRingue=new Plane(this.scene,1,1,20,20);
	this.boxRingueGround = new Obj(this.scene, 'scenes/3dObjects/boxRingue-ground.obj');
	this.boxRingueNets = new Obj(this.scene, 'scenes/3dObjects/boxRingue-net.obj');
	this.boxRinguePosts = new Obj(this.scene, 'scenes/3dObjects/boxRingue-posts.obj');
	this.playerText = new Obj(this.scene, 'scenes/3dObjects/player.obj');
	this.oneText = new Obj(this.scene, 'scenes/3dObjects/numbers/1.obj');
	this.twoText = new Obj(this.scene, 'scenes/3dObjects/numbers/2.obj');
};

/**
 * Display the current environment.
 *
 * @method display
 *
 */

Environment.prototype.display=function(){

	this.scene.pushMatrix();
  this.scene.translate(1.25,-.75,1.5);
  this.scene.scale(.75,.3,1);
  this.scene.rotate(-Math.PI/2,1,0,0);
	this.scene.pushMatrix();
  this.scene.ringueMaterialGround.apply();
	this.scene.translate(0,0,-3);
	this.scene.scale(1,1,3);
  this.boxRingueGround.display();
	this.scene.popMatrix();
  this.scene.ringueMaterialNets.apply();
  this.boxRingueNets.display();
  this.scene.ringueMaterialPosts.apply();
  this.boxRinguePosts.display();
  this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0.03,0.1);
	this.scene.rotate(-Math.PI/2,1,0,0);
	this.scene.scale(12,15.8,1);
	this.scene.groundRingueAppearance.apply();
	this.groundRingue.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,-1.5,0);
	this.scene.rotate(-Math.PI/2,1,0,0);
	this.scene.scale(30,30,0);
	this.scene.groundAppearance.apply();
	this.ground.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,6,15);
	this.scene.rotate(Math.PI,0,1,0);
	this.scene.scale(30,15,1);
	this.scene.rotate(Math.PI,0,0,1);
	this.scene.wallsAppearance.apply();
	this.wall.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(15,6,0);
	this.scene.rotate(-Math.PI/2,0,1,0);
	this.scene.scale(30,15,1);
	this.scene.rotate(Math.PI,0,0,1);
	this.scene.wallsAppearance.apply();
	this.wall.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(-15,6,0);
	this.scene.rotate(Math.PI/2,0,1,0);
	this.scene.scale(30,15,1);
	this.scene.rotate(Math.PI,0,0,1);
	this.scene.wallsAppearance.apply();
	this.wall.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,6,-15);
	this.scene.scale(30,15,1);
	this.scene.rotate(Math.PI,0,0,1);
	this.scene.wallsAppearance.apply();
	this.wall.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();

		this.scene.scale(0.7,0.7,0.7);
		this.scene.translate(-10,5,0);
		this.scene.rotate(Math.PI/2,0,1,0);

		this.scene.pushMatrix();
			this.scene.rotate(Math.PI,0,0,1);
			this.scene.translate(0,0,0.14);
			this.scene.scale(9,5,1);
			this.scene.planeAppearance.apply();
			this.plane.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.backgroundAppearance.apply();
			this.backgroundMenu.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0,1.5,0);
			this.scene.scale(1.8,0.5,1);
			this.backgroundMenu.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
			this.scene.translate(-7.25,1,0.1);
			this.scene.scale(0.025,0.025,0.025);
			this.scene.pushMatrix();
				this.scene.translate(60,0,0);
				this.oneText.display();
			this.scene.popMatrix();
			this.playerText.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(6.75,1,0.1);
			this.scene.scale(0.025,0.025,0.025);
			this.scene.pushMatrix();
				this.scene.translate(60,0,0);
				this.twoText.display();
			this.scene.popMatrix();
			this.playerText.display();
		this.scene.popMatrix();


	this.scene.popMatrix();

};
