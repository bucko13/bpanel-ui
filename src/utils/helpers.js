/**
 * prepends first i characters and appends last
 * j characters of the string input to an ellipse.
 **/
const condenseText = (input, prefixLen, suffixLen, condenseThreshold = 0) => {
  let result = input;

  const resultLen = result.length;

  if (typeof input !== 'string') {
    result = JSON.stringify(input);
  }

  return resultLen > condenseThreshold && prefixLen + suffixLen < resultLen
    ? `${result.slice(0, prefixLen)}...${result.slice(
        resultLen - suffixLen,
        resultLen
      )}`
    : result;
};

const onCopy = text => {
  const textField = document.createElement('textarea');
  textField.innerText = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand('copy');
  textField.remove();
};

export default {
  condenseText,
  onCopy,
};
