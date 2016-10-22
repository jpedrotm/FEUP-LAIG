/**
 * Component
 * @constructor
 */
function Component(scene, transformations, materials, texture, childrenComponent, childrenPrimitive) {
    CGFobject.call(this, scene);

    this.texture = texture;
    this.materials = materials;
    this.currentMaterial = this.materials[0];
    this.transformations = transformations;
    this.childrenComponent = childrenComponent;
    this.childrenPrimitive = childrenPrimitive;
    this.appearance = new CGFappearance(this.scene);
    if (this.texture[1] == "inherit")
        this.appearance.loadTexture("");
    else
        this.appearance.loadTexture(this.texture[1]);

    this.currMatIndice=0;

};

Component.prototype.setMaterials = function(materials) {
    this.materials = materials;
    this.currentMaterial = this.materials[this.currMatIndice];
    this.appearance.setEmission(this.currentMaterial[0][0], this.currentMaterial[0][1], this.currentMaterial[0][2], this.currentMaterial[0][3]);
    this.appearance.setAmbient(this.currentMaterial[1][0], this.currentMaterial[1][1], this.currentMaterial[1][2], this.currentMaterial[1][3]);
    this.appearance.setDiffuse(this.currentMaterial[2][0], this.currentMaterial[2][1], this.currentMaterial[2][2], this.currentMaterial[2][3]);
    this.appearance.setSpecular(this.currentMaterial[3][0], this.currentMaterial[3][1], this.currentMaterial[3][2], this.currentMaterial[3][3]);
    this.appearance.setShininess(this.currentMaterial[4][0]);
}

/*Component.prototype.changeCurrentMaterial = function(index) {
    this.currentMaterial = this.materials[index];
    this.appearance.setEmission(this.currentMaterial[0][0], this.currentMaterial[0][1], this.currentMaterial[0][2], this.currentMaterial[0][3]);
    this.appearance.setAmbient(this.currentMaterial[1][0], this.currentMaterial[1][1], this.currentMaterial[1][2], this.currentMaterial[1][3]);
    this.appearance.setDiffuse(this.currentMaterial[2][0], this.currentMaterial[2][1], this.currentMaterial[2][2], this.currentMaterial[2][3]);
    this.appearance.setSpecular(this.currentMaterial[3][0], this.currentMaterial[3][1], this.currentMaterial[3][2], this.currentMaterial[3][3]);
    this.appearance.setShininess(this.currentMaterial[4][0]);
}
*/

Component.prototype.getCurrMatIndice = function(){
  return this.currMatIndice;
}

Component.prototype.getTexture = function() {
    return this.texture;
}

Component.prototype.getMaterials = function() {
    return this.materials;
}

Component.prototype.getTransformations = function() {
    return this.transformations;
}

Component.prototype.getChildrenComponent = function() {
    return this.childrenComponent;
}

Component.prototype.getChildrenPrimitive = function() {
    return this.childrenPrimitive;
}

Component.prototype.getAppearance = function() {
    return this.appearance;
}
