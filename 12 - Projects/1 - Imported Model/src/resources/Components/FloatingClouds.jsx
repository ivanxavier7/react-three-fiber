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