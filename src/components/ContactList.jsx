import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../redux/store';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    background-color: #fff;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  button {
    padding: 5px 10px;
    background-color: #ff6b6b;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;
  }
`;

const ContactItem = styled.li`
  color: #2ecc71;
`;

const ContactNumber = styled.span`
  color: #333;
`;

const ContactList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector((state) => {
    const { contacts, filter } = state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  });

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <List>
      {filteredContacts.map(({ id, name, number }) => (
        <ContactItem key={id}>
          {name}: <ContactNumber>{number}</ContactNumber>
          <button type="button" onClick={() => handleDeleteContact(id)}>
            Delete
          </button>
        </ContactItem>
      ))}
    </List>
  );
};

export default ContactList;
