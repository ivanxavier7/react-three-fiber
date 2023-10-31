import * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

const boxGeometry = new THREE.BoxGeometry( 1, 1, 1)
const floor1Material = new THREE.MeshStandardMaterial( { color:"#16691a" } )
const floor2Material = new THREE.MeshStandardMaterial( { color:"#1a5c11" } )
const obstacleMaterial = new THREE.MeshStandardMaterial( { color:"#924417" } )
const wallMaterial = new THREE.MeshStandardMaterial( { color:"#5b6b64" } )

function BlockStart({ position = [ 0, 0, 0 ] })
{
    return <group
        position={ position }
    >
        <mesh
            geometry={ boxGeometry }
            material={ floor1Material }
            scale={ [ 4, 0.2, 4 ] }
            position-y={ - 0.1 }
            receiveShadow
        />
    </group>
}

function BlockSpinner({ position = [ 0, 0, 0 ] })
{
    const obstacle = useRef()
    const [ speed ] = useState(() => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1))

    useFrame((state) =>
    {
        const time = state.clock.getElapsedTime()

        const rotation = new THREE.Quaternion()
        rotation.setFromEuler(new THREE.Euler(0, time * speed, 0))
        obstacle.current.setNextKinematicRotation(rotation)
    })

    return <group
        position={ position }
    >
        <RigidBody
            type='fixed'
        >
            <mesh
                geometry={ boxGeometry }
                material={ floor2Material }
                scale={ [ 4, 0.2, 4 ] }
                position-y={ - 0.1 }
                receiveShadow
            />
        </RigidBody>
        <RigidBody
            ref={ obstacle}
            type='kinematicPosition'
            position={ [ 0, 0.3, 0]}
            restitution={ 0.2 }
            friction={ 0 }
        >
            <mesh 
                geometry={ boxGeometry }
                material={ obstacleMaterial }
                scale={ [ 3.5, 0.3, 0.3 ] }
                position-y={ 0.2 }
                castShadow
                receiveShadow
            />
        </RigidBody>
    </group>
}

export default function Level()
{
    return <>
        <BlockStart position={ [ 0, 0, 4] } />
        <BlockSpinner position={ [ 0, 0, 0] } />
    </>
}