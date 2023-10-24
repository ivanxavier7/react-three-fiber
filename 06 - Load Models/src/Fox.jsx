import { useAnimations, useGLTF } from "@react-three/drei"
import { useEffect } from "react"
import { useControls } from 'leva'

export default function Fox()
{
    const fox = useGLTF('./Fox/glTF/Fox.gltf')
    const animations = useAnimations(fox.animations, fox.scene)
    // console.log(animations.actions)

    const { animationName } = useControls({
        animationName: { options: animations.names }
    })

    useEffect(() => 
    {
        const action = animations.actions[animationName]
        action
            .reset()
            .fadeIn(0.5)
            .play()

        return () => 
        {
            // Remove old animation so as not to mix them
            action.fadeOut(0.5)
        }
        
    }, [animationName])


    return <primitive
        object={ fox.scene }
        scale={ 0.025 }
        position={ [ -2.5, 0, 2.5 ] }
        rotation-y={ 0.3 }
    />
}