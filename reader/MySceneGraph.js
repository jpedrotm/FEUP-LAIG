
function MySceneGraph(filename, scene) {
	this.loadedOk = null;

	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph=this;

	// File reading
	this.reader = new CGFXMLreader();

	//Estruturas de dados necessárias para o parser-----------------------------------------------------------
	this.viewDefault;
	this.perspectives=[];
	this.cfgCameras=[];
	this.textures=[].fill(new Array(3));;//[id][0...1...2] 0-file 1-length_s 2-length_t
	//this.materials=[];



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
	var error = this.parser(rootElement);

	if (error != null) {
		this.onXMLError(error);
		return;
	}

	this.loadedOk=true;

	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
};


MySceneGraph.prototype.parser=function(rootElement){

this.parserToViews(rootElement); //Falta acrescentar os parametros para guardar a informação toda
	                                         		//uma vez que o this.perspectives ainda não está a ser usado.

var allTextures = rootElement.getElementsByTagName('textures');

if (allTextures == null) {
	return "Views are missing.";
}

if (allTextures.length != 1) {
	return "Either zero or more than one 'textures' element found.";
}

	this.parserToTextures(allTextures);

	var allMaterials=rootElement.getElementsByTagName('materials');

	if(allMaterials == null)
	{
		return "Materials are missing.";
	}

	if(allMaterials.length!=1){
		return "Either zero or more than one 'materials' element found.";
	}

	this.parserToMaterials(allMaterials);

};


//TODO A partir daqui começar a fazer funcoes para cada um dos elementos (scene,views...)
//Cada função recebe os elementos correspondentes (elems) e as estruturas necessárias para o armazenamento da materia
MySceneGraph.prototype.parserToViews=function(rootElement){

	var views;
	views = rootElement.getElementsByTagName('views');

	if (views == null) {
		return "Views are missing.";
	}

	if (views.length != 1) {
		return "Either zero or more than one 'view' element found.";
	}

	this.defaultCamera=views[0].attributes.getNamedItem("default").value;


	this.perspectives=views[0].getElementsByTagName('perspective');

	if(this.perspectives == null)
	{
		return "Perspectives are missing.";
	}



	for(var i = 0; i < this.perspectives.length; i++){


		//Obter os valores da perspective
		var id=this.perspectives[i].attributes.getNamedItem("id").value;
		var near=this.perspectives[i].attributes.getNamedItem("near").value;
		var far=this.perspectives[i].attributes.getNamedItem("far").value;
		var angle=this.perspectives[i].attributes.getNamedItem("angle").value;

		//Obter o que está definido dentro de cada perspective (from e to) e obter os valores de estes
		var from = this.perspectives[i].getElementsByTagName('from');
		var vectorF=[from[0].attributes.getNamedItem("x").value,from[0].attributes.getNamedItem("y").value,from[0].attributes.getNamedItem("z").value];

		var to =this.perspectives[i].getElementsByTagName('to');
		var vectorT=[to[0].attributes.getNamedItem("x").value,to[0].attributes.getNamedItem("y").value,to[0].attributes.getNamedItem("z").value]

		//Vale mesmo a pena criar no parser a camera? o parser devia guardar só a informação e esta ser usada no XMLScene para criar os objectos/camaras/etc..
		//this.cfgCameras.push(new CGFCamera(angle,near,far,vectorF,vectorT));


	}
};

MySceneGraph.prototype.parserToTextures=function(allTextures){

	var texts=allTextures[0].getElementsByTagName('texture');

	if(texts==null)
	{
		return "Textures are missing.";
	}

		for(var i = 0; i < texts.length; i++){

			var id=this.reader.getString(texts,'id',true);
			var file=this.reader.getString(texts,'file',true);
			var l_s=this.reader.getFloat(texts,'length_s',true);
			var l_t=this.reader.getFloat(texts,'length_t',true);

			//Guardar para cada textura identificada pelo id, o file,o length_s e o length_t
			//Não tenho a certeza se podemos gravar tudo no mesmo array uma vez que o file e uma string
			//e o l_s e l_t e float, verifica quando testares
			this.textures[id][0]=file;
			this.textures[id][1]=l_s;
			this.textures[id][2]=l_t;

		}

};

//Ainda não guarda nada, não sei ainda como guardar tudo de forma correta, apenas le os valores
//falta acabar TODO
MySceneGraph.prototype.parserToMaterials=function(allMaterials){

	var mats=allMaterials[0].getElementsByTagName('material');

	if(mats==null)
	{
		return "Mats are missing.";
	}

	/*for(var i=0;i<mats.length;i++)
	{
		var
	}*/

};





/*
 * Callback to be executed on any read error
 */

MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);
	this.loadedOk=false;
};
