# 3D Text

1. Setup
2. Particles
3. Animate


# 1 - Setup

1. Text Parameters
2. Matcap


## 1.1 Text Parameters

[Text Parameters](https://threejs.org/docs/#examples/en/geometries/TextGeometry)

* font
* size
* height
* curveSegments
* bevelEnabledue
* bevelThickness
* bevelSize
* bevelOffset
* bevelSegments


## 1.2 Matcap

[Matcap Materials](https://github.com/emmelleppi/matcaps)

It is not recommended to use the helper from `drei` to load this material, because it depends on a connection to the server to download the matcap textures.

To choose a texture we just need an identifier:

* [736655_D9D8D5_2F281F_B1AEAB](https://github.com/emmelleppi/matcaps/blob/master/PAGE-16.md#736655_d9d8d5_2f281f_b1aeab)
* [161B1F_C7E0EC_90A5B3_7B8C9B](https://github.com/emmelleppi/matcaps/blob/master/PAGE-2.md#161b1f_c7e0ec_90a5b3_7b8c9b)

``` javascript
import { useMatcapTexture, Center ,Text3D } from '@react-three/drei'

export default function Experience()
{
    const [ matCapTexture ] = useMatcapTexture('736655_D9D8D5_2F281F_B1AEAB', 512)

    return <>
        <Center>
            <Text3D font="./fonts/helvetiker_regular.typeface.json">
                Ivan Xavier
                <meshMatcapMaterial matcap={ matCapTexture } />
            </Text3D>
        </Center>
    </>
}
```

# 2 - Particles

1. React Fiber
2. Three.js


## 2.1 - React Fiber
Use spread operator in a fixed array to map through each of the spaces.

``` javascript
import { useMatcapTexture } from '@react-three/drei'
import { useState } from 'react'

export default function Experience()
{
    const [ torusGeometry, setTorusGeometry ] = useState()
    const [ matCapMaterial, setMatCapMaterial ] = useState()

    const [ matCapTexture ] = useMatcapTexture('736655_D9D8D5_2F281F_B1AEAB', 512)

    return <>

        <torusGeometry
            ref={ setTorusGeometry }
            args={ [ 1, 0.6, 16, 32 ] }
        />
        <meshMatcapMaterial
            ref={ setMatCapMaterial }
            matcap={ matCapTexture }
        />
        { [...Array(100)].map((value, index) =>
                <mesh
                    geometry={ torusGeometry }
                    material={ matCapMaterial }
                    key={ index }
                    position={ [
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10
                    ]}
                    scale={ 0.2 + Math.random() * 0.2 }
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
```

## 2.2 - Three.js

``` javascript
import { useMatcapTexture } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const matCapMaterial = new THREE.MeshMatcapMaterial()

export default function Experience()
{
    const [ matCapTexture ] = useMatcapTexture('736655_D9D8D5_2F281F_B1AEAB', 512)

    useEffect(() =>
    {
        matCapTexture.colorSpace = THREE.SRGBColorSpace
        matCapTexture.needsUpdate = true

        matCapMaterial.matcap = matCapTexture
        matCapMaterial.needsUpdate = true
    }, [])

    return <>
        { [...Array(100)].map((value, index) =>
                <mesh
                    geometry={ torusGeometry }
                    material={ matCapMaterial }
                    key={ index }
                    position={ [
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10
                    ]}
                    scale={ 0.2 + Math.random() * 0.2 }
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
```

## 3 -  Animate

1. Group
2. 

`useRef` to associate to a `group` to animate(`useFrame`) groups of objects.

``` javascript
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Experience()
{
    const donutsGroup = useRef()

    useFrame((state, delta) =>
    {
        for(const donut of donutsGroup.current.children)
        {
            donut.rotation.y += delta * 0.2
        }
    })

    return <>
        <group
            ref={ donutsGroup }
        >
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
        </group>
    </>
}
```

