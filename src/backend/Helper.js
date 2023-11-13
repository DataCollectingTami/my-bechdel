const he = require('he');

export function charParser(str) {
  // let encodeUri = encodeURI(str);
  // let decodedUri = decodeURI(encodeUri);
  //return decodedUri;

  return he.decode(str)
}
