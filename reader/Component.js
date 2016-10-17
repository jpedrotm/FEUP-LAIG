/**
 * Component
 * @constructor
 */
function Component(scene, transformations, materials, texture, childrenComponent, childrenPrimitive) {
    CGFobject.call(this, scene);

    this.texture = texture;
    this.materials = materials;
    this.transformations = transformations;
    this.childrenComponent = childrenComponent;
    this.childrenPrimitive = childrenPrimitive;
    this.appearance = new CGFappearance(this.scene);
    this.appearance.loadTexture(this.texture[1]);

};

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
