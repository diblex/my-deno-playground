/**
 * Converts JSON into Uint8Array
 * @param val 
 */
export function jsonToUint8Array(val: {[key: string]: any}) {
  const encoder = new TextEncoder();
  return encoder.encode(JSON.stringify(val));
}

/**
 * Converts Uint8Array into string
 * @param val 
 */
export function uint8ArrToString(val: Uint8Array) {
  const decoder = new TextDecoder();
  return decoder.decode(val);
}

/**
 * Converts Uint8Array into JSON
 * @param val 
 */
export function uint8ArrToJson(val: Uint8Array) {
  const str = uint8ArrToString(val);
  return JSON.parse(str);
}