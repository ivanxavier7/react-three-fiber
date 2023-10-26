# Mouse Events and Raycasting

1. Event Example
2. Event Information
3. Types of Events
4. Applications
5. Occluding / Block Ray
6. Cursor

## 1 - Event Example

``` javascript
import { useRef } from 'react'

const cube = useRef()

const eventHandler = () =>
{
    cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
}

<mesh
    ref={ cube }
    onClick={ eventHandler }
>
    <boxGeometry />
    <meshStandardMaterial color="DarkBLue" />
</mesh>
```

## 2 - Event Information

Information about the event associated with the click, we can see the objects that are interconnected or associate the distance or coordinates of the contact point with something.

``` javascript
    })

    const eventHandler = (event) =>
    {
        console.log(event)
        console.log("Distance: ", event.distance)           // Ditance between the camera and hit point
        console.log("Point: ", event.point)                 // Hit point (x,y,z)
        console.log("Uv: ", event.uv)                       // Uv coordinates of the hit point
        console.log("Object: ", event.object)               // Object triggered
        console.log("Event Object: ", event.eventObject)    // Object listening

        console.log("X: ", event.x)                         // Pointer X (x, y)
        console.log("Y: ", event.y)                         // Pointer Y (x, y)

        console.log("Shift Key: ", event.shiftKey)          // Shift key pressed
        console.log("Control Key: ", event.ctrlKey)         // Control key pressed
        console.log("Command Key: ", event.metaKey)         // Command key pressed
    }
```

## 3 - Types of Events

1. Click
2. Right Click
3. Double Click
4. Pointer Up
5. Pointer Down
6. Pointer Over
7. Pointer Enter
8. Pointer Out
9. Pointer Leave
10. Pointer Move
11. Pointer Miss

## 3.1 - Click

`onClick()`

Allows you to listen for a click event.

``` javascript
<mesh
    ref={ cube }
    onClick={ eventHandler }
>
    <boxGeometry />
    <meshStandardMaterial color="DarkBLue" />
</mesh>
```

### 3.2 - Right Click

`onContextMenu`

* Desktop -> `Right Click`
* Mobile -> Pressing for a while

``` javascript
<mesh
    ref={ cube }
    onContextMenu={ eventHandler }
>
    <boxGeometry />
    <meshStandardMaterial color="DarkBLue" />
</mesh>
```

### 3.3 - Double Click

`onDoubleClick`

``` javascript
<mesh
    ref={ cube }
    onDoubleClick={ eventHandler }
>
    <boxGeometry />
    <meshStandardMaterial color="DarkBLue" />
</mesh>
```

### 3.4 - Pointer Up

`onPointerUp`

* Desktop - Release the pointer
* Mobile - Stop touching

``` javascript
<mesh
    ref={ cube }
    onPointerUp={ eventHandler }
>
    <boxGeometry />
    <meshStandardMaterial color="DarkBLue" />
</mesh>
```

### 3.5 - Pointer Down

`onPointerDown`

``` javascript
<mesh
    ref={ cube }
    onPointerDown={ eventHandler }
>
    <boxGeometry />
    <meshStandardMaterial color="DarkBLue" />
</mesh>
```

### 3.6 - Pointer Over

`onPointerOver`

When the pointer hover the objects, multiple objects.

``` javascript
<mesh
    ref={ cube }
    onPointerOver={ eventHandler }
>
    <boxGeometry />
    <meshStandardMaterial color="DarkBLue" />
</mesh>
```

### 3.7 - Pointer Enter

`onPointerEnter`

When the pointer enter the object, single object.

``` javascript
<mesh
    ref={ cube }
    onPointerEnter={ eventHandler }
>
    <boxGeometry />
    <meshStandardMaterial color="DarkBLue" />
</mesh>
```

### 3.8 - Pointer Out

`onPointerOut`

When the pointer stop hovering the objects, multiple objects.

``` javascript
<mesh
    ref={ cube }
    onPointerOut={ eventHandler }
>
    <boxGeometry />
    <meshStandardMaterial color="DarkBLue" />
</mesh>
```

### 3.8 - Pointer Leave

`onPointerLeave`

When the pointer leaves the object, single object.

``` javascript
<mesh
    ref={ cube }
    onPointerLeave={ eventHandler }
>
    <boxGeometry />
    <meshStandardMaterial color="DarkBLue" />
</mesh>
```

### 3.9 - Pointer Move

`onPointerMove`

When the pointer moves overing the object, one per frame.

``` javascript
<mesh
    ref={ cube }
    onPointerMove={ eventHandler }
>
    <boxGeometry />
    <meshStandardMaterial color="DarkBLue" />
</mesh>
```

### 3.10 - Pointer Miss

`onPointerMissed`

When the pointer clicks outside the object.

``` javascript
<Canvas
    camera={ {
        fov: 45,
        near: 0.1,
        far: 200,
        position: [ - 4, 3, 6 ]
    } }
    onPointerMissed={ () => {console.log('You missed the click!')}}
>
    <Experience />
    <color args={ [ '#0a0a22' ] } attach="background" />
</Canvas>
```

## 4 - Applications

1. On click select a object
2. Drag to draw a rectangle and wehn it releases, select all objects inside
3. When clicks with shift key, you want to add to currentyle selected objects or remove them if they were selected.
4. Click without a object, will deselect all selected objects

## 5 - Occlusion / Block Ray

When we click on something we send a ray, Raycaster doesn't care about the objects in front, to occlude an object, we need to tell the surrounding objects to stop propagating that event.

``` javascript
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

export default function Experience()
{
    const cube = useRef()

    const eventHandler = (event) =>
    {
        cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
    }

    const blockCubeEvents = (event) =>
    {
        event.stopPropagation()
    }

    return <>

        <OrbitControls makeDefault />

        <mesh
            position-x={ - 2 }
            onClick={ blockCubeEvents }
        >
            <sphereGeometry />
            <meshStandardMaterial color="DarkRed" />
        </mesh>

        <mesh
            ref={ cube }
            position-x={ 2 }
            scale={ 1.5 }
            onClick={ eventHandler }
        >
            <boxGeometry />
            <meshStandardMaterial color="DarkBLue" />
        </mesh>
    </>
}
```

## 6 - Cursor

1. Pointer / Finger
2. Drei Helper - Recommended

To help distinguish clickable objects, we can change the cursor to a pointing finger.

### 6.1 - Pointer / Finger

`onPointerEnter()` -> Change to finger
`onPointerLeave()` -> Change to default

``` javascript
export default function Experience()
{
    const pointerCursor = () =>
    {
        document.body.style.cursor = 'pointer'
    }

    const defaultCursor = () =>
    {
        document.body.style.cursor = 'default'
    }

    return <>
        <mesh
            onPointerEnter={ pointerCursor }
            onPointerLeave={ defaultCursor }
        >
            <boxGeometry />
            <meshStandardMaterial color="DarkBLue" />
        </mesh>
    </>
}
```

### 6.2 - Drei Helper - Recommended

[Drei Helper useCursor](https://github.com/pmndrs/drei#usecursor)

``` javascript
import { useCursor } from '@react-three/drei'
import { useState } from 'react'

export default function Experience()
{
    
    const [hovered, set] = useState()
    useCursor(hovered)

    return <>
        <mesh
            onPointerOver={() => set(true)} onPointerOut={() => set(false)}
        >
            <boxGeometry />
            <meshStandardMaterial color="DarkBLue" />
        </mesh>
    </>
}
```

## 7 - Model Events

Example of an event that manipulates the size and color of a model.

``` javascript
import { useFrame } from '@react-three/fiber'
import { useGLTF, useCursor, OrbitControls } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'

export default function Experience()
{
    const hamburger = useRef()

    const hamburgerModel = useGLTF('./hamburger.glb')

    const modelEvent = (event) =>
    {
        event.stopPropagation() // Prevent Ray from travel trough the objects, single selection
        hamburger.current.scale.x += 0.01
        for(const children of hamburger.current.children)
        {
            children.material.color.b += 0.01
        }
    }

    return <>
        <primitive 
            ref={ hamburger }
            object={ hamburgerModel.scene }
            scale={ 0.25 }
            onClick={ modelEvent }
        />
    </>
}
```

## 8 - Performance

1. Mesh Bounds / Geometries
2. BVH


### 8.1 - Mesh Bounds / Geometries
Change the Raycaster with Drei to help with performance.

Uses an invisible sphere around the object to reduce the calculations required for events.

[Drei meshBounds Helper](https://github.com/pmndrs/drei#meshbounds)


``` javascript
import { meshBounds } from '@react-three/drei'

<mesh
    raycast={ meshBounds }
>
    <boxGeometry />
    <meshStandardMaterial color="DarkBLue" />
</mesh>
```


### 8.2 - BVH / Models or Scene

[Bounding Volume Hierarchy](https://github.com/pmndrs/drei#bvh)

Speeds up the raycaster drastically decreasing its accuracy.

``` javascript
import { Bvh } from '@react-three/drei'

<Bvh>
    <primitive 
        ref={ hamburger }
        object={ hamburgerModel.scene }
        scale={ 0.25 }
        position-y={ 0.7 }
        onClick={ modelEvent }
    />
</Bvh>
```

