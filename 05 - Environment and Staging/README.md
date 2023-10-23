# Environment and Staging

1. Background Color
2. Lights
3. Shadows
4. Sky
5. Environments map
6. Stage


## 1 - Background Color

1. CSS
2. Javascript
3. Three.js
4. React Three Fiber


### 1.1 - CSS
``` css
#root
{
    background-color: black;
}
```


### 1.2 - Javascript
`index.jsx`
``` javascript
const created = ({ gl }) =>
{
    gl.setClearColor('#ff0000', 1)
}
```


### 1.3 - Three.js
``` javascript
import * as THREE from 'three'

const created = ({ scene }) =>
{
    scene.background = new THREE.Color('#00ff00')
}
```


### 1.4 - React Three Fiber
``` javascript
import * as THREE from 'three'

<Canvas>
    <color args={ [ '#0000ff' ] }  attach="background"/>
</Canvas>
```


## 2 - Lights

1. Light Helpers
2. Types of lights


### 2.1. Light Helpers

This can be used with the camera

``` javascript
import { useHelper, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useRef } from 'react'

const directionalLight = useRef()
useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

<directionalLight
    ref={ directionalLight }
    position={ [ 1, 2, 3 ] }
    intensity={ 1.5 }
/>
```


### 2.2. Types of lights

1. `<ambientLight />`
2. `<hemisphereLight />`
3. `<directionalLight />`
4. `<pointLightLight />`
5. `<rectAreaLightLight />`
6. `<spotLightLight />`


## 3 - Shadows

Realistic shadows have slightly bluer pigmentation, change the color accordingly

1. Setup
2. Baking

### 3.1 - Setup

`index.jsx`
``` javascript
    <Canvas
        shadows
    >
    </Canvas>
```

`component.jsx`
``` javascript
<directionalLight
    castShadow
/>

<mesh
    castShadow
>
    <sphereGeometry />
    <meshStandardMaterial />
</mesh>

<mesh
    castShadow
>
    <boxGeometry />
    <meshStandardMaterial />
</mesh>

<mesh
    receiveShadow
>
    <planeGeometry />
    <meshStandardMaterial />
</mesh>
```

### 3.2 - Baking

For static shadows, reduce resources needed to cast a shadow.

``` javascript
import { BakeShadows } from '@react-three/drei'

<BakeShadows />
```

### 3.3 - Configure

1. Sharp shadows
2. Soft shadows
3. Accumulative shadows
4. Contact shadows

#### 3.3.1 - Sharp shadows

``` javascript
<directionalLight
    ref={ directionalLight }
    position={ [ 1, 2, 3 ] }
    intensity={ 1.5 }
    castShadow
    shadow-mapSize={ [ 1024, 1024 ] }
    shadow-camera-near={ 1 }
    shadow-camera-far={ 10 }
    shadow-camera-top={ 5 }
    shadow-camera-right={ 5 }
    shadow-camera-bottom={ -5 }
    shadow-camera-left={ -5 }
/>
```


#### 3.3.2 - Soft shadows

Softens the shadow depending on the distance from the object.

``` javascript
import { SoftShadows } from '@react-three/drei'

<SoftShadows
    size={ 25 }
    samples={ 10 }
    focus={ 0 }
/>
```


#### 3.3.3 - Accumulative shadows

Accumulates multiple shadows, moves the light randomly before each render and compose them together, can be used only with a `Plane`, ideal to make a floor.

Final accumulation will create delay in shadow calculation, not ideal for animating

``` javascript
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'

<AccumulativeShadows
    position={ [0, -0.99, 0 ] }
    scale={ 10 }
    color='#326447'
    opacity={ 0.8 }
    frames={ Infinity }
    temporal
    blend={ 100 }
>
    <RandomizedLight
        amount={ 8 }
        radius={ 1 }
        ambient={ 0.5 }
        bias={ 0.001 }
        position={ [1, 2, 3] }
        castShadow
    />
</AccumulativeShadows>
```


#### 3.3.4 - Contact shadows

Don't use default shadows, we can deactivate them, don´t need a light and only works on a plane

Render from the floor, and use the `frames={ 1 } to bake the shadow`, the light comes always from the front of the plane and its good for performance.

`index.jsx`
``` javascript
<Canvas
    shadows={ false }
>
</Canvas>
```

`component.jsx`
``` javascript
import { useControls } from 'leva'
import { ContactShadows } from '@react-three/drei'

<ContactShadows
    position={ [ 0, -0.99, 0] }
    scale={ 10 }
    resolution={ 512 }
    far={ 5 }
    near={ 0.01 }
    color={ color }
    opacity={ opacity }
    blur={ blur }
    frames={ 1 }
/>
```


## 4 - Sky

Creates a sky that can be customized, to improve the sun, we associate a directional light to update the shadows on objects in relation to the position of the sun.

``` javascript
import { Sky } from '@react-three/drei'
import { useControls } from 'leva'


const { sunPosition } = useControls('sky',
{
    sunPosition: { value: [ 1, 2, 3] }
})

<directionalLight
    ref={ directionalLight }
    position={ sunPosition }
    intensity={ 1.5 }
    castShadow
    shadow-mapSize={ [ 1024, 1024 ] }
    shadow-camera-near={ 1 }
    shadow-camera-far={ 10 }
    shadow-camera-top={ 5 }
    shadow-camera-right={ 5 }
    shadow-camera-bottom={ -5 }
    shadow-camera-left={ -5 }
/>

<Sky
    position={ sunPosition }
/>
```


## 5 - Environments map

1. Cube Map
2. HDR Map
3. Preset


### 5.1 - Cube Map

Load the textures and apply them to all materials

``` javascript
import { Environment } from '@react-three/drei'
import { useControls } from 'leva'

const { envMapIntensity } = useControls('environment map',
{
    envMapIntensity: { value: 3.5, min: 0, max: 12 }
})

<Environment
    background
    files={ [
        './environmentMaps/0/px.jpg',
        './environmentMaps/0/nx.jpg',
        './environmentMaps/0/py.jpg',
        './environmentMaps/0/ny.jpg',
        './environmentMaps/0/pz.jpg',
        './environmentMaps/0/nz.jpg',
    ] }
/>

<mesh
    castShadow
>
    <boxGeometry />
    <meshStandardMaterial
        envMapIntensity={ envMapIntensity }
    />
</mesh>

<mesh>
    <planeGeometry />
    <meshStandardMaterial
        envMapIntensity={ envMapIntensity }
    />
</mesh>
```


### 5.2 - HDR Map

Just load the HDR file

``` javascript
<Environment
    background
    files={ './environmentMaps/the_sky_is_on_fire_2k.hdr' }
/>
```

### 5.3 - Preset

Presets from Poly Haven

* [Presets list](https://github.com/pmndrs/drei/blob/master/src/helpers/environment-assets.ts)

``` javascript
<Environment
    background
    preset="sunset"
/>
```

### 5.3 - Custom

We can add geometries within the environment map

``` javascript
<Environment
    background
    preset='city'
>
    <mesh
        position={ [0, 4, -5] }
        scale={ 10 }
    >
        <planeGeometry />
        <meshBasicMaterial color={ "#248181"} />
    </mesh>
</Environment>
```

### 5.3 Custom Lights

``` javascript
import { Lightformer, Environment } from '@react-three/drei'

<Environment
    background
>
    <Lightformer
        position={ [0, 4, -5] }
        scale={ 10 }
        color={ "#117568" }
        intensity={ 10 }
        form="ring"
    />
</Environment>
```

### 5.4 Configure

``` javascript

```

## 6 - Stage

Default stage

``` javascript
import { Stage } from '@react-three/drei'

<Stage>
    <mesh
        castShadow
        position-x={ - 2 }
        position-y={ 1 }
    >
        <sphereGeometry />
        <meshStandardMaterial
            color="#156356"
            envMapIntensity={ envMapIntensity }
        />
    </mesh>

    <mesh
        castShadow
        ref={ cube }
        position-x={ 2 }
        position-y={ 1 }
        scale={ 1.5 }
    >
        <boxGeometry />
        <meshStandardMaterial
            color="#681e5e"
            envMapIntensity={ envMapIntensity }
        />
    </mesh>
</Stage>
```