import { Canvas } from '@react-three/fiber'

import './App.css'
import Experience from './Experience'
import CustomObject from './CustomObject'
import * as THREE from 'three'

export default function App() {
  return (
    <Canvas
      dpr={ 1 }
      gl={ {
        antialias: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputEncoding: THREE.LinearSRGBColorSpace
      }} 
      camera={ {  
        position: [1, 2, 3],
        fov: 45,
        near: 0.1,
        far: 200
      }}
    >
        <Experience />
        <CustomObject />
    </Canvas>
  )
}