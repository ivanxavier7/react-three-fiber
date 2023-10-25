import { Sparkles, Center, useTexture, useGLTF, OrbitControls } from '@react-three/drei'

export default function Experience()
{
    const { nodes } = useGLTF('./model/portal.glb')
    console.log(nodes)

    const bakedTexture = useTexture('./model/baked.jpg')
    bakedTexture.flipY = false

    return <>

        <color args={ ['#030202'] } attach="background"/>

        <OrbitControls makeDefault />

        <Center
            rotation={ [
                Math.PI * -0.10,
                Math.PI * -0.85,
                Math.PI * -0.01
            ] }
            position={ [-1, 0, -2] }
        >
            <mesh
                geometry={ nodes.baked.geometry}
                position={ nodes.baked.position }
                rotation={ nodes.baked.rotation }
            >
                <meshBasicMaterial
                    map={ bakedTexture }
                />
            </mesh>

            <mesh
                geometry={ nodes.poleLightA.geometry }
                position={ nodes.poleLightA.position }
                rotation={ nodes.poleLightA.rotation }
            >
                <meshBasicMaterial color="#ffffb0" />
            </mesh>

            <mesh
                geometry={ nodes.poleLightB.geometry }
                position={ nodes.poleLightB.position }
                rotation={ nodes.poleLightB.rotation }
            >
                <meshBasicMaterial color="#ffffb0" />
            </mesh>

            <mesh
                geometry={ nodes.portalLight.geometry }
                position={ nodes.portalLight.position }
                rotation={ nodes.portalLight.rotation }
            >
                <meshBasicMaterial color="#ffffff" />"
            </mesh>

            <Sparkles
                size={ 2 }
                scale={ [ 4, 2, 4]}
                position-y={ 1 }
                speed={ 0.2 }
                count={ 20 }
                color="#2cb5c7"
            />
        </Center>
    </>
}