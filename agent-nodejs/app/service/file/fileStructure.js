const fileStruct = {
  gcType: {
    tipo: "pattern",
    pattern1: "ms: ",
    pattern2: " ",
  },
  timegc: {
    tipo: "pattern",
    pattern1: "MB, ",
    pattern2: "/",
  },
  heap1a: {
    tipo: "pattern",
    pattern1: "Scavenge ",
    pattern2: "(",
  },
  heap1b: {
    tipo: "pattern",
    pattern1: "Mark-sweep ",
    pattern2: "(",
  },
  heap2: {
    tipo: "pattern",
    pattern1: "->",
    pattern2: "(",
  },
  timestamp: {
    tipo: "pattern",
    pattern1: "]",
    pattern2: "ms:",
  },
};

module.exports = { fileStruct };
