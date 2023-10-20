# Setup

1. NPX-Node
2. Scratch
3. Vite - Recommended

## NPX 

* Needs `npm` to get dependencies, ideal to modular applications

[Create React App - NPX](https://www.npmjs.com/package/create-react-app)

Isstall project
``` bash
npm install -g npx # Install npx globally
npx create-react-app .
```

## Scratch

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


## Vite

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

