# Post-processing


Post-processing

* [Repository](https://github.com/pmndrs/postprocessing)
* [Documentation](https://pmndrs.github.io/postprocessing/public/docs/)
* [Examples](https://pmndrs.github.io/postprocessing/public/demo/#antialiasing)

React Post-processing

* [Repository](https://github.com/pmndrs/react-postprocessing)
* [Documentation](https://docs.pmnd.rs/react-postprocessing/introduction)
* [List](https://github.com/pmndrs/postprocessing#included-effects)


## 1 - Setup

1. Install

``` bash
npm install @react-three/postprocessing@2.14
```

2. Define a background, transparent background could lead to bugs with the effects.
``` javascript 
<color args={ [ '#ffffff' ] } attach="background" />
```

## 2 - Blending / Coloring

Available in all effects, defines how effect colors are applied.

`blendFunction`

Most used:
* OVERLAY
* SCREEN
* SOFT_LIGHT
* AVERAGE

``` bash
npm install postprocessing@6.33
```

`BlendFunction.NORMAL` is the default

``` javascript
import { BlendFunction } from 'postprocessing'
console.log(BlendFunction) // List of options

<Vignette
    offset={ 0.3 }
    darkness={ 0.9 }
    blendFunction={ BlendFunction.COLOR_BURN }
/>
```

## 3 - Effects

1. Vignette
2. Glitch
3. Noise
4. Bloom
5. Depth of Field
6. SSR (Screen Space Reflection)

### 3.1 - Vignette

Corners of the screen become darker.

``` javascript
import { Vignette, EffectComposer } from '@react-three/postprocessing'

<EffectComposer
    multisampling={ 0 }
>
    <Vignette
        offset={ 0.3 }
        darkness={ 0.9 }
    />
</EffectComposer>
```

### 3.2 - Glitch

Some noise and Glitch the screen after a while.

``` javascript
import { Glitch, EffectComposer } from '@react-three/postprocessing'
import { GlitchMode } from 'postprocessing'

<EffectComposer
    multisampling={ 0 }
>
    <Glitch
        delay={ [ 0.5, 1 ] }
        duration={ [ 0.1, 0.3 ] }
        strength={ [0.2, 0.4] }
        mode={ GlitchMode.SPORADIC }
    />
</EffectComposer>
```

### 3.3 - Noise

Add noise to the screen.

``` javascript
import { Noise, EffectComposer } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

<EffectComposer
    multisampling={ 0 }
>
    <Noise
        premultiply
        blendFunction={ BlendFunction.SOFT_LIGHT }
    />
</EffectComposer>
```

### 3.4 - Bloom

1. Increase RGB levels
2. Default Colors

Make the objects glow.

The combination of surrounding lights can increase the RGB values, making it shine brighter in certain areas, this may not be realistic if we are simulating a light-emitting object.

#### 3.4.1 - Increase RGB levels

Colors with more than 0.9 will glow, so we need to turn off the ToneMapping.

Should use this technique with `meshBasicMaterial`, we cant use `emissive` in this material.

``` javascript
import { Bloom, EffectComposer } from '@react-three/postprocessing'

<EffectComposer
    multisampling={ 0 }
>
    <Bloom
        mipmapBlur
    />
</EffectComposer>

<mesh>
    <boxGeometry />
    <meshStandardMaterial
        toneMapped={ false }
        color={ [ 1.5, 1, 4]}
    />
</mesh>
```

#### 3.4.2 - Default Colors

``` javascript
import { Bloom, EffectComposer } from '@react-three/postprocessing'


<EffectComposer
    multisampling={ 0 }
>
    <Bloom
        mipmapBlur
        intensity={ 0.5 }
        luminanceThreshold={ 0.8 }
    />
</EffectComposer>


<mesh>
    <boxGeometry />
    <meshStandardMaterial
        toneMapped={ false }
        color={"lightGreen"}
        emissive="cyan"
        emissiveIntensity={ 3 }
    />
</mesh>
```

### 3.5 - Depth of Field

blurs objects that are more distant, increasing the reality of the scene.

Values from 0 to 1.

``` javascript	
import { DepthOfField, EffectComposer } from '@react-three/postprocessing'

        <EffectComposer
            multisampling={ 0 }
        >
            <DepthOfField 
                focusDistance={ 0.025 }
                focalLength={ 0.025 }
                bokehScale={ 2 }
            />
        </EffectComposer>
```

### 3.6 - SSR (Screen Space Reflection)

Add reflections to the scene.

We should use a example with this effect to simplify is usage.

* [SSR Example](https://codesandbox.io/s/ssr-test-8pbw1f)

* [Other examples](https://docs.pmnd.rs/react-three-fiber/getting-started/examples)

``` javascript	
import { SSR } from '@react-three/postprocessing'
import { useControls } from 'leva'

const ssrProps = useControls('SSR Effect', {
    temporalResolve: true,
    STRETCH_MISSED_RAYS: true,
    USE_MRT: true,
    USE_NORMALMAP: true,
    USE_ROUGHNESSMAP: true,
    ENABLE_JITTERING: true,
    ENABLE_BLUR: true,
    temporalResolveMix: { value: 0.9, min: 0, max: 1 },
    temporalResolveCorrectionMix: { value: 0.25, min: 0, max: 1 },
    maxSamples: { value: 0, min: 0, max: 1 },
    resolutionScale: { value: 1, min: 0, max: 1 },
    blurMix: { value: 0.5, min: 0, max: 1 },
    blurKernelSize: { value: 8, min: 0, max: 8 },
    blurSharpness: { value: 0.5, min: 0, max: 1 },
    rayStep: { value: 0.3, min: 0, max: 1 },
    intensity: { value: 1, min: 0, max: 5 },
    maxRoughness: { value: 0.1, min: 0, max: 1 },
    jitter: { value: 0.7, min: 0, max: 5 },
    jitterSpread: { value: 0.45, min: 0, max: 1 },
    jitterRough: { value: 0.1, min: 0, max: 1 },
    roughnessFadeOut: { value: 1, min: 0, max: 1 },
    rayFadeOut: { value: 0, min: 0, max: 1 },
    MAX_STEPS: { value: 20, min: 0, max: 20 },
    NUM_BINARY_SEARCH_STEPS: { value: 5, min: 0, max: 10 },
    maxDepthDifference: { value: 3, min: 0, max: 10 },
    maxDepth: { value: 1, min: 0, max: 1 },
    thickness: { value: 10, min: 0, max: 10 },
    ior: { value: 1.45, min: 0, max: 2 }
})

<EffectComposer
    multisampling={ 0 }
>
    <SSR 
        {...ssrProps}
    />
</EffectComposer>
```

## 4 - Custom Effect