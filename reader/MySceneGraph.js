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
		this.ambientIllumination=[];
		this.backgroundIllumination = [];
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
		this.parserToIllumination(rootElement); //almost completed
		this.parserToLights(rootElement); //almost completed
    this.parserToTextures(rootElement); //almost completed
    this.parserToMaterials(rootElement);//almost completed
		this.parserToTransformations(rootElement);//almost completed

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

//TODO: colocar a guardar
MySceneGraph.prototype.parserToIllumination = function(rootElement) {


    var illumination = rootElement.getElementsByTagName('illumination');

    if (illumination == null) {
        return "Illumination not defined.";
    }

    if (illumination.length != 1) {
        return "Either zero or more than one 'illumination' element found.";
    }

    var ds=illumination[0].attributes.getNamedItem("doublesided");
    var local=illumination[0].attributes.getNamedItem("local");

    var ambient=illumination[0].getElementsByTagName("ambient");
    var ra=ambient[0].attributes.getNamedItem("r").value;
    var ga=ambient[0].attributes.getNamedItem("g").value;
    var ba=ambient[0].attributes.getNamedItem("b").value;
    var aa=ambient[0].attributes.getNamedItem("a").value;

    var background=illumination[0].getElementsByTagName("background");
    var rb=background[0].attributes.getNamedItem("r").value;
    var gb=background[0].attributes.getNamedItem("g").value;
    var bb=background[0].attributes.getNamedItem("b").value;
    var ab=background[0].attributes.getNamedItem("a").value;


};

//TODO: colocar a guardar
MySceneGraph.prototype.parserToLights = function(rootElement) {


    var lights = rootElement.getElementsByTagName('lights');

    if (lights == null) {
        return "lights not defined.";
    }

    if(lights.length!=1)
    {
      return "Either zero or more than one 'illumination' element found.";
    }

    var omnis=lights[0].getElementsByTagName("omni");

    var location;
    var ambient;
    var diffuse;
    var specular;
    var lx,ly,lz,lw;
    var ra,ga,ba,aa;
    var rd,gd,bd,ad;
    var rs,gs,bs,as;



    for(var i=0;i<omnis.length;i++)
    {

      var idOmni=omnis[i].attributes.getNamedItem("id").value;
      var enabledOmni=omnis[i].attributes.getNamedItem("enabled").value;

      location=omnis[i].getElementsByTagName("location");
      lx=location[0].attributes.getNamedItem("x").value;
      ly=location[0].attributes.getNamedItem("y").value;
      lz=location[0].attributes.getNamedItem("z").value;
      lw=location[0].attributes.getNamedItem("w").value;

      ambient=omnis[i].getElementsByTagName("ambient");
      ra=ambient[0].attributes.getNamedItem("r").value;
      ga=ambient[0].attributes.getNamedItem("g").value;
      ba=ambient[0].attributes.getNamedItem("b").value;
      aa=ambient[0].attributes.getNamedItem("a").value;

      console.log(ra+","+ga+","+ba+","+aa)

      diffuse=omnis[i].getElementsByTagName("diffuse");
      rd=diffuse[0].attributes.getNamedItem("r").value;
      gd=diffuse[0].attributes.getNamedItem("g").value;
      bd=diffuse[0].attributes.getNamedItem("b").value;
      ad=diffuse[0].attributes.getNamedItem("a").value;

      specular=omnis[i].getElementsByTagName("specular");
      rs=specular[0].attributes.getNamedItem("r").value;
      gs=specular[0].attributes.getNamedItem("g").value;
      bs=specular[0].attributes.getNamedItem("b").value;
      as=specular[0].attributes.getNamedItem("a").value;

    }

    var spots=lights[0].getElementsByTagName("spot");

    for(var i=0;i<spots.length;i++){

      var idSpot=spots[i].attributes.getNamedItem("id").value;
      var enabledSpot=spots[i].attributes.getNamedItem("enabled").value;
      var angleSpot=spots[i].attributes.getNamedItem("angle").value;
      var exponentSpot=spots[i].attributes.getNamedItem("exponent").value;

      var target=spots[i].getElementsByTagName("target");
      var tx=target[0].attributes.getNamedItem("x").value;
      var ty=target[0].attributes.getNamedItem("y").value;
      var tz=target[0].attributes.getNamedItem("z").value;

      location=spots[i].getElementsByTagName("location");
      lx=location[0].attributes.getNamedItem("x").value;
      ly=location[0].attributes.getNamedItem("y").value;
      lz=location[0].attributes.getNamedItem("z").value;

      diffuse=spots[i].getElementsByTagName("diffuse");
      rd=diffuse[0].attributes.getNamedItem("r").value;
      gd=diffuse[0].attributes.getNamedItem("g").value;
      bd=diffuse[0].attributes.getNamedItem("b").value;
      ad=diffuse[0].attributes.getNamedItem("a").value;

      specular=spots[i].getElementsByTagName("specular");
      rs=specular[0].attributes.getNamedItem("r").value;
      gs=specular[0].attributes.getNamedItem("g").value;
      bs=specular[0].attributes.getNamedItem("b").value;
      as=specular[0].attributes.getNamedItem("a").value;

    }

};

//TODO: colocar a guardar
MySceneGraph.prototype.parserToTextures = function(rootElement) {


    var allTextures = rootElement.getElementsByTagName('textures');

    if (allTextures == null) {
        return "Textures are missing.";
    }

    if(allTextures.length!=1){
      return "Either zero or more than one 'illumination' element found.";
    }

    var texts = allTextures[0].getElementsByTagName('texture');

    if (texts == null) {
        return "Textures are missing.";
    }

    for(var i=0;i<texts.length;i++)
    {

      var id=texts[i].attributes.getNamedItem("id").value;
      var file=texts[i].attributes.getNamedItem("file").value;
      var length_s=texts[i].attributes.getNamedItem("length_s").value;
      var length_t=texts[i].attributes.getNamedItem("length_t").value;

      console.log(id+","+file+","+length_s+","+length_t+"\n");

    }

};

//TODO: parse materials
MySceneGraph.prototype.parserToMaterials = function(rootElement) {


    var allMaterials = rootElement.getElementsByTagName('materials');

    if (allMaterials == null) {
        return "Materials are missing.";
    }

    console.log(allMaterials.length);

    /*if(allMaterials.length!=1){//TODO está a dar dois materials não sei porque
      return "Either zero or more than one 'illumination' element found.";
    }*/

    var mats = allMaterials[0].getElementsByTagName('material');

    if (mats == null) {
        return "Mats are missing.";
    }

    for(var i=0;i<mats.length;i++){

      var id=mats[i].attributes.getNamedItem("id").value;

      var emission=mats[i].getElementsByTagName("emission");
      var re=emission[0].attributes.getNamedItem("r").value;
      var ge=emission[0].attributes.getNamedItem("g").value;
      var be=emission[0].attributes.getNamedItem("b").value;
      var ae=emission[0].attributes.getNamedItem("a").value;

      var ambient=mats[i].getElementsByTagName("ambient");
      var ra=ambient[0].attributes.getNamedItem("r").value;
      var ga=ambient[0].attributes.getNamedItem("g").value;
      var ba=ambient[0].attributes.getNamedItem("b").value;
      var aa=ambient[0].attributes.getNamedItem("a").value;

      var diffuse=mats[i].getElementsByTagName("diffuse");
      var rd=diffuse[0].attributes.getNamedItem("r").value;
      var gd=diffuse[0].attributes.getNamedItem("g").value;
      var bd=diffuse[0].attributes.getNamedItem("b").value;
      var ad=diffuse[0].attributes.getNamedItem("a").value;

      var specular=mats[i].getElementsByTagName("specular");
      var rs=specular[0].attributes.getNamedItem("r").value;
      var gs=specular[0].attributes.getNamedItem("g").value;
      var bs=specular[0].attributes.getNamedItem("b").value;
      var as=specular[0].attributes.getNamedItem("a").value;

      var shininess=mats[i].getElementsByTagName("shininess")[0].attributes.getNamedItem("value").value;

      console.log("AQUI:"+shininess);

    }


};



//TODO: guardar a informação
MySceneGraph.prototype.parserToTransformations = function(rootElement) {


    var transformations = rootElement.getElementsByTagName('lights');

    if (transformations == null) {
        return "transformations not defined.";
    }

    if(transformations.length!=1){
      return "Either zero or more than one 'illumination' element found.";
    }

    var transformation=transformations[0].getElementsByTagName('tranformation');

    for(var i=0;i<tranformation.length;i++)
    {
      var id=transformation[i].attributes.getNamedItem("id").value;

      var translate=tranformation[i].getElementsByTagName("translate");
      var tx=translate[0].attributes.getNamedItem("x").value;
      var ty=translate[0].attributes.getNamedItem("y").value;
      var tz=translate[0].attributes.getNamedItem("z").value;

      var rotate=tranformation[i].getElementsByTagName("rotate");
      var axis=rotate[0].attributes.getNamedItem("axis").value;
      var angle=rotate[0].attributes.getNamedItem("angle").value;

      var scale=tranformation[i].getElementsByTagName("scale");
      var sx=scale[0].attributes.getNamedItem("x").value;
      var sy=scale[0].attributes.getNamedItem("y").value;
      var sz=scale[0].attributes.getNamedItem("z").value;

    }

};






/*
 * Callback to be executed on any read error
 */

MySceneGraph.prototype.onXMLError = function(message) {
    console.error("XML Loading Error: " + message);
    this.loadedOk = false;
};
