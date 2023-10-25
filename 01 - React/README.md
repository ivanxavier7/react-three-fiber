# 1 - React

[React Docs](https://react.dev/learn)
[React Courses](https://legacy.reactjs.org/community/courses.html)

1. Setup
2. JSX
3. Conditional rendering
4. Properties
5. Mapping cycle
6. Cache
7. DOM
8. People component
9. Fetch API

## 1 - Setup

1. NPX-Node
2. Scratch
3. Vite - Recommended

### 1.1 - NPX 

* Needs `npm` to get dependencies, ideal to modular applications

[Create React App - NPX](https://www.npmjs.com/package/create-react-app)

Istall project
``` bash
npm install -g npx # Install npx globally
npx create-react-app .
```

### 1.2 - Scratch

* NPX adds unecessary files so we can do it from scratch

1. Initialize
``` bash
npm init -y
```

2.  Add dependencies
``` bash
npm install react@18 react-dom@18.2 react-scripts@5.0
```
3. Change `package.json`
``` json
{
    // ...
  "scripts": {
    "dev": "react-scripts start",
    "build": "react-scripts build"
  },
    // ...
}
```

4. Create `/public/` folder

5. Create `index.html` inside `/public/` folder, and use `!` or `html:5` to generate the code.

6. Add `root` to the body
``` html
<body>
    <div id="root"></div>
</body>
```

7. Add `/src/` folder

8. Add inside `/src/` folder the `index.js`

``` javascript
import { createRoot } from 'react-dom/client'

const root = createRoot(document.querySelector('#root'))

root.render(
    <h1>Hellor React</h1>
)
```

9. Run the server
``` bash
npm run dev
```

10. Choose yes to add default browser configurations


### 1.3 - Vite

1. Create Vite project

``` bash
npm create vite@latest
```

2. Choose project name

3. Choose React framework

4. Choose JavaScript Template

5. Enter the project folder and install
``` bash
npm install
```

6. Run
``` bash
npm run dev
```

7. Install react scripts (optional)
``` bash
npm install react-scripts --save
```
------

## 2 - Event Reacting

`useState`

* Generates a variable linked to a function varname and setVarname(), this makes the site react to changes in this variable

`useEffect`

* Triggers a function when a variable changes

``` javascript
import { useState, useEffect } from 'react'


export default function Clicker()
{
    const [ count, setCount ] = useState(parseInt(localStorage.getItem('count') ?? 0))  // Save value locally

    useEffect(() => {
        localStorage.setItem('count', count) 
    }, [ count ])

    let buttonClick = () =>
    {
        setCount(count + 1)
    }

    return (
      <>
        <div> Click count: { count } </div>
        <button onClick={ buttonClick }>Click me</button>
      </>
    )
}
```

When we leave the array empty `[]` in the `useEffect`, we can the hook the component itself

``` javascript
useEffect(() => {
    console.log('first render of the clicker')
    return () =>
    {
    console.log('disposing clicker component')
    localStorage.removeItem('count')
    }
}, [])  
```

## 3 - Conditional rendering

Rendering components conditionally, in the example we use a button that toggle click component

``` javascript
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
        { hasClicker && <Clicker /> }
    </>
}
```

------

## 4 - Properties

Multiple `Clickers` using the same local storage variable, when we update the page the last value to be updated will be shared by the other `Clickers`, we can catch the content inside one component with the `{ children }` property

Click with property to fix the problem

`App.jsx`

``` javascript	
<Clicker keyName={'countA'}/>
<Clicker keyName={'countB'}/>
<Clicker keyName={'countC'}/>
```

`Clicker.jsx`

``` javascript
export default function Clicker({keyName})
{
    const [ count, setCount ] = useState(parseInt(localStorage.getItem(keyName) ?? 0))

    useEffect(() => {
      return () =>
      {
        localStorage.removeItem(keyName)
      }
    }, [])  

    useEffect(() => {
        localStorage.setItem(keyName, count) 
    }, [ count ])   
    // (...)
}
```

-------

## 5 - Mapping cycle

We can use the `map()` function to cycle through functions through each element of an array and use its index

``` javascript
const tempArray = [...Array(clickersCount)] // Spread operator, converts null in undefined, fills the array
console.log(tempArray)
// Now we can loop 4 times
// Map go though each item on the array and call a function on it
tempArray.map((value, index) =>{
    console.log(value, index)
})
```

### Implementation

`index.jsx`
``` javascript
<App clickersCount={ 3 } />
```

`App.jsx`
``` javascript
{ [...Array(clickersCount)].map((value, index) => 
    <Clicker
        key={index}
        increment={ increment }
        keyName={`count${index}`}
        color={`hsl(${ Math.random() * 360 }deg, 100%, 70%)`}
    />
)}
```

------

## 6 - Cache

When we need to use the cache to store some information we must use `useMemo`

``` javascript
import { useState, useMemo } from "react"

const colors = useMemo(() => {
    const colors = []

    for(let i=0; i<clickersCount; i++)
        colors.push(`hsl(${ Math.random() * 360 }deg, 100%, 75%)`)

    return colors
}, [])

<Clicker
    color={colors[index]}
/>
```

------

## 7 - DOM

To access the component itself, we should use `useRef`

``` javascript
import { useRef, useEffect } from 'react'

const buttonRef = useRef()

// first render
useEffect(() => {
    // DOM
    buttonRef.current.style.backgroundColor = 'cyan'
    buttonRef.current.style.color = 'red'

    return () =>
    {
    }
}, []) 

<button
    ref={ buttonRef }
</button>
```

------

## 8 - People component

Basic example of a component with a list of objects and showing them in a list

``` javascript
import { useState } from 'react'

export default function People()
{
    const [ people, setPeople ] =useState([
        { id: 1, name: 'Ivan'},
        { id: 2, name: 'Xavier'},
        { id: 3, name: 'João'},
        { id: 4, name: 'Ana'},
        { id: 5, name: 'Maria'},
    ])

    return <div>
        <h2>People</h2>

        <ul>
        { people.map(person => <li key={ person.id }>{ person.name }</li>) }
        </ul>
    </div>
}
```

## 9 - Fetch API

Using the same example as the previous component, we can see an example of a request to an API and the application of its data in the component

[API example](https://jsonplaceholder.typicode.com/)

``` javascript
import { useState, useEffect } from 'react'

export default function People()
{
    const [ people, setPeople ] =useState([
        { id: 1, name: 'Ivan'},
        { id: 2, name: 'Xavier'},
        { id: 3, name: 'João'},
        { id: 4, name: 'Ana'},
        { id: 5, name: 'Maria'},
    ])

    const getPeople = async () =>
    {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const result = await response.json()
        setPeople(result)
    }

    useEffect(() => 
    {
        getPeople() // When the component is created, fetch all the people
    }, [])

    return <div>
        <h2>People</h2>

        <ul>
        { people.map(person => <li key={ person.id }>{ person.name }</li>) }
        </ul>
    </div>
}
```