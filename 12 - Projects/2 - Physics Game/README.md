# Physics Game

1. Map Creation
2. Player
3. Camera Animation
4. Shadows
5. Interface / HTML
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

Follow the object with a smooth animation.

`lerp` makes the value slightly closer to the desired value but does not reach the object, slowing down the transition between positions.

``` javascript
const [ smoothedCameraPosition ] = useState(() => new THREE.Vector3(20, 20, 20))
const [ smoothedCameraTarget ] = useState(() => new THREE.Vector3())

useFrame((state, delta) =>
{
    const bodyPosition = body.current.translation()

    const cameraPosition = new THREE.Vector3()
    cameraPosition.copy(bodyPosition)
    cameraPosition.z += 2.25
    cameraPosition.y += 0.65

    const cameraTarget = new THREE.Vector3()
    cameraTarget.copy(bodyPosition)
    cameraTarget.y += 0.25

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta)
    smoothedCameraTarget.lerp(cameraPosition, 5 * delta)

    state.camera.position.copy(cameraPosition)
    state.camera.lookAt(cameraTarget)
})
```

## 4 - Shadows

Shadows are calculated depending on the distance from the light that generates them, we can make the light follow the ball from above to avoid unnecessary calculations.

Since we don't need to calculate the shadows behind the object, we move the shadow forward 4 units.

`Lights.jsx`
``` javascript
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const light = useRef()

useFrame((state) =>
{
    light.current.position.z = state.camera.position.z + 1 - 4
    light.current.target.position.z = state.camera.position.z - 4
    light.current.target.updateMatrixWorld()
})

return <>
    <directionalLight
        ref={ light}
        castShadow
        position={ [ 4, 4, 1 ] }
        intensity={ 1.5 }
        shadow-mapSize={ [ 1024, 1024 ] }
        shadow-camera-near={ 1 }
        shadow-camera-far={ 10 }
        shadow-camera-top={ 10 }
        shadow-camera-right={ 10 }
        shadow-camera-bottom={ - 10 }
        shadow-camera-left={ - 10 }
    />
    <ambientLight intensity={ 0.5 } />
</>
```


## 5 - Interface / HTML

1. Add font 
2. Add Component
3. CSS
4. HTML Interface


### 5.1 - Add font 

Font sugestion:
* [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue?query=bebas)

`index.html`
``` html
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Physics Game</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Agbalumo&family=Bebas+Neue&display=swap" rel="stylesheet">
</head>
```


### 5.2 - Add Component

Add the component outside the `<Canvas>`.
`index.jsx`
``` javascript
{/* ... */} 
import { KeyboardControls } from '@react-three/drei'
import Interface from './Interface.jsx'

root.render(
    <KeyboardControls
        map={ [
            {
                name: 'forward',
                keys: [ 'ArrowUp', 'KeyW']
            },
            {/* ... */} 
        ]}
    >
        <Canvas
            {/* ... */} 
        >
            <Experience />
        </Canvas>
        <Interface />
    </KeyboardControls>
)
```


### 5.3 - CSS

Responsible for placing the `<div>` visible and in front of the canvas, creating the buttons and changing their color when the `active` class is added.

`style.css`
``` css
.interface
{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    font-family: 'Bebas Neue', cursive;
}

.time
{
    position: absolute;
    top: 15%;
    left: 0;
    width: 100%;
    color: #ebebeb;
    font-size: 6vh;
    background: #00000033;
    padding-top: 5px;
    text-align: center;
}

.restart
{
    display: flex;
    justify-content: center;
    position: absolute;
    top: 40%;
    left: 0;
    width: 100%;
    color: #ebebeb;
    font-size: 80px;
    background: #00000033;
    padding-top: 10px;
    pointer-events: auto;
    cursor: pointer;
}

.controls
{
    position: absolute;
    bottom: 10%;
    left: 0;
    width: 100%;
}

.controls .raw
{
    display: flex;
    justify-content: center;
}

.controls .key
{
    width: 40px;
    height: 40px;
    margin: 4px;
    border: 2px solid #ffffff44;
    background: #ffffff44;
}

.controls .key.large
{
    width: 144px;
}

.controls .key.active
{
    background-color: #d99ffa99;
}
```


### 5.4 - HTML Interface

Creation of HTML elements, we can see in the example a way to change the colors of the elements when a certain button is pressed.

`Interface.jsx`
``` javascript
import { useKeyboardControls } from "@react-three/drei"

export default function Interface()
{

    const [
        forward,
        backward,
        leftward,
        rightward,
        jump
    ] = useKeyboardControls((state) => {
        return [
            state.forward,
            state.backward,
            state.leftward,
            state.rightward,
            state.jump,
        ]
    })

    return <div className="interface">
        <div className="time">0.00</div>
        <div className="restart">Restart</div>
        <div className="controls">
            <div className="raw">
                <div className={ `key ${ forward ? 'active' : '' }` }></div>
            </div>
            <div className="raw">
                <div className={ `key ${ leftward ? 'active' : '' }` }></div>
                <div className={ `key ${ backward ? 'active' : '' }` }></div>
                <div className={ `key ${ rightward ? 'active' : '' }` }></div>
            </div>
            <div className="raw">
                <div className={ `key large ${ jump ? 'active' : '' }` }></div>
            </div>
        </div>
    </div>
}
```


## 6 - Mechanics


``` javascript

```
