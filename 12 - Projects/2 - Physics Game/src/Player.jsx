import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRapier, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three'
import useGame from "./stores/useGame";

export default function Player()
{
    /**
     *  Controls
     */
    const body = useRef()
    const [ subscribeKeys, getKeys ] = useKeyboardControls()
    const { rapier, world } = useRapier()

    const [ smoothedCameraPosition ] = useState(() => new THREE.Vector3(10, 10, 10))
    const [ smoothedCameraTarget ] = useState(() => new THREE.Vector3())

    const start = useGame((state) => state.start)
    const end = useGame((state) => state.end)
    const blocksCount = useGame((state) => state.blocksCount)
    const restart = useGame((state) => state.restart)

    useFrame((state, delta) =>
    {
        if(body.current)
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
            smoothedCameraTarget.lerp(cameraTarget, 5 * delta)

            state.camera.position.copy(smoothedCameraPosition)
            state.camera.lookAt(smoothedCameraTarget)

            if(bodyPosition.z < -(blocksCount * 4 + 2))
            {
                end()
            }

            if(bodyPosition.y < -4)
            {
                restart()
            }
        }
    })

    const jump = () =>
    {
        const origin = body.current.translation()
        origin.y -= 0.31
        // Cast a ray to see if the ball is close to the ground to jump again
        const direction = { x: 0, y: -1, z: 0 }
        const ray = new rapier.Ray(origin, direction)
        const hit = world.castRay(ray, 10, true)

        if(hit.toi < 0.15 )
        {
            body.current.applyImpulse({ x: 0, y: 0.5, z: 0 })
        }
    }

    const reset = () =>
    {
        body.current.setTranslation({ x: 0, y: 1, z: 0})    // Reset position
        body.current.setLinvel({ x: 0, y: 0, z: 0})         // Linvel reset translation force
        body.current.setAngvel({ x: 0, y: 0, z: 0})         // Angvel reset rotation force
    }

    useEffect(() =>
    {
        // Subscribe phase in the store
        const unsubscribeReset = useGame.subscribe(
            (state) => state.phase,
            (value) => 
            {
                if(value === 'ready')
                {
                    reset()
                }
            })

        const unsubscribeJump = subscribeKeys(
            (state) => state.jump,
            (value) =>
            {
                //console.log(value)
                if(value)
                {
                    jump()
                }
            }
        )

        // Start the game when any key is pressed
        const unsubscribeKeys = subscribeKeys(
            () =>
            {
                start()
            }
        )

        return () =>
        {
            unsubscribeReset()
            unsubscribeJump()
            unsubscribeKeys()
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
        canSleep={ false }
    >
        <mesh
            castShadow
        >
            <icosahedronGeometry args={ [ 0.3, 1 ]} />
            <meshStandardMaterial
                flatShading
                color="#8049b3"
            />
        </mesh>
    </RigidBody>
}