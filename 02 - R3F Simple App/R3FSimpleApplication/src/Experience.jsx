import { useThree ,extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

extend({ OrbitControls })

export default function Experience ()
{
    // Hooks
    const cubeRef = useRef()
    const groupRef = useRef()
    const {camera, gl } = useThree()    // Camera, Renderer and the Clock inside

    useFrame((state, delta) =>
    {
        cubeRef.current.rotation.y += delta
        //groupRef.current.rotation.y += delta

        //const angle = state.clock.elapsedTime
        //state.camera.position.x = Math.sin(angle)
        //state.camera.position.z = Math.cos(angle)
        //state.camera.lookAt(0, 0, 0)
    })

    return <>
        <orbitControls args={[ camera, gl.domElement ]}/>

        <directionalLight position={[0,2,2]} intensity={ 1.5 }/>
        <ambientLight intensity={ 0.3 } color={'blue'}/>

        <group ref={ groupRef }>
            <mesh position-x={ -2 }>
                <sphereGeometry  />
                <meshStandardMaterial color={ 'orange' }/>
            </mesh>
            <mesh
                ref={ cubeRef }
                position-x={ 2 }
                rotation-y={ Math.PI * 0.25 }
                scale={ 1.5 }
            >
                <boxGeometry />
                <meshStandardMaterial color={ 'mediumPurple' }  />
            </mesh>
        </group>
            <mesh
                position-y={ -1 }
                rotation-x={ Math.PI * - 0.5 }
                scale={ 10 }
            >
                <planeGeometry />
                <meshBasicMaterial color={ 'DarkGreen' }  />
            </mesh>
    </>
}