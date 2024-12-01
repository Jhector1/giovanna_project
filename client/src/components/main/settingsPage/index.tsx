import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDataStorage from '../../../hooks/useDataStorage';
import './index.css';
import ToggleSwitch from '../../../tool/toggleSwitch';
import { RootsState } from '../../../types';

import {
  updateColorBlind,
  updateGlobalMode,
  updateTextMode,
  updateButtonMode,
  updateSidebarMode,
  updateHeaderMode,
} from '../../../reducer';
import ColorChoice from './ColorChoice';
/**
 * SettingsPage Component
 * Provides the UI for managing accessibility-related settings,
 * including color blindness modes and customizable palettes.
 *
 * @returns The rendered settings page.
 */
const SettingsPage = () => {
  /**
   * Extracts color mode settings from the Redux store.
   */
  const { globalMode, headerMode, buttonMode, textMode, sidebarMode } = useSelector(
    (state: RootsState) => state.dataStorageReducer.datastorages,
  );
  /**
   * Provides access to the Redux dispatch function.
   */
  const dispatch = useDispatch();
  /**
   * Updates color settings for multiple UI elements to support different color blindness modes.
   *
   * @param globalMode2 The new global mode (background color).
   * @param headerMode2 The new header color mode.
   * @param textMode2 The new text color mode.
   * @param sidebarMode2 The new sidebar color mode.
   * @param buttonMode2 The new button color mode.
   */
  function colorBlindSwitch(
    globalMode2: string,
    headerMode2: string,
    textMode2: string,
    sidebarMode2: string,
    buttonMode2: string,
  ) {
    /**
     * Remove existing styles for sidebar and other elements.
     */
    const menubtns = document.querySelectorAll('.menu_button');
    menubtns.forEach(btn => {
      btn?.classList.remove(sidebarMode || 'normal');
    });
    const menubtn2s = document.querySelectorAll('.menu_selected');
    menubtn2s.forEach(btn => {
      btn?.classList.remove(sidebarMode || 'normal');
    });
    document.querySelector('#header')?.classList.remove(headerMode || 'normal');
    document.querySelector('.container')?.classList.remove(globalMode || 'normal');

    menubtns.forEach(btn => {
      btn?.classList.add(sidebarMode2);
    });

    menubtn2s.forEach(btn => {
      btn?.classList.add(sidebarMode2);
    });

    document.body?.classList.remove(globalMode || 'normal');
    document.body?.classList.remove(textMode || 'normal');
    dispatch(
      updateColorBlind({
        globalMode: globalMode2,
        sidebarMode: sidebarMode2,
        headerMode: headerMode2,
        textMode: textMode2,
        buttonMode: buttonMode2,
      }),
    );
    dispatch(updateButtonMode(buttonMode2));
    document.body?.classList.add(globalMode2);
    document.body?.classList.add(textMode2);
    document.querySelector('#header')?.classList.add(headerMode2);
    document.querySelector('.container')?.classList.add(globalMode2);
  }
  /**
   * Updates the global background color in the Redux store and DOM.
   *
   * @param bgColor The new background color.
   */
  const updateBackground = (bgColor: string) => {
    document.body?.classList.remove(globalMode || 'normal');
    dispatch(updateGlobalMode(bgColor));
    dispatch(updateHeaderMode(`${bgColor.substring(0, bgColor.length - 10)}Header`));
    document.body?.classList.add(bgColor);
  };

  // const toggleMode = () => {
  //   setStoredValue(prevMode => (prevMode === 'normal' ? 'colorBlind' : 'normal'));
  // };
  /**
   * Activates the default color blindness mode.
   */
  const defaultToggle = () => {
    colorBlindSwitch(
      'colorChoiceBlackBackGround',
      'colorChoiceBlackHeader',
      'colorChoiceYellowTypography',
      'colorChoiceTealSideBar',
      'colorChoiceBlueButton',
    );
  };
  /**
   *  Activates the red-green color blindness mode
   */
  const redGreenToggle = () => {
    colorBlindSwitch(
      'colorChoiceGrayBackGround',
      'colorChoiceGrayBackGround',
      'colorChoicePurpleTypography',
      'colorChoiceTealSideBar',
      'colorChoiceGreenButton',
    );
  };
  /**
   * Activates the blue-yellow color blindness mode.
   */
  const blueYellowToggle = () => {
    colorBlindSwitch(
      'colorChoiceGrayBackGround',
      'colorChoiceGrayBackGround',
      'colorChoicePinkTypography',
      'colorChoiceRedSideBar',
      'colorChoiceOrangeButton',
    );
  };
  /**
   * Activates the completely colorblind mode.
   */
  const completelyToggle = () => {
    colorBlindSwitch(
      'colorChoiceWhiteBackGround',
      'colorChoiceGrayBackGround',
      'colorChoiceBlackTypography',
      'colorChoiceGraySideBar',
      'colorChoiceDarkGrayButton',
    );
  };
  /**
   * Handles updates to the background color.
   * @param colorChoice The selected background color.
   */
  const handleBackgroundUpdate = (colorChoice: string) => {
    updateBackground(colorChoice);
  };
  /**
   *  Handles updates to the sidebar color.
   * @param colorChoice The selected sidebar color.
   */
  const handleSidebarUpdate = (colorChoice: string) => {
    const menubtns = document.querySelectorAll('.menu_button');
    menubtns.forEach(btn => {
      btn?.classList.remove(sidebarMode || 'normal');
    });

    const menubtn2s = document.querySelectorAll('.menu_selected');
    menubtn2s.forEach(btn => {
      btn?.classList.remove(sidebarMode || 'normal');
    });
    dispatch(updateSidebarMode(colorChoice));
    menubtns.forEach(btn => {
      btn?.classList.add(colorChoice);
    });

    menubtn2s.forEach(btn => {
      btn?.classList.add(colorChoice);
    });
  };
  /**
   * Handles updates to the text color.
   * @param textColor The selected text color.
   */
  const handleTypographyUpdate = (textColor: string) => {
    document.body?.classList.remove(textMode || 'normal');
    dispatch(updateTextMode(textColor));
    document.body?.classList.add(textColor);
  };
  /**
   * Handles updates to the button color.
   * @param colorChoice  The selected button color.
   */
  const handleButtonUpdate = (colorChoice: string) => {
    const menubtns = document.querySelectorAll('.btn_sate');
    menubtns.forEach(btn => {
      btn?.classList.remove(sidebarMode || 'normal');
    });

    dispatch(updateButtonMode(colorChoice));
    menubtns.forEach(btn => {
      btn?.classList.add(colorChoice);
    });
  };
  return (
    <article className={`Settings-page`}>
      <h1>Settings</h1>
      {/* Toggle switch for enabling/disabling color blindness mode */}
      <section className='toggle-container'>
        <label htmlFor='mode-toggle' className='toggle-label'>
          Enable Color Blindness
        </label>
        <ToggleSwitch storageKey='colorBlindMode' val1='colorBlindMode' val2='normal' />
      </section>
      {/* Color blindness palettes section */}
      <section style={globalMode ? { display: 'block' } : { display: 'none' }}>
        <h2>Color Blindness Support Pallets </h2>
        {/* Default mode */}
        <label className='blindness-option' color='white'>
          Default
          <input
            style={{ backgroundColor: 'red', borderColor: 'red' }}
            checked={
              globalMode === 'colorChoiceBlackBackGround' &&
              textMode === 'colorChoiceYellowTypography' &&
              sidebarMode === 'colorChoiceTealSideBar' &&
              buttonMode === 'colorChoiceBlueButton' &&
              headerMode === 'colorChoiceBlackHeader'
            }
            onChange={defaultToggle}
            name='color-bld'
            type='radio'
            id='red-green-bld'
          />
        </label>
        {/* Red-green mode */}
        <label className='blindness-option' color='white'>
          Red-Green
          <input
            checked={
              globalMode === 'colorChoiceGrayBackGround' &&
              textMode === 'colorChoicePurpleTypography' &&
              sidebarMode === 'colorChoiceTealSideBar' &&
              buttonMode === 'colorChoiceGreenButton' &&
              headerMode === 'colorChoiceGrayBackGround'
            }
            onChange={redGreenToggle}
            name='color-bld'
            type='radio'
            id='red-green-bld'
          />
        </label>
        {/* Blue-yellow mode */}
        <label className='blindness-option' color='white'>
          Blue-Yellow
          <input
            checked={
              globalMode === 'colorChoiceGrayBackGround' &&
              textMode === 'colorChoicePinkTypography' &&
              sidebarMode === 'colorChoiceRedSideBar' &&
              buttonMode === 'colorChoiceOrangeButton' &&
              headerMode === 'colorChoiceGrayBackGround'
            }
            onChange={blueYellowToggle}
            name='color-bld'
            type='radio'
            id='blue-yellow-bld'
          />
        </label>
        {/* Complete color blindness mode */}
        <label className='blindness-option' color='white'>
          Completely
          <input
            checked={
              globalMode === 'colorChoiceWhiteBackGround' &&
              textMode === 'colorChoiceBlackTypography' &&
              sidebarMode === 'colorChoiceGraySideBar' &&
              buttonMode === 'colorChoiceDarkGrayButton' &&
              headerMode === 'colorChoiceGrayBackGround'
            }
            onChange={completelyToggle}
            name='color-bld'
            type='radio'
            id='completely-bld'
          />
        </label>
        {/* Color Palette Builder */}
        <h1>Color Palette Builder</h1>
        <section className='color-blind-container'>
          <section>
            <ColorChoice handler={handleSidebarUpdate} identifier='SideBar' mode={sidebarMode} />
          </section>
          <section>
            <ColorChoice
              handler={handleBackgroundUpdate}
              identifier='BackGround'
              mode={globalMode}
            />
          </section>
          <section>
            <ColorChoice handler={handleTypographyUpdate} identifier='Typography' mode={textMode} />
          </section>
          <section>
            <ColorChoice handler={handleButtonUpdate} identifier='Button' mode={buttonMode} />
          </section>
        </section>
      </section>
    </article>
  );
};
export default SettingsPage;
