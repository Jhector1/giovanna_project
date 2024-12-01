import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Interface for defining the structure of color blindness modes.
 */
interface ColorBlindMode {
  globalMode: string;
  headerMode: string;
  sidebarMode: string;
  textMode: string;
  buttonMode: string;
}
/**
 * Interface for the Redux state structure.
 */
export interface DataStoragesState {
  datastorages: {
    [key: string | number]: string | null;
  };
}
/**
 * Initial state for the Redux slice.
 * Retrieves mode settings from localStorage to maintain persistence across sessions.
 */
const initialState: DataStoragesState = {
  datastorages: {
    globalMode: localStorage.getItem('global_mode'),
    headerMode: localStorage.getItem('header_mode'),
    sidebarMode: localStorage.getItem('sidebar_mode'),
    textMode: localStorage.getItem('text_mode'),
    buttonMode: localStorage.getItem('button_mode'),
  },
};

/**
 * Slice for managing color blindness and mode settings.
 * Provides actions and reducers to update and reset mode settings.
 */
const datastoragesSlice = createSlice({
  name: 'datastorages',
  initialState,
  reducers: {
    /**
     * Removes all color blindness settings.
     * Clears the corresponding keys from `localStorage` and resets state values to `null`.
     * @param state The current state of the slice.
     */
    removeColorBlind: state => {
      localStorage.removeItem('global_mode');
      localStorage.removeItem('header_mode');
      localStorage.removeItem('sidebar_mode');
      localStorage.removeItem('text_mode');
      localStorage.removeItem('button_mode');
      state.datastorages = {
        globalMode: null,
        headerMode: null,
        sidebarMode: null,
        textMode: null,
        buttonMode: null,
      };
    },
    /**
     * Updates all color blindness settings at once.
     * Saves the settings to `localStorage` and updates the state.
     * @param state The current state of the slice.
     * @param action The payload containing new mode settings.
     */
    updateColorBlind: (state, action: PayloadAction<ColorBlindMode>) => {
      const { headerMode, sidebarMode, globalMode, textMode, buttonMode } = action.payload;
      localStorage.setItem('global_mode', globalMode);
      localStorage.setItem('header_mode', headerMode);
      localStorage.setItem('sidebar_mode', sidebarMode);
      localStorage.setItem('text_mode', textMode);
      localStorage.setItem('button_mode', buttonMode);

      state.datastorages = {
        globalMode,
        headerMode,
        sidebarMode,
        textMode,
        buttonMode,
      };
    },
    /**
     * Updates the global mode.
     * Saves the new mode to `localStorage` and updates the state.
     * @param state The current state of the slice.
     * @param action The new global mode.
     */
    updateGlobalMode: (state, action: PayloadAction<string>) => {
      const mode = action.payload;

      localStorage.setItem('global_mode', mode);

      state.datastorages = {
        ...state.datastorages,
        globalMode: mode,
      };
    },
    /**
     * Updates the sidebar mode.
     * Saves the new mode to `localStorage` and updates the state.
     * @param state The current state of the slice.
     * @param action  The new sidebar mode.
     */
    updateSidebarMode: (state, action: PayloadAction<string>) => {
      const mode = action.payload;

      localStorage.setItem('sidebar_mode', mode);

      state.datastorages = {
        ...state.datastorages,
        sidebarMode: mode,
      };
    },
    /**
     * Updates the text mode.
     * Saves the new mode to `localStorage` and updates the state.
     * @param state The current state of the slice.
     * @param action The new text mode.
     */
    updateTextMode: (state, action: PayloadAction<string>) => {
      const mode = action.payload;

      localStorage.setItem('text_mode', mode);

      state.datastorages = {
        ...state.datastorages,
        textMode: mode,
      };
    },
    /**
     * Updates the button mode.
     * Saves the new mode to `localStorage` and updates the state.
     *
     * @param state The current state of the slice.
     * @param action The new button mode.
     */
    updateButtonMode: (state, action: PayloadAction<string>) => {
      const mode = action.payload;

      localStorage.setItem('button_mode', mode);

      state.datastorages = {
        ...state.datastorages,
        buttonMode: mode,
      };
    },
    /**
     * Updates the header mode.
     * Saves the new mode to `localStorage` and updates the state.
     *
     * @param state The current state of the slice.
     * @param action The new header mode.
     */
    updateHeaderMode: (state, action: PayloadAction<string>) => {
      const mode = action.payload;

      localStorage.setItem('header_mode', mode);

      state.datastorages = {
        ...state.datastorages,
        headerMode: mode,
      };
    },
  },
});

export const {
  updateColorBlind,
  removeColorBlind,
  updateSidebarMode,
  updateGlobalMode,
  updateTextMode,
  updateButtonMode,
  updateHeaderMode,
} = datastoragesSlice.actions;

export default datastoragesSlice.reducer;
