# R3F Simple Application

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


## 1 - Setup

``` bash
npm install three@0.153 @react-three/fiber@8.13 --save
```

## 2 - Implementation

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

## 3 - Animate

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

## 4 - OrbitControls

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

## 5 - Lights

``` javascript
<directionalLight position={[0,2,2]} intensity={ 1.5 } color={ 'Aquamarine' }/>
<ambientLight intensity={ 0.3 } color={'blue'}/>
```

## 6 - Custom Geometry

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

## 7 - Canvas

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

### 7.1 - Animating camera

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

### 7.2 - Antialias

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

### 7.3 - ToneMapping

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

### 7.4 - Encoding

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

### 7.5 - Pixel Ratio

We can force a specific pixel ratio with the attribute `dpr`, if its below 1, gets 1, if its above 2 will become 2.
The default is 1 to 2, so we can remove this.

``` javascript
<Canvas
    dpr={ 1, 2 }
>
    <CustomObject />
</Canvas>
```