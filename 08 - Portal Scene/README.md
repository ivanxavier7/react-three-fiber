# Baked Models and Shaders

1. Loading Baked Models
2. Drei Particles
3. Shader Materials


## 1 - Loading Baked Models
Set `flat` to get THREE.NoToneMapping, this allows some materials to go beyond the normal values, to simulate lights with colors.

`index.jsx`
``` javascript
    <Canvas
        flat
    >
    </Canvas>
```

`Experience.jsx`
``` javascript
import { Center, useTexture, useGLTF, OrbitControls } from '@react-three/drei'

export default function Experience()
{
    const { nodes } = useGLTF('./model/portal.glb')
    console.log(nodes)

    const bakedTexture = useTexture('./model/baked.jpg')
    bakedTexture.flipY = false

    return <>

        <color args={ ['#030202'] } attach="background"/>

        <OrbitControls makeDefault />

        <Center
            rotation={ [
                Math.PI * -0.10,
                Math.PI * -0.85,
                Math.PI * -0.01
            ] }
        >
            <mesh
                geometry={ nodes.baked.geometry}
                position={ nodes.baked.position }
                rotation={ nodes.baked.rotation }
            >
                <meshBasicMaterial
                    map={ bakedTexture }
                />
            </mesh>

            <mesh
                geometry={ nodes.poleLightA.geometry }
                position={ nodes.poleLightA.position }
                rotation={ nodes.poleLightA.rotation }
            >
                <meshBasicMaterial color="#ffffb0" />
            </mesh>

            <mesh
                geometry={ nodes.poleLightB.geometry }
                position={ nodes.poleLightB.position }
                rotation={ nodes.poleLightB.rotation }
            >
                <meshBasicMaterial color="#ffffb0" />
            </mesh>

            <mesh
                geometry={ nodes.portalLight.geometry }
                position={ nodes.portalLight.position }
                rotation={ nodes.portalLight.rotation }
            >
                <meshBasicMaterial color="#ffffff" />"
            </mesh>
        </Center>
    </>
}
```

## 2 - Drei Particles

[Drei helper](https://github.com/pmndrs/drei#sparkles)`Sparkles`

``` javascript
import { Sparkles } from '@react-three/drei'

<Sparkles
    size={ 2 }
    scale={ [ 4, 2, 4]}
    position-y={ 1 }
    speed={ 0.2 }
    count={ 20 }
    color="#2cb5c7"
/>
```

## 3 - Shader Materials

See the shaders and patterns section in the [THREE repository](https://github.com/ivanxavier7/three.js/tree/main/02%20-%20Advanced/08%20-%20Shaders) to help manipulate the different patterns with mathematical equations. This section is dedicated only to integrating Shader with Fiber.

Dont forget to add the `uniforms{}` needed:
* uTime
* uColorStart
* uColorEnd


``` bash
npm i vite-plugin-glsl
```

``` javascript
import { shaderMaterial, Center, useTexture, useGLTF, OrbitControls } from '@react-three/drei'

import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'

import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { useRef } from 'react'

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#ffffff'),
        uColorEnd: new THREE.Color('#000000'),
    },
    portalVertexShader,
    portalFragmentShader
)

extend({ PortalMaterial })

export default function Experience()
{
    const portalMaterial = useRef()
    useFrame((state, delta) =>
    {
        portalMaterial.current.uTime += delta
    })

    const { nodes } = useGLTF('./model/portal.glb')
    console.log(nodes)

    const bakedTexture = useTexture('./model/baked.jpg')
    bakedTexture.flipY = false

    return <>

        <color args={ ['#030202'] } attach="background"/>

        <OrbitControls makeDefault />

        <Center
            rotation={ [
                Math.PI * -0.10,
                Math.PI * -0.85,
                Math.PI * -0.01
            ] }
            position={ [-1, 0, -2] }
        >
            <mesh
                geometry={ nodes.portalLight.geometry }
                position={ nodes.portalLight.position }
                rotation={ nodes.portalLight.rotation }
            >
                <portalMaterial
                    ref={ portalMaterial }
                />
            </mesh>
        </Center>
    </>
}
```