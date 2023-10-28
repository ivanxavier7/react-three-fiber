import { PresentationControls, Environment } from '@react-three/drei'
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
        
        <PresentationControls
            global
            polar={ [ -4, 0.2 ]}
            azimuth={ [ -1, 0.75 ] }
            config={ { mass: 2, tension: 400 } }
            snap={ { mass: 4, tension: 400 } }
        >
            <MacBook 
                position-y={ -1 }
                position-x={ 0.4 }
            />
        </PresentationControls>

        <FloatingClouds />
    </>
}