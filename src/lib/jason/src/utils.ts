/**
 * Converts JSON into Uint8Array
 * @param val 
 */
export function jsonToUint8Array(val: {[key: string]: any}) {
  return stringToUint8Array(JSON.stringify(val))
}

/**
 * Converts a string into Uint8Array
 * @param val 
 */
export function stringToUint8Array(val: string) {
  const encoder = new TextEncoder();
  return encoder.encode(val);
}

/**
 * Converts Uint8Array into JSON
 * @param val 
 */
export function uint8ArrayToJson(val: Uint8Array) {
  const str = uint8ArrayToString(val);
  return JSON.parse(str);
}

/**
 * Converts Uint8Array into string
 * @param val 
 */
export function uint8ArrayToString(val: Uint8Array) {
  const decoder = new TextDecoder();
  return decoder.decode(val);
}

/**
 * It returns a response Header object configured for Jason.
 */
export function getJasonHeader() {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  return headers;
}