const NUM_CHARS = 64;

export const asciiToHexa = (str: string): string => {
  let hexaStr = "";
  for (let i = 0; i < str.length; i++) {
    const hex = Number(str.charCodeAt(i)).toString(16);
    hexaStr += hex;
  }
  const remainingToAdd = NUM_CHARS - hexaStr.length;
  for (let i = 0; i < remainingToAdd; i++) {
    hexaStr += "0";
  }
  return `0x${hexaStr}`;
};

export const hexaToAscii = (hex: string): string => {
  let res = "";
  for (let i = 0; i < hex.length; i += 2) {
    res += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return res;
};
