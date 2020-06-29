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

  createContact = (contact) => {
    ContactsAPI.create(contact)
    .then((contact)=> {
      this.setState((prevState)=> ({
        contacts: prevState.contacts.concat([contact])
      }))
    })
  }

  render() {
    return (
      <div>
      <Route exact path="/" render={()=> (
        <ListContacts onDelete={this.removeContact} contacts={this.state.contacts}/>
      )} />
      <Route path="/create" render={({history})=> (
        <CreateContact onCreateContact={(contact)=>{
          this.createContact(contact)
          history.push('/')
        }} />
      )}  />
      </div>
    );
  }
}

export default App;
