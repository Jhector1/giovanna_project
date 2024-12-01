import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import dataStorageReducer from './reducer';
/**
 * Redux Store Configuration
 *  This store is used to manage the global state of the application.
 */
const store = configureStore({
  reducer: {

    /**
     * Key for the reducer managing data storage-related state.
     * The `dataStorageReducer` handles actions related to color blindness modes and other data storage settings.
     */

    user: userReducer,

    dataStorageReducer,
  },
});

export default store;
