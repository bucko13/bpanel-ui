/**
 * prepends first i characters and appends last
 * j characters of the string input to an ellipse.
 **/
const condenseText = (condenseThreshold, input, prefixLen, suffixLen) => {
  let result = input;

  const resultLen = result.length;

  if (typeof input !== 'string') {
    result = JSON.stringify(input);
  }

  return resultLen >= condenseThreshold && prefixLen + suffixLen < resultLen
    ? `${result.slice(0, prefixLen)}...${result.slice(-suffixLen)}`
    : result;
};

export default {
  condenseText
};
