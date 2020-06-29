import React, { Component } from 'react';
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {

  state = {
    contacts: [],
    screen : 'list'
  }

  componentDidMount(){
    ContactsAPI.getAll()
    .then((contacts)=>{
      this.setState({contacts})
    })
  }

  removeContact = (deleteThisContact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter( (contact) => {
        return contact.id !== deleteThisContact.id
      })
    }))
    ContactsAPI.remove(deleteThisContact)
  }

  render() {
    return (
      <div>
        {this.state.screen === 'list' && (<ListContacts onDelete={this.removeContact} contacts={this.state.contacts}/> )}
        {this.state.screen === 'create' && (<CreateContact />)}
      </div>
    );
  }
}

export default App;
