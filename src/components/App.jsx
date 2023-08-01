import React from 'react';
import styled from 'styled-components';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

const AppContainer = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 4px;
  max-width: 400px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #2ecc71;
  font-size: 24px;
  margin-bottom: 20px;
`;

const App = () => {
  return (
    <AppContainer>
      <Title>Phonebook</Title>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </AppContainer>
  );
};

export default App;
