# Load Models

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

1. Loading
2. Preloading


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

add multiple instances of the object using the same geometry using `Clone`.

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

``` javascript

```

## 6 - Animations

``` javascript

```