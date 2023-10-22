import { OrbitControls } from '@react-three/drei'

import { button, useControls } from 'leva'

import { Perf } from 'r3f-perf'

export default function Experience()
{
    /*
    const { position, color, visible } = useControls({ 
        position:
        {
            value: { x: -2, y: 0 },
            min: -4,
            max: 4,
            step: 0.01,
            joystick: 'invertY'
        },
        color: '#854381',
        visible: true,
        myInterval:
        {
            min: 0,
            max: 10,
            value: [4, 5]
        }
    })
    */
const { position, color, visible, perfVisible } = useControls('Folder Name',
    { 
        position:
        {
            value: { x: -2, y: 0 },
            min: -4,
            max: 4,
            step: 0.01,
            joystick: 'invertY'
        },
        color: '#854381',
        visible: true,
        myInterval:
        {
            min: 0,
            max: 10,
            value: [ 4, 5 ]
        },
        clickMe: button(() =>
        {
            console.log('Sphere clicked')
        }),
        choice: { options: ['a', 'b', 'c'] },
        perfVisible: true,
    })

    return <>
        { perfVisible && <Perf position="top-left" /> }
        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <mesh
            visible={ visible }
            position={ [position.x, position.y, 0] }
        >
            <sphereGeometry />
            <meshStandardMaterial color={ color } />
        </mesh>

        <mesh position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="#257e7e" />
        </mesh>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="#3e5e24" />
        </mesh>

    </>
}