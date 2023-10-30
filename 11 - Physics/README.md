# Physics

1. Create World and Colliders
2. Access the Body and Forces
3. Physical Object
4. Events
5. Models
6. Performance

`Rapier`

[Documentation](https://rapier.rs/docs/user_guides/javascript/getting_started_js/)
[API](https://rapier.rs/javascript3d/index.html)
[React Fiber Examples](https://github.com/pmndrs/react-three-rapier#readme)
[More examples](https://docs.pmnd.rs/react-three-fiber/getting-started/examples)

We must use thick plans to facilitate calculations, plans with minimum thickness create problems.


## 1 - Create World and Colliders

* `<Physics>` - Objects affected by forces
* `<RigidBody>` - Defines the object as physical, we can put different meshes and will act as one object
* Colliders - Shape of the rigid body, use `debug` to see them.

Default Colliders:
* ball
* cuboid
* hull
* trimesh - avoid, for holes inside objects like donuts or terrain
* custom - its scalable for complex models

Don't change their position after attaching them to the object.
If needed, use this method to reset your position without speed.

Custom colliders references:
* [Ball](https://rapier.rs/javascript3d/classes/Ball.html)
* [Cube](https://rapier.rs/javascript3d/classes/Cuboid.html)
* [Round Cube](https://rapier.rs/javascript3d/classes/RoundCuboid.html)
* [Capsule](https://rapier.rs/javascript3d/classes/Capsule.html)
* [Cone](https://rapier.rs/javascript3d/classes/Cone.html)
* [Cylinder](https://rapier.rs/javascript3d/classes/Cylinder.html)
* [Hull](https://rapier.rs/javascript3d/classes/ConvexPolyhedron.html)
* [Trimesh](https://rapier.rs/javascript3d/classes/TriMesh.html)
* [Heightfield](https://rapier.rs/javascript3d/classes/Heightfield.html)


``` bash
npm install @react-three/rapier@1.0
```

``` javascript
import { RigidBody, Physics, CuboidCollider } from '@react-three/rapier'

<Physics
    debug
>
    <RigidBody
        colliders="ball"
    >
        <mesh castShadow position={ [ - 2, 4.5, 0 ] }>
            <sphereGeometry />
            <meshStandardMaterial color="#9c571e" />
        </mesh>
    </RigidBody>
    <RigidBody
        colliders={ false }
    >
        <CuboidCollider
            position={ [ - 2, 1, 0 ] }
            rotation={ [Math.PI * 0.45, 0, 0] }
            args={ [ 1, 1, 0.5] }
        />
        <mesh
            castShadow
            position={ [ - 2, 1, 0 ] }
            rotation-x={ Math.PI * 0.45}
        >
            <torusGeometry />
            <meshStandardMaterial color="#1e749c" />
        </mesh>
    </RigidBody>
    <RigidBody
        colliders="trimesh"
    >
        <mesh
            castShadow position={ [ 3, 5, 3 ] }
            rotation-x={ Math.PI * -0.05}
        >
            <torusGeometry />
            <meshStandardMaterial color="#1e749c" />
        </mesh>
    </RigidBody>
    <RigidBody>
    <mesh
        castShadow position={ [ 2, 2, 0 ] }
        scale={ [0.2, 3, 3] }
    >
        <boxGeometry />
        <meshStandardMaterial color="#685811" />
    </mesh>
    <mesh castShadow position={ [ 4, 2, 0 ] }>
        <boxGeometry />
        <meshStandardMaterial color="#d163d1" />
    </mesh>
    </RigidBody>
    <RigidBody type="fixed">
    <mesh receiveShadow position-y={ - 1.25 }>
        <boxGeometry args={ [ 10, 0.5, 10 ] } />
        <meshStandardMaterial color="#1f581f" />
    </mesh>
    </RigidBody>
</Physics>
```


## 2 -  Access the Body and Forces

Push
* `addForce` - Continuous force like Wind
* `addImpulse` - Impulse force for a very short time, projectile

Rotate
* `addTorque`
* `applyTorqueImpulse`

When objects are stationary, they start sleeping(`5 - Events`)

``` javascript 
const sphere = useRef()

const sphereJump = () =>
{
    sphere.current.applyImpulse({ x: 0, y: 5, z: 0})
    sphere.current.applyTorqueImpulse({
        x: Math.random() - 0.5,
        y: Math.random() - 0.5,
        z: Math.random() - 0.5
    })
}

<Physics
    debug
>
    <RigidBody
        ref={ sphere }
        colliders="ball"
    >
        <mesh
            castShadow
            position={ [ - 2, 4.5, 0 ] }
            onClick={ sphereJump }
        >
            <sphereGeometry />
            <meshStandardMaterial color="#9c571e" />
        </mesh>
    </RigidBody>
</Physics>
```


## 3 -  Physical Object

* Friction: Default is `0.7`
* Restitution / Bounciness: default is `0`
* Mass: Impact the collisions, needs a `Custom Collider` to modify
* Gravity: `-9.81` is the default (Hearth gravity), Moon is `-1.6`
* Gravity Scale: Change the gravity of the object

``` javascript
const sphere = useRef()

const sphereJump = () =>
{
    // Accessing Collision properties
    console.log(sphere.current.mass()) 
}

<Physics
    debug
    gravity={ [0, -1.6, 0 ] }
>
    <RigidBody
        ref={ sphere }
        colliders={ false }
        gravityScale={ 10 }
        restitution={ 3 }
        mass={ 10 }
    >
        <CuboidCollider
            position={ [ - 2, 1, 0 ] }
            rotation={ [Math.PI * 0.45, 0, 0] }
            args={ [ 1, 1, 0.5] }
        />
        <mesh
            castShadow
            position={ [ - 2, 1, 0 ] }
            rotation-x={ Math.PI * 0.45}
            onClick={ sphereJump }
        >
            <torusGeometry />
            <meshStandardMaterial color="#1e749c" />
        </mesh>
    </RigidBody>
    <RigidBody
        type="fixed"
        friction={ 0.7 }
    >
        <mesh receiveShadow position-y={ - 1.25 }>
            <boxGeometry args={ [ 10, 0.5, 10 ] } />
            <meshStandardMaterial color="#1f581f" />
        </mesh>
    </RigidBody>
</Physics>
```


## 4 -  Animate

For cases where it is necessary to animate an object with a specific speed, such as an obstacle.

It can be used to simulate a player moving at a specific speed and colliding with objects.


* `kinematicPosition` - Next position to move
* `kinematicVelocity` - Speed of the object

``` javascript
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const twister = useRef()

useFrame((state) =>
{
    const time = state.clock.getElapsedTime()
    //console.log(time)

    // Rotate
    const eulerRotation = new THREE.Euler(0.2, time * 3, 0)
    const quaternionRotation = new THREE.Quaternion()
    quaternionRotation.setFromEuler(eulerRotation)
    twister.current.setNextKinematicRotation(quaternionRotation)

    // Go around
    const angle = time * 0.5
    const x = Math.cos(angle) * 5
    const z = Math.sin(angle) * 5
    twister.current.setNextKinematicTranslation( { x: x, y: 0, z: z } )
})

<RigidBody
    ref={ twister }
    friction={ 0 }
    type='kinematicPosition'
>
    <mesh
        castShadow
        scale={ [ 0.4, 0.4, 6] }
    >
        <boxGeometry />
        <meshStandardMaterial color="#6a6b13" />
    </mesh>
</RigidBody>
```


## 5 -  Events

* `OnCollisionEnter` - Hit something
* `OnCollisionExit` - Sperate from the hit object
* `OnSleep` - Start sleeping
* `onWake` - Stop sleeping


When the object hits something it makes a `Sound`

``` javascript
const [ hitSound ] = useState( () => new Audio('./hit.mp3') )

const collisionEnter = () =>
{
    hitSound.currentTime = 0
    hitSound.volume = Math.random()
    hitSound.play()
}

<Physics
    debug
    gravity={ [0, -1.6, 0 ] }
>
    <RigidBody
        onCollisionEnter={ collisionEnter }
    >
        <mesh
            castShadow
            scale={ [ 0.4, 0.4, 6] }
        >
            <boxGeometry />
            <meshStandardMaterial color="#6a6b13" />
        </mesh>
    </RigidBody>
</Physics>
```


## 6 -  Models

We must simplify the model collider as much as possible, for better performance.

For better realist with easy implementation, use `hull` or `trimesh` colliders.

The best option is to use multiple `custom colliders`.

In the case of the hamburger, you should use a capsule with a cube simulating cheese, it will be more efficient than using Hull or trimesh and will have similar results.

``` javascript
import { useGLTF } from '@react-three/drei'
import { CylinderCollider } from '@react-three/rapier'

<RigidBody
    colliders={ false }
>
    <CylinderCollider
        position={ [ 8, 4, 4 ]}
        args={[ 0.52, 1.25 ]}
    />
    <primitive
        object={hamburger.scene}
        scale={ 0.25 }
        position={ [ 8, 4, 4 ]}
    />
</RigidBody>
```

## 7 -  Performance

``` javascript

```