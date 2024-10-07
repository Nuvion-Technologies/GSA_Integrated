(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.hyphenationPatternsIa = factory();
  }
})(this, function () {
  return [
    "002,004,001,01,021,034,04,1,00003,043,003,3,012,00004,21,03,0043,02,12,212,43,2,0032,0002,0003,00034,0034,4,101,011,0001,0004,00043,0334,403,32,0012,201",
    '{".":{"c":{"h":0},"d":{"e":{"s":1}},"i":{"n":2},"s":{"e":{"i":1}}},"a":{"a":3,"b":[{"l":[{"o":5},4]},3],"c":{"a":3,"e":3,"h":[{"r":6},3],"o":3,"r":3,"u":3},"d":[{"m":7,"v":7},3],"e":[{"l":3,"r":{"o":8}},2],"g":[{"e":{"d":9},"g":7},3],"h":3,"i":{"c":3,"s":3,"v":3},"j":3,"k":3,"l":{"a":3,"e":[{"i":10},3],"o":3,"u":3},"m":3,"n":{"i":{"m":11},"s":{"p":1}},"o":3,"p":3,"q":3,"r":{"a":3,"i":3,"o":3,"u":3,"y":3},"s":{"h":12,"t":{"h":11}},"t":[{"y":{"r":13}},3],"v":3,"w":3,"z":3},"b":{"a":7,"b":[{"o":15},14],"c":3,"d":14,"e":7,"h":3,"i":[{"s":{"a":16}},7],"j":3,"l":{"u":3,"y":17},"m":3,"n":3,"o":7,"p":3,"r":18,"s":19,"t":3,"u":[{"e":2,"i":2},7],"v":3},"c":{"a":{"i":2},"c":14,"d":3,"e":{"n":{"n":20}},"h":{"r":7,"s":21,"t":21,"u":7},"i":7,"k":14,"l":18,"m":14,"o":{"c":{"l":1},"p":22},"q":3,"r":17,"s":12,"t":[{"r":{"o":8}},14],"u":{"a":2,"e":2,"i":2},"y":[{"n":{"e":1},"r":23},7],"z":3},"d":{"a":7,"d":14,"e":[{"r":{"u":1},"s":{"e":24,"o":16,"u":1}},7],"g":14,"h":{"e":3},"i":{"a":{"s":25},"p":{"t":26},"s":{"a":1,"e":16,"i":1,"o":1,"u":16}},"j":14,"m":14,"o":[{"l":{"a":16},"s":{"m":20}},7],"r":[{"o":{"s":25}},17],"u":{"a":2,"e":2,"i":2},"v":14,"y":{"s":0}},"e":{"a":[{"u":17},3],"b":3,"c":{"a":3,"e":3,"h":{"e":15,"i":15},"o":3,"r":3,"u":3},"d":3,"e":3,"f":[{"f":7},3],"g":3,"h":3,"i":3,"j":3,"k":3,"l":{"a":3,"e":3,"o":[{"d":10,"m":9},3],"u":3},"m":[{"a":{"g":9}},3],"n":{"l":21,"o":{"p":25}},"o":[{"g":22,"p":22},3],"q":3,"r":{"a":3,"i":3,"o":[{"g":27,"p":25},3],"u":[{"r":10},3],"y":3},"s":{"e":{"m":1},"t":17,"u":{"e":10}},"t":3,"u":[{"c":{"e":1},"n":3},2],"v":3,"w":3},"f":{"a":7,"f":14,"h":14,"i":7,"l":18,"o":7,"r":18,"t":3,"u":7},"g":{"a":7,"d":14,"e":[{"v":{"i":20}},7],"g":14,"i":[{"m":{"a":20}},7],"l":17,"m":14,"n":14,"o":7,"r":18,"s":19,"u":28,"y":{"m":[{"n":8},23],"n":{"a":1},"r":{"a":16}},"z":14},"h":{"e":[{"c":[{"t":8},23],"u":{"r":10}},17],"l":{"o":{"c":15}},"m":14,"n":3,"o":{"g":22,"p":22,"r":{"h":10}},"r":17,"s":3,"t":3},"i":{"a":[{"l":{"a":16}},3],"b":12,"c":3,"d":[{"o":[{"p":13},24]},3],"e":3,"f":3,"g":3,"h":3,"i":3,"k":3,"l":3,"m":[{"a":{"d":6},"b":7},3],"n":{"f":7,"r":7,"s":23,"v":7},"o":[{"g":22,"s":23,"x":0},29],"p":3,"q":3,"r":{"a":3,"i":3,"o":[{"p":25},3],"u":{"r":10}},"s":{"a":{"c":10,"s":10,"u":10},"e":{"q":10,"s":10},"i":{"l":10,"n":10},"p":{"h":5}},"t":3,"u":3,"v":3,"z":3},"k":{"a":{"l":{"e":1}},"e":2,"r":{"a":30}},"l":{"a":{"l":{"g":20},"r":{"c":20}},"b":3,"c":14,"d":14,"e":{"c":{"h":10},"i":{"d":1}},"f":14,"g":3,"h":14,"i":7,"k":14,"l":[{"u":{"r":10}},14],"m":[{"o":{"d":9}},14],"n":3,"o":{"d":[{"o":15},21],"p":{"i":27}},"p":14,"q":3,"s":19,"t":[{"u":{"n":9}},14],"u":{"e":2,"i":2,"r":21},"v":14,"y":[{"c":{"h":10}},7]},"m":{"a":7,"b":14,"c":3,"e":[{"c":{"h":10},"s":{"e":16}},7],"f":3,"i":[{"p":22,"s":{"i":31}},7],"j":3,"l":3,"m":[{"e":{"n":32}},14],"n":[{"a":{"m":10,"s":10},"o":[{"b":10,"p":10},30]},14],"o":[{"n":{"y":20},"p":22,"r":{"r":10},"s":{"p":31,"t":26}},7],"p":[{"s":15},14],"s":12,"u":7,"v":14,"y":[{"r":{"r":1}},7]},"n":{"a":[{"e":3,"l":{"g":15},"n":{"i":15},"p":12,"u":3},7],"b":3,"c":3,"d":14,"e":[{"q":3,"x":3},7],"f":3,"g":3,"h":3,"i":[{"q":3,"s":{"p":10},"t":17},7],"j":3,"l":3,"m":3,"n":12,"o":[{"b":{"l":31},"s":{"p":33},"x":3},7],"q":3,"r":3,"s":[{"i":{"e":9,"r":6},"l":17,"t":0},3],"t":[{"a":{"h":9,"p":9}},3],"u":[{"a":2,"e":2,"i":2},7],"v":3,"y":7,"z":3},"o":{"a":3,"b":[{"l":{"o":10},"s":7},3],"c":[{"l":{"e":10}},3],"d":3,"e":3,"f":3,"g":3,"h":3,"i":3,"j":3,"l":3,"m":{"n":{"a":1}},"n":{"a":0,"o":[{"s":13},30],"s":23},"o":3,"p":3,"q":3,"r":{"a":3,"i":3,"o":3,"r":{"h":1},"u":3},"s":{"l":12,"p":{"o":1}},"t":[{"a":{"c":9},"o":{"s":25}},3],"u":[{"g":3},2],"v":3,"y":2,"z":3},"p":{"a":[{"n":{"s":24}},7],"e":7,"h":7,"i":7,"l":[{"a":1,"o":{"p":34}},18],"n":[{"a":4,"e":17},3],"o":7,"p":[{"i":{"a":9}},14],"r":18,"s":[{"o":{"d":9},"y":35},14],"t":14,"u":[{"b":36,"e":37,"i":2},7],"y":{"l":[{"o":1},30]}},"q":{"u":[{"a":{"n":31}},0]},"r":{"a":{"l":{"g":20},"q":21,"r":{"c":20}},"b":3,"c":3,"d":14,"e":[{"c":{"h":10},"g":{"i":8},"n":{"n":20},"u":{"t":10}},7],"f":3,"g":14,"h":{"i":7,"u":3,"y":{"d":15}},"j":3,"l":3,"m":14,"n":3,"p":3,"q":3,"r":[{"a":{"q":10}},3],"s":12,"t":14,"u":{"a":2,"e":2,"i":2},"v":3,"w":3,"y":{"s":{"e":1}},"z":3},"s":{"a":[{"b":{"u":15},"c":{"t":20},"f":14,"g":{"r":15},"n":{"n":15},"p":14,"q":14,"r":{"g":15,"m":15,"t":15}},7],"b":14,"c":[{"l":{"e":13}},18],"d":3,"e":7,"f":14,"g":14,"h":3,"i":[{"g":{"e":20},"r":{"o":15}},7],"j":3,"k":7,"l":[{"a":{"v":6}},3],"m":14,"n":3,"o":[{"b":[{"e":15,"l":15},23],"c":{"c":15},"d":{"o":15},"r":{"d":15,"g":15},"s":{"s":15},"x":14},7],"p":[{"a":[{"i":31},21],"l":21,"o":21},3],"q":3,"r":3,"s":[{"a":15},19],"t":3,"u":[{"a":2,"b":{"a":1,"r":1},"e":2,"i":2,"n":14},7],"v":14,"y":7},"t":{"a":{"l":{"g":20},"m":{"b":20},"r":{"t":20}},"d":14,"e":{"c":{"o":20}},"f":14,"g":14,"h":{"l":2,"m":21},"i":{"s":{"p":26}},"l":3,"m":[{"o":30},14],"o":{"s":{"p":26},"x":{"y":20}},"p":14,"r":[{"o":{"r":34}},17],"s":14,"t":14,"u":{"a":2,"e":2,"i":2,"s":{"a":16}},"y":2,"z":14},"u":{"a":{"n":{"i":15},"s":3,"v":3},"b":{"a":{"l":10},"l":2,"r":{"o":10}},"c":{"a":3,"e":[{"m":10},3],"h":3,"o":3,"r":3,"u":3},"d":3,"e":{"l":3},"i":{"b":3,"c":3},"l":{"a":3,"e":3,"o":3},"o":29,"r":{"a":3,"g":{"o":11},"i":3,"o":3,"u":3},"s":{"t":17},"t":3,"u":3,"v":3},"v":{"a":{"i":2},"i":{"r":{"u":10}},"n":21,"r":17},"w":{"n":4},"x":{"a":3,"c":3,"e":3,"h":3,"i":3,"o":3,"p":3,"q":3,"s":12,"t":3,"u":[{"a":2},3],"y":[{"l":7},29]},"y":{"a":3,"b":3,"c":{"a":2,"e":3,"h":30,"o":3,"t":{"a":16}},"d":{"r":30},"e":3,"g":3,"h":3,"i":3,"l":[{"a":{"c":15,"m":10},"e":3,"o":3},21],"n":{"a":{"n":10},"e":{"g":10}},"o":3,"p":{"o":[{"s":13},30]},"r":[{"o":[{"s":13},30]},3],"s":{"e":2},"t":3,"u":3,"z":3},"z":{"e":2,"i":7,"u":28,"z":14}}',
    [
      "alc-un",
      "alc-u-nis-si-me",
      "alc-un-men-te",
      "a-lic-un",
      "a-lic-u-nis-si-me",
      "a-lic-un-men-te",
      "mos-lem",
      "qualc-un",
      "qualc-u-nis-si-me",
      "qualc-un-men-te"
    ]
  ];
});
