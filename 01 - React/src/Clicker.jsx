import { useRef, useState, useEffect } from 'react'


export default function Clicker({keyName, color, increment})
{
    const [ count, setCount ] = useState(parseInt(localStorage.getItem(keyName) ?? 0))  // Save value locally
    //console.log(useState(0))

    // Random color using HSL
    //console.log(`hsl(${ Math.random() * 360 }deg, 100%, 70%)`)

    const buttonRef = useRef()
    
    // first render
    useEffect(() => {
      // DOM
      buttonRef.current.style.backgroundColor = 'cyan'
      buttonRef.current.style.color = 'red'

      return () =>
      {
        localStorage.removeItem(keyName)  // Remove the local storage when we hide the component
        
      }
    }, [])  

    useEffect(() => {
        localStorage.setItem(keyName, count) 
    }, [ count ])   // Call this everytime th count changes

    let buttonClick = () =>
    {
        setCount(count + 1)
        increment()
        //setCount((value) => { return value + 1})
    }

    return (
      <>
        <div style={ { color: color } }>Click count: { count } </div>
        <button
          ref={ buttonRef }
          style={ { background: color } }
          onClick={ buttonClick }>Click me</button>
      </>
    )
}
