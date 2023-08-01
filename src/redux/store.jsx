import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createAction } from '@reduxjs/toolkit';

export const addContact = createAction('contacts/addContact');
export const deleteContact = createAction('contacts/deleteContact');
export const setFilter = createAction('filter/setFilter');

const contactsReducer = (state = [], action) => {
  switch (action.type) {
    case addContact.type:
      return [...state, action.payload];
    case deleteContact.type:
      return state.filter((contact) => contact.id !== action.payload);
    default:
      return state;
  }
};

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case setFilter.type:
      return action.payload;
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, 
});

export const persistor = persistStore(store);