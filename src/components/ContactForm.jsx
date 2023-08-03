import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { addContact } from '../redux/store';

const Form = styled.form`
  label {
    display: block;
    margin-bottom: 10px;
    color: #2ecc71;
  }

  input {
    padding: 8px;
    border: 1px solid #2ecc71;
    border-radius: 4px;
    width: 100%;
    margin-bottom: 10px;
  }

  button {
    padding: 8px 16px;
    background-color: #2ecc71;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const ContactForm = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !number) {
      alert('Please enter both name and number.');
      return;
    }

    try {
      const newContact = { name, number };
      await dispatch(addContact(newContact));
    } catch (error) {
      alert('Failed to add contact.');
    }

    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <br />
      <label>
        Number:
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <br />
      <button type="submit">Add contact</button>
    </Form>
  );
};

export default ContactForm;
