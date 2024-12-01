/**
 * getColor Function
 * Maps a CSS class name to its corresponding color code (in hexadecimal format).
 *
 * @param colorClass The CSS class name representing a color choice.
 * @returns {string} The corresponding hexadecimal color code. Returns a default color if no match is found.
 */
const getColor = (colorClass: string | null) => {
  switch (colorClass) {
    case 'colorChoiceYellowButton':
      return '#F0E442';

    case 'colorChoiceBlueButton':
      return '#0072B2';

    case 'colorChoiceTealButton':
      return '#008080';

    case 'colorChoiceOrangeButton':
      return '#E69F00';

    case 'colorChoicePurpleButton':
      return '#9966CC';

    case 'colorChoiceWhiteButton':
      return '#e0e0e0';

    case 'colorChoiceBlackButton':
      return '#000000';

    case 'colorChoiceGreenButton':
      return '#00A86B';

    case 'colorChoiceGrayButton':
      return '#666666';
    case 'colorChoiceDarkGrayButton':
      return '#666666';
    default:
      return '#007bff';
  }
};

export default getColor;
