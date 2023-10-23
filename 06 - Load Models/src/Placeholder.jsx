export default function Placeholder(props)
{
    return <mesh { ...props /* Retreive all the properties defined in the mesh instatiation*/>}>
        <boxGeometry
            args={ [ 1, 1, 1, 2, 2, 2] }
        />
        <meshBasicMaterial
            wireframe
            color={"red"}
        />
    </mesh>
}