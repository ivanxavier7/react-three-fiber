import './style.css'
import { createRoot } from 'react-dom/client'
import App from './App'
import People from './People'

const root = createRoot(document.querySelector('#root'))

const name = "Jhonny"

root.render(
    <>
        <h1>Hello <br/> React</h1>
        <p>Some <strong className='cute-paragraph'>text for the: </strong> { name } { Math.random() }</p>

        <App clickersCount={ 3 }>
            <h1>This text will be catch with the children property</h1>
            <h2>Subtitle example</h2>
        </App>
        {/*<App />*/}
        <People />

    </>
)