import { BlendFunction, Effect } from 'postprocessing'

const fragmentShader = `
    uniform float frequency;
    uniform float amplitude;
    uniform float offset;

    void mainUv(inout vec2 uv)
    {
        uv.y += sin(uv.x * frequency + offset) * amplitude;
    }

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
    {
        vec4 color = inputColor;
        color.rgb *= vec3(0.6, 1.0, 0.7);

        outputColor = color;
    }
`

export default class DrunkEffect extends Effect
{
    constructor({ frequency = 2, amplitude = 0.2, blendFunction = BlendFunction.NORMAL})
    {
        super(
            'DrunkEffect',
            fragmentShader,
            {
                uniforms: new Map([
                    [ 'frequency', { value: frequency } ],
                    [ 'amplitude', { value: amplitude } ],
                    [ 'offset', { value: 0 } ],
                ]),
                blendFunction
            }
        )
    }

    update(renderer, inputBuffer, deltaTime)
    {
        this.uniforms.get('offset').value += deltaTime
    }
}