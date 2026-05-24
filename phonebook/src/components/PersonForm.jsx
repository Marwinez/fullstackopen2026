
import {useState} from "react";
import phonebookService from "../services/phonebookService.js";

const PersonForm = ({ persons, setPersons, setFilteredPersons, setNotificationMessage }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = (e) => {
        e.preventDefault()
        setNewName(e.target.value)
    }

    const handleNumberChange = (e) => {
        e.preventDefault()
        setNewNumber(e.target.value)
    }

    const handleAddPerson = (e) => {
        e.preventDefault()
        console.log("happens")
        const foundPerson = persons.find(person => person.name === newName)
        if (!foundPerson && newName && newNumber) {
            const newPerson = {
                id: persons.length + 1,
                name: newName,
                number: newNumber
            }
            phonebookService
                .addPerson(newPerson)
                .then(res => {
                    setPersons(persons.concat(res))
                    setFilteredPersons(persons.concat(res))
                    setNewName('')
                    setNewNumber('')
                    setNotificationMessage(`Added ${newName}`)
                    setTimeout(() => setNotificationMessage(null), 5000)
                })

        } else if (!newNumber || !newName) {
            console.log(newName)
            console.log(newNumber)
            alert('Please fill both fields')
        }
        else if(foundPerson && foundPerson.number !== newNumber

            && persons.filter(person => person.number !== newNumber).length !== 0
            && confirm(`${foundPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
                phonebookService
                    .updatePerson(foundPerson.id, foundPerson)
                    .then(res => {
                    const copy = [...persons]
                    copy.find(person => person.name === newName).number = newNumber
                    setPersons(copy)
                    setFilteredPersons(copy)
                })
        }
    }

    return (
        <form>
            <div>
                name: <input type="text" onChange={handleNameChange} /><br />
                number: <input type="text" onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit" onClick={handleAddPerson}>add</button>
            </div>
        </form>
    )
}

export default PersonForm;