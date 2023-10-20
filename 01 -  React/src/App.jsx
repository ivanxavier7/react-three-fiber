import { useState } from "react"
import Clicker from "./Clicker"

export default function App()
{
    const [ hasClicker, setHasClicker ] = useState(true)


    const toggleClickerClick = () =>
    {
        setHasClicker(!hasClicker)
    }

    return <>
        <button onClick={toggleClickerClick}>{hasClicker ? 'Hide' : 'Show'} Toggle click </button>
        {/* hasClicker ? <Clicker /> : null*/}
        { hasClicker && <Clicker /> /* if its false, js dont check the second part of the condition*/}
    </>
}