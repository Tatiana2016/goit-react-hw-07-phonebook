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
  const contacts = useSelector((state) => state.contacts);

  const handleDeleteContact = async (contactId) => {
    try {
      await dispatch(deleteContact(contactId));
    } catch (error) {
      alert('Failed to delete contact.');
    }
  };

  return (
    <List>
      {contacts.items &&
        contacts.items.map(({ id, name, number }) => (
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
