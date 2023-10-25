# Drei

* [Drei Documentation](https://github.com/pmndrs/drei)

Examples of some helpers using `Drei`

1. Setup
2. Camera Controls
3. Geometries
4. HTML
5. 3D Text
6. Float animation
7. Materials


## 1 - Setup


``` bash
npm install @react-three/drei@9.77
```

## 2 - Camera Controls

Orbit Controls

``` javascript
import { OrbitControls } from '@react-three/drei'

export default function Experience()
{
    return <>
        <OrbitControls />
        {/* ... */}
    </>
}
```

## 3 - Geometries

1. Transform Controls
2. Pivot Controls

### 3.1 - Transform Controls

Change the `Position`, `Rotation` and `Scale` of the object

``` javascript
import { TransformControls, OrbitControls } from '@react-three/drei'

export default function Experience()
{
    return <>
        <OrbitControls makeDefault/>
        <TransformControls position={ [ 1, 2, 3 ] }> 
            <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        </TransformControls>
        {/* ... */}
    </>
}
```

Or with `hooks`

``` javascript
import { TransformControls, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

export default function Experience()
{
    return <>
        <OrbitControls makeDefault/>
        <directionalLight ref={ cube} position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <TransformControls object={ cube } mode="rotate"/>
        {/* <TransformControls object={ cube } mode="rotate"/> */}
        {/* <TransformControls object={ cube } mode="scale"/> */}
        {/* ... */}
    </>
}
```

### 3.2 - Pivot Controls

Can rotate, move in Axis or by faces on a relative point of referent.

``` javascript
import { PivotControls, OrbitControls } from '@react-three/drei'

<PivotControls
    anchor={ [0, 0, 0] }
    depthTest={ false}
    lineWidth={ 4 }
    axisColors={ ['#8978fb','#16afb4', '#7ba371'] }
    scale={ 2 }
>
    <mesh position-x={ 2 } scale={ 1.5 } >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
    </mesh>
</PivotControls>
```

## 4 - HTML

DOM element that stick to the object

``` javascript
import { Html } from '@react-three/drei'

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
```

``` css
.label > div
{
    font-family: Helvetiva, Arial;
    position: absolute;
    background: #00000088;
    color: white;
    padding: 15px;
    white-space: nowrap;
    overflow: hidden;
    border-radius: 30px;
    user-select: none;
}
```

## 5 - 3D Text

`SDF Fonts` Signed Distance Field Fonts - Shader functions for the text

Patters
* [2D SDF Functions](https://iquilezles.org/articles/distfunctions2d/)
* [#D SDF Functions](https://iquilezles.org/articles/distfunctions/)

Fonts
* [Google FOnts](https://fonts.google.com/)

Formats supporter:

* `woff` - lighter
* `ttf`
* `otf`

``` javascript
import { Text } from '@react-three/drei'

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
```

## 6 - Float animation

``` javascript
import { Float, Text } from '@react-three/drei'

<Float
    speed={ 5 }
    floatIntensity={ 3 }
    rotationIntensity={ 2 }
>
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
</Float>
```

## 7 - Materials

Using a `MeshReflectorMaterial` on the floor to reflect the objects

``` javascript
import { MeshReflectorMaterial } from '@react-three/drei'

<mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
    <planeGeometry />
    <MeshReflectorMaterial color="darkgreen" />
</mesh>
```
