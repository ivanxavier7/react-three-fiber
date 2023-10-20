import { useState, useEffect } from 'react'    // useState - data that will change dynamically, UseEffect - will say when the component will be rendered


export default function Clicker()
{
    const [ count, setCount ] = useState(parseInt(localStorage.getItem('count') ?? 0))  // Save value locally
    //console.log(useState(0))

    useEffect(() => {
      console.log('first render of the clicker')
      return () =>
      {
        console.log('disposing clicker component')
        localStorage.removeItem('count')  // Remove the local storage when we hide the component
      }
    }, [])  

    useEffect(() => {
        localStorage.setItem('count', count) 
    }, [ count ])   // Call this everytime th count changes

    let buttonClick = () =>
    {
        setCount(count + 1)
        //setCount((value) => { return value + 1})
    }

    return (
      <>
        <div> Click count: { count } </div>
        <button onClick={ buttonClick }>Click me</button>
      </>
    )
}
