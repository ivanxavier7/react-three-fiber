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