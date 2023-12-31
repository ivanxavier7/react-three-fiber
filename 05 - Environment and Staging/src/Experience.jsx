import { useFrame } from '@react-three/fiber'
import { Stage, Lightformer, Environment, Sky ,ContactShadows, AccumulativeShadows, RandomizedLight, SoftShadows, BakeShadows, useHelper, OrbitControls } from '@react-three/drei'
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
        cube.current.position.y = Math.sin(time) + 2
    })

    const { color, opacity, blur } = useControls('contact shadows',
    {
        color: '#073816',
        opacity: { value: 0.4, min: 0, max: 1},
        blur: { value: 2.8, min: 0, max: 10}
    })

    const { sunPosition } = useControls('sky',
    {
        sunPosition: { value: [ 1, 2, 3] }
    })

    const { envMapIntensity } = useControls('environment map',
    {
        envMapIntensity: { value: 3.5, min: 0, max: 12 }
    })

    return <>
        {/*
        <Environment
            preset='city'
            ground={ {
                height: 7,
                radius: 28,
                scale: 100
            }}
        >

            <Lightformer
                position={ [0, 4, -5] }
                scale={ 10 }
                color={ "#117568" }
                intensity={ 10 }
                form="ring"
            />

        </Environment>
        
        */}
        {/* <BakeShadows /> */}

        {/* <SoftShadows
            size={ 25 }
            samples={ 10 }
            focus={ 0 }
        /> */}

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        {/*
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
        <ambientLight intensity={ 0.5 } />
        */}

        {/*
        <ContactShadows
            position={ [ 0, 0, 0] }
            scale={ 10 }
            resolution={ 512 }
            far={ 5 }
            near={ 0.01 }
            color={ color }
            opacity={ opacity }
            blur={ blur }
        />
        */}

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

        {/*
        <Sky
            position={ sunPosition }
        />
        */}
        {/*
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
        */}
        {/*
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
        */}
        {/*
        <mesh
            position-y={ 0 }
            rotation-x={ - Math.PI * 0.5 }
            scale={ 10 }
        >
            <planeGeometry />
            <meshStandardMaterial
                color="#1b4112"
                envMapIntensity={ envMapIntensity }
            />
        </mesh>
        */}
        <Stage
            opacity={ 0.2 }
            blur={ 3 }
            environment="sunset"
            preset="portrait"
            intensity={ 2 }
        >
            {/* Preset - [ "rembrandt", ""portrait", "upfront", "soft" ] */}
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
    </>
}