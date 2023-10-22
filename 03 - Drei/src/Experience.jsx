import { useThree, extend } from '@react-three/fiber'
import { useRef } from 'react'

import { Text, Html, PivotControls, TransformControls, OrbitControls } from '@react-three/drei'

export default function Experience()
{
    const cube = useRef()
    const sphere = useRef()

    return <>
        <OrbitControls makeDefault/>

        <directionalLight  position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        {/* <TransformControls object={ cube } mode="scale"/> */}

        <ambientLight intensity={ 0.5 } />

        <mesh ref={ sphere } position-x={ - 2 }>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
        </mesh>
        <PivotControls
            anchor={ [0, 0, 0] }
            depthTest={ false}
            lineWidth={ 4 }
            axisColors={ ['#8978fb','#16afb4', '#7ba371'] }
            scale={ 2 }
        >
            <mesh ref={ cube } position-x={ 2 } scale={ 1.5 } >
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
                <Html
                    position={ [-1, 1, 0 ] }
                    wrapperClass='label'
                    distanceFactor={ 8 }
                    occlude={ [ sphere, cube ] }
                >
                    That's a cube 👌❤️❤️❤️
                </Html>
            </mesh>
        </PivotControls>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        <Text
            font="./bangers-v20-latin-regular.woff"
            fontSize= { 0.5 }
            color="DarkCyan"
            position={ [-1, 2, 1] }
            scale={ 2 }
            maxWidth={ 1.5 }
            textAlign='center'
        >
            Ivan Xavier
            <meshNormalMaterial />
        </Text>
    </>
}