import { Physics } from '@react-three/rapier'

import Lights from './Lights.jsx'
import { Level, BlockLimbo, BlockAxe, BlockSpinner } from './Level.jsx'
import Player from './Player.jsx'

export default function Experience()
{
    return <>
        <Physics
            // debug
        >
            <Lights />
            <Level
                count={ 10 }
                types={ [ BlockLimbo, BlockAxe, BlockSpinner ]}
            />
            <Player />
        </Physics>
    </>
}