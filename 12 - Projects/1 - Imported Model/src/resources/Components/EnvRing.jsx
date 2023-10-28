import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export default function EnvRing({color, scale, speed})
{
    const ringRef = useRef()

    useFrame((state, delta) => 
    {
        //console.log(ringRef)
        const angle = state.clock.elapsedTime
        ringRef.current.position.z = -((Math.sin(angle * speed) + 1.6) + 0.8)
    })

    return <>
        <mesh
            ref={ ringRef }
            scale={ scale }
            position-y={ 0 }
            position-z={ 0 }
        >
                <ringGeometry
                    args={ [0.93, 1, 3] }
                />
                <meshBasicMaterial
                    color={ color }
                    toneMapped={ false }
                />
        </mesh>
    </>
}