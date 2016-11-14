/**
 * Component.
 * @constructor
 */
function Component(scene, transformations, materials, texture, childrenComponent, childrenPrimitive, animationsArray) {
    CGFobject.call(this, scene);

    this.fatherTexture;
    this.texture = texture;
    this.materials = materials;
    this.currentMaterial = this.materials[0];
    this.transformations = transformations;
    this.childrenComponent = childrenComponent;
    this.childrenPrimitive = childrenPrimitive;
    this.appearance = new CGFappearance(this.scene);
    this.animations = animationsArray;
    this.currentAnimation = 0;
    if (this.animations.length > 0)
        this.animations[this.currentAnimation].currentAnimation = true;
    this.currMatIndice = 0;

};

/**
 * Function responsible to set the appearance according to the material.
 * @param {Array} materials
 */
Component.prototype.setMaterials = function(materials) {
    this.materials = materials;
    this.currentMaterial = this.materials[this.currMatIndice];
    this.appearance.setEmission(this.currentMaterial[0][0], this.currentMaterial[0][1], this.currentMaterial[0][2], this.currentMaterial[0][3]);
    this.appearance.setAmbient(this.currentMaterial[1][0], this.currentMaterial[1][1], this.currentMaterial[1][2], this.currentMaterial[1][3]);
    this.appearance.setDiffuse(this.currentMaterial[2][0], this.currentMaterial[2][1], this.currentMaterial[2][2], this.currentMaterial[2][3]);
    this.appearance.setSpecular(this.currentMaterial[3][0], this.currentMaterial[3][1], this.currentMaterial[3][2], this.currentMaterial[3][3]);
    this.appearance.setShininess(this.currentMaterial[4][0]);
    if (this.texture[2] != 1 || this.texture[3] != 1) {
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    }
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

/**
 * Function that returns the indice of the current material.
 */
Component.prototype.getCurrMatIndice = function() {
    return this.currMatIndice;
}

Component.prototype.loadTexture = function() {
        if (this.texture[1] == "inherit") {
            if (this.fatherTexture[1] != "none")
                this.appearance.loadTexture(this.fatherTexture[1]);
        } else if (this.texture[1] == "none") {
            console.log("sadnmaksljdlsamdklasmdlksaml");
        } else {
            console.log(this.texture[1]);
            this.appearance.loadTexture(this.texture[1]);
        }
    }
    /**
     * Function that returns the texture the component.
     */
Component.prototype.getTexture = function() {
        return this.texture;
    }
    /**
     * Function that sets a new texture for the component.
     */

Component.prototype.getFatherTexture = function(texture) {
    return this.fatherTexture;
}

Component.prototype.setFatherTexture = function(texture) {
        this.fatherTexture = texture;
    }
    /**
     * Function that saves the texture of the father.
     */
Component.prototype.getMaterials = function() {
        return this.materials;
    }
    /**
     * Function that return the transformations matrix of the component.
     */
Component.prototype.getTransformations = function() {
        return this.transformations;
    }
    /**
     * Returns the children components.
     */
Component.prototype.getChildrenComponent = function() {
        return this.childrenComponent;
    }
    /**
     * Returns the children primitives.
     */
Component.prototype.getChildrenPrimitive = function() {
        return this.childrenPrimitive;
    }
    /**
     * Function that returns the CGFappearance of the component.
     */
Component.prototype.getAppearance = function() {
    return this.appearance;
}

Component.prototype.animate = function(currTime) {
    if (this.animations.length > 0)
        if (this.animations[currentAnimation].currentAnimation == true) {
            this.animations[currentAnimation].animate(currTime);
        } else {
            this.animations[currentAnimation].currentAnimation = false;
            if (this.currentAnimation < this.animations.size() - 1) {
                this.currentAnimation++;
            } else {
                this.currentAnimation = 0;
            }

            this.animations[currentAnimation].currentAnimation = true;
            this.animations[currentAnimation].animate(currTime);
        }
}
