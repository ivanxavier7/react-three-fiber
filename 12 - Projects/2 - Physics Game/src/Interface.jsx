import { useKeyboardControls } from "@react-three/drei"
import useGame from './stores/useGame'
import { useEffect, useRef } from 'react'
import { addEffect } from "@react-three/fiber"

export default function Interface()
{

    const [
        forward,
        backward,
        leftward,
        rightward,
        jump
    ] = useKeyboardControls((state) => {
        return [
            state.forward,
            state.backward,
            state.leftward,
            state.rightward,
            state.jump,
        ]
    })

    const restart = useGame((state) => state.restart)

    const phase = useGame((state) => state.phase)

    const time = useRef()

    useEffect(() => {
        const unsubcribeEffect = addEffect(() =>
        {
            //console.log('tick')
            const state = useGame.getState()
            //console.log(state)
            let elapsedTime = 0

            if(state.phase === 'playing')
            {
                elapsedTime = Date.now() - state.startTime
            } else if(state.phase === 'ended')
            {
                elapsedTime = state.endTime - state.startTime
            }

            elapsedTime /= 1000
            elapsedTime = elapsedTime.toFixed(2) // Round time

            if(time.current) {
                time.current.textContent = elapsedTime
            }
        })

        return () =>
        {
            unsubcribeEffect()
        }
    }, []);

    return <div className="interface">
        <div
            ref={ time }
            className="time"
        >
            0.00
        </div>

        { phase === 'ended' && <div className="restart" onClick={ restart }>Restart</div> }

        <div className="controls">
            <div className="raw">
                <div className={ `key ${ forward ? 'active' : '' }` }></div>
            </div>
            <div className="raw">
                <div className={ `key ${ leftward ? 'active' : '' }` }></div>
                <div className={ `key ${ backward ? 'active' : '' }` }></div>
                <div className={ `key ${ rightward ? 'active' : '' }` }></div>
            </div>
            <div className="raw">
                <div className={ `key large ${ jump ? 'active' : '' }` }></div>
            </div>
        </div>

    </div>
}