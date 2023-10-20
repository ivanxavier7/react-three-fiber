# 1 - React

1. Setup
2. JSX

### 1 - Setup

1. NPX-Node
2. Scratch
3. Vite - Recommended

### 1.1 - NPX 

* Needs `npm` to get dependencies, ideal to modular applications

[Create React App - NPX](https://www.npmjs.com/package/create-react-app)

Isstall project
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

## 