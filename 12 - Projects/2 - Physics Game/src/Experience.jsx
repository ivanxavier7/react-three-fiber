import { Physics } from '@react-three/rapier'

import Lights from './Lights.jsx'
import { Level, BlockLimbo, BlockAxe, BlockSpinner } from './Level.jsx'
import Player from './Player.jsx'
import useGame from './stores/useGame.jsx'
import { Suspense } from 'react'

export default function Experience()
{
    const blocksCount = useGame((state) => {
        return state.blocksCount
    })

    const blocksSeed = useGame(state => {
        return state.blocksSeed
    })


    return <>
        <Suspense
            fallback={ null }
        >
            <color args={ [ '#a9d2e4'] } attach="background" />
            <Physics
                // debug
            >
                <Lights />
                <Level
                    count={ blocksCount }
                    seed={ blocksSeed }
                    types={ [ BlockLimbo, BlockAxe, BlockSpinner ]}
                />
                <Player />
            </Physics>
        </Suspense>
    </>
}