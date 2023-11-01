import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRapier, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three'

export default function Player()
{
    /**
     *  Controls
     */
    const body = useRef()
    const [ subscribeKeys, getKeys ] = useKeyboardControls()
    const { rapier, world } = useRapier()

    const [ smoothedCameraPosition ] = useState(() => new THREE.Vector3(20, 20, 20))
    const [ smoothedCameraTarget ] = useState(() => new THREE.Vector3())

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
        if(leftward)
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

        /** 
         *  Camera Animation
         */
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