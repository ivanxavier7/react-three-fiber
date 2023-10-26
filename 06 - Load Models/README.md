# Load Models

1. [Loader and Draco](https://github.com/ivanxavier7/react-three-fiber#61---loader-and-draco)
2. [Loading Bigger Models](https://github.com/ivanxavier7/react-three-fiber#62---loading-bigger-models)
3. [Drei](https://github.com/ivanxavier7/react-three-fiber#63---drei)
4. [Multiple instances](https://github.com/ivanxavier7/react-three-fiber#64---multiple-instances)
5. [GLTF to Component](https://github.com/ivanxavier7/react-three-fiber#65---gltf-component)
6. [Animations](https://github.com/ivanxavier7/react-three-fiber#66---animations)


## 1 - Loader and Draco

Load models with simple leader and draco, the recommended way is below with `Drei`.


``` javascript
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

{/*
const model = useLoader(
    GLTFLoader, 
    './hamburger.glb'
)
*/}

const model = useLoader(
    GLTFLoader,
    './hamburger-draco.glb',
    (loader) =>
    {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('./draco/')
        loader.setDRACOLoader(dracoLoader)
    })

<primitive
    object={ model.scene }
    scale={ 0.35 }
    position-y={ -1 }
/>
```

## 2 - Loading Bigger models

When we want to start using the website before the models load we must use the `Suspense` component.

The `FallBack` attribute allows you to replace the model with something while it is not loaded.

`Model.jsx`
``` javascript
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

export default function Model()
{
    {/*
    const model = useLoader(
        GLTFLoader, 
        './hamburger.glb'
    )
    */}

    const model = useLoader(
        GLTFLoader,
        './FlightHelmet/glTF/FlightHelmet.gltf',
        (loader) =>
        {
            const dracoLoader = new DRACOLoader()
            dracoLoader.setDecoderPath('./draco/')
            loader.setDRACOLoader(dracoLoader)
        }
    )

    return <primitive
        object={ model.scene }
        scale={ 5 }
        position-y={ -1 }
    />
}
```

`PlaceHolder.jsx`
``` javascript
export default function Placeholder(props)
{
    return <mesh { ...props /* Retreive all the properties defined in the mesh instatiation*/>}>
        <boxGeometry
            args={ [ 1, 1, 1, 2, 2, 2] }
        />
        <meshBasicMaterial
            wireframe
            color={"red"}
        />
    </mesh>
}
```

`Experience.jsx`
``` javascript
import { Suspense } from 'react'
import Model from './Model'
import Placeholder from './Placeholder'

<Suspense
    fallback={ <Placeholder
        position-y={ 0.5 }
        scale={ [ 2, 3, 2 ] }
    /> }
>
    <Model />
</Suspense>
```


## 3 - Drei

1. [Loading](https://github.com/ivanxavier7/react-three-fiber#631---loading)
2. [Preloading](https://github.com/ivanxavier7/react-three-fiber#632---preloading)


### 3.1 - Loading

Recommended way to load models, supports Draco compression.

* `useGLTF`

``` javascript
import { useGLTF } from '@react-three/drei'

export default function Model()
{
    const model = useGLTF('./hamburger-draco.glb')

    return <primitive
        object={ model.scene }
        scale={ 0.35 }
        position-y={ -1 }
    />
}
```


### 3.2 - Preloading

Allows you to load components even if they are not yet in use, we can use this as an introduction to hide the loading of more complex objects.

* `useGLTF`

``` javascript
import { useGLTF } from '@react-three/drei'

export default function Model()
{
    const model = useGLTF('./hamburger-draco.glb')

    return <primitive
        object={ model.scene }
        scale={ 0.35 }
        position-y={ -1 }
    />
}

useGLTF.preload('./hamburger-draco.glb')
```

### 


## 4 - Multiple instances

Add multiple instances of the object using the same geometry using `Clone`.

``` javascript
import { Clone, useGLTF } from '@react-three/drei'

export default function Model()
{
    const model = useGLTF('./hamburger-draco.glb')

    return <>
        <Clone
            object={ model.scene }
            scale={ 0.35 }
            position-y={ -1 }
        />
        <Clone
            object={ model.scene }
            scale={ 0.35 }
            position-y={ -1 }
            position-x={ -3.4 }
        />
        <Clone
            object={ model.scene }
            scale={ 0.35 }
            position-y={ -1 }
            position-x={ 3.4 }
        />
    </>
}
```


## 5 - GLTF Component

1. [Convert](https://github.com/ivanxavier7/react-three-fiber#651---convert)
2. [Import and Shadow Acne](https://github.com/ivanxavier7/react-three-fiber#652---import-and-shadow-acne)

Converts a GLTF template to a React THREE Fiber component. We can tweak the menu before copying the result.

[Converter script](https://github.com/pmndrs/gltfjsx)
[Online converter](https://gltf.pmnd.rs/)

Create a component with the name of the model and copy the result into the file.
 * Add the dot `./hamburger-draco.glb`
 * Add export `export default function`
 * Change function name `function Hamburger(props)`
 * Import
 * Change diferent parts of the model if needed


### 5.1 - Convert
`Hamburger.jsx`
``` javascript
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";


export default function Model(props)
{
    const { nodes, materials } = useGLTF("./hamburger-draco.glb");
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.bottomBun.geometry}
                material={materials.BunMaterial}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.meat.geometry}
                material={materials.SteakMaterial}
                position={[0, 2.817, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.cheese.geometry}
                material={materials.CheeseMaterial}
                position={[0, 3.04, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.topBun.geometry}
                material={materials.BunMaterial}
                position={[0, 1.771, 0]}
            />
        </group>
    );
}

useGLTF.preload("/hamburger-draco.glb");
```


### 5.2 - Import and Shadow Acne

Fix on the bias or shadowBias of the directional light shadow

`Experience.jsx`
``` javascript
import Hamburger from './Hamburger'

<directionalLight
    shadow-normalBias={ 0.04 }
    castShadow
    position={ [ 1, 2, 3 ] }
    intensity={ 1.5 }
/>

<Hamburger
    scale={ 0.35 }
/>
```


## 6 - Animations

1. [Load](https://github.com/ivanxavier7/react-three-fiber#661---load)
2. [Transitions](https://github.com/ivanxavier7/react-three-fiber#662---transitions)
3. [Control with GUI / Leva](https://github.com/ivanxavier7/react-three-fiber#663---control-with-gui--leva)


### 6.1 - Load

We use model animations with `useAnimations`.

`Fox.jsx`
``` javascript
import { useAnimations, useGLTF } from "@react-three/drei"
import { useEffect } from "react"

export default function Fox()
{
    const fox = useGLTF('./Fox/glTF/Fox.gltf')
    const animations = useAnimations(fox.animations, fox.scene)
    console.log(animations.actions)

    useEffect(() => 
    {
        const action = animations.actions.Run
        action.play()
    }, [])


    return <primitive
        object={ fox.scene }
        scale={ 0.025 }
        position={ [ -2.5, 0, 2.5 ] }
        rotation-y={ 0.3 }
    />
}
```

`Experience.jsx`
``` javascript
import Fox from './Fox'

<Fox />
```

### 6.2 - Transitions

``` javascript
useEffect(() => 
{   animations.actions.Run.play()
    
    window.setTimeout(() =>
    {
        animations.actions.Walk.play()
        animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1)
    }, 2000)
}, [])
```

### 6.3 - Control with GUI / Leva

Better way to ask object to start animation, can be integrated with previous transition.

``` javascript
import { useAnimations, useGLTF } from "@react-three/drei"
import { useEffect } from "react"
import { useControls } from 'leva'

export default function Fox()
{
    const fox = useGLTF('./Fox/glTF/Fox.gltf')
    const animations = useAnimations(fox.animations, fox.scene)
    // console.log(animations.actions)

    const { animationName } = useControls({
        animationName: { options: animations.names }
    })

    useEffect(() => 
    {
        const action = animations.actions[animationName]
        action
            .reset()
            .fadeIn(0.5)
            .play()

        return () => 
        {
            // Remove old animation so as not to mix them
            action.fadeOut(0.5)
        }
        
    }, [animationName])


    return <primitive
        object={ fox.scene }
        scale={ 0.025 }
        position={ [ -2.5, 0, 2.5 ] }
        rotation-y={ 0.3 }
    />
}
```