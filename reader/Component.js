/**
 * Component class
 * @param {CGFscene} scene
 * @param {array} transformations
 * @param {array} materials
 * @param {array} texture
 * @param {array} childrenComponent
 * @param {array} childrenPrimitive
 * @param {array} componentAnimations
 */
function Component(scene, transformations, materials, texture, childrenComponent, childrenPrimitive, componentAnimations) {
    CGFobject.call(this, scene);

    this.fatherTexture;
    this.texture = texture;
    this.materials = materials;
    this.currentMaterial = this.materials[0];
    this.transformations = transformations;
    this.childrenComponent = childrenComponent;
    this.childrenPrimitive = childrenPrimitive;
    this.appearance = new CGFappearance(this.scene);
    this.animations = componentAnimations;

    if (this.animations.length != 0) {
        console.log("LENGTHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH " + this.animations.length);
        this.currAnimation = 0;
        this.animations[this.currAnimation].inUse = true;
    }

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

/**
 * Animates component
 * @param  {int} dTime interval
 */
Component.prototype.animate = function(dTime) {

    if (this.animations.length != 0) {

        if (this.animations[this.currAnimation].inUse) {
            this.animations[this.currAnimation].updateAnimation(dTime);
        } else {

            this.animations[this.currAnimation].resetAnimation();

            this.updateCurrAnimation();

            this.animations[this.currAnimation].inUse = true;

        }

    }

};

/**
 * Updates current Animation
 */
Component.prototype.updateCurrAnimation = function() {

    if (this.currAnimation == this.animations.length - 1) {
        this.currAnimation = 0;
    } else {
        this.currAnimation++;
    }

};


/**
 * Displays Component
 */
Component.prototype.display = function() {

    if (this.animations.length != 0) {
        this.animations[this.currAnimation].displayAnimation();
    }

};
