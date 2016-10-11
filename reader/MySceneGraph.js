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

    //Parser illumination
    this.background = [];
    this.ambient = [];

    this.objects = {};
    this.composedObjects = {};

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
    this.parserToIllumination(rootElement); //completed
    this.parserToLights(rootElement); //almost completed
    this.parserToTextures(rootElement); //almost completed
    this.parserToMaterials(rootElement); //almost completed
    this.parserToTransformations(rootElement); //almost completed
    this.parserToPrimitives(rootElement); //almost completed
    this.parserToComponents(rootElement);

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

    }
};

MySceneGraph.prototype.parserToIllumination = function(rootElement) {


    var illumination = rootElement.getElementsByTagName('illumination');

    if (illumination == null) {
        return "Illumination not defined.";
    }

    if (illumination.length != 1) {
        return "Either zero or more than one 'illumination' element found.";
    }

    var ds = illumination[0].attributes.getNamedItem("doublesided");
    var local = illumination[0].attributes.getNamedItem("local");

    var ambientTemp = illumination[0].getElementsByTagName("ambient");
    this.ambient['r'] = ambientTemp[0].attributes.getNamedItem("r").value;
    this.ambient['g'] = ambientTemp[0].attributes.getNamedItem("g").value;
    this.ambient['b'] = ambientTemp[0].attributes.getNamedItem("b").value;
    this.ambient['a'] = ambientTemp[0].attributes.getNamedItem("a").value;

    var backgroundTemp = illumination[0].getElementsByTagName("background");
    this.background['r'] = backgroundTemp[0].attributes.getNamedItem("r").value;
    this.background['g'] = backgroundTemp[0].attributes.getNamedItem("g").value;
    this.background['b'] = backgroundTemp[0].attributes.getNamedItem("b").value;
    this.background['a'] = backgroundTemp[0].attributes.getNamedItem("a").value;


};

//TODO: colocar a guardar
MySceneGraph.prototype.parserToLights = function(rootElement) {


    var lights = rootElement.getElementsByTagName('lights');

    if (lights == null) {
        return "lights not defined.";
    }

    if (lights.length != 1) {
        return "Either zero or more than one 'illumination' element found.";
    }

    var omnis = lights[0].getElementsByTagName("omni");

    var location;
    var ambient;
    var diffuse;
    var specular;
    var lx, ly, lz, lw;
    var ra, ga, ba, aa;
    var rd, gd, bd, ad;
    var rs, gs, bs, as;



    for (var i = 0; i < omnis.length; i++) {

        var idOmni = omnis[i].attributes.getNamedItem("id").value;
        var enabledOmni = omnis[i].attributes.getNamedItem("enabled").value;

        location = omnis[i].getElementsByTagName("location");
        lx = location[0].attributes.getNamedItem("x").value;
        ly = location[0].attributes.getNamedItem("y").value;
        lz = location[0].attributes.getNamedItem("z").value;
        lw = location[0].attributes.getNamedItem("w").value;

        ambient = omnis[i].getElementsByTagName("ambient");
        ra = ambient[0].attributes.getNamedItem("r").value;
        ga = ambient[0].attributes.getNamedItem("g").value;
        ba = ambient[0].attributes.getNamedItem("b").value;
        aa = ambient[0].attributes.getNamedItem("a").value;

        console.log(ra + "," + ga + "," + ba + "," + aa)

        diffuse = omnis[i].getElementsByTagName("diffuse");
        rd = diffuse[0].attributes.getNamedItem("r").value;
        gd = diffuse[0].attributes.getNamedItem("g").value;
        bd = diffuse[0].attributes.getNamedItem("b").value;
        ad = diffuse[0].attributes.getNamedItem("a").value;

        specular = omnis[i].getElementsByTagName("specular");
        rs = specular[0].attributes.getNamedItem("r").value;
        gs = specular[0].attributes.getNamedItem("g").value;
        bs = specular[0].attributes.getNamedItem("b").value;
        as = specular[0].attributes.getNamedItem("a").value;

    }

    var spots = lights[0].getElementsByTagName("spot");

    for (var i = 0; i < spots.length; i++) {

        var idSpot = spots[i].attributes.getNamedItem("id").value;
        var enabledSpot = spots[i].attributes.getNamedItem("enabled").value;
        var angleSpot = spots[i].attributes.getNamedItem("angle").value;
        var exponentSpot = spots[i].attributes.getNamedItem("exponent").value;

        var target = spots[i].getElementsByTagName("target");
        var tx = target[0].attributes.getNamedItem("x").value;
        var ty = target[0].attributes.getNamedItem("y").value;
        var tz = target[0].attributes.getNamedItem("z").value;

        location = spots[i].getElementsByTagName("location");
        lx = location[0].attributes.getNamedItem("x").value;
        ly = location[0].attributes.getNamedItem("y").value;
        lz = location[0].attributes.getNamedItem("z").value;

        diffuse = spots[i].getElementsByTagName("diffuse");
        rd = diffuse[0].attributes.getNamedItem("r").value;
        gd = diffuse[0].attributes.getNamedItem("g").value;
        bd = diffuse[0].attributes.getNamedItem("b").value;
        ad = diffuse[0].attributes.getNamedItem("a").value;

        specular = spots[i].getElementsByTagName("specular");
        rs = specular[0].attributes.getNamedItem("r").value;
        gs = specular[0].attributes.getNamedItem("g").value;
        bs = specular[0].attributes.getNamedItem("b").value;
        as = specular[0].attributes.getNamedItem("a").value;

    }

};

//TODO: colocar a guardar
MySceneGraph.prototype.parserToTextures = function(rootElement) {


    var allTextures = rootElement.getElementsByTagName('textures');

    if (allTextures == null) {
        return "Textures are missing.";
    }

    if (allTextures.length != 1) {
        return "Either zero or more than one 'illumination' element found.";
    }

    var texts = allTextures[0].getElementsByTagName('texture');

    if (texts == null) {
        return "Textures are missing.";
    }

    for (var i = 0; i < texts.length; i++) {

        var id = texts[i].attributes.getNamedItem("id").value;
        var file = texts[i].attributes.getNamedItem("file").value;
        var length_s = texts[i].attributes.getNamedItem("length_s").value;
        var length_t = texts[i].attributes.getNamedItem("length_t").value;

        console.log(id + "," + file + "," + length_s + "," + length_t + "\n");

    }

};


MySceneGraph.prototype.parserToMaterials = function(rootElement) {


    var allMaterials = rootElement.getElementsByTagName('materials');

    if (allMaterials == null) {
        return "Materials are missing.";
    }

    console.log(allMaterials.length);

    //TODO está a dar dois materials não sei porque
    /*if(allMaterials.length!=1){
      return "Either zero or more than one 'illumination' element found.";
    }*/

    var mats = allMaterials[0].getElementsByTagName('material');

    if (mats == null) {
        return "Mats are missing.";
    }

    for (var i = 0; i < mats.length; i++) {

        var id = mats[i].attributes.getNamedItem("id").value;

        var emission = mats[i].getElementsByTagName("emission");
        var re = emission[0].attributes.getNamedItem("r").value;
        var ge = emission[0].attributes.getNamedItem("g").value;
        var be = emission[0].attributes.getNamedItem("b").value;
        var ae = emission[0].attributes.getNamedItem("a").value;

        var ambient = mats[i].getElementsByTagName("ambient");
        var ra = ambient[0].attributes.getNamedItem("r").value;
        var ga = ambient[0].attributes.getNamedItem("g").value;
        var ba = ambient[0].attributes.getNamedItem("b").value;
        var aa = ambient[0].attributes.getNamedItem("a").value;

        var diffuse = mats[i].getElementsByTagName("diffuse");
        var rd = diffuse[0].attributes.getNamedItem("r").value;
        var gd = diffuse[0].attributes.getNamedItem("g").value;
        var bd = diffuse[0].attributes.getNamedItem("b").value;
        var ad = diffuse[0].attributes.getNamedItem("a").value;

        var specular = mats[i].getElementsByTagName("specular");
        var rs = specular[0].attributes.getNamedItem("r").value;
        var gs = specular[0].attributes.getNamedItem("g").value;
        var bs = specular[0].attributes.getNamedItem("b").value;
        var as = specular[0].attributes.getNamedItem("a").value;

        var shininess = mats[i].getElementsByTagName("shininess")[0].attributes.getNamedItem("value").value;

    }


};

//TODO: guardar a informação
MySceneGraph.prototype.parserToTransformations = function(rootElement) {


    var transformations = rootElement.getElementsByTagName('transformations');

    if (transformations == null) {
        return "transformations not defined.";
    }

    if (transformations.length != 1) {
        return "Either zero or more than one 'illumination' element found.";
    }

    var transformation = transformations[0].getElementsByTagName('tranformation');

    for (var i = 0; i < transformation.length; i++) {
        var id = transformation[i].attributes.getNamedItem("id").value;

        var translate = tranformation[i].getElementsByTagName("translate");
        var tx = translate[0].attributes.getNamedItem("x").value;
        var ty = translate[0].attributes.getNamedItem("y").value;
        var tz = translate[0].attributes.getNamedItem("z").value;

        var rotate = tranformation[i].getElementsByTagName("rotate");
        var axis = rotate[0].attributes.getNamedItem("axis").value;
        var angle = rotate[0].attributes.getNamedItem("angle").value;

        var scale = tranformation[i].getElementsByTagName("scale");
        var sx = scale[0].attributes.getNamedItem("x").value;
        var sy = scale[0].attributes.getNamedItem("y").value;
        var sz = scale[0].attributes.getNamedItem("z").value;

    }

};

MySceneGraph.prototype.parserToPrimitives = function(rootElement) {

    var primitives = rootElement.getElementsByTagName("primitives");

    if (primitives == null) {
        return "primitives not defined.";
    }

    var primitive = primitives[0].getElementsByTagName("primitive");
    for (var i = 0; i < primitive.length; i++) {


        var id = primitive[i].attributes.getNamedItem("id").value;
        var rectangle = primitive[i].getElementsByTagName("rectangle");


        if (rectangle.length == 1) {
            var type = "rectangle";
            var rx1 = rectangle[0].attributes.getNamedItem("x1").value;
            var rx2 = rectangle[0].attributes.getNamedItem("x2").value;
            var ry1 = rectangle[0].attributes.getNamedItem("y1").value;
            var ry2 = rectangle[0].attributes.getNamedItem("y2").value;
            this.objects[id] = new Rectangle(this.scene, rx1, ry1, rx2, ry2);
            console.log(rx1 + "," + rx2 + "," + ry1 + "," + ry2);
        }

        var triangle = primitive[i].getElementsByTagName("triangle");

        if (triangle.length == 1) {
            var type = "triangle";
            var tx1 = triangle[0].attributes.getNamedItem("x1").value;
            var tx2 = triangle[0].attributes.getNamedItem("x2").value;
            var tx3 = triangle[0].attributes.getNamedItem("x3").value;
            var ty1 = triangle[0].attributes.getNamedItem("y1").value;
            var ty2 = triangle[0].attributes.getNamedItem("y2").value;
            var ty3 = triangle[0].attributes.getNamedItem("y3").value;
            var tz1 = triangle[0].attributes.getNamedItem("z1").value;
            var tz2 = triangle[0].attributes.getNamedItem("z2").value;
            var tz3 = triangle[0].attributes.getNamedItem("z3").value;
            this.objects[id] = new Triangle(this.scene, tx1, ty1, tz1, tx2, ty2, tz2, tx3, ty3, tz3);
        }

        var cylinder = primitive[i].getElementsByTagName("cylinder");

        if (cylinder.length == 1) {
            var type = "cylinder";
            var base = cylinder[0].attributes.getNamedItem("base").value;
            var top = cylinder[0].attributes.getNamedItem("top").value;
            var height = cylinder[0].attributes.getNamedItem("height").value;
            var slices = cylinder[0].attributes.getNamedItem("slices").value;
            var stacks = cylinder[0].attributes.getNamedItem("stacks").value;
            this.objects[id] = new Cylinder(this.scene, base, top, height, slices, stacks);
        }

        var sphere = primitive[i].getElementsByTagName("sphere");

        if (sphere.length == 1) {
            var type = "sphere";
            var radius = sphere[0].attributes.getNamedItem("radius").value;
            var slices = sphere[0].attributes.getNamedItem("slices").value;
            var stacks = sphere[0].attributes.getNamedItem("stacks").value;

            this.objects[id] = new Sphere(this.scene,radius,slices,stacks);
        }

        /*var torus = primitive[i].getElementsByTagName("torus");

        if (torus.length == 1) {
            var type = "torus";
            var inner = torus[0].attributes.getNamedItem("inner").value;
            var outer = torus[0].attributes.getNamedItem("outer").value;
            var slices = torus[0].attributes.getNamedItem("slices").value;
            var loops = torus[0].attributes.getNamedItem("loops").value;
            this.objects[id] = [type, inner, outer, slices, loops];
        }*/



    }

};


MySceneGraph.prototype.parserToComponents = function(rootElement) {
    var components = rootElement.getElementsByTagName("components")[0];

    if (components == null) {
        return "components not defined.";
    }

    for (let component of components.children) {
        let id = component.attributes.getNamedItem("id").value;
        let transformationsFlag = 0;
        let materialsFlag = 0;
        let textureFlag = 0;
        let childrenFlag = 0;

        this.transformationsArray = new Array();
        this.materialsArray = new Array();
        this.componentTexture;
        this.componentChildren = new Array();
        this.primitiveChildren = new Array();

        //this alows for the attributes of the component to not be ordered
        for (let attribute of component.children) {
            let attributeName = attribute.nodeName;
            switch (attributeName) {
                case 'transformation':
                    this.transformationsFlag = 1;
                    let transformations = attribute;

                    //TODO: save transformations into a single matrix
                    for (let transformation of transformations.children) {
                        let type = transformation.nodeName;
                        switch (type) {
                            case 'transformationref':

                                break;
                            case 'tranlate':

                                break;
                            case 'rotate':

                                break;
                            case 'scale':

                                break;
                        }
                    }
                    break;
                case 'materials':
                    this.materialsFlag = 1;
                    let materials = attribute;
                    for (let material of materials.children) {
                        this.materialsArray.push(material.attributes.getNamedItem("id").value);
                    }
                    break;
                case 'texture':
                    this.textureFlag = 1;
                    let texture = attribute;
                    this.componentTexture = (texture.attributes.getNamedItem("id").value);
                    break;
                case 'children':

                    let childrens = attribute;
                    for (let children of childrens.children) {
                        let type = children.nodeName;
                        switch (type) {
                            case 'componentref':
                                this.childrenFlag = 1;
                                this.componentChildren.push(children.attributes.getNamedItem("id").value);
                                break;
                            case 'primitiveref':
                                this.childrenFlag = 1;
                                this.primitiveChildren.push(children.attributes.getNamedItem("id").value);
                                break;
                        }
                    }
                    break;
            }


        }

        if (this.transformationsFlag) {
            if (this.materialsFlag) {
                if (this.textureFlag) {
                    if (this.childrenFlag) {
                        console.log("read all components");
                        //TODO: create component

                    } else {
                        console.log("No children objects defined");
                    }
                } else {
                    console.log("No texture defined");
                }
            } else {
                console.log("No materials defined");
            }
        } else {
            console.log("No transformation defined");
        }

    }

}


MySceneGraph.prototype.display = function() {

    this.scene.pushMatrix();
    /*for (let object in this.objects) {

        this.objects[object].display();
    }*/

    this.scene.popMatrix();
}

/*
 * Callback to be executed on any read error
 */

MySceneGraph.prototype.onXMLError = function(message) {
    console.error("XML Loading Error: " + message);
    this.loadedOk = false;
};
