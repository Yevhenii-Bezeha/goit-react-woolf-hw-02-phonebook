import { Component } from 'react';
import { AddContact } from './AddContact/AddContact';
import { AllContacts } from './AllContacts/AllContacts';
import { SearchContacts } from './SearchContact/SearchContact';
import Notiflix from 'notiflix';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleAddNewContact = newData => {
    const { contacts } = this.state;

    const newContact = {
      id: crypto.randomUUID(),
      position: 'default',
      ...newData,
    };
    const existingContact = contacts.some(
      contact =>
        contact.name.toLowerCase().trim() ===
        newContact.name.toLowerCase().trim()
    );

    const existingNameWithoutSpace = contacts.some(
      contact =>
        contact.name.toLowerCase().replace(' ', '').trim() ===
        newContact.name.toLowerCase().replace(' ', '').trim()
    );

    if (existingContact || existingNameWithoutSpace) {
      return Notiflix.Notify.warning(
        `${newContact.name} is already in contacts`
      );
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleSeacrhContact = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  handlChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { contacts } = this.state;
    const filteredContact = this.handleSeacrhContact();
    return (
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <h1>PHONEBOOK</h1>
        <div>
          <AddContact addContact={this.handleAddNewContact} />

          <SearchContacts changeFilter={this.handlChangeFilter} />
          {!contacts.length ? (
            Notiflix.Notify.warning('There are no contacts yet')
          ) : (
            <AllContacts
              dataContacts={filteredContact}
              deleteContact={this.handleDeleteContact}
            />
          )}
        </div>
      </div>
    );
  }
}
