# Debug

Use React Developer Tools extension for the browser.

1. StrictMode
2. Leva
3. Monitoring

## 1 - StrictMode

Warn about some problems:

* Infinite render loop
* Forgotten useEffect dependencies
* Unused imports
* Deprecated pratices

``` javascript
import { StrictMode } from 'react'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <StrictMode>
        <Canvas
            camera={ {
                fov: 45,
                near: 0.1,
                far: 200,
                position: [ - 4, 3, 6 ]
            } }
        >
            <Experience />
        </Canvas>
    </StrictMode>
)
```

## 2 - Leva

* [Leva Documentation](https://github.com/pmndrs/leva)
* [Leva Configuration](https://github.com/pmndrs/leva/blob/main/docs/configuration.md)

``` bash
npm install leva@0.9
```

## 3 - Monitoring

* [R3F-Perf Docs](https://github.com/utsuboco/r3f-perf)

`r3f-perf` Monitors resource consumption on the graphics card, processor, counts FPS, calls and total triangles

``` bash
npm install r3f-perf@7.1
```

``` javascript
import { Perf } from 'r3f-perf'

<Perf
    position="top-left"
/>
```