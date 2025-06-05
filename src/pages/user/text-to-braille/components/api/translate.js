// convertTextToBrailleDots.js

export default function convertTextToBrailleDots(text) {
  const brailleDotsLookup = {
    a: "100000",
    b: "110000",
    c: "100100",
    d: "100110",
    e: "100010",
    f: "110100",
    g: "110110",
    h: "110010",
    i: "010100",
    ı: "010100",
    j: "010110",
    k: "101000",
    l: "111000",
    m: "101100",
    n: "101110",
    o: "101010",
    ö: "010100",
    p: "111100",
    q: "111110",
    r: "111010",
    s: "011100",
    t: "011110",
    u: "101001",
    ü: "101001",
    v: "111001",
    w: "010111",
    x: "101101",
    y: "101111",
    z: "101011",
    1: "100000",
    2: "110000",
    3: "100100",
    4: "100110",
    5: "100010",
    6: "110100",
    7: "110110",
    8: "110010",
    9: "010100",
    0: "010110",
  };

  let brailleDots = "";

  for (const char of text) {
    const charBrailleDots = brailleDotsLookup[char.toLowerCase()];
    brailleDots += charBrailleDots ? charBrailleDots : "000000";
    brailleDots += " ";
  }

  return brailleDots.trim(); // remove trailing space
}
