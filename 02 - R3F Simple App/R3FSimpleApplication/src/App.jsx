import { Canvas } from '@react-three/fiber'

import './App.css'
import Experience from './Experience'
import CustomObject from './CustomObject'

export default function App() {
  return (
    <Canvas 
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