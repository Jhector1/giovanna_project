import { useEffect, useState } from 'react';
import Switch from 'react-switch';
import { useDispatch, useSelector } from 'react-redux';
import useDataStorage from '../../hooks/useDataStorage';
import { removeColorBlind, updateColorBlind } from '../../reducer';
import { RootsState } from '../../types';
import './index.css';
import getColor from '../getColor';

/**
 * Interface for DataStorageProps,
 * Describes the expected props for the ToggleSwitch component.
 */
interface DataStorageProps {
  storageKey: string;
  val1: string;
  val2: string;
}
/**
 * ToggleSwitch Component,
 * A customizable toggle switch that updates the Redux store and applies color blindness modes.
 * @param param0 The properties passed to the component.
 * @returns A labeled toggle switch.
 */
export default function ToggleSwitch({ storageKey, val1, val2 }: DataStorageProps) {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  const { globalMode, headerMode, textMode, buttonMode, sidebarMode } = useSelector(
    (state: RootsState) => state.dataStorageReducer.datastorages,
  );
  /**
   * Initializes the toggle state based on the current modes in the Redux store.
   * Checks if all modes are non-null to set the toggle to "checked".
   */
  useEffect(() => {
    setIsChecked(
      globalMode !== null &&
        textMode !== null &&
        headerMode !== null &&
        sidebarMode !== null &&
        buttonMode != null,
    );
  }, []);
  // useEffect(() => {
  //   setStoredValue(isChecked ? val1 : val2);
  //   setTeal(isChecked ? 'teal' : 'menu_button');
  //   setDarkbg(isChecked ? 'darkbg' : 'header');
  // }, [isChecked, setStoredValue, val1, val2, setDarkbg, setTeal]);
  /**
   * Handles the toggle switch action.
   *  Updates the Redux store and applies/removes color blindness styles accordingly.
   */
  const handleToggle = () => {
    if (isChecked) {
      // Remove all applied styles when the toggle is unchecked
      document.body?.classList.remove(globalMode || 'normal');
      document.body?.classList.remove(textMode || 'normal');
      const menubtns = document.querySelectorAll('.menu_button');
      menubtns.forEach(btn => {
        btn?.classList.remove(sidebarMode || 'normal');
      });
      const menubtn2s = document.querySelectorAll('.menu_selected');
      menubtn2s.forEach(btn => {
        btn?.classList.remove(sidebarMode || 'normal');
      });

      document.querySelector('.container')?.classList.remove(globalMode || 'normal');

      dispatch(removeColorBlind());
      document.body?.classList.remove(globalMode || 'normal');
      document.querySelector('#header')?.classList.remove(headerMode || 'normal');
    } else {
      // Apply predefined color blindness styles when the toggle is checked.
      const menubtns = document.querySelectorAll('.menu_button');
      menubtns.forEach(btn => {
        btn?.classList.add('teal');
      });
      const menubtn2s = document.querySelectorAll('.menu_selected');
      menubtn2s.forEach(btn => {
        btn?.classList.add('teal');
      });
      // Dispatch action to update color blindness settings in the Redux store.
      dispatch(
        updateColorBlind({
          globalMode: 'colorChoiceBlackBackGround',
          headerMode: 'colorChoiceBlackHeader',
          sidebarMode: 'colorChoiceTealSideBar',
          textMode: 'colorChoiceYellowTypography',
          buttonMode: 'colorChoiceBlueButton',
        }),
      );
      // Apply the corresponding styles to the document body and container.
      document.body?.classList.add('colorChoiceBlackBackGround');
      document.body?.classList.add('colorChoiceYellowTypography');
      // document.querySelector('#header')?.classList.add('headerMode');
      document.querySelector('.container')?.classList.add('colorChoiceBlackBackGround');
    }
    // Toggle the `isChecked` state.
    setIsChecked(!isChecked);

    // setTimeout(() => {
    //   window.location.reload();
    // }, 0);
  };

  return (
    <label>
      {/* Render the Switch component with appropriate props */}
      <Switch
        className='btn_state'
        onChange={handleToggle}
        checked={isChecked}
        onColor={getColor(buttonMode)}
        handleDiameter={20}
        uncheckedIcon={false}
        checkedIcon={false}
        height={25}
        width={50}
      />
    </label>
  );
}
