import { useFrame } from '@react-three/fiber'
import { meshBounds, useGLTF, useCursor, OrbitControls } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'

export default function Experience()
{
    const cube = useRef()
    const hamburger = useRef()
    
    useFrame((state, delta) =>
    {
        cube.current.rotation.y += delta * 0.2
    })

    const eventHandler = (event) =>
    {
        /*
        console.log(event)

        console.log("Distance: ", event.distance)           // Ditance between the camera and hit point
        console.log("Point: ", event.point)                 // Hit point (x,y,z)
        console.log("Uv: ", event.uv)                       // Uv coordinates of the hit point
        console.log("Object: ", event.object)               // Object triggered
        console.log("Event Object: ", event.eventObject)    // Object listening

        console.log("X: ", event.x)                         // Pointer X (x, y)
        console.log("Y: ", event.y)                         // Pointer Y (x, y)

        console.log("Shift Key: ", event.shiftKey)          // Shift key pressed
        console.log("Control Key: ", event.ctrlKey)         // Control key pressed
        console.log("Command Key: ", event.metaKey)         // Command key pressed
        */
        cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
    }

    const blockCubeEvents = (event) =>
    {
        event.stopPropagation()
    }

    /*
    const pointerCursor = () =>
    {
        document.body.style.cursor = 'pointer'
    }

    const defaultCursor = () =>
    {
        document.body.style.cursor = 'default'
    }
    */

    const [hovered, set] = useState()
    useCursor(hovered, /*'pointer', 'auto', document.body*/)

    const hamburgerModel = useGLTF('./hamburger.glb')

    const modelEvent = (event) =>
    {
        event.stopPropagation() // Prevent Ray from travel trough the objects, single selection
        hamburger.current.scale.x += 0.01
        hamburger.current.scale.y += 0.01
        hamburger.current.scale.z += 0.01
        console.log(hamburger.current)
        for(const children of hamburger.current.children)
        {
            children.material.color.b += 0.01
        }
    }

    return <>

        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <mesh
            position-x={ - 2 }
            onClick={ blockCubeEvents }
        >
            <sphereGeometry />
            <meshStandardMaterial color="DarkRed" />
        </mesh>

        <mesh
            raycast={ meshBounds }
            ref={ cube }
            position-x={ 2 }
            scale={ 1.5 }
            onClick={ eventHandler }
            onPointerOver={() => set(true)} onPointerOut={() => set(false)}
            //onPointerEnter={ pointerCursor }
            //onPointerLeave={ defaultCursor }
        >
            <boxGeometry />
            <meshStandardMaterial color="DarkBLue" />
        </mesh>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="DarkSlateGrey" />
        </mesh>
        
        <primitive 
            ref={ hamburger }
            object={ hamburgerModel.scene }
            scale={ 0.25 }
            position-y={ 0.7 }
            onClick={ modelEvent }
        />

    </>
}