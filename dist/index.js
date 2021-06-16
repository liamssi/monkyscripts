var fbtool = (function (exports) {
  "use strict";

  const ui = () => console.log("lets build the ui");

  console.log("cool ------");

  let init = () => {
    console.log("init called");
    ui();
  };

  exports.init = init;

  Object.defineProperty(exports, "__esModule", { value: true });

  return exports;
})({});

console.log("fb tool log");
