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