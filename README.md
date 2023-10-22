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

------