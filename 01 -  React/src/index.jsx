import './style.css'
import { createRoot } from 'react-dom/client'
import App from './App'

const root = createRoot(document.querySelector('#root'))

const name = "Jhonny"

root.render(
    <>
        <h1>Hello <br/> React</h1>
        <p>Some <strong className='cute-paragraph'>text for the: </strong> { name } { Math.random() }</p>

        <App></App>
        {/*<App />*/}

    </>
)