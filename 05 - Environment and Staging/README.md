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


## 3 Shadows

``` javascript

```
