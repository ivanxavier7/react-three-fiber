# Physics Game

1. Map Creation
2. Player
3. Camera Animation
4. Shadows
5. Interface
6. Mechanics


## 1 - Map Creation

The intention is to create blocks with different obstacles in the middle, we can see in the integration below how to deal with multiple objects in a simple way.

The functions inside the array were exported to be accessed.


* `Experience.jsx`

The main properties of the map are passed with `props`.

``` javascript
import { OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'

import Lights from './Lights.jsx'
import { Level, BlockLimbo, BlockAxe, BlockSpinner } from './Level.jsx'

export default function Experience()
{
    return <>

        <OrbitControls makeDefault />

        <Physics
            debug
        >
            <Lights />
            <Level
                count={ 10 }
                types={ [ BlockLimbo, BlockAxe, BlockSpinner ]}
            />
        </Physics>
    </>
}
```


* `Level.jsx`

To increase the performance of the scene and as we have several objects using the same materials, we start by looking at their assignment in the `geometry={}` and `material={}` properties.

The geometry uses a fixed size and we change its dimensions by scaling.

* `BlockStart()` - Starting 
* `BlockEnd()` - End 
* `Bounds()` - Walls and Floor
* `BlockSpinner()` - Spinner
* `BlockLimbo()` - Vertical
* `BlockAxe()` - Horizontal

`useMemo()` - It guarantees that the array is created only once and is only recreated when one of the `props` is changed, to avoid repetition when creating blocks.


``` javascript
import * as THREE from 'three'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

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

export function BlockLimbo({ position = [ 0, 0, 0 ] })
{
    const obstacle = useRef()
    const [ timeOffset ] = useState(() => Math.random() * Math.PI * 2)

    useFrame((state) =>
    {
        const time = state.clock.getElapsedTime()

        const y = Math.sin(time + timeOffset) + 1.15
        obstacle.current.setNextKinematicTranslation({ x: position[0], y: y, z: position[2] })
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
        obstacle.current.setNextKinematicTranslation({
            x: position[0] + x,
            y: position[1] + 0.75,
            z: position[2]
        })
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
    types = [ BlockSpinner, BlockAxe, BlockLimbo]
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
    }, [ count, types ])

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
```


## 2 - Player

We use `<KeyboardControls />` to control the player, within root we must say which keys to use, use `keyA` instead of `A` due to keyboards in other languages.

`Index.jsx`
``` javascript
root.render(
    <KeyboardControls
        map={ [
            {
                name: 'forward',
                keys: [ 'ArrowUp', 'KeyW']
            },
            {
                name: 'backward',
                keys: [ 'ArrowDown', 'KeyS']
            },
            {
                name: 'leftward',
                keys: [ 'ArrowLeft', 'KeyA']
            },
            {
                name: 'rightward',
                keys: [ 'ArrowRight', 'KeyD']
            },
            {
                name: 'jump',
                keys: [ 'Space']
            },
        ]}
    >
        <Canvas
            shadows
            camera={ {
                fov: 45,
                near: 0.1,
                far: 200,
                position: [ 2.5, 4, 6 ]
            } }
        >
            <Experience />
        </Canvas>
    </KeyboardControls>
)
```

When the player moves to one side there is an impulse and a change in the rotation of the ball. You can also jump if you wish, the next jump will only be possible when the distance from `Ray` to the ground is less than `0.15` units.

`Player.jsx`
``` javascript
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRapier, RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";

export default function Player()
{
    const body = useRef()
    const [ subscribeKeys, getKeys ] = useKeyboardControls()
    const { rapier, world } = useRapier()

    useFrame((state, delta) =>
    {
        const {
            forward,
            backward,
            leftward,
            rightward
        } = getKeys()

        const impulse = { x: 0, y: 0 , z: 0 }
        const torque = { x: 0, y: 0 , z: 0 }

        const impulseStrenght = 0.6 * delta
        const torqueStrenght = 0.2 * delta

        if(forward)
        {
            impulse.z -= impulseStrenght
            torque.x -= torqueStrenght
        }
        else if(backward)
        {
            impulse.z += impulseStrenght
            torque.x += torqueStrenght
        }
        else if(leftward)
        {
            impulse.x -= impulseStrenght
            torque.z += torqueStrenght
        }
        else if(rightward)
        {
            impulse.x += impulseStrenght
            torque.z -= torqueStrenght
        }

        body.current.applyImpulse(impulse)
        body.current.applyTorqueImpulse(torque)

    })

    const jump = () =>
    {
        const origin = body.current.translation()
        origin.y -= 0.31
        // Cast a ray to see if the ball is close to the ground to jump again
        const direction = { x: 0, y: -1, z: 0 }
        const ray = new rapier.Ray(origin, direction)
        const hit = world.castRay(ray, 10, true)

        if(hit.toi < 0.15)
        {
            body.current.applyImpulse({ x: 0, y: 0.5, z: 0 })
        }
    }

    useEffect(() =>
    {
        const unsubscribeJump = subscribeKeys(
            (state) =>
            {
                return state.jump
            },
            (value) =>
            {
                //console.log(value)
                if(value)
                {
                    jump()
                }
            }
        )

        return () =>
        {
            unsubscribeJump()
        }
    }, [])
    

    return <RigidBody
        ref={ body }
        position-y={ 0.3 }
        colliders="ball"
        restitution={ 0.2 }
        friction={ 1 }
        linearDamping={ 0.5 }
        angularDamping={ 0.5 }
    >
        <mesh
            castShadow
        >
            <icosahedronBufferGeometry args={ [ 0.3, 1 ]} />
            <meshStandardMaterial
                flatShading
                color="#8049b3"
            />
        </mesh>
    </RigidBody>
}
```

## 3 - Camera Animation



``` javascript

```