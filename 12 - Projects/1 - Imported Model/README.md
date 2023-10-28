# Imported Model

1. Get Models
2. Optimize raycasting
3. Create Component
4. Animated Environment Map
5. Floating Clouds
6. Presentation Controls / Camera
7. 
8. 

The model can be created using blender.

## 1 - Get Models

Free models:
* [Market](https://market.pmnd.rs/)
* [Sketchfab](https://sketchfab.com/3d-models?features=downloadable&sort_by=-likeCount)
* [TurboSquid](https://market.pmnd.rs/)
* [Cgtrader](https://www.cgtrader.com/3d-models?file_types[]=117&free=1)
* [Creazilla](https://creazilla.com/sections/3-3d-models/tags/649-gltf?page=20)
* [Free3D](https://downloadfree3d.com/file-format/gltf/)

Check if they have `CC0 Licence` - Open Source

Blender can also be used with some plugins to acquire free models, making editing easier.

## 2 - Optimize raycasting

``` javascript
import { Bvh } from '@react-three/drei'

<Bvh>
    <Experience />
</Bvh>
```

## 3 - Create Component

We can export the model in other ways, such as downloading resources online, but it is not recommended in terms of performance, it will take a long time to load the resources.

[Online tool to convert glTF in Fiber meshes](https://gltf.pmnd.rs/)

Copy the result and add `default` to the function, this method allows you to get better control of the model.

`MacBook.jsx`
``` javascript
export default function MacBook(props)
{
    const { nodes, materials } = useGLTF("./macbook.gltf");

    return (
        <group {...props} dispose={null}>

              <group position={[0, 0.519, 0]} scale={0.103}>
                  <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.Circle001.geometry}
                      material={materials["Frame.001"]}
                  />
                  <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.Circle001_1.geometry}
                      material={materials["Frame.001"]}
                  />
                  <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.Circle001_2.geometry}
                      material={materials.HeadPhoneHole}
                  />
                  <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.Circle001_3.geometry}
                      material={materials.USB_C_INSIDE}
                  />
                  <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.Circle001_4.geometry}
                      material={materials["Frame.001"]}
                  />
                  <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.Circle001_5.geometry}
                      material={materials.TouchbarBorder}
                  />
                  <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.Circle001_6.geometry}
                      material={materials.Keyboard}
                  />

                  <group position={[0, -0.509, 0]} scale={5.796}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle006.geometry}
                        material={materials["Frame.001"]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle006_1.geometry}
                        material={materials.USB_C_INSIDE}
                    />
                  </group>

                  <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.FrontCameraRing001.geometry}
                      material={materials["CameraRIngBlack.002"]}
                      position={[-0.155, 19.571, -16.151]}
                      scale={5.796}
                  />

                  <group position={[-11.786, -0.15, -8.301]} scale={5.796}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle.geometry}
                        material={materials["Keyboard.001"]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle_1.geometry}
                        material={materials.Key}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle_2.geometry}
                        material={materials.Touchbar}
                    />
                  </group>

                  <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.KeyboardKeyHole.geometry}
                      material={materials["Keyboard.001"]}
                      position={[-11.786, -0.152, -8.301]}
                      scale={5.796}
                  />
                  <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.RubberFoot.geometry}
                      material={materials.DarkRubber}
                      position={[-11.951, -0.751, 7.857]}
                      scale={5.796}
                  />

                  <group position={[0.011, -0.211, -10.559]} scale={5.796}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle012.geometry}
                        material={materials.HingeBlack}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle012_1.geometry}
                        material={materials.HingeMetal}
                    />
                  </group>

                  <group position={[-15.026, 0.031, 0.604]} scale={5.796}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle009.geometry}
                        material={materials["Frame.001"]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle009_1.geometry}
                        material={materials.SpeakerHole}
                    />
                  </group>

                  <group position={[12.204, 0.031, 0.604]} scale={5.796}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle003.geometry}
                        material={materials["Frame.001"]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle003_1.geometry}
                        material={materials.SpeakerHole}
                    />
                  </group>

                  <group
                      position={[0.007, -0.472, -10.412]}
                      rotation={[1.311, 0, 0]}
                      scale={5.796}
                  >
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle002.geometry}
                        material={materials["Frame.001"]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle002_1.geometry}
                        material={materials.Screen}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle002_2.geometry}
                        material={materials.ScreenGlass}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle002_3.geometry}
                        material={materials.Rubber}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle002_4.geometry}
                        material={materials.DisplayGlass}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.AppleLogo000.geometry}
                        material={materials["AppleLogo.004"]}
                        position={[0.005, -0.111, -1.795]}
                        rotation={[-Math.PI, Math.PI, -Math.PI]}
                        scale={0.579}
                    />
                </group>
                
            </group>
        </group>
    );
}

useGLTF.preload("./macbook.gltf");
```

`Experience.jsx`
``` javascript
import { OrbitControls } from '@react-three/drei'

import MacBook from './MacBook'

export default function Experience()
{
    return <>
        <OrbitControls makeDefault />
        
        <color args={ [ '#1e282e' ] } attach="background" />
        <MacBook />
    </>
}
```


## 4 - Animated Environment Map

To get a good result with little work, we can use Environment Mapping to light our object.

``

`EnvRing.jsx`
``` javascript
import { Bvh } from '@react-three/drei'
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
        <Bvh>
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
        </Bvh>
    </>
}
```

`Experience.jsx`
``` javascript
<Environment
    blur={ 0.5 }
    background
    frames={Infinity}
    files={ './resources/hdr/woods.hdr' }
    resolution={ 1024 }
>
    <color args={ [ '#000000' ] } attach="background" />

    <EnvRing
        color={[ 20, 30, 50 ]}
        scale={ 2 }
        speed={ 0.4 }
    />

</Environment>

<OrbitControls makeDefault />

<MacBook 
    position-y={ -1 }
    position-x={ 0.4 }
/>
```

## 5 - Floating Clouds

Creation of black and floating clouds.

`FloatingClouds.jsx`
``` javascript
import { Float, Cloud, Clouds } from '@react-three/drei'

import * as THREE from 'three'

export default function FloatingClouds()
{
    return <>
        <Float
            rotationIntensity={ 0.8 }
            speed={ 0.6 }
        >
            <group
                rotation-x={Math.PI * 0.15}
            >
                <Clouds
                    scale={ 3.5 }
                    position-y={-30}
                    position-z={-25}
                    material={THREE.MeshStandardMaterial}
                >
                    <Cloud
                        segments={80}
                        bounds={[19, 8, 4]}
                        volume={14}
                        color="#111525" />
                    <Cloud
                        segments={40}
                        bounds={[18, 6, 5]}
                        volume={12}
                        color="#000000"
                        fade={100}
                    />
                </Clouds>
            </group>
        </Float>
    </>
}
```

## 6 - Presentation Controls

1. Object
2. Camera

### 6.1 - Object

Adds controls to move the object, the configuration created allows it to return to the initial position whenever the user releases the object and resumes its position with an animation of several jumps.

`PresentationControls`

``` javascript

```

## 6.2 - Camera

Animate the camera in the scene.

``` javascript
import { PresentationControls } from '@react-three/drei'

import MacBook from './MacBook'

<PresentationControls
    global
    polar={ [ -4, 0.2 ]}
    azimuth={ [ -1, 0.75 ] }
    config={ { mass: 2, tension: 400 } }
    snap={ { mass: 4, tension: 400 } }
>
    <MacBook 
        position-y={ -1 }
        position-x={ 0.4 }
    />
</PresentationControls>
```

# 7 - Shadows

It was not implemented in this project due to it being above the clouds, but it can be easily integrated this way.

If we want the shadow to follow the object we must place it inside that object.

``` javascript
import { ContactShadows } from '@react-three/drei'

<ContactShadows
    position-y={ -1.4 }
    opacity={ 0.4 }
    scale={ 5 }
    blur={ 2.4 }
/>
```

# 8 - Iframe

1. Create HTML/CSS document
2. Integrate in the Model

Associates an Iframe in a plane, An inline frame is used to embed another document within the current HTML document.


## 8.1 - Create HTML/CSS document

``` html

```


## 8.2 - Integrate in the Model

``` html

```

