/**
 * prepends first i characters and appends last
 * j characters of the string input to an ellipse.
 **/
const condenseText = (input, prefixLen, suffixLen) => {
  let result = input;

  if (typeof input !== 'string') {
    result = JSON.stringify(input);
  }

  return result.length > 12
    ? `${result.slice(0, prefixLen)}...${result.slice(-suffixLen)}`
    : result;
};

export default {
  condenseText
};
