import { Environment, Lightformer, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'

import MacBook from './MacBook'
import EnvRing from './resources/Components/EnvRing'
import FloatingClouds from './resources/Components/FloatingClouds'


export default function Experience()
{
    return <>
        <Perf
            position="top-left"
        />

        <Environment
            blur={ 0.6 }
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

        <FloatingClouds />
    </>
}