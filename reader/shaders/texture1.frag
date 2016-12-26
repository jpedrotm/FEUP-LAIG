#ifdef GL_ES
precision highp float;
#endif


varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform vec4 color1;
uniform vec4 color2;
uniform vec4 colorS;
uniform float dU;
uniform float dV;
uniform float sU;
uniform float sV;

void main() {

  vec4 finalColor = texture2D(uSampler, vTextureCoord);

	vec4 mixColor;

	if((vTextureCoord.x >= (sU/dU)) && (vTextureCoord.x <= (sU+1.0)/dU) && (vTextureCoord.y >= (sV/dV)) && (vTextureCoord.y <= (sV+1.0)/dV))
	{
		mixColor=colorS;
	}
  else
  {

    float x=mod(floor(dU*vTextureCoord.x), 2.0);
    float y=mod(floor(dV*vTextureCoord.y), 2.0);

    if((x==0.0 && y==0.0) || (x==1.0 && y==1.0))
    {
      mixColor=color2;
    }
    else
    {
      mixColor=color1;
    }

  }


  finalColor.rgba *= mixColor;

  gl_FragColor = finalColor;
}
