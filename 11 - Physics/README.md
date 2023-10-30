# Physics

1. Create World and Colliders
2. Access the Body and Forces
3. Events
4. Models
5. Performance

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

Colliders:
* ball
* cuboid
* hull
* trimesh - avoid, for holes inside objects like donuts or terrain
* custom - its scalable for complex models


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



``` javascript 

```