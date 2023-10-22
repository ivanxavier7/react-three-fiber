# Drei

* [Drei Documentation](https://github.com/pmndrs/drei)

Examples of some helpers using `Drei`

1. Setup
2. Camera Controls
3. Geometries
4. Post-processing
5. HTML
6. Loaders
7. Environment
8. Complex calculations


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


``` javascript

```

``` javascript

```