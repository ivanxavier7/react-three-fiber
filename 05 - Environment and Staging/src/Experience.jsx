import { useFrame } from '@react-three/fiber'
import { useHelper, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'

export default function Experience()
{
    const cube = useRef()
    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)
    
    useFrame((state, delta) =>
    {
        cube.current.rotation.y += delta * 0.2
    })

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight
            ref={ directionalLight }
            position={ [ 1, 2, 3 ] }
            intensity={ 1.5 }
        />
        <ambientLight intensity={ 0.5 } />

        <mesh position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="#156356" />
        </mesh>

        <mesh ref={ cube } position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="#681e5e" />
        </mesh>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="#1b4112" />
        </mesh>
    </>
}