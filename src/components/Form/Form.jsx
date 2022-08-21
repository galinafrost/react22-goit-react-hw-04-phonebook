import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

import styles from './form.module.css';

class Form extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;

    const resultName = contacts.find(contact => contact.name === name);
    if (resultName) {
      return alert(`${name} уже есть в списке`);
    }

    const resultNumber = contacts.find(contact => contact.number === number);
    if (resultNumber) {
      return alert(`${name} уже есть в списке`);
    }

    this.setState(prevState => {
      const { contacts } = prevState;
      const newContact = {
        name,
        number,
        id: nanoid(),
      };
      return {
        contacts: [...contacts, newContact],
      };
    });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const filterStr = filter.toLowerCase();
    const result = contacts.filter(contact => {
      const name = contact.name.toLowerCase();
      return name.includes(filterStr);
    });
    return result;
  }

  removeContact = contactId => {
    this.setState(prevState => {
      const { contacts } = prevState;
      const newContacts = contacts.filter(item => item.id !== contactId);
      return {
        contacts: newContacts,
      };
    });
  };

  componentDidMount() {
    const contact = localStorage.getItem('contacts');
    console.log(JSON.parse(contact));
    if (contact) {
      this.setState({
        contacts: JSON.parse(contact),
      });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.lenght) {
      const { contacts } = this.state;
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    const { addContact, handleChange, removeContact } = this;

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2 className={styles.title}>Contacts</h2>
        <Filter filter={filter} handleChange={handleChange} />
        <ContactList
          removeContact={removeContact}
          contacts={filteredContacts}
        />
      </div>
    );
  }
}

export default Form;
