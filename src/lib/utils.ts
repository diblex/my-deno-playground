export function uint8arrayToStringMethod(myUint8Arr: Uint8Array){
  return String.fromCharCode.apply(null, myUint8Arr);
}

export function jsonToUtf8(val: any) {
  const encoder = new TextEncoder();
  return encoder.encode(JSON.stringify(val));
}