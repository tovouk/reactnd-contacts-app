import React, {Component} from 'react'
import PropTypes from 'prop-types'

class ListContacts extends Component{

    state = {
        query: ''
    }

    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDelete: PropTypes.func.isRequired
    }

    updateQuery = (query) => {
        this.setState(()=> ({
            query: query.trim()
        })) 
    }

    render(){

        const {query} = this.state
        const {contacts, onDelete} = this.props

        const showingContacts = query === ''
            ? contacts
            : contacts.filter(contact => (
                contact.name.toLowerCase().includes(query.toLowerCase())
            ))

        return(
            <div className="list-contacts">
                <div className="list-contacts-top">
                    <input className="search-contacts"
                        type="text"
                        palceholder="Search Contacts"
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </div>
                <ol className='contact-list'>
                    {showingContacts.map(contact => (
                        <li key={contact.id} className="contact-list-item">
                            <div className="contact-avatar"
                            style={{
                                backgroundImage: `url(${contact.avatarURL})`
                            }}></div>
                            <div className="contact-details">
                                <p>{contact.name}</p>
                                <p>{contact.handle}</p>
                            </div>
                            <button className="contact-remove" onClick={()=> onDelete(contact)}></button>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default ListContacts