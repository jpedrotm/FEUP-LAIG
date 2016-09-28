
function MySceneGraph(filename, scene) {
	this.loadedOk = null;

	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph=this;

	// File reading
	this.reader = new CGFXMLreader();

	//Estruturas de dados necessárias para o parser-----------------------------------------------------------
	this.perspectives=[];
	this.viewDefault;



	/*
	 * Read the contents of the xml file, and refer to this class for loading and error handlers.
	 * After the file is read, the reader calls onXMLReady on this object.
	 * If any error occurs, the reader calls onXMLError on this object, with an error message
	 */

	this.reader.open('scenes/'+filename, this);
}

/*
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady=function()
{
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement;

	// Here should go the calls for different functions to parse the various blocks
	var error = this.parseGlobalsExample(rootElement);

	if (error != null) {
		this.onXMLError(error);
		return;
	}

	this.loadedOk=true;

	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
};



/*
 * Example of method that parses elements of one block and stores information in a specific data structure
 */
MySceneGraph.prototype.parseGlobalsExample= function(rootElement) {

	var elems =  rootElement.getElementsByTagName('globals');
	if (elems == null) {
		return "globals element is missing.";
	}

	if (elems.length != 1) {
		return "either zero or more than one 'globals' element found.";
	}

	// various examples of different types of access

	var globals = elems[0];
	this.background = this.reader.getRGBA(globals, 'background');
	this.drawmode = this.reader.getItem(globals, 'drawmode', ["fill","line","point"]);
	this.cullface = this.reader.getItem(globals, 'cullface', ["back","front","none", "frontandback"]);
	this.cullorder = this.reader.getItem(globals, 'cullorder', ["ccw","cw"]);

	console.log("Globals read from file: {background=" + this.background + ", drawmode=" + this.drawmode + ", cullface=" + this.cullface + ", cullorder=" + this.cullorder + "}");

	var tempList=rootElement.getElementsByTagName('list');

	if (tempList == null  || tempList.length==0) {
		return "list element is missing.";
	}

	this.list=[];
	// iterate over every element
	var nnodes=tempList[0].children.length;
	for (var i=0; i< nnodes; i++)
	{
		var e=tempList[0].children[i];

		// process each element and store its information
		this.list[e.id]=e.attributes.getNamedItem("coords").value;
		console.log("Read list item id "+ e.id+" with value "+this.list[e.id]);
	};

};

//Parser principal
MySceneGraph.prototype.parser=function(rootElement){

	var views = rootElement.getElementsByTagName('views')[0];

	if (views == null) {
		return "Views are missing.";
	}

	if (views.length != 1) {
		return "Either zero or more than one 'view' element found.";
	}


	parserToViews(views, this.perspectives); //Falta acrescentar os parametros para guardar a informação toda
	                                         //uma vez que o this.perspectives ainda não está a ser usado.


};


//TODO A partir daqui começar a fazer funcoes para cada um dos elementos (scene,views...)
//Cada função recebe os elementos correspondentes (elems) e as estruturas necessárias para o armazenamento da materia
MySceneGraph.prototype.parserToViews=function(views,perspectives){

	var defaultCamera=this.reader.getString(views,'default',true);

	var tempPersp=views[0].getElementsByTagName('perspective');

	if(tempPersp == null)
	{
		return "Perspectives are missing.";
	}



	for(var i = 0; i < tempPersp.length; i++){


		//Obter os valores da perspective
		var id=this.reader.getString(tempPersp, 'id',true); //Ainda não estou a guardar o id ainda não encontrei uma maneira boa de o fazer. TODO
		var near=this.reader.getFloat(tempPersp, 'near',true);
		var far=this.reader.getFloat(tempPersp, 'far',true);
		var angle=this.reader.getFloat(tempPersp, 'angle',true);

		//Obter o que está definido dentro de cada perspective (from e to) e obter os valores de estes
		var from =perspective.getElementsByTagName('from')[0];
		var vectorF=this.parseVec3(from);

		var to =perspective.getElementsByTagName('to')[0];
		var vectorT=this.parseVec3(to);

		perspectives.push(new CGFCamera(angle,near,far,vectorF,vectorT)); //Já guardamos a perspetiva (camera) menos o id TODO

	}


	this.viewDefault=perspectives[defaultCamera]; //Definir a perspetiva indicada como default

};



/*
 * Callback to be executed on any read error
 */

MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);
	this.loadedOk=false;
};
