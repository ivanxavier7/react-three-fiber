import { PresentationControls, Environment } from '@react-three/drei'
import { Perf } from 'r3f-perf'

import MacBook from './resources/Models/MacBook'
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
            files={ './resources/HDR/woods.hdr' }
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
            <rectAreaLight
                width={ 2.5 }
                height={ 1.65 }
                intensity={ 5 }
                color={ '#a0aff0'}
                position={ [ 0, 0.95, 0.75 ] }
                rotation-x={ -0.50 }
            />
            <MacBook 
                position-y={ -1 }
                position-x={ 0.4 }
            />
        </PresentationControls>

        <FloatingClouds />
    </>
}