attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform float dU;
uniform float dV;
uniform float sU;
uniform float sV;

uniform float cellHeight;


void main() {

		if((aTextureCoord.x >= (sU/dU)) && (aTextureCoord.x <= (sU+1.0)/dU) && (aTextureCoord.y >= (sV/dV)) && (aTextureCoord.y <= (sV+1.0)/dV))
			gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.x ,aVertexPosition.y ,aVertexPosition.z + cellHeight, 1.0);
	else
			gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

  vTextureCoord = aTextureCoord;
}
