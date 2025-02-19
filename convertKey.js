const bs58 = require("bs58");

// Paste your Phantom private key (Base58 string) here
const base58Key = "5oyEzo8sWwtSEa1cTDwaMJjRGBPBWjxFDEruyhsq5T26nwpctwGXrnVVxSsCWhDzJwkeE1pgwB8GwUQo8QpQbuEZ"; 

// Convert to Uint8Array
const secretKey = bs58.decode(base58Key);

console.log("Uint8Array Secret Key:", Array.from(secretKey));
