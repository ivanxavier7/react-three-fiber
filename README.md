# Three.js -  React Three Fiber

React - Data binding- application react to the data (event triggering)

* [Three.js Docs](https://threejs.org/docs/)

1. React
2. R3F Simple Application
3. Drei
4. Debug
5. Environment and Staging
6. Load Models
7. 3D Text
8. Portal Scene
9. Mouse Events
10. Post-processing
11. Computer Scene
12. Physics
13. Simple Game

------

# 1 - React

[React Docs](https://react.dev/learn)
[React Courses](https://legacy.reactjs.org/community/courses.html)

1. Setup
2. JSX
3. Conditional rendering
4. Properties
5. Mapping cycle
6. Cache
7. DOM
8. People component
9. Fetch API

### 1 - Setup

1. NPX-Node
2. Scratch
3. Vite - Recommended

### 1.1 - NPX 

* Needs `npm` to get dependencies, ideal to modular applications

[Create React App - NPX](https://www.npmjs.com/package/create-react-app)

Isstall project
``` bash
npm install -g npx # Install npx globally
npx create-react-app .
```

### 1.2 - Scratch

* NPX adds unecessary files so we can do it from scratch

1. Initialize
``` bash
npm init -y
```

2.  Add dependencies
``` bash
npm install react@18 react-dom@18.2 react-scripts@5.0
```
3. Change `package.json`
``` json
{
    // ...
  "scripts": {
    "dev": "react-scripts start",
    "build": "react-scripts build"
  },
    // ...
}
```

4. Create `/public/` folder

5. Create `index.html` inside `/public/` folder, and use `!` or `html:5` to generate the code.

6. Add `root` to the body
``` html
<body>
    <div id="root"></div>
</body>
```

7. Add `/src/` folder

8. Add inside `/src/` folder the `index.js`

``` javascript
import { createRoot } from 'react-dom/client'

const root = createRoot(document.querySelector('#root'))

root.render(
    <h1>Hellor React</h1>
)
```

9. Run the server
``` bash
npm run dev
```

10. Choose yes to add default browser configurations


### 1.3 - Vite

1. Create Vite project

``` bash
npm create vite@latest
```

2. Choose project name

3. Choose React framework

4. Choose JavaScript Template

5. Enter the project folder and install
``` bash
npm install
```

6. Run
``` bash
npm run dev
```

7. Install react scripts (optional)
``` bash
npm install react-scripts --save
```

------

## 2 - Event Reacting

`useState`

* Generates a variable linked to a function varname and setVarname(), this makes the site react to changes in this variable

`useEffect`

* Triggers a function when a variable changes

``` javascript
import { useState, useEffect } from 'react'


export default function Clicker()
{
    const [ count, setCount ] = useState(parseInt(localStorage.getItem('count') ?? 0))  // Save value locally

    useEffect(() => {
        localStorage.setItem('count', count) 
    }, [ count ])

    let buttonClick = () =>
    {
        setCount(count + 1)
    }

    return (
      <>
        <div> Click count: { count } </div>
        <button onClick={ buttonClick }>Click me</button>
      </>
    )
}
```

When we leave the array empty `[]` in the `useEffect`, we can the hook the component itself

``` javascript
useEffect(() => {
    console.log('first render of the clicker')
    return () =>
    {
    console.log('disposing clicker component')
    localStorage.removeItem('count')
    }
}, [])  
```

## 3 - Conditional rendering

Rendering components conditionally, in the example we use a button that toggle click component

``` javascript
import { useState } from "react"
import Clicker from "./Clicker"

export default function App()
{
    const [ hasClicker, setHasClicker ] = useState(true)

    const toggleClickerClick = () =>
    {
        setHasClicker(!hasClicker)
    }

    return <>
        <button onClick={toggleClickerClick}>{hasClicker ? 'Hide' : 'Show'} Toggle click </button>
        {/* hasClicker ? <Clicker /> : null*/}
        { hasClicker && <Clicker /> }
    </>
}
```

------

## 4 - Properties

Multiple `Clickers` using the same local storage variable, when we update the page the last value to be updated will be shared by the other `Clickers`, we can catch the content inside one component with the `{ children }` property

Click with property to fix the problem

`App.jsx`

``` javascript	
<Clicker keyName={'countA'}/>
<Clicker keyName={'countB'}/>
<Clicker keyName={'countC'}/>
```

`Clicker.jsx`

``` javascript
export default function Clicker({keyName})
{
    const [ count, setCount ] = useState(parseInt(localStorage.getItem(keyName) ?? 0))

    useEffect(() => {
      return () =>
      {
        localStorage.removeItem(keyName)
      }
    }, [])  

    useEffect(() => {
        localStorage.setItem(keyName, count) 
    }, [ count ])   
    // (...)
}
```

-------

## 5 - Mapping cycle

We can use the `map()` function to cycle through functions through each element of an array and use its index

``` javascript
const tempArray = [...Array(clickersCount)] // Spread operator, converts null in undefined, fills the array
console.log(tempArray)
// Now we can loop 4 times
// Map go though each item on the array and call a function on it
tempArray.map((value, index) =>{
    console.log(value, index)
})
```

### Implementation

`index.jsx`
``` javascript
<App clickersCount={ 3 } />
```

`App.jsx`
``` javascript
{ [...Array(clickersCount)].map((value, index) => 
    <Clicker
        key={index}
        increment={ increment }
        keyName={`count${index}`}
        color={`hsl(${ Math.random() * 360 }deg, 100%, 70%)`}
    />
)}
```

------

## 6 - Cache

When we need to use the cache to store some information we must use `useMemo`

``` javascript
import { useState, useMemo } from "react"

const colors = useMemo(() => {
    const colors = []

    for(let i=0; i<clickersCount; i++)
        colors.push(`hsl(${ Math.random() * 360 }deg, 100%, 75%)`)

    return colors
}, [])

<Clicker
    color={colors[index]}
/>
```

------

## 7 - DOM

To access the component itself, we should use `useRef`

``` javascript
import { useRef, useEffect } from 'react'

const buttonRef = useRef()

// first render
useEffect(() => {
    // DOM
    buttonRef.current.style.backgroundColor = 'cyan'
    buttonRef.current.style.color = 'red'

    return () =>
    {
    }
}, []) 

<button
    ref={ buttonRef }
</button>
```

------

## 8 - People component

Basic example of a component with a list of objects and showing them in a list

``` javascript
import { useState } from 'react'

export default function People()
{
    const [ people, setPeople ] =useState([
        { id: 1, name: 'Ivan'},
        { id: 2, name: 'Xavier'},
        { id: 3, name: 'João'},
        { id: 4, name: 'Ana'},
        { id: 5, name: 'Maria'},
    ])

    return <div>
        <h2>People</h2>

        <ul>
        { people.map(person => <li key={ person.id }>{ person.name }</li>) }
        </ul>
    </div>
}
```

## 9 - Fetch API

Using the same example as the previous component, we can see an example of a request to an API and the application of its data in the component

[API example](https://jsonplaceholder.typicode.com/)

``` javascript
import { useState, useEffect } from 'react'

export default function People()
{
    const [ people, setPeople ] =useState([
        { id: 1, name: 'Ivan'},
        { id: 2, name: 'Xavier'},
        { id: 3, name: 'João'},
        { id: 4, name: 'Ana'},
        { id: 5, name: 'Maria'},
    ])

    const getPeople = async () =>
    {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const result = await response.json()
        setPeople(result)
    }

    useEffect(() => 
    {
        getPeople() // When the component is created, fetch all the people
    }, [])

    return <div>
        <h2>People</h2>

        <ul>
        { people.map(person => <li key={ person.id }>{ person.name }</li>) }
        </ul>
    </div>
}
```

------

# 2 - R3F Simple Application

* [React Three Fiber  Docs](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)

* [React Three Fiber Tutorials](https://sbcode.net/react-three-fiber/)

* [Performance tips](https://docs.pmnd.rs/react-three-fiber/advanced/scaling-performance#instancing)

1. Setup
2. Implementation
3. Animate
4. OrbitControls
5. Lights
6. Custom Geometry
7. Canvas

## 2.1 - Setup

``` bash
npm install three@0.153 @react-three/fiber@8.13 --save
```

## 2.2 - Implementation

```javascript
import { Canvas } from '@react-three/fiber'

<Canvas>
    <group>
        <mesh position-x={ -2 }>
            <sphereGeometry  />
            <meshBasicMaterial color={ 'orange' }/>
        </mesh>
        <mesh
            position-x={ 2 }
            rotation-y={ Math.PI * 0.25 }
            scale={ 1.5 }
        >
            <boxGeometry />
            <meshBasicMaterial color={ 'mediumPurple' }  />
        </mesh>
        <mesh
            position-y={ -1 }
            rotation-x={ Math.PI * - 0.5 }
            scale={ 10 }
        >
            <planeGeometry />
            <meshBasicMaterial color={ 'DarkGreen' }  />
        </mesh>
    </group>
</Canvas>
```

## 2.3 - Animate

we must use the delta to synchronize with the frames of each device, for example, a 144hz screen will animate differently if we do not use the delta

``` javascript
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export default function Experience ()
{
    const cubeRef = useRef()
    useFrame((state, delta) =>
    {
        cubeRef.current.rotation.y += delta
    })

    return <>
        <mesh
            ref={ cubeRef }
        >
            <boxGeometry />
            <meshBasicMaterial />
        </mesh>
    </>
}
```

## 2.4 - OrbitControls

Add orbital controls to the camera

``` javascript
import { useThree ,extend, useFrame } from '@react-three/fiber'

export default function Experience ()
{
    const {camera, gl } = useThree()

    return <>
        <orbitControls args={[ camera, gl.domElement]}/>
        <mesh>
            <boxGeometry />
            <meshBasicMaterial color={ 'mediumPurple' }  />
        </mesh>
    </>
}
```

## 2.5 - Lights

``` javascript
<directionalLight position={[0,2,2]} intensity={ 1.5 } color={ 'Aquamarine' }/>
<ambientLight intensity={ 0.3 } color={'blue'}/>
```

## 2.6 - Custom Geometry

1. Create `Float32Array` for the coordinates
2. Fill the array with values
3. Save it in the cache
4. Create BufferAttribute with this array
5. Add the BufferAttribute to the BuggerGeometry
6. Set the normals in the object

``` javascript
import * as THREE from 'three'
import { useEffect ,useRef, useMemo } from 'react'

export default function CustomObject()
{
    const geometryRef = useRef()
    
    const verticesCount = 10 * 3

    const positions = useMemo(() =>
    {
        const positions = new Float32Array(verticesCount * 3)

        for(let i = 0; i < verticesCount * 3; i++)
        {
            positions[i] = (Math.random() - 0.5) * 3
        }

        return positions
    }, [])

    useEffect(() =>
    {
        //console.log(geometryRef.current)
        geometryRef.current.computeVertexNormals()
    }, [])

    return <mesh>
        <bufferGeometry
            ref={ geometryRef }
        >
            <bufferAttribute 
                attach="attributes-position"
                count={ verticesCount }
                itemSize={ 3 }
                array={ positions}
                
            />
        </bufferGeometry>
        <meshStandardMaterial color="red" side={ THREE.DoubleSide }/>
    </mesh>
}
```

## 2.7 - Canvas

1. Animating camera
2. Antialias
3. ToneMapping
4. Encoding
5. Pixel Ratio

The canvas configures the following for us:
* `Scene`
* `Camera`
* `Renderer`
* `Antialias`
* `Encoding`
* `etc`

But these parameters may have to be modified by us

``` javascript
<Canvas 
    camera={ {  
    position: [1, 2, 3],
    fov: 45,
    near: 0.1,
    far: 200
    }}
>
    <Experience />
    <CustomObject />
</Canvas>
```

### 2.7.1 - Animating camera

Make the camera move in circles around the scene, while looking at its center

``` javascript
useFrame((state, delta) =>
{
    const angle = state.clock.elapsedTime
    state.camera.position.x = Math.sin(angle)
    state.camera.position.z = Math.cos(angle)
    state.camera.lookAt(0, 0, 0)
})
```

### 2.7.2 - Antialias

Is enabled by default, we can remove it with:
``` javascript
<Canvas
    gl={ {
    antialias: false
    }} 
>
    <CustomObject />
</Canvas>
```

### 2.7.3 - ToneMapping

The default is the ACESFilmicToneMapping

we can remove it adding `flat` to the canvas.

``` javascript
<Canvas
    flat
>
    <CustomObject />
</Canvas>
```

Or choose your ToneMapping

``` javascript
import * as THREE from 'three'

<Canvas
    gl={ {
    toneMapping: THREE.CineonToneMapping
    }} 

>
    <CustomObject />
</Canvas>
```

### 2.7.4 - Encoding

By default is set to sRGBEncoding, we can change with `gl` property

``` javascript
import * as THREE from 'three'

<Canvas
    gl={ {
    outputEncoding: THREE.LinearSRGBColorSpace
    }} 
>
    <CustomObject />
</Canvas>
```

### 2.7.5 - Pixel Ratio

We can force a specific pixel ratio with the attribute `dpr`, if its below 1, gets 1, if its above 2 will become 2.
The default is 1 to 2, so we can remove this.

``` javascript
<Canvas
    dpr={ 1, 2 }
>
    <CustomObject />
</Canvas>
```

-------

## 3 - Drei

* [Drei Documentation](https://github.com/pmndrs/drei)
* [Drei Examples](https://drei.pmnd.rs/?path=/docs/staging-environment--docs)

Examples of some helpers using `Drei`

1. Setup
2. Camera Controls
3. Geometries
4. HTML
5. 3D Text
6. Float animation
7. Complex calculations


## 3.1 - Setup


``` bash
npm install @react-three/drei@9.77
```

## 3.2 - Camera Controls

Orbit Controls

``` javascript
import { OrbitControls } from '@react-three/drei'

export default function Experience()
{
    return <>
        <OrbitControls />
        {/* ... */}
    </>
}
```

## 3.3 - Geometries

1. Transform Controls
2. Pivot Controls

### 3.3.1 - Transform Controls

Change the `Position`, `Rotation` and `Scale` of the object

``` javascript
import { TransformControls, OrbitControls } from '@react-three/drei'

export default function Experience()
{
    return <>
        <OrbitControls makeDefault/>
        <TransformControls position={ [ 1, 2, 3 ] }> 
            <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        </TransformControls>
        {/* ... */}
    </>
}
```

Or with `hooks`

``` javascript
import { TransformControls, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

export default function Experience()
{
    return <>
        <OrbitControls makeDefault/>
        <directionalLight ref={ cube} position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <TransformControls object={ cube } mode="rotate"/>
        {/* <TransformControls object={ cube } mode="rotate"/> */}
        {/* <TransformControls object={ cube } mode="scale"/> */}
        {/* ... */}
    </>
}
```

### 3.3.2 - Pivot Controls

Can rotate, move in Axis or by faces on a relative point of referent.

``` javascript
import { PivotControls, OrbitControls } from '@react-three/drei'

<PivotControls
    anchor={ [0, 0, 0] }
    depthTest={ false}
    lineWidth={ 4 }
    axisColors={ ['#8978fb','#16afb4', '#7ba371'] }
    scale={ 2 }
>
    <mesh position-x={ 2 } scale={ 1.5 } >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
    </mesh>
</PivotControls>
```

## 3.4 - HTML

DOM element that stick to the object

``` javascript
import { Html } from '@react-three/drei'

<mesh ref={ cube } position-x={ 2 } scale={ 1.5 } >
    <boxGeometry />
    <meshStandardMaterial color="mediumpurple" />
    <Html
        position={ [-1, 1, 0 ] }
        wrapperClass='label'
        distanceFactor={ 8 }
        occlude={ [ sphere, cube ] }
    >
        That's a cube 👌❤️❤️❤️
    </Html>
</mesh>
```

``` css
.label > div
{
    font-family: Helvetiva, Arial;
    position: absolute;
    background: #00000088;
    color: white;
    padding: 15px;
    white-space: nowrap;
    overflow: hidden;
    border-radius: 30px;
    user-select: none;
}
```

## 3.5 - 3D Text

`SDF Fonts` Signed Distance Field Fonts - Shader functions for the text

Patters
* [2D SDF Functions](https://iquilezles.org/articles/distfunctions2d/)
* [#D SDF Functions](https://iquilezles.org/articles/distfunctions/)

Fonts
* [Google FOnts](https://fonts.google.com/)

Formats supporter:

* `woff` - lighter
* `ttf`
* `otf`

``` javascript
import { Text } from '@react-three/drei'

<Text
    font="./bangers-v20-latin-regular.woff"
    fontSize= { 0.5 }
    color="DarkCyan"
    position={ [-1, 2, 1] }
    scale={ 2 }
    maxWidth={ 1.5 }
    textAlign='center'
>
    Ivan Xavier
    <meshNormalMaterial />
</Text>
```

## 3.6 - Float animation

``` javascript
import { Float, Text } from '@react-three/drei'

<Float
    speed={ 5 }
    floatIntensity={ 3 }
    rotationIntensity={ 2 }
>
    <Text
        font="./bangers-v20-latin-regular.woff"
        fontSize= { 0.5 }
        color="DarkCyan"
        position={ [-1, 2, 1] }
        scale={ 2 }
        maxWidth={ 1.5 }
        textAlign='center'
    >
        Ivan Xavier
        <meshNormalMaterial />
    </Text>
</Float>
```

## 3.7 - Materials

Using a `MeshReflectorMaterial` on the floor to reflect the objects

``` javascript
import { MeshReflectorMaterial } from '@react-three/drei'

<mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
    <planeGeometry />
    <MeshReflectorMaterial color="darkgreen" />
</mesh>
```

------


## 4 - Debug


Use React Developer Tools extension for the browser.

1. StrictMode
2. Leva

## 4.1 - StrictMode

Warn about some problems:

* Infinite render loop
* Forgotten useEffect dependencies
* Unused imports
* Deprecated pratices

``` javascript
import { StrictMode } from 'react'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <StrictMode>
        <Canvas
            camera={ {
                fov: 45,
                near: 0.1,
                far: 200,
                position: [ - 4, 3, 6 ]
            } }
        >
            <Experience />
        </Canvas>
    </StrictMode>
)
```

## 4.2 - Leva

* [Leva Documentation](https://github.com/pmndrs/leva)
* [Leva Configuration](https://github.com/pmndrs/leva/blob/main/docs/configuration.md)

``` bash
npm install leva@0.9
```

## 4.3 - Monitoring

* [R3F-Perf Docs](https://github.com/utsuboco/r3f-perf)

`r3f-perf` Monitors resource consumption on the graphics card, processor, counts FPS, calls and total triangles

``` bash
npm install r3f-perf@7.1
```

``` javascript
import { Perf } from 'r3f-perf'

<Perf
    position="top-left"
/>
```

------

## 5 - Environment and Staging

1. Background Color
2. Lights
3. Shadows
4. Sky
5. Environments map
6. Stage


## 5.1 - Background Color

1. CSS
2. Javascript
3. Three.js
4. React Three Fiber


### 5.1.1 - CSS
``` css
#root
{
    background-color: black;
}
```


### 5.1.2 - Javascript
`index.jsx`
``` javascript
const created = ({ gl }) =>
{
    gl.setClearColor('#ff0000', 1)
}
```


### 5.1.3 - Three.js
``` javascript
import * as THREE from 'three'

const created = ({ scene }) =>
{
    scene.background = new THREE.Color('#00ff00')
}
```


### 5.1.4 - React Three Fiber
``` javascript
import * as THREE from 'three'

<Canvas>
    <color args={ [ '#0000ff' ] }  attach="background"/>
</Canvas>
```


## 5.2 - Lights

1. Light Helpers
2. Types of lights


### 5.2.1. Light Helpers

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


### 5.2.2. Types of lights

1. `<ambientLight />`
2. `<hemisphereLight />`
3. `<directionalLight />`
4. `<pointLightLight />`
5. `<rectAreaLightLight />`
6. `<spotLightLight />`


## 5.3 - Shadows

Realistic shadows have slightly bluer pigmentation, change the color accordingly

1. Setup
2. Baking

### 5.3.1 - Setup

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

### 5.3.2 - Baking

For static shadows, reduce resources needed to cast a shadow.

``` javascript
import { BakeShadows } from '@react-three/drei'

<BakeShadows />
```

### 5.3.3 - Configure

1. Sharp shadows
2. Soft shadows
3. Accumulative shadows
4. Contact shadows

#### 5.3.3.1 - Sharp shadows

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


#### 5.3.3.2 - Soft shadows

Softens the shadow depending on the distance from the object.

``` javascript
import { SoftShadows } from '@react-three/drei'

<SoftShadows
    size={ 25 }
    samples={ 10 }
    focus={ 0 }
/>
```


#### 5.3.3.3 - Accumulative shadows

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


#### 5.3.3.4 - Contact shadows

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


## 5.4 - Sky

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


## 5.5 - Environments map

1. Cube Map
2. HDR Map
3. Preset
4. Custom
5. Custom Lights
6. Configure


### 5.5.1 - Cube Map

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


### 5.5.2 - HDR Map

Just load the HDR file

``` javascript
<Environment
    background
    files={ './environmentMaps/the_sky_is_on_fire_2k.hdr' }
/>
```

### 5.5.3 - Preset

Presets from Poly Haven

* [Presets list](https://github.com/pmndrs/drei/blob/master/src/helpers/environment-assets.ts)

``` javascript
<Environment
    background
    preset="sunset"
/>
```

### 5.5.4 - Custom

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

### 5.5.5 Custom Lights

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

### 5.5.6 Configure

``` javascript

```

## 5.6 - Stage

Default stage

* [Stage](https://github.com/pmndrs/drei#staging)

``` javascript
import { Stage } from '@react-three/drei'

<Stage
    background
    opacity={ 0.2 }
    blur={ 3 }
    environment="sunset"
>
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

------


# 6 - Load Models


## 6.1 - Loader and Draco

Load models with simple leader and draco, the recommended way is below with `Drei`.


``` javascript
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

{/*
const model = useLoader(
    GLTFLoader, 
    './hamburger.glb'
)
*/}

const model = useLoader(
    GLTFLoader,
    './hamburger-draco.glb',
    (loader) =>
    {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('./draco/')
        loader.setDRACOLoader(dracoLoader)
    })

<primitive
    object={ model.scene }
    scale={ 0.35 }
    position-y={ -1 }
/>
```

## 6.2 - Loading Bigger models

When we want to start using the website before the models load we must use the `Suspense` component.

The `FallBack` attribute allows you to replace the model with something while it is not loaded.

`Model.jsx`
``` javascript
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

export default function Model()
{
    {/*
    const model = useLoader(
        GLTFLoader, 
        './hamburger.glb'
    )
    */}

    const model = useLoader(
        GLTFLoader,
        './FlightHelmet/glTF/FlightHelmet.gltf',
        (loader) =>
        {
            const dracoLoader = new DRACOLoader()
            dracoLoader.setDecoderPath('./draco/')
            loader.setDRACOLoader(dracoLoader)
        }
    )

    return <primitive
        object={ model.scene }
        scale={ 5 }
        position-y={ -1 }
    />
}
```

`PlaceHolder.jsx`
``` javascript
export default function Placeholder(props)
{
    return <mesh { ...props /* Retreive all the properties defined in the mesh instatiation*/>}>
        <boxGeometry
            args={ [ 1, 1, 1, 2, 2, 2] }
        />
        <meshBasicMaterial
            wireframe
            color={"red"}
        />
    </mesh>
}
```

`Experience.jsx`
``` javascript
import { Suspense } from 'react'
import Model from './Model'
import Placeholder from './Placeholder'

<Suspense
    fallback={ <Placeholder
        position-y={ 0.5 }
        scale={ [ 2, 3, 2 ] }
    /> }
>
    <Model />
</Suspense>
```


## 6.3 - Drei

1. Loading
2. Preloading


### 6.3.1 - Loading

Recommended way to load models, supports Draco compression.

* `useGLTF`

``` javascript
import { useGLTF } from '@react-three/drei'

export default function Model()
{
    const model = useGLTF('./hamburger-draco.glb')

    return <primitive
        object={ model.scene }
        scale={ 0.35 }
        position-y={ -1 }
    />
}
```


### 6.3.2 - Preloading

Allows you to load components even if they are not yet in use, we can use this as an introduction to hide the loading of more complex objects.

* `useGLTF`

``` javascript
import { useGLTF } from '@react-three/drei'

export default function Model()
{
    const model = useGLTF('./hamburger-draco.glb')

    return <primitive
        object={ model.scene }
        scale={ 0.35 }
        position-y={ -1 }
    />
}

useGLTF.preload('./hamburger-draco.glb')
```

### 


## 6.4 - Multiple instances

add multiple instances of the object using the same geometry using `Clone`.

``` javascript
import { Clone, useGLTF } from '@react-three/drei'

export default function Model()
{
    const model = useGLTF('./hamburger-draco.glb')

    return <>
        <Clone
            object={ model.scene }
            scale={ 0.35 }
            position-y={ -1 }
        />
        <Clone
            object={ model.scene }
            scale={ 0.35 }
            position-y={ -1 }
            position-x={ -3.4 }
        />
        <Clone
            object={ model.scene }
            scale={ 0.35 }
            position-y={ -1 }
            position-x={ 3.4 }
        />
    </>
}
```


## 6.5 - GLTF Component

1. Convert
2. Import and Shadow Acne

Converts a GLTF template to a React THREE Fiber component. We can tweak the menu before copying the result.

[Converter script](https://github.com/pmndrs/gltfjsx)
[Online converter](https://gltf.pmnd.rs/)

Create a component with the name of the model and copy the result into the file.
 * Add the dot `./hamburger-draco.glb`
 * Add export `export default function`
 * Change function name `function Hamburger(props)`
 * Import
 * Change diferent parts of the model if needed


### 6.5.1 - Convert
`Hamburger.jsx`
``` javascript
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";


export default function Model(props)
{
    const { nodes, materials } = useGLTF("./hamburger-draco.glb");
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.bottomBun.geometry}
                material={materials.BunMaterial}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.meat.geometry}
                material={materials.SteakMaterial}
                position={[0, 2.817, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.cheese.geometry}
                material={materials.CheeseMaterial}
                position={[0, 3.04, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.topBun.geometry}
                material={materials.BunMaterial}
                position={[0, 1.771, 0]}
            />
        </group>
    );
}

useGLTF.preload("/hamburger-draco.glb");
```


### 6.5.2 - Import and Shadow Acne

Fix on the bias or shadowBias of the directional light shadow

`Experience.jsx`
``` javascript
import Hamburger from './Hamburger'

<directionalLight
    shadow-normalBias={ 0.04 }
    castShadow
    position={ [ 1, 2, 3 ] }
    intensity={ 1.5 }
/>

<Hamburger
    scale={ 0.35 }
/>
```


## 6.6 - Animations

1. Load
2. Transitions
3. Control with GUI / Leva


### 6.6.1 - Transitions

We use model animations with `useAnimations`.

`Fox.jsx`
``` javascript
import { useAnimations, useGLTF } from "@react-three/drei"
import { useEffect } from "react"

export default function Fox()
{
    const fox = useGLTF('./Fox/glTF/Fox.gltf')
    const animations = useAnimations(fox.animations, fox.scene)
    console.log(animations.actions)

    useEffect(() => 
    {
        const action = animations.actions.Run
        action.play()
    }, [])


    return <primitive
        object={ fox.scene }
        scale={ 0.025 }
        position={ [ -2.5, 0, 2.5 ] }
        rotation-y={ 0.3 }
    />
}
```

`Experience.jsx`
``` javascript
import Fox from './Fox'

<Fox />
```

### 6.6.2 - Transitions

``` javascript
useEffect(() => 
{   animations.actions.Run.play()
    
    window.setTimeout(() =>
    {
        animations.actions.Walk.play()
        animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1)
    }, 2000)
}, [])
```

### 6.6.3 - Control with GUI / Leva

Better way to ask object to start animation, can be integrated with previous transition.

``` javascript
import { useAnimations, useGLTF } from "@react-three/drei"
import { useEffect } from "react"
import { useControls } from 'leva'

export default function Fox()
{
    const fox = useGLTF('./Fox/glTF/Fox.gltf')
    const animations = useAnimations(fox.animations, fox.scene)
    // console.log(animations.actions)

    const { animationName } = useControls({
        animationName: { options: animations.names }
    })

    useEffect(() => 
    {
        const action = animations.actions[animationName]
        action
            .reset()
            .fadeIn(0.5)
            .play()

        return () => 
        {
            // Remove old animation so as not to mix them
            action.fadeOut(0.5)
        }
        
    }, [animationName])


    return <primitive
        object={ fox.scene }
        scale={ 0.025 }
        position={ [ -2.5, 0, 2.5 ] }
        rotation-y={ 0.3 }
    />
}
```


------


# 7 - 3D Text

1. Setup
2. Particles
3. Animate


# 7.1 - Setup

1. Text Parameters
2. Matcap


## 7.1.1 Text Parameters

[Text Parameters](https://threejs.org/docs/#examples/en/geometries/TextGeometry)

* font
* size
* height
* curveSegments
* bevelEnabledue
* bevelThickness
* bevelSize
* bevelOffset
* bevelSegments


## 7.1.2 Matcap

[Matcap Materials](https://github.com/emmelleppi/matcaps)

It is not recommended to use the helper from `drei` to load this material, because it depends on a connection to the server to download the matcap textures.

To choose a texture we just need an identifier:

* [736655_D9D8D5_2F281F_B1AEAB](https://github.com/emmelleppi/matcaps/blob/master/PAGE-16.md#736655_d9d8d5_2f281f_b1aeab)
* [161B1F_C7E0EC_90A5B3_7B8C9B](https://github.com/emmelleppi/matcaps/blob/master/PAGE-2.md#161b1f_c7e0ec_90a5b3_7b8c9b)

``` javascript
import { useMatcapTexture, Center ,Text3D } from '@react-three/drei'

export default function Experience()
{
    const [ matCapTexture ] = useMatcapTexture('736655_D9D8D5_2F281F_B1AEAB', 512)

    return <>
        <Center>
            <Text3D font="./fonts/helvetiker_regular.typeface.json">
                Ivan Xavier
                <meshMatcapMaterial matcap={ matCapTexture } />
            </Text3D>
        </Center>
    </>
}
```

# 7.2 - Particles

1. React Fiber
2. Three.js


## 7.2.1 - React Fiber
Use spread operator in a fixed array to map through each of the spaces.

``` javascript
import { useMatcapTexture } from '@react-three/drei'
import { useState } from 'react'

export default function Experience()
{
    const [ torusGeometry, setTorusGeometry ] = useState()
    const [ matCapMaterial, setMatCapMaterial ] = useState()

    const [ matCapTexture ] = useMatcapTexture('736655_D9D8D5_2F281F_B1AEAB', 512)

    return <>

        <torusGeometry
            ref={ setTorusGeometry }
            args={ [ 1, 0.6, 16, 32 ] }
        />
        <meshMatcapMaterial
            ref={ setMatCapMaterial }
            matcap={ matCapTexture }
        />
        { [...Array(100)].map((value, index) =>
                <mesh
                    geometry={ torusGeometry }
                    material={ matCapMaterial }
                    key={ index }
                    position={ [
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10
                    ]}
                    scale={ 0.2 + Math.random() * 0.2 }
                    rotation={ [
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                        0
                    ]}
                >
                </mesh>
            )
        }
    </>
}
```

## 7.2.2 - Three.js

``` javascript
import { useMatcapTexture } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const matCapMaterial = new THREE.MeshMatcapMaterial()

export default function Experience()
{
    const [ matCapTexture ] = useMatcapTexture('736655_D9D8D5_2F281F_B1AEAB', 512)

    useEffect(() =>
    {
        matCapTexture.colorSpace = THREE.SRGBColorSpace
        matCapTexture.needsUpdate = true

        matCapMaterial.matcap = matCapTexture
        matCapMaterial.needsUpdate = true
    }, [])

    return <>
        { [...Array(100)].map((value, index) =>
                <mesh
                    geometry={ torusGeometry }
                    material={ matCapMaterial }
                    key={ index }
                    position={ [
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10
                    ]}
                    scale={ 0.2 + Math.random() * 0.2 }
                    rotation={ [
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                        0
                    ]}
                >
                </mesh>
            )
        }
    </>
}
```

## 7.3 -  Animate

1. Group
2. Array


### 7.3.1 - Group

`useRef` to associate to a `group` to animate(`useFrame`) groups of objects.

``` javascript
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Experience()
{
    const donutsGroup = useRef()

    useFrame((state, delta) =>
    {
        for(const donut of donutsGroup.current.children)
        {
            donut.rotation.y += delta * 0.2
        }
    })

    return <>
        <group
            ref={ donutsGroup }
        >
            { [...Array(100)].map((value, index) =>
                    <mesh
                        geometry={ torusGeometry }
                        material={ matCapMaterial }
                        key={ index }
                        position={ [
                            (Math.random() - 0.5) * 10,                        
                            (Math.random() - 0.5) * 10,
                            - Math.max(2,(Math.random() - 0.5) * -10),
                        ]}
                        scale={ 0.2 + Math.random() * 0.005 }
                        rotation={ [
                            Math.random() * Math.PI,
                            Math.random() * Math.PI,
                            0
                        ]}
                    >
                    </mesh>
                )
            }
        </group>
    </>
}
```

### 7.3.2 - Array

``` javascript
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Experience()
{
    const donuts = useRef([])

    useFrame((state, delta) =>
    {
        for(const donut of donuts.current)
        {
            donut.rotation.y += delta * 0.2
        }
    })

    return <>
        { [...Array(100)].map((value, index) =>
                <mesh
                    ref={ (element) => 
                    {
                        donuts.current[index] = element
                    }}
                >
                </mesh>
            )
        }
    </>
}
```


------


# 8


------


# 9


------


# 10