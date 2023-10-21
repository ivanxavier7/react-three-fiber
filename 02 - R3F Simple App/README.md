# R3F Simple Application

* [React Three Fiber  Docs](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)

* [React Three Fiber Tutorials](https://sbcode.net/react-three-fiber/)

1. Setup
2. 

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

