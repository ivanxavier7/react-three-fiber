import { useState, useMemo } from "react"
import Clicker from "./Clicker"

export default function App({ children, clickersCount })
{
    const [ hasClicker, setHasClicker ] = useState(true)
    const [ count, setCount ] = useState(0)

    const toggleClickerClick = () =>
    {
        setHasClicker(!hasClicker)
        setCount(0)
    }

    const increment = () =>
    {
        setCount(count +1)
    }

 
    const tempArray = [...Array(clickersCount)] // Spread operator, converts null in undefined, fills the array
    console.log(tempArray)
    // Now we can loop 4 times
    // Map go though each item on the array and call a function on it
    tempArray.map((value, index) =>{
        console.log(value, index)
    })

    const colors = useMemo(() => {
        const colors = []

        for(let i=0; i<clickersCount; i++)
            colors.push(`hsl(${ Math.random() * 360 }deg, 100%, 75%)`)

        return colors
    }, [])

    return <>
        { children }

        <div>Total count: { count } </div>
        <p />
        <button onClick={toggleClickerClick}>{hasClicker ? 'Hide' : 'Show'} Toggle click </button>
        {/* hasClicker ? <Clicker /> : null*/}
        
        
        {/* hasClicker && <Clicker increment={ increment } /> /* if its false, js dont check the second part of the condition*/}
        { hasClicker && <>
            { [...Array(clickersCount)].map((value, index) => 
                <Clicker
                    key={index}
                    increment={ increment }
                    keyName={`count${index}`}
                    color={colors[index]}
                />
            )}
        </>}


    </>
}