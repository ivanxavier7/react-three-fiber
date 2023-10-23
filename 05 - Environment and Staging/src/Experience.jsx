import { useFrame } from '@react-three/fiber'
import { ContactShadows, AccumulativeShadows, RandomizedLight, SoftShadows, BakeShadows, useHelper, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import { useControls } from 'leva'

export default function Experience()
{
    const cube = useRef()
    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)
    
    useFrame((state, delta) =>
    {
        cube.current.rotation.y += delta * 0.2
        const time = state.clock.elapsedTime
        cube.current.position.y = Math.sin(time) + 1
    })

    const { color, opacity, blur } = useControls('contact shadows',
    {
        color: '#073816',
        opacity: { value: 0.4, min: 0, max: 1},
        blur: { value: 2.8, min: 0, max: 10}
    })

    return <>
        {/* <BakeShadows /> */}
        {/* <SoftShadows
            size={ 25 }
            samples={ 10 }
            focus={ 0 }
        /> */}
        <Perf position="top-left" />

        <OrbitControls makeDefault />

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
        <ambientLight intensity={ 0.5 } />

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

        {/*
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
        */}

        <mesh
            castShadow
            position-x={ - 2 }
        >
            <sphereGeometry />
            <meshStandardMaterial color="#156356" />
        </mesh>

        <mesh
            castShadow
            ref={ cube }
            position-x={ 2 }
            scale={ 1.5 }
        >
            <boxGeometry />
            <meshStandardMaterial color="#681e5e" />
        </mesh>

        <mesh
            position-y={ - 1 }
            rotation-x={ - Math.PI * 0.5 }
            scale={ 10 }
        >
            <planeGeometry />
            <meshStandardMaterial color="#1b4112" />
        </mesh>
    </>
}