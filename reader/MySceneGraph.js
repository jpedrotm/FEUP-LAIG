function MySceneGraph(filename, scene) {
    this.loadedOk = null;

    // Establish bidirectional references between scene and graph
    this.scene = scene;
    scene.graph = this;

    // File reading
    this.reader = new CGFXMLreader();

    //Estruturas de dados necessárias para o parser-----------------------------------------------------------
    this.viewDefault;
    this.perspectives = [];
    this.cfgCameras = [];
    this.textures = [].fill(new Array(3));; //[id][0...1...2] 0-file 1-length_s 2-length_t
    this.materials = [];
    //--------------------------------------------------------------------------------------------------------


    /*
     * Read the contents of the xml file, and refer to this class for loading and error handlers.
     * After the file is read, the reader calls onXMLReady on this object.
     * If any error occurs, the reader calls onXMLError on this object, with an error message
     */

    this.reader.open('scenes/' + filename, this);
}

/*
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady = function() {
    console.log("XML Loading finished.");
    var rootElement = this.reader.xmlDoc.documentElement;

    // Here should go the calls for different functions to parse the various blocks
    var error = this.parser(rootElement);

    if (error != null) {
        this.onXMLError(error);
        return;
    }

    this.loadedOk = true;

    // As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
    this.scene.onGraphLoaded();
};


MySceneGraph.prototype.parser = function(rootElement) {

    this.parserToViews(rootElement); //completed
    this.parserToTextures(rootElement);
    this.parserToMaterials(rootElement);
    this.parserToLights(rootElement);
    this.parserToTransformations(rootElement);
    this.parserToIllumination(rootElement);


};

MySceneGraph.prototype.parserToViews = function(rootElement) {

    var views;
    views = rootElement.getElementsByTagName('views');

    if (views == null) {
        return "Views are missing.";
    }

    if (views.length != 1) {
        return "Either zero or more than one 'view' element found.";
    }

    this.defaultCamera = views[0].attributes.getNamedItem("default").value;


    this.perspectives = views[0].getElementsByTagName('perspective');

    if (this.perspectives == null) {
        return "Perspectives are missing.";
    }



    for (var i = 0; i < this.perspectives.length; i++) {


        //Obter os valores da perspective
        var id = this.perspectives[i].attributes.getNamedItem("id").value;
        var near = this.perspectives[i].attributes.getNamedItem("near").value;
        var far = this.perspectives[i].attributes.getNamedItem("far").value;
        var angle = this.perspectives[i].attributes.getNamedItem("angle").value;

        //Obter o que está definido dentro de cada perspective (from e to) e obter os valores de estes
        var from = this.perspectives[i].getElementsByTagName('from');
        var vectorF = [from[0].attributes.getNamedItem("x").value, from[0].attributes.getNamedItem("y").value, from[0].attributes.getNamedItem("z").value];

        var to = this.perspectives[i].getElementsByTagName('to');
        var vectorT = [to[0].attributes.getNamedItem("x").value, to[0].attributes.getNamedItem("y").value, to[0].attributes.getNamedItem("z").value]

        //IDEA: Vale mesmo a pena criar no parser a camera?
        /*
             o parser devia guardar só a informação e esta ser
        		 usada no XMLScene para criar os objectos/camaras/etc..
        */
        //this.cfgCameras.push(new CGFCamera(angle,near,far,vectorF,vectorT));


    }
};

//TODO: parse materials
MySceneGraph.prototype.parserToTextures = function(rootElement) {


    var allTextures = rootElement.getElementsByTagName('textures');

    if (allTextures == null) {
        return "Textures are missing.";
    }

    var texts = allTextures[0].getElementsByTagName('texture');

    if (texts == null) {
        return "Textures are missing.";
    }

};

//TODO: parse materials
MySceneGraph.prototype.parserToMaterials = function(rootElement) {


    var allMaterials = rootElement.getElementsByTagName('materials');

    if (allMaterials == null) {
        return "Materials are missing.";
    }

    var mats = allMaterials[0].getElementsByTagName('material');

    if (mats == null) {
        return "Mats are missing.";
    }


};

//TODO: parse illumination
MySceneGraph.prototype.parserToIllumination = function(rootElement) {


    var illumination = rootElement.getElementsByTagName('illumination');

    if (illumination == null) {
        return "Illumination not defined.";
    }

    if (illumination.length != 1) {
        return "Either zero or more than one 'illumination' element found.";
    }

};

//TODO: parse lights
MySceneGraph.prototype.parserToLights = function(rootElement) {


    var lights = rootElement.getElementsByTagName('lights');

    if (lights == null) {
        return "lights not defined.";
    }

};

//TODO: parse transformations
MySceneGraph.prototype.parserToTransformations = function(rootElement) {


    var transformations = rootElement.getElementsByTagName('lights');

    if (transformations == null) {
        return "transformations not defined.";
    }

};






/*
 * Callback to be executed on any read error
 */

MySceneGraph.prototype.onXMLError = function(message) {
    console.error("XML Loading Error: " + message);
    this.loadedOk = false;
};