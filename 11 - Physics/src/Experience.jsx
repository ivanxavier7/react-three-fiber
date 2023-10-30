import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { RigidBody, Physics, CuboidCollider } from '@react-three/rapier'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Experience()
{
    const sphere = useRef()
    const twister = useRef()

    const sphereJump = () =>
    {
        sphere.current.applyImpulse({ x: 0, y: 5, z: 0})
        sphere.current.applyTorqueImpulse({
            x: Math.random() - 0.5,
            y: Math.random() - 0.5,
            z: Math.random() - 0.5
        })

        // Accessing Collision properties
        //console.log(sphere.current.mass()) 
    }

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

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <color args={ [ '#0e0e0e' ] }  attach="background"/>

        <Physics
            debug
            gravity={ [0, -1.6, 0 ] }
        >
            <RigidBody
                ref={ sphere }
                colliders="ball"
                restitution={ 3 }
                mass={ 10 }
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
            <RigidBody
                colliders={ false }
                gravityScale={ 10 }
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
            <RigidBody
                type="fixed"
                friction={ 0.7 }
            >
                <mesh receiveShadow position-y={ - 1.25 }>
                    <boxGeometry args={ [ 20, 0.5, 20 ] } />
                    <meshStandardMaterial color="#1f581f" />
                </mesh>
            </RigidBody>
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
        </Physics>
    </>
}