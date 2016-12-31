# LAIG

## Index

1. [Description] (#description)
2. [Project 1 and 2] (#project-1-and-2)
3. [Project 3] (#project-3)
4. [Developers] (#developers)
5. [Build] (#build)

***

### Description

The main goal of this subject was to develop 3D environments focused in [Computer Graphics](https://en.wikipedia.org/wiki/Computer_graphics).
We developed projects written in [JavaScript] (https://en.wikipedia.org/wiki/JavaScript) with the appropriated technology of image synthesys. This whole subject was based on [WebGL](https://en.wikipedia.org/wiki/WebGL) and with the use of [CGFlib](https://paginas.fe.up.pt/~ruirodrig/pub/sw/cgflib/docs/_c_g_finterface_8h.html).
***


### Project 1 and 2

This project's goal is to build a DSX parser. DSX means "Description of Scenes in XML" and its purpose is to build a scene using a file.
It is structured using a Scene Graph and you can see how the tags work [here](./Projeto3/EspecDSX.txt).

![](https://raw.githubusercontent.com/jpedrotm/FEUP-LAIG/master/Projeto1&2/res/laig1.gif)

***

### Project 3

It was intended to create a 3D environment developed in WebGL to represent the game states of a [Prolog] (https://en.wikipedia.org/wiki/Prolog) board game and make use of a game interface [dat.gui](https://code.google.com/p/dat-gui/). We also developed a [parser](./Projeto3/reader/Objs) to import .obj files into the scene.


Game Functionalitites:

- [x] Two different game scenarios
- [x] Modeling and movement of game pieces
- [X] Illumination
- [x] Game type (Bot vs Bot / Human vs Bot / Human vs Human)
- [x] Bot Mode with different types of difficulty  
- [x] Undo functionality
- [x] Point of View animated translation
- [X] Counter (Including a marker and a timer)
- [X] Replay functionality (with stop and pause options)


![](https://raw.githubusercontent.com/jpedrotm/FEUP-LAIG/master/Projeto3/res/laig.gif)

### Developers

* [Jose Monteiro] (https://github.com/jpedrotm)
* [Pedro Costa] (https://github.com/pedro-c)

***

### Build
Inside the project folder open a terminal and write:
```
python3 -m http.server 8080
```
Then just on your browser: http://localhost:8080/
