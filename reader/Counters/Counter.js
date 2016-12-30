function Counter(scene) {

	CGFobject.call(this,scene);
	this.scene = scene;

  this.units=0;
  this.dozens=0;

  this.unitsObj = new Obj(scene, 'scenes/3dObjects/numbers/0.obj');
  this.dozensObj = new Obj(scene, 'scenes/3dObjects/numbers/0.obj');


}

Counter.prototype = Object.create(CGFobject.prototype);
Counter.prototype.constructor = Counter;

Counter.prototype.add = function (points) {

  if((this.units + points)<10){
    this.units+=points;
  }else if(points==1){
    this.dozens+=1;
    this.units=0;
  }else if(points==2){
    this.dozens+=1;
    this.units=1;
  }else if(points==3){
    this.dozens+=1;
    this.units=2;
  }
	
	this.unitsObj = new Obj(this.scene, 'scenes/3dObjects/numbers/' + this.units + '.obj');
	this.dozensObj = new Obj(this.scene, 'scenes/3dObjects/numbers/' + this.dozens + '.obj');

};

Counter.prototype.display = function(){

	this.scene.pushMatrix();
		this.scene.scale(0.05,0.05,0.05);
		this.dozensObj.display();
		this.scene.pushMatrix();
			this.scene.translate(20,0,0);
			this.unitsObj.display();
		this.scene.popMatrix();
	this.scene.popMatrix();

};
