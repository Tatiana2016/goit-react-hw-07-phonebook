import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Constants
const API_BASE_URL = 'https://64c953c1b2980cec85c22501.mockapi.io/contacts';

// Async Thunks
export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch contacts.');
  }
  const data = await response.json();
  return data;
});

export const addContact = createAsyncThunk('contacts/addContact', async (contact) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  });
  if (!response.ok) {
    throw new Error('Failed to add contact.');
  }
  const data = await response.json();
  return data;
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId) => {
  const response = await fetch(`${API_BASE_URL}/${contactId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete contact.');
  }
  return contactId;
});

// Reducers
const contactsReducer = createSlice({
  name: 'contacts',
  initialState: { items: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((contact) => contact.id !== action.payload);
      });
  },
});

const filterReducer = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter: (state, action) => action.payload,
  },
});

const rootReducer = combineReducers({
  contacts: contactsReducer.reducer,
  filter: filterReducer.reducer,
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
 