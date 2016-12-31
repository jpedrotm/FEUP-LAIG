/**
* Abstract class to generalize de all diferent types of animations.
* @param {CGFscene} scene
* @param {string} id
* @param {number} span
* @param {string} type
*/
function Animation(scene, id, span, type) {

    this.scene = scene;
    this.id = id;
    this.span = span;
    this.inUse = false;
    this.type = type;
}
