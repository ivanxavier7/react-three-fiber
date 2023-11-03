import * as THREE from 'three'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text, useGLTF } from '@react-three/drei'

const boxGeometry = new THREE.BoxGeometry( 1, 1, 1)
const floor1Material = new THREE.MeshStandardMaterial( { color:"#16691a" } )
const floor2Material = new THREE.MeshStandardMaterial( { color:"#1a5c11" } )
const obstacleMaterial = new THREE.MeshStandardMaterial( { color:"#924417" } )
const wallMaterial = new THREE.MeshStandardMaterial( { color:"#5b6b64" } )

export function BlockStart({ position = [ 0, 0, 0 ] })
{
    return <group
        position={ position }
    >
        <Float
            floatIntensity={ 0.5 }
            rotationIntensity={ 0.5 }
        >
            <Text
                scale={ 0.5 }
                font='/bebas-neue-v9-latin-regular.woff'
                maxWidth={ 0.25 }
                lineHeight={ 0.75 }
                textAlign='right'
                position={ [ 0.75, 0.65, 0 ] }
                rotation-y={ -0.25 }
            >
                Running Ball
                <meshBasicMaterial
                    toneMapped={ false }
                />
            </Text>
        </Float>
        <mesh
            geometry={ boxGeometry }
            material={ floor1Material }
            scale={ [ 4, 0.2, 4 ] }
            position-y={ - 0.1 }
            receiveShadow
        />
    </group>
}

function BlockEnd({ position = [ 0, 0, 0 ] })
{
    const hamburger = useGLTF('./hamburger.glb')
    hamburger.scene.children.forEach((mesh) =>
    {
        mesh.castShadow = true
    })

    return <group
        position={ position }
    >
            <Text
                scale={ 2 }
                font='/bebas-neue-v9-latin-regular.woff'
                position={ [ 0, 2.25, 2 ] }
            >
                FINISH
                <meshBasicMaterial
                    toneMapped={ false }
                />
            </Text>
        <mesh
            geometry={ boxGeometry }
            material={ floor1Material }
            scale={ [ 4, 0.2, 4 ] }
            position-y={ - 0.1 }
            receiveShadow
        />
        <RigidBody
            type="fixed"
            colliders="hull"
            restitution={ 0.2 }
            friction={ 0 }
            position-y={ 0.25 }
        >
            <primitive
                object={ hamburger.scene }
                scale={ 0.2 }
            />
        </RigidBody>
    </group>
}


function Bounds({ length = 1 })
{
    return <>
        <RigidBody
            type="fixed"
            restitution={ 0.2 }
            friction={ 0 }
        >
            <mesh
                position={ [ 2.15, 0.75, -(length * 2) + 2 ] }
                geometry={ boxGeometry }
                material={ wallMaterial }
                scale={ [ 0.3, 1.5, 4 * length ]}
                castShadow
            />
            <mesh
                position={ [ -2.15, 0.75, -(length * 2) + 2 ] }
                geometry={ boxGeometry }
                material={ wallMaterial }
                scale={ [ 0.3, 1.5, 4 * length ]}
                receiveShadow
            />
            <mesh
                position={ [ 0, 0.75, -(length * 4) + 2 ] }
                geometry={ boxGeometry }
                material={ wallMaterial }
                scale={ [ 4, 1.5, 0.3 ]}
                receiveShadow
            />
            <CuboidCollider
                args={ [ 2, 0.1, 2* length ] }
                position={ [ 0, -0.1, -(length * 2) + 2]}
                restitution={ 0.2 }
                friction={ 1 }
            />
        </RigidBody>
    </>
}

export function BlockSpinner({ position = [ 0, 0, 0 ] })
{
    const obstacle = useRef()
    const [ speed ] = useState(() => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1))

    useFrame((state) =>
    {
        const time = state.clock.getElapsedTime()
        const rotation = new THREE.Quaternion()
        rotation.setFromEuler(new THREE.Euler(0, time * speed, 0))
        if(obstacle.current)
        {
            obstacle.current.setNextKinematicRotation(rotation)
        }
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

export function BlockLimbo({ position = [ 0, 0, 0 ] })
{
    const obstacle = useRef()
    const [ timeOffset ] = useState(() => Math.random() * Math.PI * 2)

    useFrame((state) =>
    {
        const time = state.clock.getElapsedTime()

        const y = Math.sin(time + timeOffset) + 1.15
        if(obstacle.current)
        {
            obstacle.current.setNextKinematicTranslation({ x: position[0], y: y, z: position[2] })
        }
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

export function BlockAxe({ position = [ 0, 0, 0 ] })
{
    const obstacle = useRef()
    const [ timeOffset ] = useState(() => Math.random() * Math.PI * 2)

    useFrame((state) =>
    {
        const time = state.clock.getElapsedTime() * 1.25

        const x = Math.sin(time + timeOffset)
        if(obstacle.current)
        {
            obstacle.current.setNextKinematicTranslation({
                x: position[0] + x,
                y: position[1] + 0.75,
                z: position[2]
            })
        }
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
                scale={ [ 1.5, 1.5, 0.3 ] }
                position-y={ 0.2 }
                castShadow
                receiveShadow
            />
        </RigidBody>
    </group>
}

export function Level({
    count= 5,
    types = [ BlockSpinner, BlockAxe, BlockLimbo],
    seed = 0
})
{
    // Create an array one time and only recreate when "count" or "types" changes.
    const blocks = useMemo(() =>
    {
        const blocks = []

        for(let i=0; i < count; i++)
        {
            const type = types[ Math.floor(Math.random() * types.length) ]
            blocks.push(type)
        }

        return blocks
    }, [ count, types, seed ])

    return <>
        <BlockStart position={ [ 0, 0, 0] } />

        { blocks.map((Block, index) =>
            <Block
                key={ index }
                position={ [ 0, 0, -(index  + 1) * 4]}
            />
        )}

        <BlockEnd
            position={ [ 0, 0, -(count + 1) * 4 ] }
        />

        <Bounds
            length={ count + 2 }
        />
    </>
}