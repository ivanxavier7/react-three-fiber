import { useGLTF, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { CylinderCollider, RigidBody, Physics, CuboidCollider, InstancedRigidBodies } from '@react-three/rapier'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useState } from 'react'
import { useMemo, useEffect } from 'react'

export default function Experience()
{
    const sphere = useRef()
    const twister = useRef()

    const objectCount = 1000
    const multipleObjectsRef = useRef()

    useEffect(() =>
    {
        for(let i = 0; i < objectCount; i++) 
        {
            const matrix = new THREE.Matrix4()
            matrix.compose(
                new THREE.Vector3(i * 2, 0, 0),
                new THREE.Quaternion(),
                new THREE.Vector3(1, 1, 1)
            )
            multipleObjectsRef.current.setMatrixAt(i, matrix)
        }
    }, [])

    const instances = useMemo(() =>
    {
        const instances = []

        for(let i = 0; i < objectCount; i++)
        {
            instances.push({
                key: 'instance_' + i,
                position: [
                   (Math.random() - 0.5) * 8,
                    6 + 1 * 0.2,
                    (Math.random() - 0.5) * 8
                ],
                rotation: [ Math.random(), Math.random(), Math.random()]
            })
        }

        return instances
    }, [])

    const hamburger = useGLTF('./hamburger.glb')

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

    const [ hitSound ] = useState( () => new Audio('./hit.mp3') )

    const collisionEnter = () =>
    {
        hitSound.currentTime = 0
        hitSound.volume = Math.random()
        hitSound.play()
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
            
            gravity={ [0, -1.6, 0 ] }
        >
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
                type="fixed"
            >
                <CuboidCollider args={ [ 10, 6, 0.5 ] } position={ [ 0, 5, 10.25] }/>
                <CuboidCollider args={ [ 10, 6, 0.5 ] } position={ [ 0, 5, -10.25] }/>
                <CuboidCollider args={ [ 0.5, 6, 10 ] } position={ [ -10.25, 5, 0] }/>
                <CuboidCollider args={ [ 0.5, 6, 10 ] } position={ [ 10.25, 5, 0] }/>
            </RigidBody>
            <InstancedRigidBodies instances={ instances }>
                <instancedMesh
                    ref={ multipleObjectsRef }
                    args={ [ null, null, objectCount]}
                    castShadow
                    receiveShadow
                >
                    <boxGeometry />
                    <meshStandardMaterial color='#5a0808' />
                </instancedMesh>
            </InstancedRigidBodies>
            <RigidBody
                ref={ twister }
                friction={ 0 }
                type='kinematicPosition'
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
    </>
}