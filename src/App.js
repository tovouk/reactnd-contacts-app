import React, { Component } from 'react';
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'
import {Route} from 'react-router-dom'

class App extends Component {

  state = {
    contacts: []
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
      <Route exact path="/" render={()=> (
        <ListContacts onDelete={this.removeContact} contacts={this.state.contacts}/>
      )} />
      <Route path="/create" component={CreateContact} />
      </div>
    );
  }
}

export default App;
