import React, { useState } from 'react';
import personService from '../services/persons';

const PersonForm = (props) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    const updateMessage = (message, error) => {
      props.setErrorMessage(error);
      props.setMessage(message);

      setTimeout(() => {
        props.setErrorMessage(null);
        props.setMessage(null);
      }, 5000);
    };

    const replacePerson = (currentPerson) => {
      if (
        window.confirm(
          `${currentPerson.name} has already been added to the phonebook. Would you like to replace the old number with the new one?`
        )
      ) {
        const updatePerson = props.persons.filter((personName) => {
          return personName.name === currentPerson.name;
        });
        personService
          .update(updatePerson[0].id, currentPerson)
          .then((returnedPerson) => {
            props.setPersons(
              props.persons.map((person) =>
                person.id !== updatePerson[0].id ? person : returnedPerson
              )
            );
            updateMessage(`Updated ${returnedPerson.name}`, false);
          })
          .catch((error) => {
            updateMessage(
              `Information of ${updatePerson[0].name} has already been removed from the server.`,
              true
            );
          });
      }
    };

    props.persons.filter((personName) => {
      return personName.name === nameObject.name;
    }).length > 0
      ? replacePerson(nameObject)
      : personService.create(nameObject).then((returnedPerson) => {
          props.setPersons(props.persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          updateMessage(`Added ${returnedPerson.name}`, false);
        });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  return (
    <form onSubmit={addName}>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Phone Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
