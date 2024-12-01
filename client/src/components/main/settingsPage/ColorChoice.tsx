import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { RootsState } from '../../../types';

type ColorChoiceProps = {
  handler: (identifier: string) => void;
  identifier: string;
  mode: string | null;
};
/**
 * A React functional component for rendering a list of color choices as radio buttons.
 * @param param0  An object containing the handler function, identifier, and mode.
 * @returns A element that results in the rendering of color options.
 */
const ColorChoice: React.FC<ColorChoiceProps> = ({ handler, identifier, mode }) => {
  const colors = ['Blue', 'Orange', 'Teal', 'Yellow', 'Purple', 'White', 'Black'];
  /**
   * Extracts the required color modes from the Redux store using the useSelector hook.
   */
  const { globalMode, headerMode, buttonMode, textMode, sidebarMode } = useSelector(
    (state: RootsState) => state.dataStorageReducer.datastorages,
  );
  /**
   * Extracts specific color strings from the stored mode strings by removing prefix/suffix characters.
   * This is done for background color, header color, sidebar color, and button color.
   */
  const backgrColor = textMode?.substring(11, textMode.length - 10);
  const headerColor = headerMode?.substring(11, headerMode.length - 6);
  const sideColor = sidebarMode?.substring(11, sidebarMode.length - 7);
  const buttonColor = buttonMode?.substring(11, buttonMode.length - 6);

  // alert(globalMode?.substring( 11, 11 + "blue".length))
  return (
    <div key={identifier}>
      <h3>{identifier} </h3>
      {colors.map(colorName => (
        <label key={`${colorName}-${identifier}`} className='blindness-option' color='white'>
          <input
            checked={mode === `colorChoice${colorName}${identifier}`}
            onChange={() => handler(`colorChoice${colorName}${identifier}`)}
            name={identifier}
            type='radio'
            // disabled={globalMode?.substring( 11, 11 + colorName.length).toLowerCase() === colorName.toLowerCase()}
            id={colorName}
            disabled={
              backgrColor === colorName ||
              headerColor === colorName ||
              sideColor === colorName ||
              buttonColor === colorName
            }
          />
          {colorName}
        </label>
      ))}
    </div>
  );
};
ColorChoice.propTypes = {
  handler: PropTypes.func.isRequired,
  identifier: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
};
export default ColorChoice;
