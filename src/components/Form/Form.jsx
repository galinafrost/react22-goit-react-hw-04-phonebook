import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

import styles from './form.module.css';

const INITIAL_CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const Form = () => {
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [filter, setFilter] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const addContact = ({ name, number }) => {
    const resultName = contacts.find(contact => contact.name === name);
    if (resultName) {
      return alert(`${name} уже есть в списке`);
    }

    const resultNumber = contacts.find(contact => contact.number === number);
    if (resultNumber) {
      return alert(`${name} уже есть в списке`);
    }
    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    setContacts(prevState => [...prevState, newContact]);
    localStorage.setItem('contacts', JSON.stringify([...contacts, newContact]));
  };

  useEffect(() => {
    const localContacts = localStorage.getItem('contacts');
    if (!localContacts) {
      localStorage.setItem('contacts', JSON.stringify(INITIAL_CONTACTS));
      return;
    } else {
      const parsedContacts = JSON.parse(localContacts);
      setContacts(parsedContacts);
    }
  }, []);

  const removeContact = contactId => {
    const newContacts = contacts.filter(item => item.id !== contactId);
    setContacts(newContacts);
    localStorage.setItem('contacts', JSON.stringify(newContacts));
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const filterStr = filter.toLowerCase();
    const result = contacts.filter(contact => {
      const name = contact.name.toLowerCase();
      return name.includes(filterStr);
    });

    return result;
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className={styles.title}>Contacts</h2>
      <Filter filter={filter} handleChange={handleChange} />
      <ContactList removeContact={removeContact} contacts={filteredContacts} />
    </div>
  );
};

export default Form;
