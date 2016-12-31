/**
 * Chessboard
 * @constructor
 */
function Chessboard(scene,du,dv,textureref,su,sv,c1,c2,cs) {
    CGFobject.call(this, scene);
    this.scene=scene;

    this.du=du;
    this.dv=dv;
    this.su=su;
    this.sv=sv;
    this.c1=c1;
    this.c2=c2;
    this.cs=cs;

    this.plane = new Plane(this.scene, 1, 1, 100, 100);

    this.shader = new CGFshader(scene.gl, "shaders/texture1.vert", "shaders/texture1.frag");

  this.shader.setUniformsValues({uSampler : 0});
   this.shader.setUniformsValues({color1 : [this.c1.r,this.c1.g,this.c1.b,this.c1.a]});
   this.shader.setUniformsValues({color2 : [this.c2.r,this.c2.g,this.c2.b,this.c2.a]});
   this.shader.setUniformsValues({colorS : [this.cs.r,this.cs.g,this.cs.b,this.cs.a]});
   this.shader.setUniformsValues({dU:parseInt(this.du)*1.0}); // Force number to be dd.00
   this.shader.setUniformsValues({dV:parseInt(this.dv)*1.0}); // Force number to be dd.00
   this.shader.setUniformsValues({sU: parseInt(this.su)*1.0});
   this.shader.setUniformsValues({sV: parseInt(this.sv)*1.0});
   this.shader.setUniformsValues({cellHeight: 0.04});

   this.texture = new CGFtexture(this.scene,textureref);

};

Chessboard.prototype = Object.create(CGFobject.prototype);
Chessboard.prototype.constructor = Chessboard;

Chessboard.prototype.display = function() {

    this.texture.bind(0);

    this.scene.setActiveShader(this.shader);
    this.plane.display();
    this.scene.setActiveShader(this.scene.defaultShader);

};

Chessboard.prototype.updateTexCoords = function(length_s, length_t) {

};
