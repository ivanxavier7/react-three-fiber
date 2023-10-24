import { useMatcapTexture, Center ,Text3D, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const matCapMaterial = new THREE.MeshMatcapMaterial()

export default function Experience()
{
    //const [ torusGeometry, setTorusGeometry ] = useState()
    //const [ matCapMaterial, setMatCapMaterial ] = useState()

    //const donutsGroup = useRef()

    const donuts = useRef([])

    const [ matCapTexture ] = useMatcapTexture('736655_D9D8D5_2F281F_B1AEAB', 512)

    useEffect(() =>
    {
        matCapTexture.colorSpace = THREE.SRGBColorSpace
        matCapTexture.needsUpdate = true

        matCapMaterial.matcap = matCapTexture
        matCapMaterial.needsUpdate = true
    }, [])

    useFrame((state, delta) =>
    {
        {/*
        for(const donut of donutsGroup.current.children)
        {
            donut.rotation.y += delta * 0.2

        }
        */}
    })

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <Center>
            <Text3D
                font="./fonts/helvetiker_regular.typeface.json"
                size={ 0.75 }
                height={ 0.2 }
                curveSegments={ 12 }
                bevelEnabled={ true }
                bevelThickness={ 0.02 }
                bevelSize={ 0.023 }
                bevelOffset={ 0 }
                bevelSegments={ 5 }
                position={ [ -3, 2, 0] }
            >
                Ivan Xavier
                <meshMatcapMaterial matcap={ matCapTexture } />
            </Text3D>
        </Center>

        {/*
        <torusGeometry
            ref={ setTorusGeometry }
            args={ [ 1, 0.6, 16, 32 ] }
        />
        <meshMatcapMaterial
            ref={ setMatCapMaterial }
            matcap={ matCapTexture }
        />
        */}
        { [...Array(100)].map((value, index) =>
                <mesh
                    geometry={ torusGeometry }
                    material={ matCapMaterial }
                    key={ index }
                    position={ [
                        (Math.random() - 0.5) * 10,                        
                        (Math.random() - 0.5) * 10,
                        - Math.max(2,(Math.random() - 0.5) * -10),
                    ]}
                    scale={ 0.2 + Math.random() * 0.005 }
                    rotation={ [
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                        0
                    ]}
                >
                </mesh>
            )
        }
    </>
}